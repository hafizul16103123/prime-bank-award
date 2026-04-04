import { createSlice } from "@reduxjs/toolkit";

interface UserState {
	userData: {
		id: string;
		name: string;
		email: string;
		profileId: string;
		accessToken: string;
		refreshToken: string;
		role?: string;
	} | null;
}

const initialState: UserState = {
	userData: null,
};

const userInfoSlice = createSlice({
	name: "userInfo",
	initialState,
	reducers: {
		setUserData: (state, action) => {
			state.userData = action.payload;
		},
		clearUserData: (state) => {
			state.userData = null;
		},
	},
});

export const { setUserData, clearUserData } = userInfoSlice.actions;
export default userInfoSlice.reducer;
