enum taskStatuses {
  notStarted = "notStarted",
  inProgress = "inProgress",
  finish = "finish",
}

type Task = {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: taskStatuses;
  userId: string;
};

const task: Task = {
  name: "",
  description: "",
  startDate: "",
  endDate: "",
  status: taskStatuses.notStarted,
  userId: "",
};

export { Task, task, taskStatuses };
