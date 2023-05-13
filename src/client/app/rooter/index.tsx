import { Private } from "./private";
import { Public } from "./public";

function Rooter() {
  const userId = localStorage.getItem("pad-todolist-userId");
  const userToken = localStorage.getItem("pad-todolist-userToken");

  if (userId && userToken) {
    return <Private />;
  }
  return <Public />;
}

export { Rooter };
