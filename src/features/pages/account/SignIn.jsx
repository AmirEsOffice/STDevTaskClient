import axios, { AxiosError, AxiosResponse } from "axios";

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField ,  Checkbox, 
  Button,
  Paper,
  Typography, 
  Container,
  Box} from '@mui/material';
import { signInUser } from './accountSlice';
import { UseAppDispatch } from '../../../store/configureStore';
import { Link } from 'react-router-dom';


const SignIn = () => {
  const dispatch= UseAppDispatch();

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required') 
  });

  return (
    <div style={{ 
      background: 'linear-gradient(to bottom, #009DDF, #009DDF)',
      height: '100vh',
      width: '100vw',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center' 
    }}>
     <Container maxWidth="xs">
     <Paper elevation={0} sx={{p:5}}>
        <Typography color={"primary"} variant="h3" align="center" marginBottom={5}>
          Sign In
        </Typography>
        <Formik
          initialValues={{ 
            email: '',
            password: '',
            rememberMe: false
          }}
          validationSchema={validationSchema}
          onSubmit={values => {
            console.log(values);
            delete values.rememberMe;
           // dispatch(signInUser(values));
           //fetch('post','http://localhost:3000/api/user/sign-in/').then(req=> req.text).then(console.log(''));

           axios({
            method: 'post',
            mode: "no-cors",  
            headers: { 'Access-Control-Allow-Origin' : '*' },
            url: 'http://localhost:3000/api/user/sign-in/',
            data: { "email":"example@gmail.com",
            "password":"Example11!"}
          }).then(function (response) {
            console.log(response.data);
          });


          }}
        >
          {({ values, errors, touched }) => (
            <Form>
              <Field 
                as={TextField}
                name="email"
                label="Email"
                variant="outlined"
                margin="normal"
                fullWidth
                helperText={touched.email && errors.email}
                error={touched.email && Boolean(errors.email)}
              />

              <Field 
                as={TextField} 
                name="password"
                label="Password"
                type="password"
                variant="outlined"
                margin="normal"
                fullWidth
                helperText={touched.password && errors.password}
                error={touched.password && Boolean(errors.password)}
              />

              <Field 
                as={Checkbox}
                name="rememberMe"
                color="primary"
              />
              Remember me

             <Box sx={{textAlign:"center"}}>
             <Button 
                type="submit" 
                variant="contained"
                color="primary"
                disabled={Boolean(errors.email || errors.password)} 
                sx={{px:10}}
              >
                Sign In
              </Button>
              <Typography variant="body1" align="center" marginTop={2}>
                Don't have an account? <Link to="/signup">Sign Up</Link>
                </Typography>
             </Box>
              
            </Form>
          )}
        </Formik>
      </Paper>
     </Container>
    </div>
  );
}

export default SignIn;