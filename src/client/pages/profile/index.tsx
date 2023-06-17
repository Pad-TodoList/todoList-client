import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import classNames from "classnames";

import { useGetUser } from "@todo-list/view-models";
import { useWrapperContext } from "@app/wrapper/wrapper.tsx";
import { UseCases } from "@app/wrapper/type.ts";
import { ProfileForm } from "./profileForm";
import { useUserContext } from "../../components/accountContext";
import { Loader } from "@common/loader";
import { SelectLanguage } from "./selectLanguage";
import { Props } from "./type.ts";
import styles from "./styles.module.scss";

function Profile(_: Props) {
  const navigate = useNavigate();
  const { pushView } = useWrapperContext();
  const { account, setAccount } = useUserContext();
  const { t } = useTranslation();
  const { user, getUser, isRequestPending } = useGetUser();
  const disconnection = () => {
    localStorage.removeItem("pad-todolist-userId");
    localStorage.removeItem("pad-todolist-userToken");
    navigate("/");
    window.location.reload();
  };

  useEffect(() => {
    !account &&
      getUser({
        accessToken: localStorage.getItem("pad-todolist-userToken") ?? "",
        id: localStorage.getItem("pad-todolist-userId") ?? "",
      });
  }, []);

  setAccount(user);

  return (
    <div className={styles.profile}>
      {isRequestPending ? (
        <div className={styles.loader}>
          <Loader />
        </div>
      ) : (
        <div>
          <div className={styles.title}>
            <h1>{t("profilePage.title")}</h1>
          </div>
          <ProfileForm user={account ? account : user} />
          <div className={styles.buttons}>
            <button className={styles.button} onClick={() => navigate("/")}>
              {t("profilePage.back")}
            </button>
            <button className={styles.button} onClick={disconnection}>
              {t("profilePage.disconnection")}
            </button>
            <button
              className={classNames(styles.button, styles.deleteAccount)}
              onClick={() =>
                pushView({ useCase: UseCases.DeleteUser, data: { user: user } })
              }
            >
              {t("profilePage.deleteAccount")}
            </button>
          </div>
          <SelectLanguage />
        </div>
      )}
    </div>
  );
}

export { Profile };
