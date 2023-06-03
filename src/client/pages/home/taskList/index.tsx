import { Props } from "./types";
import styles from "./styles.module.scss";
import { useState } from "react";
import { Identifiable, Task as T } from "@todo-list/dto";
import { Task } from "./task";

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

  return (
    <div className={styles.taskList}>
      <div id="notStartedTasks" className={styles.listBox}>
        {notStartedTasks.map((task) => (
          <Task
            key={task.uuid}
            task={task}
            finishTasks={finishTasks}
            inProgressTasks={inProgressTasks}
            notStartedTasks={notStartedTasks}
            setFinishTasks={setFinishTasks}
            setInProgressTasks={setInProgressTasks}
            setNotStartedTasks={setNotStartedTasks}
          />
        ))}
      </div>
      <div id="inProgressTasks" className={styles.listBox}>
        {inProgressTasks.map((task) => (
          <Task
            key={task.uuid}
            task={task}
            finishTasks={finishTasks}
            inProgressTasks={inProgressTasks}
            notStartedTasks={notStartedTasks}
            setFinishTasks={setFinishTasks}
            setInProgressTasks={setInProgressTasks}
            setNotStartedTasks={setNotStartedTasks}
          />
        ))}
      </div>
      <div id="finishTasks" className={styles.listBox}>
        {finishTasks.map((task) => (
          <Task
            key={task.uuid}
            task={task}
            finishTasks={finishTasks}
            inProgressTasks={inProgressTasks}
            notStartedTasks={notStartedTasks}
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
