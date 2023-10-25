import { ICreateUserIdentityResponseDto } from "../dto/users/createUserIdentityDto"
import { Either } from "../../framework/shared/either"
import { IError } from "../../framework/shared/iError"

export const IIdentityServiceToken = Symbol.for('IIdentityService')

export type IDataIdentityService = {
  email: string
  password: string
  userId: string
  name: string
}


export interface IIdentityService {
  create(data: IDataIdentityService): Promise<Either<IError, ICreateUserIdentityResponseDto>>
}
