import { useState } from "react";

import { Identifiable, Task, Tokens } from "@todo-list/dto";
import { clientHttp, RequestMethods } from "../utils/clientHttp.ts";

interface ViewModel {
  isRequestSuccess: boolean;
  isRequestPending: boolean;
  isRequestFailure: { status: boolean; message: string };
  tasks: Identifiable<Task>[];
  getUserTasks(accessTokens: Tokens): void;
}

function useGetUserTasks(): ViewModel {
  const [isRequestSuccess, setIsRequestSuccess] = useState(false);
  const [isRequestFailure, setIsRequestFailure] = useState({
    status: false,
    message: "",
  });
  const [isRequestPending, setIsRequestPending] = useState(false);
  const [tasks, setTasks] = useState<Identifiable<Task>[]>([]);

  return {
    isRequestFailure: isRequestFailure,
    isRequestPending: isRequestPending,
    isRequestSuccess: isRequestSuccess,
    tasks: tasks,
    getUserTasks(accessTokens) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          accessToken: accessTokens.accessToken,
        },
      };
      setIsRequestSuccess(false);
      setIsRequestFailure({ status: false, message: "" });
      setIsRequestPending(true);

      clientHttp(
        "/task/getUser/" + accessTokens.id,
        RequestMethods.GET,
        config.headers
      )
        .then((response) => {
          if (response.data) {
            const responseTasks: Identifiable<Task>[] = response.data.map(
              (item: any) => {
                return {
                  name: item.name,
                  description: item.description,
                  startDate: item.startDate,
                  endDate: item.endDate,
                  status: item.status,
                  userId: item.userId,
                  uuid: item.id,
                };
              }
            );
            setTasks(responseTasks);
          }
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

export { useGetUserTasks };
