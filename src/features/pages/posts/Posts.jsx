import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Button from "@mui/material/Button";
import { Box, Container, Grid } from "@mui/material";
import { Add } from "@mui/icons-material";
import CostumCard from "../../components/CostumCard";
import ConfirmDialog from "../../../components/ConfirmDialog";
import { useNavigate } from "react-router-dom";
import { UseAppDispatch, UseAppSelector } from "../../../store/configureStore";
import { deletePost, fetchPosts } from "./postSlice";

function Posts() {
  const dispatch = UseAppDispatch();
  const slice = UseAppSelector((state) => state.posts);
  const navigate = useNavigate();


  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [postsPerPage] = useState(4);
  const TotalPage = Math.ceil(slice.totalCounts / postsPerPage)
  const [deletePostId, setDeletePostId] = useState(null);

  const paginatedPost = slice.posts.slice(
    (page - 1) * postsPerPage,
    page * postsPerPage
  );


  const fetchData = async () => {
    await dispatch(fetchPosts());
  }

  useEffect(() => {
    fetchData()
  }, [])
 


  const handleOpenDialog = (postId) => {
    setDeletePostId(postId);
    setConfirmationDialogOpen(true);
  };

  const handleDeletePost = async () => {
    await dispatch(deletePost(deletePostId));
    fetchData();
  };

  return (
    <Container maxWidth="lg" sx={{ minHeight: 500 }}>
      <Box
        sx={{ my: 3 }}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h2" color={"GrayText"} component="h1">
          All Posts
        </Typography>
        <Button onClick={() => navigate("/post")} variant="contained" startIcon={<Add />} sx={{ px: 3 }}>
          <Typography variant="h6" component="h1">
            New Post
          </Typography>
        </Button>
      </Box>

      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"space-between"}
        sx={{
          minHeight: 300,
          height: "100%",
        }}
      >
        <Grid container spacing={4}>
          {
            paginatedPost.map((post) => (
              <Grid key={post.Id} item xs={12} sm={6} md={6}>
                <CostumCard cardData={post} handleClickDelete={handleOpenDialog} />
              </Grid>
            ))
          }
        </Grid>

        <Pagination sx={{ my: 3 }} page={page} onChange={(e, value) => setPage(value)} count={TotalPage} shape="rounded" />
      </Box>

      <ConfirmDialog

        children={<Typography color={"GrayText"}>Are you sure you want to delete this post?</Typography>}
        open={confirmationDialogOpen}
        setOpen={setConfirmationDialogOpen}
        onConfirm={handleDeletePost}

      />
    </Container>
  );
}

export default Posts;
