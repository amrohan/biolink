import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Landing from "./components/Landing";
import { Signup } from "./pages/SignUp";
import PrivateRoute from "./components/privateRoute";
import RootLayout from "./components/RootLayout";
import { Editor } from "./pages/Editor";
import { Outlet } from "react-router";
import Profile from "./pages/profile";
import Settings from "./pages/settings";
import { DynamicProfile } from "./pages/DynamicProfile";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="signup" element={<Signup />} />
        {/* admin route */}
        <Route path="admin">
          <Route
            element={
              <PrivateRoute>
                <RootLayout>
                  <Outlet />
                </RootLayout>
              </PrivateRoute>
            }
          >
            <Route index element={<Editor />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>
        <Route path="@/:slug" element={<DynamicProfile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
