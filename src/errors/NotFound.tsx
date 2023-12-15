import { Button, Container, Paper, Typography } from "@mui/material"
import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <Container component={Paper} sx={{p:15 ,textAlign:"center"}}>

        <Typography variant="h2" margin={5}>
            404
        </Typography>
        <Typography variant="h5" margin={10}>
          Page is Missing !
        </Typography>

        <Button component={Link} to={'/'}>Back </Button>

    </Container>
  )
}

export default NotFound