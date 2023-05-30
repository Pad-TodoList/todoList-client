import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { Identifiable, Task } from "@todo-list/dto";
import { RetrieveTaskForm } from "./retrieveTaskForm";
import { Props } from "./type.ts";
import styles from "./styles.module.scss";
import { useDeleteTask } from "@todo-list/view-models";
import { getAccessToken } from "@todo-list/utils/getAccessToken.ts";

function RetrieveTask(props: Props) {
  const { t } = useTranslation();
  const tokens = getAccessToken();
  const [task, setTask] = useState<Identifiable<Task>>(props.task);
  const { isRequestPending, isRequestSuccess, deleteTask } = useDeleteTask();

  React.useEffect(() => {
    isRequestSuccess && props.close();
  }, [isRequestSuccess]);
  return (
    <div className={styles.retrieveTask}>
      {isRequestPending ? (
        <div>loading...</div>
      ) : (
        <div>
          <h1>Task</h1>
          <RetrieveTaskForm setTask={setTask} task={task} />
          <button onClick={props.close}>{t("register.cancel")}</button>
          <button onClick={() => deleteTask(tokens, props.task.uuid)}>
            supprimer
          </button>
          <button onClick={() => {}}>modifier</button>
        </div>
      )}
    </div>
  );
}

export { RetrieveTask };
