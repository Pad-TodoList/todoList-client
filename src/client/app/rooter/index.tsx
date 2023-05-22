import { Private } from "./private";
import { Public } from "./public";
import { useEffect, useState } from "react";

function Rooter() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const userId = localStorage.getItem("pad-todolist-userId");
  const userToken = localStorage.getItem("pad-todolist-userToken");

  // Update the isAuthenticated state based on the presence of userId and userToken
  useEffect(() => {
    if (userId && userToken) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [userId, userToken]);

  return isAuthenticated ? <Private /> : <Public />;
}

export { Rooter };
