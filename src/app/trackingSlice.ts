import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getInfoProjectService } from 'common/services/trackings';
import { ProjectInfoTypes } from 'common/services/trackings/types';

interface SystemState {
  projectInfo?: ProjectInfoTypes;
}
const initialState: SystemState = {
  projectInfo: undefined
};

export const getProjectInfoAsync = createAsyncThunk<
  ProjectInfoTypes,
  void,
  { rejectValue: ErrorResponse[] }
>('projectInfo/getProjectInfoAsync', async (_, { rejectWithValue }) => {
  try {
    const res = await getInfoProjectService();
    return res;
  } catch (error) {
    return rejectWithValue(error as ErrorResponse[]);
  }
});

export const trackingSlice = createSlice({
  name: 'systemReducer',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getProjectInfoAsync.fulfilled, ($state, action) => {
      $state.projectInfo = action.payload;
    });
  }
});

export default trackingSlice.reducer;
