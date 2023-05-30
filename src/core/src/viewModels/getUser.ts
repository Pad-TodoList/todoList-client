import { useState } from "react";
import { clientHttp, RequestMethods } from "@todo-list/utils/clientHttp.ts";
import { Identifiable, Tokens, User } from "@todo-list/dto";

interface ViewModel {
  isRequestSuccess: boolean;
  isRequestPending: boolean;
  isRequestFailure: { status: boolean; message: string };
  user: Identifiable<User>;
  getUser(accessTokens: Tokens): void;
}

function useGetUser(): ViewModel {
  const [isRequestSuccess, setIsRequestSuccess] = useState(false);
  const [isRequestFailure, setIsRequestFailure] = useState({
    status: false,
    message: "",
  });
  const [isRequestPending, setIsRequestPending] = useState(false);
  const [user, setUser] = useState<Identifiable<User>>({
    email: "",
    firstName: "",
    lastName: "",
    nickName: "",
    password: "",
    uuid: "",
  });

  return {
    isRequestFailure: isRequestFailure,
    isRequestPending: isRequestPending,
    isRequestSuccess: isRequestSuccess,
    user: user,
    getUser(accessTokens) {
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
        "/user/get/" + accessTokens.id,
        RequestMethods.GET,
        config.headers
      )
        .then((response) => {
          setUser({
            email: response.data.email,
            firstName: response.data.firstname,
            lastName: response.data.lastname,
            nickName: response.data.nickname,
            password: response.data.password,
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

export { useGetUser };
