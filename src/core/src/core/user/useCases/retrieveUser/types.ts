import { Identifiable } from "../../../../dto/identifiable.ts";
import { User } from "../../../../dto/user.ts";
import { Tokens } from "../../../../dto/tokens.ts";

type RetrieveUserRequest = Tokens;
type RetrieveUserSuccess = Identifiable<User>;
type RetrieveUserFailure = Identifiable<User>;

type RetrieveUserInteractor = Interactor<
  RetrieveUserRequest,
  RetrieveUserSuccess,
  RetrieveUserFailure
>;

export type { RetrieveUserInteractor };
