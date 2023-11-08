import { IError } from "../../../framework/shared/iError"

export const FailedToGeneratePolicies: IError = {
  code: 'GPF-001',
  message: 'Failed to generate policies',
  shortMessage: 'FailedToGeneratePolicies'
}

export const UserIdentityIsNotValid: IError = {
  code: 'UAT-001',
  message: 'User identity is not valid',
  shortMessage: 'UserIdentityIsNotValid'
}
