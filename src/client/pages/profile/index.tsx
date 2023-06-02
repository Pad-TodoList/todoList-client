import { useEffect } from "react";
import i18n from "i18next";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useGetUser } from "@todo-list/view-models";
import { useWrapperContext } from "@app/wrapper/wrapper.tsx";
import { UseCases } from "@app/wrapper/type.ts";
import { ProfileForm } from "./profileForm";
import { Props } from "./type.ts";
import styles from "./styles.module.scss";
import { useUserContext } from "../../components/accountContext";

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

  const changeLanguage = (lng: string | undefined) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("pad-todolist-language", lng ?? "");
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
        <div>loading...</div>
      ) : (
        <div>
          <h1>{t("profilePage.title")}</h1>
          <ProfileForm user={account ?? user} />
          <button onClick={() => changeLanguage("fr")}>fr</button>
          <button onClick={() => changeLanguage("en")}>en</button>
          <button
            onClick={() =>
              pushView({ useCase: UseCases.DeleteUser, data: { user: user } })
            }
          >
            {t("profilePage.deleteAccount")}
          </button>
          <button onClick={() => navigate("/")}>back</button>
          <button onClick={disconnection}>
            {t("profilePage.disconnection")}
          </button>
        </div>
      )}
    </div>
  );
}

export { Profile };
