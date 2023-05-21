import { Identifiable, User } from "@todo-list/dto";

enum UseCases {
  None,
  Register,
  Login,
  DeleteUser,
}

interface ViewModels {
  [UseCases.None]: null;
  [UseCases.Register]: {};
  [UseCases.Login]: {};
  [UseCases.DeleteUser]: { user: Identifiable<User> };
}

export { UseCases, ViewModels };
