import { useState } from "react";
import { clientHttp, RequestMethods } from "@todo-list/utils/clientHttp.ts";
import { Identifiable, Tokens, User } from "@todo-list/dto";

interface ViewModel {
  isRequestSuccess: boolean;
  isRequestPending: boolean;
  isRequestFailure: { status: boolean; message: string };
  updateUser(user: Identifiable<User>, tokens: Tokens): void;
}

function useUpdateUser(): ViewModel {
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
    updateUser(user, tokens) {
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
      formData.append("nickname", user.nickName);
      formData.append("firstname", user.firstName);
      formData.append("lastname", user.lastName);
      formData.append("email", user.email);
      formData.append("password", user.password);
      formData.append("id", user.uuid);

      clientHttp("/user/update", RequestMethods.PUT, config.headers, formData)
        .then((response) => {
          console.log(response.data);
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

export { useUpdateUser };
