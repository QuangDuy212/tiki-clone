import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface IInitValue {
    isAuthenticated: boolean,
    "user": {
        "email": string;
        "phone": string;
        "fullName": string;
        "role": string;
        "avatar": string;
        "id": string;
    }
}

const initialState: IInitValue = {
    isAuthenticated: false,
    "user": {
        "email": "",
        "phone": "",
        "fullName": "",
        "role": "",
        "avatar": "",
        "id": "",
    }
}

export const counterSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        doLogin: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.isAuthenticated = true;
            state.user.avatar = action?.payload?.user?.avatar;
            state.user.email = action?.payload?.user?.email;
            state.user.phone = action?.payload?.user?.phone;
            state.user.fullName = action?.payload?.user?.fullName;
            state.user.id = action?.payload?.user?.id;
            state.user.role = action?.payload?.user?.role;
        },
        doLogout: (state) => {
            state.isAuthenticated = false;
            state.user.avatar = "";
            state.user.email = "";
            state.user.phone = "";
            state.user.fullName = "";
            state.user.id = "";
            state.user.role = "";
            localStorage.removeItem("access_token");
        },
        doGetAccount: (state, action) => {
            state.isAuthenticated = true;
            state.user.avatar = action?.payload?.user?.avatar;
            state.user.email = action?.payload?.user?.email;
            state.user.phone = action?.payload?.user?.phone;
            state.user.fullName = action?.payload?.user?.fullName;
            state.user.id = action?.payload?.user?.id;
            state.user.role = action?.payload?.user?.role;
        },
        doUpdateUser: (state, action) => {
            state.user = {
                ...state.user,
                id: action.payload._id,
                email: action.payload.email,
                fullName: action.payload.fullName,
                avatar: action.payload.avatar,
            }
        }
    },
})

// Action creators are generated for each case reducer function
export const { doLogin, doLogout, doUpdateUser, doGetAccount } = counterSlice.actions

export default counterSlice.reducer