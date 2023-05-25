import { Identifiable, User } from "@todo-list/dto";

enum UseCases {
  None,
  Register,
  Login,
  DeleteUser,
  CreateTask,
}

interface ViewModels {
  [UseCases.None]: null;
  [UseCases.Register]: NonNullable<unknown>;
  [UseCases.Login]: NonNullable<unknown>;
  [UseCases.DeleteUser]: { user: Identifiable<User> };
  [UseCases.CreateTask]: NonNullable<unknown>;
}

export { UseCases, ViewModels };
