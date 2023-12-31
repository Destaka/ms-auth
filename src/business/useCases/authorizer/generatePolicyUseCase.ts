import { injectable } from 'inversify'

import { IUseCase } from '../iUseCase'
import { InputGeneratePolicyDto, OutputGeneratePolicyDto } from '../../dto/authorizer/policyDto'
import { left, right } from '../../../framework/shared/either'
import { FailedToGeneratePolicies } from '../../modules/errors/authorizerErrors'

@injectable()
export class GeneratePolicyUserCase implements IUseCase<InputGeneratePolicyDto, OutputGeneratePolicyDto> {
  async exec(input: InputGeneratePolicyDto): Promise<OutputGeneratePolicyDto> {
    try {
      const statements = [
        {
          Action: 'execute-api:Invoke',
          Effect: input.username ? 'Allow' : 'Deny',
          Resource: 'arn:aws:execute-api:us-east-1:*:*'
        }
      ]

      const policy = {
        principalId: input.username,
        policyDocument: {
          Version: '2012-10-17',
          Statement: statements,
        },
        ...(input.username && {
          context: {
            accessToken: input.token,
            ...(input.userId && { userId: input.userId }),
          },
        })
      }

      return right(policy)
    } catch (error) {
      console.log('GeneratePoliceUserCase::error => ', error)

      return left(FailedToGeneratePolicies)
    }
  }
}
