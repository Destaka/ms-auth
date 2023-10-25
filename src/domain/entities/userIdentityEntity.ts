import { AbstractEntity } from "./abstractEntity"
import { IError } from "../../framework/shared/iError"
import { Either, right } from "../../framework/shared/either"

export interface IUserIdentityEntity {
  email: string
  password: string
  userId: string
  name: string
  createdAt?: Date
  updatedAt?: Date
}

export class UserIdentityEntity extends AbstractEntity<IUserIdentityEntity> {
  static create(props: IUserIdentityEntity): Either<IError, UserIdentityEntity> {
    const user = new UserIdentityEntity({
      ...props,
    })

    return right(user)
  }
}
