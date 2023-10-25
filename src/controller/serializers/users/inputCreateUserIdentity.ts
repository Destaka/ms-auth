import { IsNotEmpty, IsString, IsUUID } from 'class-validator'

import { Validatable } from '../abstractValidatable'
import { Either } from '../../../framework/shared/either'
import { IError } from '../../../framework/shared/iError'

export class InputCreateUserIdentity extends Validatable<InputCreateUserIdentity> {
  @IsNotEmpty()
  @IsString()
  email!: string

  @IsNotEmpty()
  @IsString()
  password!: string

  @IsNotEmpty()
  @IsUUID()
  userId!: string

  @IsNotEmpty()
  @IsString()
  name!: string
}

export type OutputCreateUserIdentity = Either<IError, any>
