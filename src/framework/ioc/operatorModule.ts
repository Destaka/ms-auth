import { ContainerModule, interfaces } from 'inversify'

import { CreateUserIdentityOperator } from '../../controller/operators/users/createUserIdentityOperator'
import { AuthorizerOperator } from '../../controller/operators/authorizer/authorizerOperator'
import { SignInOperator } from '../../controller/operators/users/signInOperator'

export const OperatorModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(CreateUserIdentityOperator).toSelf()
  bind(AuthorizerOperator).toSelf()
  bind(SignInOperator).toSelf()
})
