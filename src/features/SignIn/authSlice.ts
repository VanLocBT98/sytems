import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getProFileService } from 'common/services/auth';
import { ProfileTypes } from 'common/services/auth/types';

interface AuthStateTypes {
  data?: ProfileTypes;
  isPending?: boolean
}
const initialState: AuthStateTypes = {
  data: undefined,
  isPending: false
};
export const getProfileAsync = createAsyncThunk<ProfileTypes>('auth/profile', async (_, { rejectWithValue }) => {
  try {
    const res = await getProFileService();
    return res;
  } catch (error) {
    return rejectWithValue(error);
  }
});

// export const updateProfileAsync =
// createAsyncThunk<ProfileTypes, ProfilePayload, {}
// >('auth/profile/update', async (payload, { rejectWithValue }) => {
//   try {
//     const res = await apiUpdateProfile(payload);
//     return res;
//   } catch (error) {
//     return rejectWithValue(error);
//   }
// });
export const authSlice = createSlice({
  name: 'authReducer',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getProfileAsync.fulfilled, ($state, action) => {
      $state.isPending = false;
      $state.data = action.payload;
    });
    builder.addCase(getProfileAsync.pending, ($state) => {
      $state.isPending = true;
    });
  },
});

export default authSlice.reducer;
