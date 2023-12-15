import { Formik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Container, Typography } from "@mui/material";
import { UseAppDispatch, UseAppSelector } from "../../../store/configureStore";
import { createPost, fetchCategories, fetchPostById, updatePost } from "./postSlice";
import ImageUploader from "../../components/ImageUploader";

const validationSchema = Yup.object({
  image: Yup.mixed().required('Image is required'),
  Name: Yup.string().required("Required"),
  Description: Yup.string().required("Required"),
  CategoryId: Yup.string().required("Required")
});

export default function PostForm() {
  let { postId } = useParams();
  const dispatch = UseAppDispatch();
  const slice = UseAppSelector((state) => state.posts);


  const fetchPostAsync= async()=>{
    await dispatch(fetchPostById(postId))
  }

  useEffect(() => {
    // Fetch categories from API
    dispatch(fetchCategories());

    if(postId){
      fetchPostAsync();
    }
  }, [dispatch]);

  return (
    <Formik
      initialValues={
        slice.selectedPost 
        || 
        {
          image: null,
          Name:"",
          Description:"",
          CategoryId:""
        }
      }
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={(values) => {
        if(postId){ //updating Post
          delete values.Id ;
          const updateObj = {postId,...values}
          dispatch(updatePost(updateObj));
        }else{ // adding Post
          dispatch(createPost(values));
        }
        
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue
      }) => (
        <form onSubmit={handleSubmit}>
          <Container sx={{py:4}}  maxWidth="sm" >
            <Box gap={2} display={"flex"} alignItems={"center"}  textAlign={"center"} flexDirection={"column"}>
            <Typography sx={{my:3}} color={"GrayText"} variant="h3"> {postId ? "Edit" : "Create"} Post</Typography>
            <ImageUploader  
            onChange={event => {
          setFieldValue('image', event.target.files[0]);
        }} 
        helperText={touched.image && errors.image}
        error={touched.image && Boolean(errors.image)}
        size={200} />
        
            <TextField
              name="Name"
              fullWidth
              label="Name"
              value={values.Name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.Name && Boolean(errors.Name)}
              helperText={touched.Name && errors.Name}
            />

            <TextField
              name="Description"
              fullWidth
              label="Description"
              multiline
              rows={4}
              value={values.Description}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.Description && Boolean(errors.Description)}
              helperText={touched.Description && errors.Description}
            />

            <TextField
              select
              name="CategoryId"
              fullWidth
              label="Category"
              value={values.CategoryId}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.CategoryId && Boolean(errors.CategoryId)}
              helperText={touched.CategoryId && errors.CategoryId}
            >
              {slice.categories.map((category) => (
                <MenuItem key={category.Id} value={category.Id}>
                  {category.Title}
                </MenuItem>
              ))}
            </TextField>

            <Button sx={{px:10,mt:4}} type="submit" variant="contained">
              {postId ? "Edit" : "Create"}
            </Button>
            </Box>
          </Container>
        </form>
      )}
    </Formik>
  );
}
