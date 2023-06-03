import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Task, taskStatuses } from "@todo-list/dto";
import { useCreateTask } from "@todo-list/view-models";
import { getAccessToken } from "@todo-list/utils/getAccessToken.ts";
import { Loader } from "@common/loader";
import { CloseIcon } from "@common/assets/closeIcon";
import { CallToActionButton } from "@common/CallToActionButton";
import { CtaType } from "@common/CallToActionButton/types.ts";
import { CreateTaskForm } from "./createTaskForm";
import { Props } from "./type.ts";
import styles from "./styles.module.scss";

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
  const { createTask, isRequestPending, isRequestSuccess } = useCreateTask();

  useEffect(() => close, [isRequestSuccess]);

  return (
    <div className={styles.createTask}>
      {isRequestPending ? (
        <div className={styles.loader}>
          <Loader />
        </div>
      ) : (
        <div>
          <div className={styles.header}>
            <h2>{t("createTask.title")}</h2>
            <div className={styles.closeIconBox} onClick={props.close}>
              <CloseIcon className={styles.closeIcon} />
            </div>
          </div>
          <form
            className={styles.body}
            onSubmit={() => {
              createTask(tokens, task);
              props.close();
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
        </div>
      )}
    </div>
  );
}

export { CreateTask };
