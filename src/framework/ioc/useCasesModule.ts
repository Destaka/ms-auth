import { ContainerModule, interfaces } from 'inversify'

import { CreateUserIdentityUseCase } from '../../business/useCases/users/createUserIdentityUseCase'
import { SignInUseCase } from '../../business/useCases/users/signInUseCase'
import { GeneratePolicyUserCase } from '../../business/useCases/authorizer/generatePolicyUseCase'
import { AuthorizerUseCase } from '../../business/useCases/authorizer/authorizerUseCase'


export const UseCasesModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(CreateUserIdentityUseCase).toSelf()
  bind(SignInUseCase).toSelf()
  bind(GeneratePolicyUserCase).toSelf()
  bind(AuthorizerUseCase).toSelf()
})
