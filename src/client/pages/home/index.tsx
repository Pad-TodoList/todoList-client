import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useGetUser, useGetUserTasks } from "@todo-list/view-models";
import styles from "./styles.module.scss";
import { Props } from "./type.ts";
import { getAccessToken } from "@todo-list/utils/getAccessToken.ts";
import { useWrapperContext } from "@app/wrapper/wrapper.tsx";
import { UseCases } from "@app/wrapper/type.ts";
import { useUserContext } from "@components/accountContext";
import { ErrorBanner } from "@components/errorBanner";
import { Loader } from "@common/loader";
import { TaskList } from "./taskList";

function Home(_: Props) {
  const { t } = useTranslation();
  const { setAccount } = useUserContext();
  const { pushView } = useWrapperContext();
  const navigate = useNavigate();
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
  const goToProfile = () => {
    navigate("/profile");
  };

  useEffect(() => {
    getUser(getAccessToken());
  }, []);

  useEffect(() => {
    getUserTasks(getAccessToken());
  }, []);

  useEffect(() => {
    isRequestSuccess && setAccount(user);
  }, [isRequestSuccess]);

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
          {isRequestTasksPending ? (
            <div>tasks loading...</div>
          ) : (
            <TaskList tasks={tasks} />
          )}
          <button
            onClick={() => pushView({ data: {}, useCase: UseCases.CreateTask })}
          >
            create task
          </button>
          <button onClick={goToProfile}>profile</button>
        </div>
      )}
    </div>
  );
}

export { Home };
