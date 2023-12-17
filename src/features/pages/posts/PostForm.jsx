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
  name: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  category: Yup.string().required("Required")
});

export default function PostForm() {
  let { postId } = useParams();
  const dispatch = UseAppDispatch();
  const slice = UseAppSelector((state) => state.posts);


  const fetchPostAsync = async () => {
    await dispatch(fetchPostById(postId))
  }
  const imageOnchange = async (event, setFieldValue) => {
    setFieldValue('image', event.target.files[0]);
  }

  useEffect(() => {
    dispatch(fetchCategories());
    if (postId) {
      fetchPostAsync();
    }
  }, [dispatch]);

  useEffect(() => {
    if (slice.selectedPost) {
    }
  }, [slice]);

 

  async function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        resolve(reader.result)
      }
      reader.onerror = reject
    })
  }


  return (
    <Formik
      initialValues={
        slice.selectedPost
        ||
        {
          image: null,
          name: "",
          description: "",
          category: ""
        }
      }
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        if (postId) { //updating Post
          delete values.Id;
          let Base64Obj = '';
          await getBase64(values.image)
          .then(res => Base64Obj = res)
          .catch(err => console.log(err))
          const updateObj = { postId, ...values, image: typeof(values.image) =='string'? values.image :Base64Obj }
          await dispatch(updatePost(updateObj));
        } else {
          let Base64Obj = '';
          await getBase64(values.image)
            .then(res => Base64Obj = res)
            .catch(err => console.log(err))

          const createObj = { ...values, image: Base64Obj }
          console.log('values for post',)
          await dispatch(createPost(createObj));
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
          <Container sx={{ py: 4 }} maxWidth="sm" >
            <Box gap={2} display={"flex"} alignItems={"center"} textAlign={"center"} flexDirection={"column"}>
              <Typography sx={{ my: 3 }} color={"GrayText"} variant="h3"> {postId ? "Edit" : "Create"} Post</Typography>
              <ImageUploader 
               base64Data={postId ? values.image : null}
                onChange={(e) => imageOnchange(e, setFieldValue)}
                helperText={touched.image && errors.image}
                error={touched.image && Boolean(errors.image)}
                size={200} />

              <TextField
                name="name"
                fullWidth
                label="Name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />

              <TextField
                name="description"
                fullWidth
                label="Description"
                multiline
                rows={4}
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.description && Boolean(errors.description)}
                helperText={touched.description && errors.description}
              />

              <TextField
                select
                name="category"
                fullWidth
                label="Category"
                value={values.category}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.category && Boolean(errors.category)}
                helperText={touched.category && errors.category}
              >
                {slice.categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.title}
                  </MenuItem>
                ))}
              </TextField>

              <Button sx={{ px: 10, mt: 4 }} type="submit" variant="contained">
                {postId ? "Edit" : "Create"}
              </Button>
            </Box>
          </Container>
        </form>
      )}
    </Formik>
  );
}
