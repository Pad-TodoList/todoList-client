import { Identifiable, Task } from "@todo-list/dto";

interface Props {
  task: Identifiable<Task>;
  targetList: "notStarted" | "inProgress" | "finish" | null;
  tasks: Identifiable<Task>[];
  setTasks(tasks: Identifiable<Task>[]): void;
  setTargetList(val: "notStarted" | "inProgress" | "finish" | null): void;
}

export { Props };
