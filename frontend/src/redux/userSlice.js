import { createSlice } from "@reduxjs/toolkit";

// Initial State of User
// const initialState = (() => {
//     // Get from Local Storage if User exists if not return null
//     const persistRoot = JSON.parse(localStorage.getItem('persist:root'));
//     if (persistRoot?.user) {
//         try {
//             const userState = JSON.parse(persistRoot.user);
//             return {
//                 currentUser: userState.currentUser || null
//             };
//         } catch (error) {
//             console.error('Authorization Error - Failed to retrieve user details from local storage.', error);
//             return { currentUser: null };
//         }
//     } else {
//         return { currentUser: null };
//     }
// })();
const initialState = {
    currentUser: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // Action to set new user
        loginSuccess: (state, action) => {
            state.currentUser = {
                ...action.payload.user,
                permissions: action.payload.permissions,
            };
        },
        // Action to clear user
        logoutSuccess: (state) => {
            state.currentUser = null;
        },
        // Action to update user
        updateSuccess: (state, action) => {
            state.currentUser = {
                ...action.payload.user,
                permissions: action.payload.permissions,
            };
        }
    }
});

export const { loginSuccess, logoutSuccess, updateSuccess } = userSlice.actions;

export default userSlice.reducer;

