import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ALERT_TYPE } from "../../common/constants";
import { api } from "../../utils/api";

const initialState = {
  messages: [],
};
const sliceName = "alert";

export const askAIThunk = createAsyncThunk("/askAI", api.askAI);

const alertSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    infoMessage: (state, action) => {
      state.messages.push({ message: action.payload, type: ALERT_TYPE.INFO });
    },
    successMessage: (state, action) => {
      state.messages.push({
        message: action.payload,
        type: ALERT_TYPE.SUCCESS,
      });
    },
    warningMessage: (state, action) => {
      state.messages.push({
        message: action.payload,
        type: ALERT_TYPE.WARNING,
      });
    },
    errorMessage: (state, action) => {
      state.messages.push({ message: action.payload, type: ALERT_TYPE.ERROR });
    },
    removeMessage: (state, action) => {
      const index = action.payload;
      state.messages.splice(index, 1);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(askAIThunk.fulfilled, (state) => {
      state.messages.push({
        message: "Data updated successfully.",
        type: ALERT_TYPE.SUCCESS,
      });
    });
    builder.addMatcher(askAIThunk.rejected, (state, action) => {
      if (action?.error?.message) {
        state.messages.push({
          message: action.error.message,
          type: ALERT_TYPE.ERROR,
        });
      }
    });
  },
  selectors: {
    getAlertMessages: (state) => state.messages,
  },
});

export const {
  infoMessage,
  successMessage,
  warningMessage,
  errorMessage,
  removeMessage,
} = alertSlice.actions;

export const { getAlertMessages } = alertSlice.selectors;

export default alertSlice.reducer;
