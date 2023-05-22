import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import { Home } from "@pages/home";
import { NotFound } from "@pages/notFound";
import { Profile } from "@pages/Profile";
import { Props } from "./type.ts";
import { Wrapper } from "@app/wrapper";
import { WrapperContextProvider } from "@app/wrapper/wrapper.tsx";

function Private(_: Props) {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <WrapperContextProvider>
          <Wrapper />
          <Home />
        </WrapperContextProvider>
      ),
      errorElement: <NotFound />,
    },
    {
      path: "/profile",
      element: (
        <WrapperContextProvider>
          <Wrapper />
          <Profile />
        </WrapperContextProvider>
      ),
    },
    {
      path: "/login",
      element: <Navigate to={"/"} />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export { Private };
