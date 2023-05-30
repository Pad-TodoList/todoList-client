import { Identifiable, Task } from "@todo-list/dto";

interface Props {
  setTask(task: Identifiable<Task>): void;
  task: Identifiable<Task>;
}

export { Props };
