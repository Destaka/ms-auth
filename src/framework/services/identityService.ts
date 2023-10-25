import { injectable } from 'inversify'
import { CognitoIdentityServiceProvider } from 'aws-sdk'

import { Either, left, right } from '../shared/either'
import { IError } from '../shared/iError'
import { IDataIdentityService, IIdentityService } from '../../business/services/iIdentityService'
import { ICreateUserIdentityResponseDto } from '../../business/dto/users/createUserIdentityDto'
import { UserIdentityCreationFailed } from '../../business/modules/errors/userIdentityErrors'

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
}
