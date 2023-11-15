import { useState } from "react";

import { Identifiable, Task, Tokens } from "@todo-list/dto";
import { clientHttp, RequestMethods } from "../utils/clientHttp.ts";

interface ViewModel {
  isRequestSuccess: boolean;
  isRequestPending: boolean;
  isRequestFailure: { status: boolean; message: string };
  updateTask(task: Identifiable<Task>, tokens: Tokens): void;
}

function useUpdateTask(): ViewModel {
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
    updateTask(task, tokens) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          accessToken: tokens.accessToken,
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
      formData.append("id", task.uuid);

      clientHttp("/task/update", RequestMethods.PUT, config.headers, formData)
        .then(() => {
          setIsRequestSuccess(true);
          setIsRequestFailure({ status: false, message: "" });
          setIsRequestPending(false);
        })
        .catch((error) => {
          setIsRequestSuccess(false);
          setIsRequestFailure({ status: true, message: error.message });
          setIsRequestPending(false);
        });
    },
  };
}

export { useUpdateTask };
