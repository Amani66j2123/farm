import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  posts: [],
  comments: [],
  likes: [],
  status: "idle",
  error: null,
};

export const savePost = createAsyncThunk(
  "posts/savePost",
  async (postData, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:3001/savePost", {
        postMsg: postData.postMsg,
        email: postData.email,
      });
      return response.data.post;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to save post");
    }
  }
);

export const getPosts = createAsyncThunk(
  "post/getPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:3001/getPosts");
      return response.data.posts;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch posts");
    }
  }
);

export const likePost = createAsyncThunk(
  "posts/likePost",
  async (postData, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/likePost/${postData.postId}`,
        { userId: postData.userId }
      );
      return response.data.post;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to like post");
    }
  }
);

// New dislike post thunk
export const dislikePost = createAsyncThunk(
  "posts/dislikePost",
  async (postData, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/dislikePost/${postData.postId}`,
        { userId: postData.userId }
      );
      return response.data.post;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to dislike post"
      );
    }
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Save Post
      .addCase(savePost.pending, (state) => {
        state.status = "loading";
        state.error = null; // Clear any previous errors
      })
      .addCase(savePost.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload) {
          state.posts.unshift(action.payload);
        }
      })
      .addCase(savePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // Use the payload from rejectWithValue
      })

      // Get Posts
      .addCase(getPosts.pending, (state) => {
        state.status = "loading";
        state.error = null; // Clear any previous errors
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload || [];
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // Use the payload from rejectWithValue
      })

      // Like Post
      .addCase(likePost.pending, (state) => {
        state.status = "loading";
        state.error = null; // Clear any previous errors
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedPostIndex = state.posts.findIndex(
          (post) => post._id === action.payload._id
        );
        if (updatedPostIndex !== -1) {
          state.posts[updatedPostIndex].likes = action.payload.likes;
        }
      })
      .addCase(likePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // Use the payload from rejectWithValue
      })

      // Dislike Post (new)
      .addCase(dislikePost.pending, (state) => {
        state.status = "loading";
        state.error = null; // Clear any previous errors
      })
      .addCase(dislikePost.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedPostIndex = state.posts.findIndex(
          (post) => post._id === action.payload._id
        );
        if (updatedPostIndex !== -1) {
          state.posts[updatedPostIndex].dislikes = action.payload.dislikes; // Corrected line
        }
      })
      .addCase(dislikePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // Use the payload from rejectWithValue
      });
  },
});

export default postSlice.reducer;