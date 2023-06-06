import { Identifiable, Task } from "@todo-list/dto";

interface Props {
  task: Identifiable<Task>;
  taskList: Identifiable<Task>[];
  setTaskList(tasks: Identifiable<Task>[]): void;
  close(): void;
}

export { Props };
