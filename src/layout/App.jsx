import Box from "@mui/material/Box";

import { Outlet } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import LoadingComponent from "../components/LoadingComponent";
import { UseAppDispatch } from "../store/configureStore";
import { Container } from "@mui/material";
import Header from "../components/Header";
import { fetchCurrentUser } from "../features/pages/account/accountSlice";

export default function App() {
  const dispatch = UseAppDispatch();
  const [loading, setLoading] = useState(true);

  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, [initApp]);

  if (loading) return <LoadingComponent message="Loading..." />;

  return (
    <Box sx={{height:"100%",minHeight:"100%"}}>
      <Header />
      <Outlet />
    </Box>
  );
}
