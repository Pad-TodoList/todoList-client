import { useState } from "react";

import { UseCases } from "@app/wrapper/type.ts";
import { useWrapperContext } from "@app/wrapper/wrapper.tsx";
import { ErrorBanner } from "@components/errorBanner";
import { TrashIcon } from "@common/assets/trashIcon";
import { Props } from "./types";
import styles from "./styles.module.scss";
import {
  Task,
  taskStatuses,
} from "../../../../../todoList-client-core/src/dto/main.ts";
import { Identifiable } from "../../../../../todoList-client-core/src/dto/identifiable.ts";
import { useUpdateTask } from "../../../../../todoList-client-core/src/viewModels/updateTask.ts";
import { getAccessToken } from "../../../../../todoList-client-core/src/utils/getAccessToken.ts";
import { useDeleteTask } from "../../../../../todoList-client-core/src/viewModels/deleteTask.ts";

function Task({ task, targetList, tasks, setTasks, setTargetList }: Props) {
  const { pushView } = useWrapperContext();
  const [draggedTask, setDraggedTask] = useState<Identifiable<Task> | null>(
    null
  );
  const { updateTask, isRequestFailure: isRequestUpdateFailure } =
    useUpdateTask();
  const tokens = getAccessToken();
  const { deleteTask, isRequestFailure: isRequestDeleteFailure } =
    useDeleteTask();

  const handleDragStart = (event: any, task: Identifiable<Task>) => {
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
        pushView({
          data: { task, taskList: tasks, setTaskList: setTasks },
          useCase: UseCases.RetrieveTask,
        })
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
