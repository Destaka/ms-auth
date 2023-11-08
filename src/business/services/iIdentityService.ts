import { ICreateUserIdentityResponseDto } from "../dto/users/createUserIdentityDto"
import { Either } from "../../framework/shared/either"
import { IError } from "../../framework/shared/iError"
import { AuthorizerDto } from "../dto/authorizer/authorizerDto"
import { ISignResponse, InputSignInDto } from "../dto/users/signInDto"

export const IIdentityServiceToken = Symbol.for('IIdentityService')

export type IDataIdentityService = {
  email: string
  password: string
  userId: string
  name: string
}

export interface IIdentityService {
  create(data: IDataIdentityService): Promise<Either<IError, ICreateUserIdentityResponseDto>>
  consultUser(token: string): Promise<Either<IError, AuthorizerDto>>
  auth(data: InputSignInDto): Promise<Either<IError, ISignResponse>>
}
