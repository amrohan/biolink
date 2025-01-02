import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Signup } from "./pages/SignUp.tsx";
import { Auth0Provider } from "@auth0/auth0-react";
import { Editor } from "./pages/Editor.tsx";
import { LinksProvider } from "./context/LinksContext.tsx";
import { ConfigProvider } from "antd";
import PrivateRoute from "./components/privateRoute.tsx";
import Admin from "./components/admin.tsx";

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clienID = import.meta.env.VITE_AUTH0_CLIENT_ID;

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/admin",
    element: <Admin />
  },
  {
    path: "/editor",
    element: (
      <PrivateRoute>
        <Editor />
      </PrivateRoute>
    ),
  }
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LinksProvider>
      <ConfigProvider
        theme={{
          //       algorithm: theme.compactAlgorithm,
        }}
      >
        <Auth0Provider
          domain={domain}
          clientId={clienID}
          authorizationParams={{
            redirect_uri: window.location.origin,
          }}
        >
          <RouterProvider router={router} />
        </Auth0Provider>
      </ConfigProvider>
    </LinksProvider>
  </StrictMode>
);
