import {Login} from "./Login";
import {asyncActions, slice} from "./login-reducer";

const authActions = {
    ...asyncActions,
    ...slice.actions
}

export {
    Login,
    authActions
}

