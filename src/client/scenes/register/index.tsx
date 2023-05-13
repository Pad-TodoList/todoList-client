import { Props } from "./type.ts";
import styles from "./styles.module.scss";

function Register(props: Props) {
  const register = () => {
    localStorage.setItem("pad-todolist-userId", "id");
    localStorage.setItem("pad-todolist-userToken", "token");
    window.location.reload();
  };
  return (
    <div className={styles.register}>
      <p>{props.email}</p>
      <p>{props.password}</p>
      <button onClick={register}>register</button>
    </div>
  );
}

export { Register };
