import { useState } from "react";

import { Identifiable, Task, taskStatuses, Tokens, Id } from "@todo-list/dto";
import { clientHttp, RequestMethods } from "../utils/clientHttp.ts";

interface ViewModel {
  isRequestSuccess: boolean;
  isRequestPending: boolean;
  isRequestFailure: { status: boolean; message: string };
  task: Identifiable<Task>;
  retrieveTask(accessTokens: Tokens, id: Id): void;
}

function useRetrieveTask(): ViewModel {
  const [isRequestSuccess, setIsRequestSuccess] = useState(false);
  const [isRequestFailure, setIsRequestFailure] = useState({
    status: false,
    message: "",
  });
  const [isRequestPending, setIsRequestPending] = useState(false);
  const [task, setTask] = useState<Identifiable<Task>>({
    description: "",
    endDate: "",
    name: "",
    startDate: "",
    status: taskStatuses.notStarted,
    userId: "",
    uuid: "",
  });

  return {
    isRequestFailure: isRequestFailure,
    isRequestPending: isRequestPending,
    isRequestSuccess: isRequestSuccess,
    task: task,
    retrieveTask(accessTokens: Tokens, id: Id) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          accessToken: accessTokens.accessToken,
        },
      };
      setIsRequestSuccess(false);
      setIsRequestFailure({ status: false, message: "" });
      setIsRequestPending(true);

      clientHttp("/task/get/" + id, RequestMethods.GET, config.headers)
        .then((response) => {
          setTask({
            name: response.data.name,
            description: response.data.description,
            startDate: response.data.startDate,
            endDate: response.data.endDate,
            status: response.data.status,
            userId: response.data.userId,
            uuid: response.data.id,
          });
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

export { useRetrieveTask };
