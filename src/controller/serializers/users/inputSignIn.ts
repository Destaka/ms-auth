import { IsNotEmpty, IsString } from 'class-validator'

import { Validatable } from '../abstractValidatable'
import { Either } from '../../../framework/shared/either'
import { IError } from '../../../framework/shared/iError'
import { ISignResponse } from '../../../business/dto/users/signInDto'

export class InputSignIn extends Validatable<InputSignIn> {
  @IsNotEmpty()
  @IsString()
  email!: string

  @IsNotEmpty()
  @IsString()
  password!: string
}

export type OutputSignIn = Either<IError, ISignResponse>
