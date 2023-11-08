import 'reflect-metadata'
import '../../ioc/inversify.config'
import { APIGatewayProxyEvent, Context } from 'aws-lambda'

import { httpResponse } from '../../utility/httpResponse'
import { httpHandler } from '../../utility/httpHandler'
import { container } from '../../shared/ioc/container'
import { InputSignIn } from '../../../controller/serializers/users/inputSignIn'
import { SignInOperator } from '../../../controller/operators/users/signInOperator'

export const handler = httpHandler(async (event: APIGatewayProxyEvent, context: Context) => {
  context.callbackWaitsForEmptyEventLoop = false

  const operator = container.get(SignInOperator)
  const body = JSON.parse(event?.body as string)
  const input = new InputSignIn(body)
  const result = await operator.exec(input)

  if (result.isLeft()) {
    return httpResponse.badRequest(result.value)
  }

  return httpResponse.ok(result.value)
})
