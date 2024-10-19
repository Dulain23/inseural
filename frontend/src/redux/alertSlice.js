import { createSlice } from "@reduxjs/toolkit";

// Initial State of Global Error
const initialState = {
    status: false,
    success: null,
    message: '',
};

const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        // Action to set a Global Error
        setAlert: (state, action) => {
            state.status = true;
            state.type = action.payload.type;
            state.message = action.payload.message;
        },
        // Action to clear a Global Error
        clearAlert: (state) => {
            state.status = false;
            state.type = null;
            state.message = '';
        },
    },
});

export const { setAlert, clearAlert } = alertSlice.actions;

export default alertSlice.reducer;