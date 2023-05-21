import { Props } from "./types.ts";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { RedirectionButton } from "./redirectionButton";

function Title(_: Props) {
  const { t } = useTranslation();

  return (
    <div className={styles.title}>
      <h1>{t("landingPage.title")}</h1>
      <RedirectionButton />
    </div>
  );
}

export { Title };
