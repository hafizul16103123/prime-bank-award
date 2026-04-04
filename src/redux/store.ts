import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userInfoReducer from "./slices/userInfoSlice";

const persistConfig = {
	key: "root",
	storage,
	whitelist: ["levels", "userResponses", "userInfo"],
};

const rootReducer = combineReducers({
	userInfo: userInfoReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [
					"persist/PERSIST",
					"persist/REHYDRATE",
					"persist/PAUSE",
					"persist/FLUSH",
					"persist/PURGE",
					"persist/REGISTER",
				],
			},
		}),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
