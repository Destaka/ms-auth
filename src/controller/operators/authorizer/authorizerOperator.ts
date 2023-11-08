import { injectable, inject } from 'inversify'

import { AbstractOperator } from '../abstractOperator'
import { InputAuthorizer, OutputAuthorizer } from '../../serializers/authorizer/inputAuthorizer'
import { AuthorizerUseCase } from '../../../business/useCases/authorizer/authorizerUseCase'
import { left } from '../../../framework/shared/either'
import { GeneratePolicyUserCase } from '../../../business/useCases/authorizer/generatePolicyUseCase'

@injectable()
export class AuthorizerOperator extends AbstractOperator<InputAuthorizer, OutputAuthorizer> {
  public constructor(
    @inject(AuthorizerUseCase) private authorizerUseCase: AuthorizerUseCase,
    @inject(GeneratePolicyUserCase) private generatePolicyUserCase: GeneratePolicyUserCase,
  ) {
    super()
  }

  protected async run(input: InputAuthorizer): Promise<OutputAuthorizer> {
    const authorizerResult = await this.authorizerUseCase.exec(input)

    if (authorizerResult.isLeft()) {
      return left(authorizerResult.value)
    }

    return this.generatePolicyUserCase.exec({
      ...authorizerResult.value,
      token: input.token
    })
  }
}
