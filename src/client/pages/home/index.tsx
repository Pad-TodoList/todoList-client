import { Props } from "./type.ts";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Home(_: Props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const goToProfile = () => {
    navigate("/profile");
  };

  return (
    <div className={styles.login}>
      <p>{t("homePage.title")}</p>
      <button onClick={goToProfile}>profile</button>
    </div>
  );
}

export { Home };
