import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useGetUser } from "@todo-list/view-models";
import styles from "./styles.module.scss";
import { Props } from "./type.ts";

function Home(_: Props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    user,
    getUser,
    isRequestFailure,
    isRequestPending,
    isRequestSuccess,
  } = useGetUser();
  const goToProfile = () => {
    navigate("/profile");
  };

  useEffect(() => {
    getUser({
      accessToken: localStorage.getItem("pad-todolist-userToken") ?? "",
      id: localStorage.getItem("pad-todolist-userId") ?? "",
    });
  }, []);

  return (
    <div className={styles.home}>
      <p>{t("homePage.title")}</p>
      {isRequestSuccess && <div>{user.nickName}</div>}
      {isRequestFailure && <div>{isRequestFailure.message}</div>}
      {isRequestPending && <div>loading...</div>}
      <button onClick={goToProfile}>profile</button>
    </div>
  );
}

export { Home };
