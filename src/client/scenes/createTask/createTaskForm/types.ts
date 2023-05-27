import { Task } from "@todo-list/dto";

interface Props {
  setTask(task: Task): void;
  task: Task;
}

export { Props };
