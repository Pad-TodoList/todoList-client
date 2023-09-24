import { useState } from "react";
import { useTranslation } from "react-i18next";

import { CloseIcon } from "@common/assets/closeIcon";
import { CallToActionButton } from "@common/CallToActionButton";
import { CtaType } from "@common/CallToActionButton/types.ts";
import { RetrieveTaskForm } from "./retrieveTaskForm";
import { Props } from "./type.ts";
import styles from "./styles.module.scss";
import { getAccessToken } from "../../../todoList-client-core/src/utils/getAccessToken.ts";
import { Identifiable } from "../../../todoList-client-core/src/dto/identifiable.ts";
import { Task } from "../../../todoList-client-core/src/dto/task.ts";
import { useDeleteTask } from "../../../todoList-client-core/src/viewModels/deleteTask.ts";
import { useUpdateTask } from "../../../todoList-client-core/src/viewModels/updateTask.ts";

function RetrieveTask(props: Props) {
  const { t } = useTranslation();
  const tokens = getAccessToken();
  const [task, setTask] = useState<Identifiable<Task>>(props.task);
  const { deleteTask } = useDeleteTask();
  const { updateTask } = useUpdateTask();

  return (
    <div className={styles.retrieveTask}>
      <div className={styles.header}>
        <h2>{props.task.name}</h2>
        <div className={styles.closeIconBox} onClick={props.close}>
          <CloseIcon className={styles.closeIcon} />
        </div>
      </div>
      <form
        className={styles.body}
        onSubmit={() => {
          props.setTaskList(
            props.taskList.map((pad) => (pad.uuid === task.uuid ? task : pad))
          );
          updateTask(task, tokens);
          props.close();
        }}
      >
        <RetrieveTaskForm setTask={setTask} task={task} />
        <div className={styles.buttons}>
          <button
            type={"button"}
            className={styles.button}
            onClick={() => {
              props.setTaskList(
                props.taskList.filter(({ uuid }) => uuid !== task.uuid)
              );
              deleteTask(tokens, props.task.uuid);
              props.close();
            }}
          >
            {t("retrieveTask.delete")}
          </button>
          <div>
            <CallToActionButton
              type={CtaType.cancel}
              placeholder={t("retrieveTask.cancel")}
              onAction={props.close}
            />
            <CallToActionButton
              placeholder={t("retrieveTask.submit")}
              onAction={() => {}}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export { RetrieveTask };
