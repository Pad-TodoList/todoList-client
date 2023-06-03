import { useState } from "react";

import { Identifiable, Task as T } from "@todo-list/dto";
import { useUpdateTask } from "@todo-list/view-models";
import { getAccessToken } from "@todo-list/utils/getAccessToken.ts";
import { UseCases } from "@app/wrapper/type.ts";
import { useWrapperContext } from "@app/wrapper/wrapper.tsx";
import { Props } from "./types";
import styles from "./styles.module.scss";

function Task({
  task,
  finishTasks,
  inProgressTasks,
  notStartedTasks,
  targetList,
  setTargetList,
  setFinishTasks,
  setInProgressTasks,
  setNotStartedTasks,
}: Props) {
  const { pushView } = useWrapperContext();
  const [draggedTask, setDraggedTask] = useState<Identifiable<T> | null>(null);
  const { updateTask } = useUpdateTask();
  const tokens = getAccessToken();

  const handleDragStart = (event: any, task: Identifiable<T>) => {
    setDraggedTask(task);
    event.currentTarget.classList.add(styles.dragging);
  };

  const handleDrag = (event: any) => {
    const listRects = {
      notStarted: document
        .querySelector("#notStartedTasks")
        ?.getBoundingClientRect(),
      inProgress: document
        .querySelector("#inProgressTasks")
        ?.getBoundingClientRect(),
      finish: document.querySelector("#finishTasks")?.getBoundingClientRect(),
    };
    const x = event.clientX;
    const y = event.clientY;

    let targetList = null;
    Object.entries(listRects).forEach(([list, rect]) => {
      if (
        rect &&
        x >= rect.left &&
        x <= rect.right &&
        y >= rect.top &&
        y <= rect.bottom
      ) {
        targetList = list;
      }
    });
    setTargetList(targetList);
  };

  const handleDragEnd = () => {
    if (targetList) {
      if (draggedTask && draggedTask.status !== targetList) {
        if (draggedTask.status === "inProgress") {
          setInProgressTasks(
            inProgressTasks.filter((task) => task.uuid !== draggedTask.uuid)
          );
        }
        if (draggedTask.status === "notStarted") {
          setNotStartedTasks(
            notStartedTasks.filter((task) => task.uuid !== draggedTask.uuid)
          );
        }
        if (draggedTask.status === "finish") {
          setFinishTasks(
            finishTasks.filter((task) => task.uuid !== draggedTask.uuid)
          );
        }
        if (targetList === "inProgress") {
          setInProgressTasks([
            ...inProgressTasks,
            { ...draggedTask, status: "inProgress" },
          ]);
          updateTask({ ...draggedTask, status: "inProgress" }, tokens);
        }
        if (targetList === "notStarted") {
          setNotStartedTasks([
            ...notStartedTasks,
            { ...draggedTask, status: "notStarted" },
          ]);
          updateTask({ ...draggedTask, status: "notStarted" }, tokens);
        }
        if (targetList === "finish") {
          setFinishTasks([
            ...finishTasks,
            { ...draggedTask, status: "finish" },
          ]);
          updateTask({ ...draggedTask, status: "finish" }, tokens);
        }
      }
    }
    setDraggedTask(null);
    setTargetList(null);
  };

  return (
    <div
      key={task.uuid}
      className={styles.task}
      draggable
      onDragStart={(e) => handleDragStart(e, task)}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      onClick={() =>
        pushView({ data: { task }, useCase: UseCases.RetrieveTask })
      }
    >
      <p>{task.name}</p>
    </div>
  );
}

export { Task };
