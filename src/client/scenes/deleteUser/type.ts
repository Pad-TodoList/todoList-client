import { Identifiable, User } from "@todo-list/dto";

interface Props {
  user: Identifiable<User>;
  close(): void;
}

export { Props };
