import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import { Home } from "@pages/home";
import { NotFound } from "@pages/notFound";
import { Profile } from "@pages/Profile";
import { Props } from "./type.ts";

function Private(_: Props) {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <NotFound />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      path: "/login",
      element: <Navigate to={"/"} />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export { Private };
