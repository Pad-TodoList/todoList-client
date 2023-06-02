import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import { NotFound } from "@pages/notFound";
import { Landing } from "src/client/pages/landing";
import { Login } from "src/client/pages/login";
import { Props } from "./type.ts";
import { WrapperContextProvider } from "@app/wrapper/wrapper.tsx";
import { Wrapper } from "@app/wrapper";

function Public(_: Props) {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <WrapperContextProvider>
          <Wrapper />
          <Landing />
        </WrapperContextProvider>
      ),
      errorElement: <NotFound />,
    },
    {
      path: "/login",
      element: (
        <WrapperContextProvider>
          <Wrapper />
          <Login />
        </WrapperContextProvider>
      ),
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
