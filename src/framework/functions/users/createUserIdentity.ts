import 'reflect-metadata'
import '../../ioc/inversify.config'
import { APIGatewayProxyEvent, Context } from 'aws-lambda'

import { httpHandler } from '../../utility/httpHandler'
import { container } from '../../shared/ioc/container'
import { httpResponse } from '../../utility/httpResponse'
import { CreateUserIdentityOperator } from '../../../controller/operators/users/createUserIdentityOperator'
import { InputCreateUserIdentity } from '../../../controller/serializers/users/inputCreateUserIdentity'

export const handler = httpHandler(async (event: APIGatewayProxyEvent, context: Context) => {
  context.callbackWaitsForEmptyEventLoop = false
  console.log('Function::Event => ', event)

  const operator = container.get(CreateUserIdentityOperator)
  const input = new InputCreateUserIdentity(event as Object)
  const result = await operator.exec(input)

  if (result.isLeft()) {
    return httpResponse.badRequest(result.value)
  }

  return httpResponse.created(result.value)
})
