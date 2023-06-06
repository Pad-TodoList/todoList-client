import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { useGetUser, useGetUserTasks } from "@todo-list/view-models";
import { getAccessToken } from "@todo-list/utils/getAccessToken.ts";
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
    user,
    getUser,
    isRequestFailure,
    isRequestPending,
    isRequestSuccess,
  } = useGetUser();

  const {
    tasks,
    getUserTasks,
    isRequestPending: isRequestTasksPending,
  } = useGetUserTasks();

  useEffect(() => {
    getUser(getAccessToken());
    getUserTasks(getAccessToken());
    isRequestSuccess && setAccount(user);
  }, []);

  return (
    <div className={styles.home}>
      {isRequestFailure.message && (
        <ErrorBanner message={isRequestFailure.message} />
      )}
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
