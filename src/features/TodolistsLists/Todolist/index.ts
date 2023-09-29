import {asyncActions as todolistsAsyncActions, slice} from "./reducers/todolists-reducer";

const todolistsActions = {
    ...todolistsAsyncActions,
    ...slice.actions
}

export {
    todolistsActions,
}