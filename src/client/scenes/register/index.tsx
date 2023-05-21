import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { useRegister } from "@todo-list/view-models";
import { User } from "@todo-list/dto";
import { RegisterForm } from "./registerForm";
import { Props } from "./type.ts";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";

function Register(props: Props) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [user, setUser] = useState<User>({
    email: "",
    firstName: "",
    lastName: "",
    nickName: "",
    password: "",
  });
  const {
    register,
    isRequestFailure,
    isRequestPending,
    isRequestSuccess,
    tokens,
  } = useRegister();

  React.useEffect(() => {
    if (isRequestSuccess) {
      localStorage.setItem("pad-todolist-userId", tokens.id);
      localStorage.setItem("pad-todolist-userToken", tokens.accessToken);
      navigate("/");
      window.location.reload();
    }
  }, [isRequestSuccess]);

  return (
    <div className={styles.register}>
      {isRequestPending ? (
        <div>loading...</div>
      ) : (
        <div>
          <h1>{t("register.title")}</h1>
          <RegisterForm setUser={setUser} user={user} />
          <button onClick={props.close}>{t("register.cancel")}</button>
          <button onClick={() => register(user)}>{t("register.send")}</button>
          {isRequestFailure && <p>{isRequestFailure.message}</p>}
        </div>
      )}
    </div>
  );
}

export { Register };
