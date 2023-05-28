import i18n from "i18next";
import { useTranslation } from "react-i18next";

import { DropDown } from "@common/dropDown";
import { GlobeIcon } from "@common/assets/globeIcon";
import { FrenchFlagIcon } from "@common/assets/frenchFlagIcon";
import { EnglishFlagIcon } from "@common/assets/englishFlagIcon";
import { Props } from "./types.ts";
import styles from "./styles.module.scss";

function SelectLanguage(_: Props) {
  const { t } = useTranslation();
  const changeLanguage = (lng: string | undefined) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("pad-todolist-language", lng ?? "");
  };

  return (
    <div className={styles.selectLanguage}>
      <DropDown
        button={() => (
          <div className={styles.button}>
            <GlobeIcon className={styles.icon} />
            {t("landingPage.selectLanguage.title")}
          </div>
        )}
        list={() => (
          <div className={styles.list}>
            <div
              className={styles.language}
              onClick={() => changeLanguage("fr")}
            >
              <FrenchFlagIcon className={styles.frenchFlagIcon} />
              <p>{t("landingPage.selectLanguage.french")}</p>
            </div>
            <div
              className={styles.language}
              onClick={() => changeLanguage("en")}
            >
              <EnglishFlagIcon className={styles.englishFlagIcon} />
              <p>{t("landingPage.selectLanguage.english")}</p>
            </div>
          </div>
        )}
      />
    </div>
  );
}

export { SelectLanguage };
