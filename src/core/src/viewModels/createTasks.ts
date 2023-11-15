import { useState } from "react";

import { Identifiable, Task, taskStatuses, Tokens } from "@todo-list/dto";
import { clientHttp, RequestMethods } from "../utils/clientHttp.ts";

interface ViewModel {
  isRequestSuccess: boolean;
  isRequestPending: boolean;
  isRequestFailure: { status: boolean; message: string };
  task: Identifiable<Task>;
  createTask(accessTokens: Tokens, task: Task): void;
}

function useCreateTask(): ViewModel {
  const [createdTask, setCreatedTask] = useState<Identifiable<Task>>({
    description: "",
    endDate: "",
    name: "",
    startDate: "",
    status: taskStatuses.notStarted,
    userId: "",
    uuid: "",
  });
  const [isRequestSuccess, setIsRequestSuccess] = useState(false);
  const [isRequestFailure, setIsRequestFailure] = useState({
    status: false,
    message: "",
  });
  const [isRequestPending, setIsRequestPending] = useState(false);

  return {
    isRequestFailure: isRequestFailure,
    isRequestPending: isRequestPending,
    isRequestSuccess: isRequestSuccess,
    task: createdTask,
    createTask(accessTokens: Tokens, task: Task) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          accessToken: accessTokens.accessToken,
        },
      };
      setIsRequestSuccess(false);
      setIsRequestFailure({ status: false, message: "" });
      setIsRequestPending(true);
      const formData = new FormData();
      formData.append("name", task.name);
      formData.append("description", task.description);
      formData.append("startDate", task.startDate);
      formData.append("endDate", task.endDate);
      formData.append("status", task.status);
      formData.append("userId", task.userId);

      clientHttp("/task/create", RequestMethods.POST, config.headers, formData)
        .then((response) => {
          setIsRequestSuccess(true);
          setIsRequestFailure({ status: false, message: "" });
          setIsRequestPending(false);
          setCreatedTask({
            description: response.data.description,
            endDate: response.data.endDate,
            name: response.data.name,
            startDate: response.data.startDate,
            status: response.data.status,
            userId: response.data.userId,
            uuid: response.data.id,
          });
        })
        .catch((error) => {
          setIsRequestSuccess(false);
          setIsRequestFailure({ status: true, message: error.message });
          setIsRequestPending(false);
        });
    },
  };
}

export { useCreateTask };
