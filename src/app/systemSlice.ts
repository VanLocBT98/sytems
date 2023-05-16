import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { GetAllTrackingsParamsTypes } from 'common/services/trackings/types';

interface SystemState {
  statusError?: ErrorStatusCode;
  showModalError: boolean;
  rawDataFilter?: GetAllTrackingsParamsTypes;
}

const initialState: SystemState = {
  showModalError: false,
  rawDataFilter: undefined
};

export const systemSlice = createSlice({
  name: 'systemReducer',
  initialState,
  reducers: {
    setGlobalError($state, action: PayloadAction<ErrorStatusCode>) {
      $state.statusError = action.payload;
      $state.showModalError = true;
    },
    hideModalError($state) {
      $state.showModalError = false;
    },
    updateRawDataFilter($state, action: PayloadAction<GetAllTrackingsParamsTypes>) {
      $state.rawDataFilter = action.payload;
    },
  }
});

export const { setGlobalError, hideModalError, updateRawDataFilter } = systemSlice.actions;

export default systemSlice.reducer;
