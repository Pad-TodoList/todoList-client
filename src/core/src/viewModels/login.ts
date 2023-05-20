import { useState } from "react";
import { clientHttp, RequestMethods } from "@todo-list/utils/clientHttp.ts";
import { Tokens, User } from "@todo-list/dto";

interface ViewModel {
  isRequestSuccess: boolean;
  isRequestPending: boolean;
  isRequestFailure: { status: boolean; message: string };
  tokens: Tokens;
  register(user: User): void;
}

function useLogin(): ViewModel {
  const [isRequestSuccess, setIsRequestSuccess] = useState(false);
  const [isRequestFailure, setIsRequestFailure] = useState({
    status: false,
    message: "",
  });
  const [isRequestPending, setIsRequestPending] = useState(false);
  const [tokens, setTokens] = useState<Tokens>({
    accessToken: "",
    id: "",
  });

  return {
    isRequestFailure: isRequestFailure,
    isRequestPending: isRequestPending,
    isRequestSuccess: isRequestSuccess,
    tokens: tokens,
    register(user) {
      const config = {
        headers: {
          "Content-Type": "application/json",
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

      clientHttp("/login", RequestMethods.POST, config.headers, formData)
        .then((response) => {
          setTokens({
            id: response.data.userId,
            accessToken: response.data.accessToken,
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

export { useLogin };
