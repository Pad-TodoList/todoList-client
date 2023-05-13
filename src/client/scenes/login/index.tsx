import { Props } from "./type.ts";
import styles from "./styles.module.scss";

function Login(props: Props) {
  const login = () => {
    localStorage.setItem("pad-todolist-userId", "id");
    localStorage.setItem("pad-todolist-userToken", "token");
    window.location.reload();
  };

  return (
    <div className={styles.login}>
      <p>{props.name}</p>
      <button onClick={login}>login</button>
    </div>
  );
}

export { Login };
