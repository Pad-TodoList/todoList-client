import { Tokens } from "@todo-list/dto";

function getAccessToken(): Tokens {
  return {
    accessToken: localStorage.getItem("pad-todolist-userToken") ?? "",
    id: localStorage.getItem("pad-todolist-userId") ?? "",
  };
}

export { getAccessToken };
