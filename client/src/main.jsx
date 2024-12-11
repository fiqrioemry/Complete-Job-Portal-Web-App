import "./index.css";
import App from "./App.jsx";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalProvider.jsx";
import { SnackbarProvider } from "notistack";
import { Toaster } from "react-hot-toast";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <GlobalProvider>
      <SnackbarProvider>
        <App />
        <Toaster />
      </SnackbarProvider>
    </GlobalProvider>
  </BrowserRouter>
);
