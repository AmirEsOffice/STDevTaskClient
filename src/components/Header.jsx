import React from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  Avatar,
  Container,
  CardHeader,
} from "@mui/material";
import { Link } from "react-router-dom";
import { UseAppDispatch, UseAppSelector } from "../store/configureStore";
import { signOut } from "../features/pages/account/accountSlice";

function Header() {
  const dispatch = UseAppDispatch();
  const userSlice = UseAppSelector(state=>state.account);
  return (
    <AppBar elevation={0} sx={{ backgroundColor: "#fff" }} position="static">
      <Toolbar component={Container} maxWidth="lg">
        <Link to="/" style={{textDecoration: "none"}}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: "secondary.main",
            "&:hover": {
              color: "primary.main",
            },
          }}
        >
          Posts
        </Typography>
        </Link>
        

        <Box sx={{ flexGrow: 1 }} />

        <Box display={"flex"} gap={2}>
          <CardHeader
            avatar={
              <Avatar alt="User Name" src={userSlice.user?.avatar} />
            }
            title={userSlice.user?.firstName}
            titleTypographyProps={{color: "GrayText"}}
          />
          
          <Button color="primary" onClick={()=>dispatch(signOut())} variant="text">
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
