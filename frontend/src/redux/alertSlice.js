import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    success: null,
    message: '',
};

const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        setAlert: (state, action) => {
            state.status = true;
            state.type = action.payload.type;
            state.message = action.payload.message;
        },
        clearAlert: (state) => {
            state.status = false;
            state.type = null;
            state.message = '';
        },
    },
});

export const { setAlert, clearAlert } = alertSlice.actions;

export default alertSlice.reducer;