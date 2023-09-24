import { useTranslation } from "react-i18next";

import { TextInput } from "@common/textInput";
import { Props } from "./types.ts";
import styles from "./styles.module.scss";

function RegisterForm({ setUser, user }: Props) {
  const { t } = useTranslation();

  return (
    <div className={styles.registerForm}>
      <div className={styles.inputBox}>
        <p>{t("register.form.input_one")}</p>
        <TextInput
          value={user.nickName}
          setValue={(value) => setUser({ ...user, nickName: value })}
        />
      </div>
      <div className={styles.inputBox}>
        <p>{t("register.form.input_two")}</p>
        <TextInput
          value={user.firstName}
          setValue={(value) => setUser({ ...user, firstName: value })}
        />
      </div>
      <div className={styles.inputBox}>
        <p>{t("register.form.input_three")}</p>
        <TextInput
          value={user.lastName}
          setValue={(value) => setUser({ ...user, lastName: value })}
        />
      </div>
      <div className={styles.inputBox}>
        <p>{t("register.form.input_four")}</p>
        <TextInput
          value={user.email}
          setValue={(value) => setUser({ ...user, email: value })}
        />
      </div>
      <div className={styles.inputBox}>
        <p>{t("register.form.input_five")}</p>
        <TextInput
          value={user.password}
          type={"password"}
          setValue={(value) => setUser({ ...user, password: value })}
        />
      </div>
    </div>
  );
}

export { RegisterForm };
