import { useTranslation } from "react-i18next";

import { useWrapperContext } from "@app/wrapper/wrapper.tsx";
import { UseCases } from "@app/wrapper/type.ts";
import { Props } from "./type.ts";
import styles from "./styles.module.scss";

function Login(_: Props) {
  const { pushView } = useWrapperContext();
  const { t } = useTranslation();
  const login = () => {
    pushView({ useCase: UseCases.Login, data: { name: "Pad" } });
  };

  const register = () => {
    pushView({
      useCase: UseCases.Register,
      data: { email: "email", password: "password" },
    });
  };

  return (
    <div className={styles.login}>
      <div className={styles.title}>
        <h1>{t("loginPage.title")}</h1>
      </div>
      <div className={styles.buttons}>
        <button onClick={login}>{t("loginPage.login")}</button>
        <button onClick={register}>{t("loginPage.register")}</button>
      </div>
    </div>
  );
}

export { Login };
