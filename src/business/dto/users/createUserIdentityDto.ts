import { Either } from "../../../framework/shared/either"
import { IError } from "../../../framework/shared/iError"

export interface InputCreateUserIdentityDto {
  email: string
  password: string
  userId: string
  name: string
}

export interface ICreateUserIdentityResponseDto {
  email: string
  enabled: boolean
}

export type OutputCreateUserIdentityDto = Either<IError, ICreateUserIdentityResponseDto>
