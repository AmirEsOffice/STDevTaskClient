import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import agent from '../../../api/agent';
import { toast } from 'react-toastify';
import { router } from '../../../router/Routes';

export const fetchCategories = createAsyncThunk(
  'posts/fetchCategories',
  async () => {
    const response = await agent.Category.List();
    return response;
  }
);

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async () => {
    const response = await agent.Posts.List();
    return response;
  }
);

export const fetchPostById = createAsyncThunk(
  'posts/fetchPostById',
  async (id) => {
    const response = await agent.Posts.getOneById(id);
    return response;
  }
);

// Delete a post
export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (postId) => {
    await agent.Posts.Delete(postId);
    return postId;
  }  
);

export const createPost = createAsyncThunk(
  'posts/createPost',
  async (initialPost) => {
    let formData = new FormData();
    formData.append("file", initialPost.image);
    const response = await agent.Posts.Add(initialPost);
    return response.data;
  }
);

export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async (initialPost) => {
    const { postId} = initialPost;
    const response = await agent.Posts.Update(postId, initialPost);
    return response.data;
  } 
);

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    categories:[],
    selectedPost: null,
    totalCounts:0,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
  },
  reducers: {
  },
  extraReducers: {
    [createPost.pending]: (state, action) => {
      state.status = 'loading';
    },
    [createPost.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      toast.success('Post created successfully');
      setTimeout(() => {
        router.navigate('/');
      }, 2000); 
    },
    [createPost.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error;
    },
    [updatePost.pending]: (state, action) => {
      state.status = 'loading';
    },
    [updatePost.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      toast.success('Post updated successfully');
      setTimeout(() => {
        router.navigate('/');
      }, 2000); 
    },
    [updatePost.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error;
    },

    [fetchPosts.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.status = 'idle';
      state.posts = action.payload;
      state.totalCounts = action.payload.length;
      state.selectedPost = null
    },
    [fetchPosts.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error; 
    },
    [fetchPostById.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchPostById.fulfilled]: (state, action) => {
      state.status = 'idle';
      state.selectedPost = action.payload;
    },
    [fetchPostById.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error; 
    },
    [deletePost.pending]: (state) => {
      state.status = 'loading';
    },
    [deletePost.fulfilled]: (state, action) => {
      state.status = 'idle';
      toast.warn('Post Deleted successfully');
    },
    [deletePost.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error;
    },
    [fetchCategories.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchCategories.fulfilled]: (state, action) => {
      state.status = 'idle';
      state.categories = action.payload;
    },
    [fetchCategories.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error; 
    },
  }
});

export const { } = postSlice.actions;
export default postSlice.reducer;