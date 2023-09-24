import {useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {RequestStatusType} from "./app-reducer";

// We keep all selectors in the separateFile. If at one point we will decide the naming of the selector
// we can do it once here. Otherwise we will have to manually change it in a lot's of different component modules.

export const statusSelector = (state: AppRootStateType) => state.app.status
export const isLoggedInSelector = (state: AppRootStateType) => state.login.isLoggedIn
export const isInitializedSelector = (state: AppRootStateType) => state.app.isInitialized
