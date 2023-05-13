import { Props } from "./type.ts";
import styles from "./styles.module.scss";
import { useWrapperContext } from "@app/wrapper/wrapper.tsx";
import { UseCases } from "@app/wrapper/type.ts";

function Login(_: Props) {
  const { pushView } = useWrapperContext();
  const login = () => {
    pushView({ useCase: UseCases.Login, data: { name: "Pad" } });
  };

  const register = () => {
    pushView({
      useCase: UseCases.Register,
      data: { email: "email", password: "password" },
    });
  };

  return (
    <div className={styles.login}>
      login
      <button onClick={login}>login</button>
      <button onClick={register}>register</button>
    </div>
  );
}

export { Login };
