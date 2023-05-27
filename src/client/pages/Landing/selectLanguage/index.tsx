import i18n from "i18next";

import { DropDown } from "@common/dropDown";
import { Props } from "./types.ts";
import styles from "./styles.module.scss";

function SelectLanguage(_: Props) {
  const changeLanguage = (lng: string | undefined) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("pad-todolist-language", lng ?? "");
  };

  return (
    <div className={styles.selectLanguage}>
      <DropDown
        button={() => <div>button</div>}
        list={() => (
          <div>
            <button onClick={() => changeLanguage("fr")}>fr</button>
            <button onClick={() => changeLanguage("en")}>en</button>
          </div>
        )}
      />
    </div>
  );
}

export { SelectLanguage };
