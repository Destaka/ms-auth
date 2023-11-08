import { Either } from "../../../framework/shared/either";
import { IError } from "../../../framework/shared/iError";

export interface InputGeneratePolicyDto {
  username: string,
  userId?: string
  token: string
}

export interface PolicyDto {
  userId?: string | undefined;
  accessToken?: string | undefined;
  principalId: string;
  policyDocument: {
    Version: string;
    Statement: {
      Action: string;
      Effect: string;
      Resource: string;
    }[];
  };
}

export type OutputGeneratePolicyDto = Either<IError, PolicyDto>
