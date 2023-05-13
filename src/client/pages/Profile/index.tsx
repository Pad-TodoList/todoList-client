import { Props } from "./type.ts";
import styles from "./styles.module.scss";

function Profile(_: Props) {
  const disconnection = () => {
    localStorage.removeItem("pad-todolist-userId");
    localStorage.removeItem("pad-todolist-userToken");
    window.location.reload();
  };

  return (
    <div className={styles.login}>
      Profile page
      <button onClick={disconnection}>disconnection</button>
    </div>
  );
}

export { Profile };
