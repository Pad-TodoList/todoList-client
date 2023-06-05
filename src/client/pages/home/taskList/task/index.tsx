import { useState } from "react";

import { Identifiable, Task, Task as T, taskStatuses } from "@todo-list/dto";
import { useDeleteTask, useUpdateTask } from "@todo-list/view-models";
import { getAccessToken } from "@todo-list/utils/getAccessToken.ts";
import { UseCases } from "@app/wrapper/type.ts";
import { useWrapperContext } from "@app/wrapper/wrapper.tsx";
import { TrashIcon } from "@common/assets/trashIcon";
import { Props } from "./types";
import styles from "./styles.module.scss";
import { ErrorBanner } from "@components/errorBanner";

function Task({ task, targetList, tasks, setTasks, setTargetList }: Props) {
  const { pushView } = useWrapperContext();
  const [draggedTask, setDraggedTask] = useState<Identifiable<T> | null>(null);
  const { updateTask, isRequestFailure: isRequestUpdateFailure } =
    useUpdateTask();
  const tokens = getAccessToken();
  const { deleteTask, isRequestFailure: isRequestDeleteFailure } =
    useDeleteTask();

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
        setTasks([
          ...tasks.filter((task) => task.uuid !== draggedTask.uuid),
          { ...draggedTask, status: targetList as taskStatuses },
        ]);
        updateTask(
          { ...draggedTask, status: targetList as taskStatuses },
          tokens
        );
      }
    }
    setDraggedTask(null);
    setTargetList(null);
  };

  const removeTask = (task: Identifiable<Task>) => {
    deleteTask(tokens, task.uuid);
    setTasks(tasks.filter(({ uuid }) => uuid !== task.uuid));
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
      {isRequestDeleteFailure.status ||
        (isRequestUpdateFailure.status && (
          <ErrorBanner
            message={
              isRequestDeleteFailure.status
                ? isRequestDeleteFailure.message
                : isRequestUpdateFailure.message
            }
          />
        ))}
      <p>{task.name}</p>
      <div
        className={styles.iconBox}
        onClick={(e) => {
          e.stopPropagation();
          removeTask(task);
        }}
      >
        <TrashIcon className={styles.icon} />
      </div>
    </div>
  );
}

export { Task };
