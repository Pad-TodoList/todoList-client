import { useTranslation } from "react-i18next";

import { taskStatuses } from "@todo-list/dto";
import { TextInput } from "@common/textInput";
import { Props } from "./types.ts";
import styles from "./styles.module.scss";

function CreateTaskForm({ setTask, task }: Props) {
  const { t } = useTranslation();

  return (
    <div className={styles.createTaskForm}>
      <div className={styles.inputBox}>
        <p>{t("createTask.form.input_one")}</p>
        <TextInput
          value={task.name}
          setValue={(value) => setTask({ ...task, name: value })}
        />
      </div>
      <div className={styles.inputBox}>
        <p>{t("createTask.form.input_two")}</p>
        <textarea
          className={styles.textArea}
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
        />
      </div>
      <div className={styles.inputBox}>
        <p>{t("createTask.form.input_three")}</p>
        <input
          type={"date"}
          value={task.startDate}
          onChange={(e) => setTask({ ...task, startDate: e.target.value })}
        />
      </div>
      <div className={styles.inputBox}>
        <p>{t("createTask.form.input_four")}</p>
        <input
          type={"date"}
          value={task.endDate}
          onChange={(e) => setTask({ ...task, endDate: e.target.value })}
        />
      </div>
      <div className={styles.inputBox}>
        <p>{t("createTask.form.input_five")}</p>
        <select
          className={styles.selectStatus}
          onChange={(e) =>
            setTask({ ...task, status: e.target.value as taskStatuses })
          }
        >
          <option value={taskStatuses.notStarted}>
            {t(`taskStatuses.${taskStatuses.notStarted}`)}
          </option>
          <option value={taskStatuses.inProgress}>
            {t(`taskStatuses.${taskStatuses.inProgress}`)}
          </option>
          <option value={taskStatuses.finish}>
            {t(`taskStatuses.${taskStatuses.finish}`)}
          </option>
        </select>
      </div>
    </div>
  );
}

export { CreateTaskForm };
