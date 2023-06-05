import { Identifiable, Task } from "@todo-list/dto";

interface Props {
  close(): void;
  addTask(task: Identifiable<Task>): void;
}

export { Props };
