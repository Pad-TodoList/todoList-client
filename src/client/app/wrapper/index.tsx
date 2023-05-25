import { useWrapperContext } from "./wrapper";
import { Register } from "@scenes/register";
import { Login } from "@scenes/login";
import { DeleteUser } from "@scenes/deleteUser";
import { UseCases, ViewModels } from "./type";
import styles from "./styles.module.scss";
import { CreateTask } from "@scenes/createTask";

function Wrapper() {
  const { view, pushView } = useWrapperContext();

  const close = () => {
    pushView({ useCase: UseCases.None, data: null });
  };

  const modals = {
    [UseCases.Register]: (_: ViewModels[UseCases.Register]) => (
      <Register close={close} />
    ),
    [UseCases.Login]: (_: ViewModels[UseCases.Login]) => (
      <Login close={close} />
    ),
    [UseCases.DeleteUser]: ({ user }: ViewModels[UseCases.DeleteUser]) => (
      <DeleteUser user={user} close={close} />
    ),
    [UseCases.CreateTask]: (_: ViewModels[UseCases.CreateTask]) => (
      <CreateTask close={close} />
    ),
  };

  return (
    <div>
      {view.useCase !== UseCases.None && (
        <div onClick={close} className={styles.modal}>
          <div className={styles.children} onClick={(e) => e.stopPropagation()}>
            {modals[view.useCase](view.data)}
          </div>
        </div>
      )}
    </div>
  );
}

export { Wrapper };
