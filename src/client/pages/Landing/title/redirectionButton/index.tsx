import { Props } from "./types.ts";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function RedirectionButton(_: Props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const redirection = () => {
    const path = `login`;
    navigate(path);
  };

  return (
    <div className={styles.redirectionButton} onClick={redirection}>
      <h2>{t("landingPage.redirection")}</h2>
    </div>
  );
}

export { RedirectionButton };
