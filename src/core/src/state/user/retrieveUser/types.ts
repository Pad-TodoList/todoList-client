import { Identifiable, User, Tokens } from "@todo-list/dto";
import { RequestState } from "../../types/requestState";

type Request = {
  request: RequestState;
  user: Identifiable<User>;
  tokens: Tokens;
};

type State = Request[];

interface Selector {
  isUserRetrievalRequestPending(tokens: Tokens): boolean;
  isUserRetrievalRequestSuccess(tokens: Tokens): boolean;
  isUserRetrievalRequestFailure(tokens: Tokens): boolean;
  getUser(tokens: Tokens): Identifiable<User>;
}

export { State, Selector };
