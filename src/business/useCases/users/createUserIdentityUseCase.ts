import { injectable, inject } from 'inversify'

import { IUseCase } from '../iUseCase'
import { InputCreateUserIdentityDto, OutputCreateUserIdentityDto } from '../../dto/users/createUserIdentityDto'
import { UserIdentityCreationFailed } from '../../modules/errors/userIdentityErrors'
import { left, right } from '../../../framework/shared/either'
import { IIdentityService, IIdentityServiceToken } from '../../services/iIdentityService'
import { UserIdentityEntity } from '../../../domain/entities/userIdentityEntity'

@injectable()
export class CreateUserIdentityUseCase implements IUseCase<InputCreateUserIdentityDto, OutputCreateUserIdentityDto> {
  public constructor(@inject(IIdentityServiceToken) private identityService: IIdentityService) {}

  async exec(input: InputCreateUserIdentityDto): Promise<OutputCreateUserIdentityDto> {
    try {
      console.log('CreateUserIdentityUseCase::input => ', input)

      const userIdentityResult = UserIdentityEntity.create(input)

      if (userIdentityResult.isLeft()) {
        return left(userIdentityResult.value)
      }

      const user = await this.identityService.create(userIdentityResult.value.export())

      if (user.isLeft()) {
        return left(UserIdentityCreationFailed)
      }

      return right(user.value)
    } catch (error) {
      console.log('CreateUserIdentityUseCase::error => ', error)
      return left(UserIdentityCreationFailed)
    }
  }
}
