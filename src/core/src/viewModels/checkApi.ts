import { useState } from "react";
import { Request } from "@todo-list/dto";
import { clientHttp, RequestMethods } from "@todo-list/utils/clientHttp.ts";

interface ViewModel {
  isRequestSuccess: boolean;
  isRequestPending: boolean;
  isRequestFailure: boolean;
  checkApi(): void;
}

function useCheckApi(): ViewModel {
  const [statusRequest, setStatusRequest] = useState<Request>({
    isRequestFailure: false,
    isRequestPending: false,
    isRequestSuccess: false,
  });

  return {
    isRequestFailure: statusRequest.isRequestFailure,
    isRequestPending: statusRequest.isRequestPending,
    isRequestSuccess: statusRequest.isRequestSuccess,
    checkApi() {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      setStatusRequest({
        isRequestFailure: false,
        isRequestPending: true,
        isRequestSuccess: false,
      });

      clientHttp("/about.json", RequestMethods.GET, config.headers)
        .then((response) => {
          console.log(response);
          setStatusRequest({
            isRequestFailure: false,
            isRequestPending: false,
            isRequestSuccess: true,
          });
        })
        .catch((error) => {
          console.log(error);
          setStatusRequest({
            isRequestFailure: true,
            isRequestPending: false,
            isRequestSuccess: false,
          });
        });
    },
  };
}

export { useCheckApi };
