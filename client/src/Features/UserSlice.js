import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import * as ENV from "../config"; 

const initialState = {
  value: [], // List of users
  user: JSON.parse(localStorage.getItem("user")) || null, // Persist user in localStorage
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "" // For storing error/success messages
};

// Register User
export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${ENV.SERVER_URL}/registerUser`, {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        
      });
      
      if (response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Registration failed"
      );
    }
  }
);

// Login User
export const login = createAsyncThunk(
  "users/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${ENV.SERVER_URL}/login`, {
        email: userData.email,
        password: userData.password,
      });

      if (response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Invalid credentials"
      );
    }
  }
);

// Logout User
export const logout = createAsyncThunk(
  "users/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axios.post(`${ENV.SERVER_URL}/logout`);
      localStorage.removeItem("user");
      return { message: "Logged out successfully" };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Logout failed"
      );
    }
  }
);

// Update User Profile
export const updateUserProfile = createAsyncThunk(
  "users/updateProfile",
  async ({ email, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${ENV.SERVER_URL}/updateUserProfile/${email}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Optional: store updated user
      if (response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      return response.data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Update failed"
      );
    }
  }
);

 
   

{/*export const updateUserProfile = createAsyncThunk(
  "users/updateProfile",
  async ({ email, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${ENV.SERVER_URL}/updateUserProfile/${email}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Update failed"
      );
    }
  }
);
*/}

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
    addUser: (state, action) => {
      state.value.push(action.payload);
    },
    deleteUser: (state, action) => {
      state.value = state.value.filter((user) => user.email !== action.payload);
    },
    updateUser: (state, action) => {
      state.value = state.value.map((user) => 
        user.email === action.payload.email ? action.payload : user
      );
    },
  },
  extraReducers: (builder) => {
    builder
      // Register User
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.user || null;
        state.message = action.payload.message || "Registration successful";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Registration failed";
      })

      // Login User
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.user || null;
        state.message = action.payload.message || "Login successful";
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Login failed";
      })

      // Logout User
      //extrareducer for logout
            .addCase(logout.pending, (state) => {
              state.isLoading = true;
            })
            .addCase(logout.fulfilled, (state) => {
              // Clear user data or perform additional cleanup if needed
              state.user = {};
              state.isLoading = false;
              state.isSuccess = false;
            })
            .addCase(logout.rejected, (state) => {
              state.isLoading = false;
              state.isError = true;
            })

   
        .addCase(updateUserProfile.pending, (state) => { 
          state.isLoading = true; 
        }) 
        .addCase(updateUserProfile.fulfilled, (state, action) => { 
          state.user = action.payload; 
          state.isLoading = false; 
        }) 
        .addCase(updateUserProfile.rejected, (state) => { 
          state.isLoading = false; 
          state.isError = true; 
        }); 
    }, 
  }) 

export const { reset, addUser, deleteUser, updateUser } = userSlice.actions;
export default userSlice.reducer;