import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { CloseIcon } from "@common/assets/closeIcon";
import { Loader } from "@common/loader";
import { CallToActionButton } from "@common/CallToActionButton";
import { CtaType } from "@common/CallToActionButton/types.ts";
import { ErrorBanner } from "@components/errorBanner";
import { LoginForm } from "./loginForm";
import { Props } from "./type.ts";
import styles from "./styles.module.scss";
import { User } from "../../../todoList-client-core/src/dto/user.ts";
import { useLogin } from "../../../todoList-client-core/src/viewModels/login.ts";

function Login(props: Props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [user, setUser] = useState<User>({
    email: "",
    firstName: "",
    lastName: "",
    nickName: "",
    password: "",
  });
  const {
    login,
    isRequestPending,
    isRequestSuccess,
    isRequestFailure,
    tokens,
  } = useLogin();

  React.useEffect(() => {
    if (isRequestSuccess) {
      localStorage.setItem("pad-todolist-userId", tokens.id);
      localStorage.setItem("pad-todolist-userToken", tokens.accessToken);
      navigate("/");
      window.location.reload();
    }
  }, [isRequestSuccess]);

  return (
    <div className={styles.login}>
      <div className={styles.header}>
        <h2>{t("login.title")}</h2>
        <div className={styles.closeIconBox} onClick={props.close}>
          <CloseIcon className={styles.closeIcon} />
        </div>
      </div>
      {isRequestFailure.message && (
        <ErrorBanner message={isRequestFailure.message} />
      )}
      {isRequestPending ? (
        <div className={styles.loader}>
          <Loader />
        </div>
      ) : (
        <form onSubmit={() => login(user)} className={styles.body}>
          <LoginForm setUser={setUser} user={user} />
          <div className={styles.buttons}>
            <CallToActionButton
              placeholder={t("login.cancel")}
              type={CtaType.cancel}
              onAction={props.close}
            />
            <CallToActionButton
              placeholder={t("login.submit")}
              onAction={() => {}}
            />
          </div>
        </form>
      )}
    </div>
  );
}

export { Login };
