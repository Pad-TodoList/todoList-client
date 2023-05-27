import { Identifiable, Task, User } from "@todo-list/dto";

enum UseCases {
  None,
  Register,
  Login,
  DeleteUser,
  CreateTask,
  RetrieveTask,
}

interface ViewModels {
  [UseCases.None]: null;
  [UseCases.Register]: NonNullable<unknown>;
  [UseCases.Login]: NonNullable<unknown>;
  [UseCases.DeleteUser]: { user: Identifiable<User> };
  [UseCases.CreateTask]: NonNullable<unknown>;
  [UseCases.RetrieveTask]: { task: Identifiable<Task> };
}

export { UseCases, ViewModels };
