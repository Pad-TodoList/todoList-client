import { Identifiable, Task } from "@todo-list/dto";

interface Props {
  task: Identifiable<Task>;
  inProgressTasks: Identifiable<Task>[];
  finishTasks: Identifiable<Task>[];
  notStartedTasks: Identifiable<Task>[];
  setInProgressTasks(tasks: Identifiable<Task>[]): void;
  setFinishTasks(tasks: Identifiable<Task>[]): void;
  setNotStartedTasks(tasks: Identifiable<Task>[]): void;
}

export { Props };
