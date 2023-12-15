import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  Avatar,
  Container,
} from "@mui/material";
import ImageUploader from "../../components/ImageUploader";
import { UseAppDispatch } from "../../../store/configureStore";
import { signUpUser } from "./accountSlice";
import { Link } from "react-router-dom";

const SignUp = () => {

  const dispatch= UseAppDispatch();

  const validationSchema = Yup.object({
    avatar:Yup.mixed().required('Avatar is required'),
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  return (
    <div
      style={{
        background: "linear-gradient(to bottom, #009DDF, #009DDF)",
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="sm">
            <Paper elevation={0} sx={{ p: 5 }}>
              <Typography color={"primary"} variant="h3" align="center" marginBottom={5}>
                Sign Up
              </Typography>
              <Formik
                initialValues={{
                  avatar:null,
                  firstName: "",
                  lastName: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  delete values.confirmPassword;
                  console.log(values);
                  dispatch(signUpUser(values));
                }}
              >
                {({ values, errors, touched,setFieldValue }) => (
                  <Form>
                    <Grid container spacing={2}>
                      <Grid textAlign={"center"} item xs={12}>
                        <Field 
                         name="avatar"
                        as={ImageUploader}  
                        size={100} 
                        variant={"Avatar"}
                        onChange={event => {
                          setFieldValue('avatar', event.target.files[0]);
                        }} 
                        helperText={touched.avatar && errors.avatar}
                        error={Boolean(touched.avatar && errors.avatar)}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Field
                          as={TextField}
                          name="firstName"
                          label="First Name"
                          variant="outlined"
                          fullWidth
                          helperText={touched.firstName && errors.firstName}
                          error={Boolean(touched.firstName && errors.firstName)}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Field
                          as={TextField}
                          name="lastName"
                          label="Last Name"
                          variant="outlined"
                          fullWidth
                          helperText={touched.lastName && errors.lastName}
                          error={Boolean(touched.lastName && errors.lastName)}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Field
                          as={TextField}
                          name="email"
                          label="Email"
                          variant="outlined"
                          fullWidth
                          helperText={touched.email && errors.email}
                          error={Boolean(touched.email && errors.email)}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Field
                          as={TextField}
                          name="password"
                          label="Password"
                          type="password"
                          variant="outlined"
                          fullWidth
                          helperText={touched.password && errors.password}
                          error={Boolean(touched.password && errors.password)}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Field
                          as={TextField}
                          name="confirmPassword"
                          label="Confirm Password"
                          type="password"
                          variant="outlined"
                          fullWidth
                          helperText={
                            touched.confirmPassword && errors.confirmPassword
                          }
                          error={Boolean(
                            touched.confirmPassword && errors.confirmPassword
                          )}
                        />
                      </Grid>
                      
                      <Grid item xs={12} textAlign={"center"}>
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          disabled={Boolean(
                            errors.firstName ||
                              errors.lastName ||
                              errors.email ||
                              errors.password ||
                              errors.confirmPassword
                          )}
                          sx={{px:10}}
                        >
                          Sign Up
                        </Button>
                        <Typography variant="body1" align="center" marginTop={2}>
                          have an account? <Link to="/signin">Sign In</Link>
                          </Typography>
                      </Grid>
                    </Grid>
                  </Form>
                )}
              </Formik>
            </Paper>
      </Container>
    </div>
  );
};

export default SignUp;
