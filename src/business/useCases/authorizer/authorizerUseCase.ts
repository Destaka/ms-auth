import { injectable, inject } from 'inversify'

import { IIdentityService, IIdentityServiceToken } from '../../services/iIdentityService'
import { IUseCase } from '../iUseCase'
import { left, right } from '../../../framework/shared/either'
import { InputAuthorizerDto, OutputAuthorizerDto } from '../../dto/authorizer/authorizerDto'
import { UserIdentityIsNotValid } from '../../modules/errors/authorizerErrors'
import { UserCredentialsDoNotMatch } from '../../modules/errors/userIdentityErrors'

@injectable()
export class AuthorizerUseCase implements IUseCase<InputAuthorizerDto, OutputAuthorizerDto> {
  public constructor(@inject(IIdentityServiceToken) private identityService: IIdentityService) { }

  async exec(input: InputAuthorizerDto): Promise<OutputAuthorizerDto> {
    try {
      const consultUserResponse = await this.identityService.consultUser(input.token)
      console.log('CreateUserIdentityUseCase::consultUserResponse => ', consultUserResponse.value)

      if (consultUserResponse.isLeft()) {
        return left(consultUserResponse.value)
      }

      if (input.user_id && input.user_id !== consultUserResponse.value.userId) {
        return left(UserCredentialsDoNotMatch)
      }

      return right(consultUserResponse.value)
    } catch (error) {
      console.log('AuthorizerUseCase::error => ', error)
      return left(UserIdentityIsNotValid)
    }
  }
}
