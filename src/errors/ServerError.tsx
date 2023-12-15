import { Container, Divider, Paper, Typography } from "@mui/material"
import { useLocation } from "react-router-dom"

const ServerError = () => {
    const{state} = useLocation();
  return (
    <Container component={Paper} sx={{p:15 ,textAlign:"center"}}>

    <Typography variant="h1" margin={5}>
        500
    </Typography>
    <Typography variant="h5" margin={10}>
         we are sorry, something went wrong on Server!
    </Typography>

    </Container>
  )
}

export default ServerError