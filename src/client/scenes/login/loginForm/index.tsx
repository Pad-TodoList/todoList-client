import { useTranslation } from "react-i18next";

import { TextInput } from "@common/textInput";
import { Props } from "./types.ts";
import styles from "./styles.module.scss";

function LoginForm({ setUser, user }: Props) {
  const { t } = useTranslation();

  return (
    <div className={styles.loginForm}>
      <div className={styles.inputBox}>
        <p>{t("login.form.input_one")}</p>
        <TextInput
          value={user.email}
          setValue={(value) => setUser({ ...user, email: value })}
        />
      </div>
      <div className={styles.inputBox}>
        <p>{t("login.form.input_two")}</p>
        <TextInput
          value={user.password}
          setValue={(value) => setUser({ ...user, password: value })}
          type={"password"}
        />
      </div>
    </div>
  );
}

export { LoginForm };
