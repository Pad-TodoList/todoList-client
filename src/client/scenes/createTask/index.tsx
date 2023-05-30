import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Task } from "@todo-list/dto";
import { CreateTaskForm } from "./createTaskForm";
import { Props } from "./type.ts";
import styles from "./styles.module.scss";
import { useCreateTask } from "@todo-list/view-models";
import { getAccessToken } from "@todo-list/utils/getAccessToken.ts";

function CreateTask(props: Props) {
  const { t } = useTranslation();
  const tokens = getAccessToken();
  const [task, setTask] = useState<Task>({
    description: "",
    endDate: "",
    name: "",
    startDate: "",
    status: "",
    userId: tokens.id,
  });
  const { createTask, isRequestPending, isRequestSuccess } = useCreateTask();

  useEffect(() => close, [isRequestSuccess]);

  return (
    <div className={styles.createTask}>
      {isRequestPending ? (
        <div>loading...</div>
      ) : (
        <div>
          <h1>Create task</h1>
          <CreateTaskForm setTask={setTask} task={task} />
          <button onClick={props.close}>{t("register.cancel")}</button>
          <button onClick={() => createTask(tokens, task)}>
            {t("register.send")}
          </button>
        </div>
      )}
    </div>
  );
}

export { CreateTask };
