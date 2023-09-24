import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { RegisterForm } from "./registerForm";
import { Props } from "./type.ts";
import styles from "./styles.module.scss";
import { CloseIcon } from "@common/assets/closeIcon";
import { Loader } from "@common/loader";
import { CallToActionButton } from "@common/CallToActionButton";
import { CtaType } from "@common/CallToActionButton/types.ts";
import { ErrorBanner } from "@components/errorBanner";
import { User } from "../../../todoList-client-core/src/dto/user.ts";
import { useRegister } from "../../../todoList-client-core/src/viewModels/register.ts";

function Register(props: Props) {
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
    register,
    isRequestPending,
    isRequestSuccess,
    isRequestFailure,
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
      <div className={styles.header}>
        <h2>{t("register.title")}</h2>
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
        <form onSubmit={() => register(user)} className={styles.body}>
          <RegisterForm setUser={setUser} user={user} />
          <div className={styles.buttons}>
            <CallToActionButton
              placeholder={t("register.cancel")}
              type={CtaType.cancel}
              onAction={props.close}
            />
            <CallToActionButton
              placeholder={t("register.submit")}
              onAction={() => {}}
            />
          </div>
        </form>
      )}
    </div>
  );
}

export { Register };
