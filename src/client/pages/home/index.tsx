import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useGetUser, useGetUserTasks } from "@todo-list/view-models";
import styles from "./styles.module.scss";
import { Props } from "./type.ts";
import { getAccessToken } from "@todo-list/utils/getAccessToken.ts";
import { useWrapperContext } from "@app/wrapper/wrapper.tsx";
import { UseCases } from "@app/wrapper/type.ts";
import { useUserContext } from "../../components/accountContext";

function Home(_: Props) {
  const { t } = useTranslation();
  const { setAccount } = useUserContext();
  const { pushView } = useWrapperContext();
  const navigate = useNavigate();
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
      <p>{t("homePage.title")}</p>
      {isRequestSuccess && <div>{user.nickName}</div>}
      {isRequestFailure && <div>{isRequestFailure.message}</div>}
      {isRequestPending && <div>loading...</div>}
      {isRequestTasksPending ? (
        <div>tasks loading...</div>
      ) : (
        <div>
          {tasks.map((task) => (
            <div
              onClick={() =>
                pushView({ data: { task }, useCase: UseCases.RetrieveTask })
              }
              key={task.uuid}
            >
              {task.name}
            </div>
          ))}
        </div>
      )}
      <button
        onClick={() => pushView({ data: {}, useCase: UseCases.CreateTask })}
      >
        create task
      </button>
      <button onClick={goToProfile}>profile</button>
    </div>
  );
}

export { Home };
