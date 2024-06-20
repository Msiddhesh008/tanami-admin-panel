import { createSlice } from "@reduxjs/toolkit";

// export const AuthMe = createAsyncThunk(
//   "auth/Me",
//   async (args, { rejectWithValue, dispatch }) => {
//     try {
//       const res = await authMeService();
//       if (res?.status === 200) return res.data;
//       return rejectWithValue(res);
//     } catch (err) {
//       return rejectWithValue(err.response);
//     }
//   }
// );

const initialState = {
  isLoading: true,
  isError: false,
  error: null,
  message: null,
  isAuthenticate: false,
};

const authMeSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    logoutUser: (state, action) => {
      state = initialState;
    },
    loginUser: (state, action) => {
      state.isAuthenticate = action.payload;
    },
  },
  //   extraReducers: (builder) => {
  //     builder
  //       .addCase(AuthMe.pending, (state) => {
  //         state.isLoading = true;
  //       })
  //       .addCase(AuthMe.fulfilled, (state, action) => {
  //         state.isLoading = false;
  //         state.profileData = action.payload?.data;
  //       })
  //       .addCase(AuthMe.rejected, (state, action) => {
  //         state.isLoading = false;
  //       })
  //       .addCase(AuthReGenrateAccessToken.pending, (state) => {
  //         state.isLoading = true;
  //       })
  //       .addCase(AuthReGenrateAccessToken.fulfilled, (state, action) => {
  //         state.isLoading = false;
  //         state.accessToken = action.payload?.accessToken || null;
  //       })
  //       .addCase(AuthReGenrateAccessToken.rejected, (state) => {
  //         state.isAuthenticate = false;
  //         state.isLoading = false;
  //       })
  //       .addCase(AuthLogin.pending, (state) => {
  //         state.isLoading = true;
  //       })
  //       .addCase(AuthLogin.fulfilled, (state, action) => {
  //         state.isLoading = false;
  //         state.isAuthenticate = true;
  //         state.role = action.payload.role[0].title;
  //         state.group = action.payload.group[0].title;
  //         state.actions = action.payload.role[0].actions;
  //         state.resources = action.payload.resources;
  //         state.accessToken = action.payload.accessToken;
  //         state.refreshToken = action.payload.refreshToken;
  //       })
  //       .addCase(AuthLogin.rejected, (state, action) => {
  //         state.isLoading = false;
  //         state.isError = true;
  //         state.error = action.payload;
  //       });
  //   },
});

export const { logoutUser, loginUser } = authMeSlice.actions;
export default authMeSlice.reducer;
