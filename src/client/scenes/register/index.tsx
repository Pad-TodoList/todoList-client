import { Props } from "./type.ts";
import styles from "./styles.module.scss";

function Register(props: Props) {
  return (
    <div className={styles.register}>
      <p>{props.email}</p>
      <p>{props.password}</p>
    </div>
  );
}

export { Register };
