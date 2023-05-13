import { Props } from "./type.ts";
import styles from "./styles.module.scss";

function Login(props: Props) {
  return (
    <div className={styles.login}>
      <p>{props.name}</p>
    </div>
  );
}

export { Login };
