import { useWrapperContext } from "./wrapper";
import { Register } from "@scenes/register";
import { Login } from "@scenes/login";
import { UseCases, ViewModels } from "./type";
import styles from "./styles.module.scss";

function Wrapper() {
  const { view, pushView } = useWrapperContext();

  const close = () => {
    pushView({ useCase: UseCases.None, data: null });
  };

  const modals = {
    [UseCases.Register]: ({
      email,
      password,
    }: ViewModels[UseCases.Register]) => (
      <Register email={email} password={password} close={close} />
    ),
    [UseCases.Login]: ({ name }: ViewModels[UseCases.Login]) => (
      <Login name={name} close={close} />
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
