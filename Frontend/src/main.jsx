import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="202580823383-lhfq9robejoj8i9vsg73d8jfnii4o7da.apps.googleusercontent.com">
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>,
);