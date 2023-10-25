import { ContainerModule, interfaces } from 'inversify'

import { CreateUserIdentityOperator } from '../../controller/operators/users/createUserIdentityOperator'

export const OperatorModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(CreateUserIdentityOperator).toSelf()
})
