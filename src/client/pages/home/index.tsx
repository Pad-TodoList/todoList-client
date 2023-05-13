import { Props } from "./type.ts";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";

function Home(_: Props) {
  const navigate = useNavigate();
  const goToProfile = () => {
    navigate("/profile");
  };

  return (
    <div className={styles.login}>
      Home page
      <button onClick={goToProfile}>profile</button>
    </div>
  );
}

export { Home };
