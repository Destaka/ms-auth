import { Either } from "../../../framework/shared/either"
import { IError } from "../../../framework/shared/iError"

export interface InputAuthorizerDto {
  token: string,
  user_id?: string
}

export interface AuthorizerDto {
  username: string,
  userId: string,
}

export type OutputAuthorizerDto = Either<IError, AuthorizerDto>
