import { useTranslation } from "react-i18next";

import { Props } from "./types.ts";
import styles from "./styles.module.scss";

function LoginForm({ setUser, user }: Props) {
  const { t } = useTranslation();

  return (
    <div className={styles.registerForm}>
      <div>
        <p>{t("login.form.input_one")}</p>
        <input
          type={"email"}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
      </div>
      <div>
        <p>{t("login.form.input_two")}</p>
        <input
          type={"password"}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
      </div>
    </div>
  );
}

export { LoginForm };
