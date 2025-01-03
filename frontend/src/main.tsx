import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { LinksProvider } from "./context/LinksContext.tsx";
import { ConfigProvider } from "antd";
import { Auth0Provider } from "@auth0/auth0-react";

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientID = import.meta.env.VITE_AUTH0_CLIENT_ID;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LinksProvider>
      <ConfigProvider>
        <Auth0Provider
          domain={domain}
          clientId={clientID}
          authorizationParams={{
            redirect_uri: window.location.origin,
          }}
        >
          <App />
        </Auth0Provider>
      </ConfigProvider>
    </LinksProvider>
  </StrictMode>
);

