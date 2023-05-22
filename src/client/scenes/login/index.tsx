import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { User } from "@todo-list/dto";
import { useLogin } from "@todo-list/view-models";
import { LoginForm } from "./loginForm";
import { Props } from "./type.ts";
import styles from "./styles.module.scss";

function Login(props: Props) {
  const { t } = useTranslation();
  const [user, setUser] = useState<User>({
    email: "",
    firstName: "",
    lastName: "",
    nickName: "",
    password: "",
  });
  const {
    login,
    isRequestFailure,
    isRequestPending,
    isRequestSuccess,
    tokens,
  } = useLogin();

  React.useEffect(() => {
    if (isRequestSuccess) {
      localStorage.setItem("pad-todolist-userId", tokens.id);
      localStorage.setItem("pad-todolist-userToken", tokens.accessToken);
      window.location.reload();
    }
  }, [isRequestSuccess]);

  return (
    <div className={styles.login}>
      {isRequestPending ? (
        <div>loading...</div>
      ) : (
        <div>
          <h1>{t("login.title")}</h1>
          <LoginForm setUser={setUser} user={user} />
          <button onClick={props.close}>{t("login.cancel")}</button>
          <button onClick={() => login(user)}>{t("login.send")}</button>
          {isRequestFailure && <p>{isRequestFailure.message}</p>}
        </div>
      )}
    </div>
  );
}

export { Login };
