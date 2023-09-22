import {useSelector} from "react-redux";
import {AppRootStateType} from "../store";
import {RequestStatusType} from "./app-reducer";

// We keep all selectors in the separateFile. If at one point we will decide the naming of the selector
// we can do it once here. Otherwise we will have to manually change it in a lot's of different component modules.

export const statusSelector = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
export const isLoggedInSelector = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
export const isInitializedSelector = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
