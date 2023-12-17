import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/Routes";
import { Provider } from "react-redux";
import { store } from "./store/configureStore";
import { StrictMode } from "react";
import { Box, CssBaseline } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme";

const root = ReactDOM.createRoot(document.getElementById("root"));


root.render(
  // <StrictMode>
    <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Box component="div">
            <ToastContainer
              position="bottom-right"
              hideProgressBar
              theme="light"
            />
            <CssBaseline />
            <RouterProvider router={router} />
          </Box>
        </ThemeProvider>
    </Provider>
 // </StrictMode> 
);
