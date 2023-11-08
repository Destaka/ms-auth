import { injectable } from 'inversify'
import { CognitoIdentityServiceProvider } from 'aws-sdk'

import { Either, left, right } from '../shared/either'
import { IError } from '../shared/iError'
import { IDataIdentityService, IIdentityService } from '../../business/services/iIdentityService'
import { ICreateUserIdentityResponseDto } from '../../business/dto/users/createUserIdentityDto'
import { UserAuthFailed, UserIdentityCreationFailed, UserNotFound } from '../../business/modules/errors/userIdentityErrors'
import { AuthorizerDto } from '../../business/dto/authorizer/authorizerDto'

@injectable()
export class IdentityService implements IIdentityService {
  private readonly cognito!: CognitoIdentityServiceProvider

  constructor() {
    this.cognito = new CognitoIdentityServiceProvider()
  }

  async create(data: IDataIdentityService): Promise<Either<IError, ICreateUserIdentityResponseDto>> {
    try {
      const { user_pool_id } = process.env
      const params = {
        UserPoolId: user_pool_id!,
        Username: data.email,
        UserAttributes: [
          { Name: 'email', Value: data.email, },
          { Name: 'email_verified', Value: 'true' },
          { Name: 'custom:user_id', Value: data.userId },
          { Name: 'name', Value: data.name },
        ],
        MessageAction: 'SUPPRESS'
      }

      console.log('params ', params)

      const response = await this.cognito.adminCreateUser(params).promise()
      console.log('response ', response?.User)

      if (response.User) {
        const paramsForSetPass = {
          Password: data.password,
          UserPoolId: user_pool_id!,
          Username: data.email,
          Permanent: true
        }

        await this.cognito.adminSetUserPassword(paramsForSetPass).promise()
      }

      const user = {
        email: response.User?.Username || '',
        enabled: response.User?.Enabled || false
      }

      return right(user)
    } catch (error) {
      console.log('deu ruim ', error)
      return left(UserIdentityCreationFailed)
    }
  }

  async consultUser(token: string): Promise<Either<IError, AuthorizerDto>> {
    try {
      const response = await this.cognito.getUser({ AccessToken: token }).promise()
      const userId = response
        .UserAttributes
        .find(item => item.Name === 'custom:user_id')?.Value

      if (!userId) {
        return left(UserNotFound)
      }

      return right({
        username: response.Username,
        userId,
      })
    } catch (error) {
      console.log('ConsultUser::error => ', error)

      return left(UserAuthFailed)
    }
  }
}
