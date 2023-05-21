import { User } from "@todo-list/dto";

interface Props {
  setUser(user: User): void;
  user: User;
}

export { Props };
