import { injectable, inject } from 'inversify'

import { AbstractOperator } from '../abstractOperator'
import { InputCreateUserIdentity, OutputCreateUserIdentity } from '../../serializers/users/inputCreateUserIdentity'
import { CreateUserIdentityUseCase } from '../../../business/useCases/users/createUserIdentityUseCase'
import { left, right } from '../../../framework/shared/either'

@injectable()
export class CreateUserIdentityOperator extends AbstractOperator<InputCreateUserIdentity, OutputCreateUserIdentity> {
  public constructor(@inject(CreateUserIdentityUseCase) private createUserIdentityUseCase: CreateUserIdentityUseCase) {
    super()
  }

  protected async run(input: InputCreateUserIdentity): Promise<OutputCreateUserIdentity> {
    const result = await this.createUserIdentityUseCase.exec(input)

    if (result.isLeft()) {
      return left(result.value)
    }

    return right(result.value)
  }
}
