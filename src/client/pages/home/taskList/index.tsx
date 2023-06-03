import { useState } from "react";

import { Identifiable, Task as T } from "@todo-list/dto";
import { Task } from "./task";
import { Props } from "./types";
import styles from "./styles.module.scss";

function TaskList({ tasks }: Props) {
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
      <div
        id="inProgressTasks"
        className={styles.listBox}
        onDragOver={(event) => event.preventDefault()}
      >
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
      <div
        id="finishTasks"
        className={styles.listBox}
        onDragOver={(event) => event.preventDefault()}
      >
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
  );
}

export { TaskList };
