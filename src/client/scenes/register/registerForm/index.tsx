import { useTranslation } from "react-i18next";

import { Props } from "./types.ts";
import styles from "./styles.module.scss";

function RegisterForm({ setUser, user }: Props) {
  const { t } = useTranslation();

  return (
    <div className={styles.registerForm}>
      <div>
        <p>{t("register.form.input_one")}</p>
        <input
          onChange={(e) => setUser({ ...user, nickName: e.target.value })}
        />
      </div>
      <div>
        <p>{t("register.form.input_two")}</p>
        <input
          onChange={(e) => setUser({ ...user, firstName: e.target.value })}
        />
      </div>
      <div>
        <p>{t("register.form.input_three")}</p>
        <input
          onChange={(e) => setUser({ ...user, lastName: e.target.value })}
        />
      </div>
      <div>
        <p>{t("register.form.input_four")}</p>
        <input onChange={(e) => setUser({ ...user, email: e.target.value })} />
      </div>
      <div>
        <p>{t("register.form.input_five")}</p>
        <input
          type={"password"}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
      </div>
    </div>
  );
}

export { RegisterForm };
