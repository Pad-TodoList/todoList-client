enum UseCases {
  None,
  Register,
  Login,
}

interface ViewModels {
  [UseCases.None]: null;
  [UseCases.Register]: { email: string; password: string };
  [UseCases.Login]: { name: string };
}

export { UseCases, ViewModels };
