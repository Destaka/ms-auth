import { injectable, inject } from 'inversify'

import { IUseCase } from '../iUseCase'
import { left, right } from '../../../framework/shared/either'
import { InputSignInDto, OutputSignInDto } from '../../dto/users/signInDto'
import { IIdentityService, IIdentityServiceToken } from '../../services/iIdentityService'
import { FailedToSignIn, UserNotFound } from '../../modules/errors/userIdentityErrors'

@injectable()
export class SignInUseCase implements IUseCase<InputSignInDto, OutputSignInDto> {
  public constructor(@inject(IIdentityServiceToken) private identityService: IIdentityService) { }

  async exec(input: InputSignInDto): Promise<OutputSignInDto> {
    try {
      console.log('SignInUseCase::input => ', input)
      let user_id = ''
      const signInResponse = await this.identityService.auth(input)

      if (signInResponse.isRight()) {
        const consultUserResponse = await this.identityService.consultUser(signInResponse.value?.token)
        if (consultUserResponse.isLeft()) {
          return left(UserNotFound)
        }

        user_id = consultUserResponse.value.userId
      }

      if (signInResponse.isLeft()) {
        return left(FailedToSignIn)
      }

      return right({ ...signInResponse.value, userId: user_id })
    } catch (error) {
      console.log('SignInUseCase::error => ', error)
      return left(FailedToSignIn)
    }
  }
}
