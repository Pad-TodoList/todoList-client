import { Props } from "./type.ts";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";

function Login(_: Props) {
  const navigate = useNavigate();
  const login = () => {
    localStorage.setItem("pad-todolist-userId", "id");
    localStorage.setItem("pad-todolist-userToken", "token");
    window.location.reload();
    navigate("/");
  };

  return (
    <div className={styles.login}>
      login
      <button onClick={login}>login</button>
      <button onClick={login}>register</button>
    </div>
  );
}

export { Login };
