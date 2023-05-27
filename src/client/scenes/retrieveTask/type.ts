import { Identifiable, Task } from "@todo-list/dto";

interface Props {
  close(): void;
  task: Identifiable<Task>;
}

export { Props };
