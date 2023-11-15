import { Identifiable, Tokens, User } from "../../../dto/main";

interface Repository {
  getUser(accessTokens: Tokens): Promise<Identifiable<User>>;
}

export { Repository };
