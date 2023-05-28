import { useTranslation } from "react-i18next";

import { RedirectionButton } from "./redirectionButton";
import { Props } from "./types.ts";
import styles from "./styles.module.scss";

function Title(_: Props) {
  const { t } = useTranslation();

  const redirectEmail = (email: string) => {
    const encodedEmail = encodeURIComponent(email);
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodedEmail}`;
  };

  return (
    <div className={styles.title}>
      <h1>{t("landingPage.title")}</h1>
      <div className={styles.body}>
        <div className={styles.redirectButtonBox}>
          <RedirectionButton />
        </div>
        <h3 className={styles.presentation}>
          {t("landingPage.presentation.title")}
        </h3>
        <div className={styles.links}>
          <a
            className={styles.link}
            href={redirectEmail(t("landingPage.presentation.mail"))}
            target="_blank"
          >
            {t("landingPage.presentation.mail")}
          </a>
          <a
            className={styles.link}
            href={t("landingPage.presentation.githubContent") ?? ""}
            target="_blank"
          >
            {t("landingPage.presentation.githubTitle")}
          </a>
          <a
            className={styles.link}
            href={t("landingPage.presentation.linkedinContent") ?? ""}
            target="_blank"
          >
            {t("landingPage.presentation.linkedinTitle")}
          </a>
        </div>
      </div>
    </div>
  );
}

export { Title };
