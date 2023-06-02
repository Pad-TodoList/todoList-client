import { useTranslation } from "react-i18next";

import styles from "./styles.module.scss";

function ErrorServer() {
  const { t } = useTranslation();
  return (
    <div className={styles.errorServer}>
      <h2>{t("landingPage.errorServer")}</h2>
    </div>
  );
}

export { ErrorServer };
