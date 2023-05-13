import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import { NotFound } from "@pages/notFound";
import { Landing } from "@pages/Landing";
import { Login } from "@pages/Login";
import { Props } from "./type.ts";

function Public(_: Props) {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing />,
      errorElement: <NotFound />,
    },
    {
      path: "/login",
      element: <Login />,
      errorElement: <NotFound />,
    },
    {
      path: "/profile",
      element: <Navigate to={"/"} />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export { Public };
