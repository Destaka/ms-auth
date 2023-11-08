import { Either } from "../../../framework/shared/either"
import { IError } from "../../../framework/shared/iError"

export interface InputSignInDto {
  email: string
  password: string
}

export interface ISignResponse {
  token: string
  refreshToken: string
  expiresIn: number
  user_id?: string
}

export type OutputSignInDto = Either<IError, ISignResponse>
