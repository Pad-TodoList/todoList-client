import { useTranslation } from "react-i18next";

import { useWrapperContext } from "@app/wrapper/wrapper.tsx";
import { UseCases } from "@app/wrapper/type.ts";
import { Props } from "./type.ts";
import styles from "./styles.module.scss";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";

function Login(_: Props) {
  const { pushView } = useWrapperContext();
  const navigation = useNavigate();
  const { t } = useTranslation();
  const login = () => {
    pushView({ useCase: UseCases.Login, data: {} });
  };

  const register = () => {
    pushView({
      useCase: UseCases.Register,
      data: {},
    });
  };

  const redirectToLandingPage = () => {
    navigation("/");
  };

  return (
    <div className={styles.login}>
      <div className={styles.title}>
        <h1>{t("loginPage.title")}</h1>
      </div>
      <div className={styles.body}>
        <button
          className={classNames(styles.button, styles.left)}
          onClick={login}
        >
          {t("loginPage.login")}
        </button>
        <button
          className={classNames(styles.button, styles.right)}
          onClick={register}
        >
          {t("loginPage.register")}
        </button>
      </div>
      <div className={styles.bottom}>
        <div onClick={redirectToLandingPage} className={styles.redirectButton}>
          {t("loginPage.landingPage")}
        </div>
      </div>
    </div>
  );
}

export { Login };
