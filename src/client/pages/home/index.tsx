import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { getAccessToken } from "@todo-list/utils/getAccessToken.ts";
import { useUserRetrieval, useGetUserTasks } from "@todo-list/view-models";
import { useUserContext } from "@components/accountContext";
import { ErrorBanner } from "@components/errorBanner";
import { Loader } from "@common/loader";
import { TaskList } from "./taskList";
import { Props } from "./type";
import styles from "./styles.module.scss";

function Home(_: Props) {
  const { t } = useTranslation();
  const { setAccount } = useUserContext();
  const time = new Date().getHours();
  const {
    isRequestPending,
    isRequestFailure,
    isRequestSuccess,
    user,
    retrieveUser,
  } = useUserRetrieval({
    accessToken: localStorage.getItem("pad-todolist-userToken") ?? "",
    id: localStorage.getItem("pad-todolist-userId") ?? "",
  });

  const {
    tasks,
    getUserTasks,
    isRequestPending: isRequestTasksPending,
  } = useGetUserTasks();

  useEffect(() => {
    retrieveUser(getAccessToken());
    getUserTasks(getAccessToken());
    isRequestSuccess && setAccount(user);
  }, []);

  return (
    <div className={styles.home}>
      {isRequestFailure && <ErrorBanner message={t("homePage.errorUser")} />}
      {isRequestPending ? (
        <div className={styles.loader}>
          <Loader />
        </div>
      ) : (
        <div className={styles.body}>
          <h1 className={styles.title}>
            {time < 18 && time > 4
              ? t("homePage.titleDay")
              : t("homePage.titleNight")}
            {user.nickName}
          </h1>
          {isRequestTasksPending ? <Loader /> : <TaskList tasks={tasks} />}
        </div>
      )}
    </div>
  );
}

export { Home };
