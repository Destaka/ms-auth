import { ValidationError } from 'class-validator'
import { injectable } from 'inversify'

import { Validatable } from '../serializers/abstractValidatable'
import { validationError } from '../../business/modules/errors/validation'

@injectable()
export abstract class AbstractOperator<I, O> {
  protected abstract run(input?: Validatable<I>): Promise<O>

  public async exec(input?: Validatable<I>): Promise<O> {
    try {
      if (input) {
        input.validate()
      }
      return this.run(input)
    } catch (err) {
      if (err instanceof Array && err.length && err[0] instanceof ValidationError) {
        const data = err.map(i => ({
          property: i.property,
          constraints: i.constraints,
        }))
        throw validationError(data)
      }
      throw err
    }
  }
}
