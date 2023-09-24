import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Loader } from "@common/loader";
import { CloseIcon } from "@common/assets/closeIcon";
import { CallToActionButton } from "@common/CallToActionButton";
import { CtaType } from "@common/CallToActionButton/types.ts";
import { CreateTaskForm } from "./createTaskForm";
import { Props } from "./type.ts";
import styles from "./styles.module.scss";
import { getAccessToken } from "../../../todoList-client-core/src/utils/getAccessToken.ts";
import {
  Task,
  taskStatuses,
} from "../../../todoList-client-core/src/dto/task.ts";
import { useCreateTask } from "../../../todoList-client-core/src/viewModels/createTasks.ts";

function CreateTask(props: Props) {
  const { t } = useTranslation();
  const tokens = getAccessToken();
  const [task, setTask] = useState<Task>({
    description: "",
    endDate: "",
    name: "",
    startDate: "",
    status: taskStatuses.notStarted,
    userId: tokens.id,
  });
  const {
    createTask,
    isRequestPending,
    isRequestSuccess,
    task: createdTask,
  } = useCreateTask();

  useEffect(() => {
    if (isRequestSuccess) {
      props.addTask(createdTask);
      props.close();
    }
  }, [isRequestSuccess]);

  return (
    <div className={styles.createTask}>
      <div className={styles.header}>
        <h2>{t("createTask.title")}</h2>
        <div className={styles.closeIconBox} onClick={props.close}>
          <CloseIcon className={styles.closeIcon} />
        </div>
      </div>
      {isRequestPending ? (
        <div className={styles.loader}>
          <Loader />
        </div>
      ) : (
        <form
          className={styles.body}
          onSubmit={() => {
            createTask(tokens, task);
          }}
        >
          <CreateTaskForm setTask={setTask} task={task} />
          <div className={styles.buttons}>
            <CallToActionButton
              placeholder={t("createTask.cancel")}
              type={CtaType.cancel}
              onAction={props.close}
            />
            <CallToActionButton
              placeholder={t("createTask.submit")}
              onAction={() => {}}
            />
          </div>
        </form>
      )}
    </div>
  );
}

export { CreateTask };
