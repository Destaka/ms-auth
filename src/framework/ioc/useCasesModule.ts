import { ContainerModule, interfaces } from 'inversify'

import { CreateUserIdentityUseCase } from '../../business/useCases/users/createUserIdentityUseCase'


export const UseCasesModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(CreateUserIdentityUseCase).toSelf()
})
