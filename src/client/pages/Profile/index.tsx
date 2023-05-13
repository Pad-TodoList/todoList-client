import i18n from "i18next";

import { Props } from "./type.ts";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";

function Profile(_: Props) {
  const navigate = useNavigate();
  const disconnection = () => {
    localStorage.removeItem("pad-todolist-userId");
    localStorage.removeItem("pad-todolist-userToken");
    window.location.reload();
  };

  const changeLanguage = (lng: string | undefined) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className={styles.login}>
      Profile page
      <button onClick={() => changeLanguage("fr")}>fr</button>
      <button onClick={() => changeLanguage("en")}>en</button>
      <button onClick={() => navigate("/")}>back</button>
      <button onClick={disconnection}>disconnection</button>
    </div>
  );
}

export { Profile };
