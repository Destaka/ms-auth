import { injectable, inject } from 'inversify'

import { AbstractOperator } from '../abstractOperator'
import { InputSignIn, OutputSignIn } from '../../serializers/users/inputSignIn'
import { left, right } from '../../../framework/shared/either'
import { SignInUseCase } from '../../../business/useCases/users/signInUseCase'

@injectable()
export class SignInOperator extends AbstractOperator<InputSignIn, OutputSignIn> {
  public constructor(@inject(SignInUseCase) private signInUseCase: SignInUseCase) {
    super()
  }

  protected async run(input: InputSignIn): Promise<OutputSignIn> {
    const result = await this.signInUseCase.exec(input)

    if (result.isLeft()) {
      return left(result.value)
    }

    return right(result.value)
  }
}
