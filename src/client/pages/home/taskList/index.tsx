import { useState } from "react";

import { Identifiable, Task as T } from "@todo-list/dto";
import { Task } from "./task";
import { Props } from "./types";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";

function TaskList({ tasks }: Props) {
  const { t } = useTranslation();
  const [inProgressTasks, setInProgressTasks] = useState<Identifiable<T>[]>(
    tasks.filter((task) => task.status === "inProgress")
  );
  const [finishTasks, setFinishTasks] = useState<Identifiable<T>[]>(
    tasks.filter((task) => task.status === "finish")
  );
  const [notStartedTasks, setNotStartedTasks] = useState<Identifiable<T>[]>(
    tasks.filter((task) => task.status === "notStarted")
  );
  const [targetList, setTargetList] = useState<
    "notStarted" | "inProgress" | "finish" | null
  >(null);

  return (
    <div className={styles.taskList}>
      <div
        id="notStartedTasks"
        className={styles.listBox}
        onDragOver={(event) => event.preventDefault()}
      >
        <h2>{t("homePage.lists.notStarted")}</h2>
        <div className={styles.tasks}>
          {notStartedTasks.map((task) => (
            <Task
              key={task.uuid}
              task={task}
              finishTasks={finishTasks}
              inProgressTasks={inProgressTasks}
              notStartedTasks={notStartedTasks}
              targetList={targetList}
              setTargetList={setTargetList}
              setFinishTasks={setFinishTasks}
              setInProgressTasks={setInProgressTasks}
              setNotStartedTasks={setNotStartedTasks}
            />
          ))}
        </div>
      </div>
      <div
        id="inProgressTasks"
        className={styles.listBox}
        onDragOver={(event) => event.preventDefault()}
      >
        <h2>{t("homePage.lists.inProgress")}</h2>
        <div className={styles.tasks}>
          {inProgressTasks.map((task) => (
            <Task
              key={task.uuid}
              task={task}
              finishTasks={finishTasks}
              inProgressTasks={inProgressTasks}
              notStartedTasks={notStartedTasks}
              targetList={targetList}
              setTargetList={setTargetList}
              setFinishTasks={setFinishTasks}
              setInProgressTasks={setInProgressTasks}
              setNotStartedTasks={setNotStartedTasks}
            />
          ))}
        </div>
      </div>
      <div
        id="finishTasks"
        className={styles.listBox}
        onDragOver={(event) => event.preventDefault()}
      >
        <h2>{t("homePage.lists.finish")}</h2>
        <div className={styles.tasks}>
          {finishTasks.map((task) => (
            <Task
              key={task.uuid}
              task={task}
              finishTasks={finishTasks}
              inProgressTasks={inProgressTasks}
              notStartedTasks={notStartedTasks}
              targetList={targetList}
              setTargetList={setTargetList}
              setFinishTasks={setFinishTasks}
              setInProgressTasks={setInProgressTasks}
              setNotStartedTasks={setNotStartedTasks}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export { TaskList };
