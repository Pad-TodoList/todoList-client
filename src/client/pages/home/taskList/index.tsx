import { useState } from "react";

import { Task } from "./task";
import { Props } from "./types";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { UseCases } from "@app/wrapper/type.ts";
import { useWrapperContext } from "@app/wrapper/wrapper.tsx";

function TaskList(props: Props) {
  const { t } = useTranslation();
  const { pushView } = useWrapperContext();
  const [tasks, setTasks] = useState(props.tasks);
  const [targetList, setTargetList] = useState<
    "notStarted" | "inProgress" | "finish" | null
  >(null);

  return (
    <div className={styles.taskList}>
      <button
        className={styles.button}
        onClick={() =>
          pushView({
            data: {
              addTask: (task) => {
                setTasks([...tasks, task]);
              },
            },
            useCase: UseCases.CreateTask,
          })
        }
      >
        {t("homePage.createTask")}
      </button>
      <div
        id="notStartedTasks"
        className={styles.listBox}
        onDragOver={(event) => event.preventDefault()}
      >
        <h2>{t("homePage.lists.notStarted")}</h2>
        <div className={styles.tasks}>
          {tasks
            .filter((task) => task.status === "notStarted")
            .map((task) => (
              <Task
                key={task.uuid}
                task={task}
                targetList={targetList}
                tasks={tasks}
                setTasks={setTasks}
                setTargetList={setTargetList}
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
          {tasks
            .filter((task) => task.status === "inProgress")
            .map((task) => (
              <Task
                key={task.uuid}
                task={task}
                targetList={targetList}
                tasks={tasks}
                setTasks={setTasks}
                setTargetList={setTargetList}
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
          {tasks
            .filter((task) => task.status === "finish")
            .map((task) => (
              <Task
                key={task.uuid}
                task={task}
                targetList={targetList}
                tasks={tasks}
                setTasks={setTasks}
                setTargetList={setTargetList}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export { TaskList };
