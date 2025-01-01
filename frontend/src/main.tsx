import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Signup } from "./pages/SignUp.tsx";
import { Auth0Provider } from "@auth0/auth0-react";
import { Editor } from "./pages/Editor.tsx";
import { LinksProvider } from "./context/LinksContext.tsx";
import { ConfigProvider, theme } from "antd";

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
    path: "/editor",
    element: <Editor />,
  }
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LinksProvider>
      <ConfigProvider
        theme={{
          algorithm: theme.compactAlgorithm,
        }}
      >
        <Auth0Provider
          domain="amrohan.eu.auth0.com"
          clientId="eeOt4kNjickEWWXT6Rd4RrmQlmgWuMYu"
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
