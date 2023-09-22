// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import {Provider} from "react-redux";
// import {store} from "./store";
// import App from "./app/App";
// import BrowserProvider, {BrowserRouter} from "react-router-dom";
//
// const root = ReactDOM.createRoot(
//     document.getElementById('root') as HTMLElement
// );
// root.render(
//     <Provider store={store}>
//         <BrowserRouter>
//             <App/>
//         </BrowserRouter>
//     </Provider>
// );



//1,
// import React, { useState } from 'react'
// import ReactDOM from 'react-dom/client';
// import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
// import axios, { AxiosError } from 'axios';
// import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux';
// import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
//
//
// // Types
// type NullableType<T> = null | T
//
// type LoginFieldsType = {
//     email: string
//     password: string
// }
//
// // API
// const instance = axios.create({baseURL: 'https://exams-frontend.kimitsu.it-incubator.ru/api/'})
//
// const api = {
//     login(data: LoginFieldsType) {
//         return instance.post('auth/login', data)
//     },
// }
//
//
// // Reducer
// const initState = {
//     isLoading: false,
//     error: null as NullableType<string>,
//     isLoggedIn: false,
// }
//
// type InitStateType = typeof initState
//
// const appReducer = (state: InitStateType = initState, action: ActionsType): InitStateType => {
//     switch (action.type) {
//         case 'APP/SET-IS-LOGGED-IN':
//             return {...state, isLoggedIn: action.isLoggedIn}
//         case 'APP/IS-LOADING':
//             return {...state, isLoading: action.isLoading}
//         case 'APP/SET-ERROR':
//             return {...state, error: action.error}
//         default:
//             return state
//     }
// }
//
// // Actions
// const setIsLoggedIn = (isLoggedIn: boolean) => ({type: 'APP/SET-IS-LOGGED-IN', isLoggedIn} as const)
// const setLoadingAC = (isLoading: boolean) => ({type: 'APP/IS-LOADING', isLoading} as const)
// const setError = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
// type ActionsType = | ReturnType<typeof setIsLoggedIn> | ReturnType<typeof setLoadingAC> | ReturnType<typeof setError>
//
// // Thunk
// const loginTC = (values: LoginFieldsType): AppThunk => (dispatch) => {
//     dispatch(setLoadingAC(true))
//     api.login(values)
//         .then((res) => {
//             dispatch(setIsLoggedIn(true))
//             alert('Вы залогинились успешно')
//         })
//         .catch((e) => {
//             console.log(e.response.data.errors)
//             setError(e.response.data.errors)
//         })
//         .finally(() => {
//             dispatch(setLoadingAC(false))
//         })
// }
//
// // Store
// const rootReducer = combineReducers({
//     app: appReducer,
// })
//
// const store = createStore(rootReducer, applyMiddleware(thunk))
// type RootState = ReturnType<typeof store.getState>
// type AppDispatch = ThunkDispatch<RootState, unknown, ActionsType>
// type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, ActionsType>
// const useAppDispatch = () => useDispatch<AppDispatch>()
// const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
//
//
// // Loader
// export const Loader = () => {
//     return <h1>Loading ...</h1>
// }
//
// // App
// export const App = () => {
//
//     const dispatch = useAppDispatch()
//
//     const [form, setForm] = useState<LoginFieldsType>({email: '', password: ''})
//
//     const error = useAppSelector(state => state.app.error)
//     const isLoading = useAppSelector(state => state.app.isLoading)
//
//     const changeFormValuesHandler = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
//         if (field === 'email') {
//             setForm({...form, email: e.currentTarget.value})
//         }
//         if (field === 'password') {
//             setForm({...form, password: e.currentTarget.value})
//         }
//     };
//
//     const submitForm = (e: React.MouseEvent<HTMLButtonElement>) => {
//         e.preventDefault()
//         dispatch(loginTC(form))
//     };
//
//     return (
//         <div>
//             {!!error && <h2 style={{color: 'red'}}>{error}</h2>}
//             {isLoading && <Loader/>}
//             <form>
//                 <div>
//                     <input placeholder={'Введите email'}
//                            value={form.email}
//                            onChange={(e) => changeFormValuesHandler(e, 'email')}
//                     />
//                 </div>
//                 <div>
//                     <input type={'password'}
//                            placeholder={'Введите пароль'}
//                            value={form.password}
//                            onChange={(e) => changeFormValuesHandler(e, 'password')}
//                     />
//                 </div>
//                 <button type="submit" onClick={submitForm}>Залогиниться</button>
//             </form>
//         </div>
//     );
// }
//
// const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
// root.render(<Provider store={store}> <App/></Provider>)
//
// // 📜 Описание:
// // Перед вами форма логинизации. Введите любые логин и пароль и попробуйте залогиниться.
// // У вас это навряд ли получится 😈, т.к. вы не знаете email и пароль.
// // Откройте Network и проанализируйте запрос.
// // Задача: вывести сообщение об ошибке, которую возвращает сервера говорящую о том что email или password некорректны.
//
// // В качестве ответа указать строку коду, которая позволит это осуществить.
// // 🖥 Пример ответа: dispatch('Error message')
// // ❗ Типизировать ошибку не надо, т.к. там есть много нюансов, о которых вы узнаете позже

//2
// import React, { useEffect } from 'react'
// import ReactDOM from 'react-dom/client';
// import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'
// import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
// import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
// import axios from 'axios';
//
// // Types
// type PostType = {
//     body: string
//     id: string
//     title: string
//     userId: string
// }
//
// type PayloadType = {
//     title: string
//     body?: string
// }
//
//
// // Api
// const instance = axios.create({baseURL: 'https://exams-frontend.kimitsu.it-incubator.ru/api/'})
//
// const postsAPI = {
//     getPosts() {
//         return instance.get<PostType[]>('posts')
//     },
//     updatePostTitle(postId: string, post: PayloadType) {
//         return instance.put<PostType>(`posts/${postId}`, post)
//     }
// }
//
//
// // Reducer
// const initState = [] as PostType[]
//
// type InitStateType = typeof initState
//
// const postsReducer = (state: InitStateType = initState, action: ActionsType): InitStateType => {
//     switch (action.type) {
//         case 'POSTS/GET-POSTS':
//             return action.posts
//
//         case 'POSTS/UPDATE-POST-TITLE':
//             return state.map((p) => {
//                 debugger
//                 if (p.id === action.post.id) {
//                     return {...p, title: action.post.title}
//                 } else {
//                     return p
//                 }
//             })
//
//         default:
//             return state
//     }
// }
//
// const getPostsAC = (posts: PostType[]) => ({type: 'POSTS/GET-POSTS', posts} as const)
// const updatePostTitleAC = (post: PostType) => ({type: 'POSTS/UPDATE-POST-TITLE', post} as const)
// type ActionsType = ReturnType<typeof getPostsAC> | ReturnType<typeof updatePostTitleAC>
//
// const getPostsTC = (): AppThunk => (dispatch) => {
//     postsAPI.getPosts()
//         .then((res) => {
//             dispatch(getPostsAC(res.data))
//         })
// }
//
// const updatePostTC = (postId: string): AppThunk => (dispatch, getState: any) => {
//     debugger
//     try {
//         debugger
//         console.log(getState())
//         console.log(postId)
//         const currentPost = getState().find((p: PostType) => p.id === postId) // tut gavno
//         console.log(currentPost)
//
//         if (currentPost) {
//             const payload = {title: 'Это просто заглушка. Backend сам сгенерирует новый title'}
//             postsAPI.updatePostTitle(postId, payload)
//                 .then((res) => {
//                     dispatch(updatePostTitleAC(res.data))
//                 })
//         }
//     } catch (e) {
//         alert('Обновить пост не удалось 😢')
//     }
//
// }
//
// // Store
// const rootReducer = combineReducers({
//     posts: postsReducer,
// })
//
// const store = createStore(rootReducer, applyMiddleware(thunk))
// type RootState = ReturnType<typeof store.getState>
// type AppDispatch = ThunkDispatch<RootState, unknown, ActionsType>
// type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, ActionsType>
// const useAppDispatch = () => useDispatch<AppDispatch>()
// const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
//
// // App
// const App = () => {
//     const dispatch = useAppDispatch()
//     const posts = useAppSelector(state => state.posts)
//
//     useEffect(() => {
//         dispatch(getPostsTC())
//     }, [])
//
//     const updatePostHandler = (postId: string) => {
//         debugger
//         dispatch(updatePostTC(postId))
//     }
//
//     return (
//         <>
//             <h1>📜 Список постов</h1>
//             {
//                 posts.map(p => {
//                     return <div key={p.id}>
//                         <b>title</b>: {p.title}
//                         <button onClick={() => updatePostHandler(p.id)}>Обновить пост</button>
//                     </div>
//                 })
//             }
//         </>
//     )
// }
//
// const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
// root.render(<Provider store={store}> <App/></Provider>)
//
// // 📜 Описание:
// // Попробуйте обновить пост и вы увидите alert с ошибкой.
// // Debugger / network / console.log вам в помощь
// // Найдите ошибку и вставьте исправленную строку кода в качестве ответа.
//
// // 🖥 Пример ответа: const payload = {...currentPost, tile: 'Летим 🚀'}

//3


// import axios from 'axios'
// import React, { useEffect } from 'react'
// import ReactDOM from 'react-dom/client';
// import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
// import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux';
// import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
//
// // Types
// type CommentType = {
//     postId: string
//     id: string
//     name: string
//     email: string
//     body: string
// }
//
// // Api
// const instance = axios.create({baseURL: 'https://exams-frontend.kimitsu.it-incubator.ru/api/'})
//
// const commentsAPI = {
//     getComments() {
//         return instance.get<CommentType[]>('comments')
//     }
// }
//
// // Reducer
// const initState = [] as CommentType[]
//
// type InitStateType = typeof initState
//
// const commentsReducer = (state: InitStateType = initState, action: ActionsType): InitStateType => {
//     switch (action.type) {
//         case 'COMMENTS/GET-COMMENTS':
//             return action.comments
//         default:
//             return state
//     }
// }
//
// const getCommentsAC = (comments: CommentType[]) => ({type: 'COMMENTS/GET-COMMENTS', comments} as const)
// type ActionsType = ReturnType<typeof getCommentsAC>
//
// const getCommentsTC = (): ThunkAction<any, any, any, any> => (dispatch) => {
//     commentsAPI.getComments()
//         .then((res) => {
//             dispatch(getCommentsAC(res.data))
//         })
// }
//
//
// // Store
// const rootReducer = combineReducers({
//     comments: commentsReducer,
// })
//
// const store = createStore(rootReducer, applyMiddleware(thunk))
// type RootState = ReturnType<typeof store.getState>
// type AppDispatch = ThunkDispatch<RootState, unknown, ActionsType>
// const useAppDispatch = () => useDispatch<AppDispatch>()
// const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
//
// // App
// export const App = () => {
//
//     const comments = useAppSelector(state => state.comments)
//     const dispatch = useAppDispatch()
//
//     useEffect(() => {
//         dispatch(getCommentsTC())
//     }, [])
//
//     return (
//         <>
//             <h1>📝 Список комментариев</h1>
//             {
//                 comments.map(c => {
//                     return <div key={c.id}><b>Comment</b>: {c.body} </div>
//                 })
//             }
//         </>
//     )
// }
//
//
// const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
// root.render(<Provider store={store}> <App/></Provider>)
//
// // 📜 Описание:
// // Ваша задача стоит в том чтобы правильно передать нужные типы в дженериковый тип ThunkAction<any, any, any, any>.
// // Что нужно написать вместо any, any, any, any чтобы правильно типизировать thunk creator?
// // Ответ дайте через пробел
//
// // 🖥 Пример ответа: unknown status isDone void
//

//SAVE FOR FUTURE EXAMPLE!!! How to disabled button !!!!
// import React, { useEffect } from 'react'
// import ReactDOM from 'react-dom/client';
// import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'
// import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
// import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'
// import axios from 'axios';
//
//
// // Types
// type PostDomainType = PostType & {
//     isDisabled: boolean
// }
//
// type PostType = {
//     body: string
//     id: string
//     title: string
//     userId: string
// }
//
//
// // Api
// const instance = axios.create({baseURL: 'https://exams-frontend.kimitsu.it-incubator.ru/api/'})
//
// const postsAPI = {
//     getPosts() {
//         return instance.get<PostType[]>('posts')
//     },
//     deletePost(id: string) {
//         return instance.delete<{ message: string }>(`posts/${id}?delay=3`)
//     }
// }
//
//
// // Reducer
// const initState = {
//     isLoading: false,
//     posts: [] as PostDomainType[]
// }
//
// type InitStateType = typeof initState
//
// const postsReducer = (state: InitStateType = initState, action: ActionsType): InitStateType => {
//     switch (action.type) {
//         case 'POSTS/GET-POSTS':
//             return {
//                 ...state, posts: action.posts.map(t => {
//                     return {...t, isDisabled: false}
//                 })
//             }
//
//         case 'POSTS/DELETE-POST':
//             return {...state, posts: state.posts.filter(t => t.id !== action.id)}
//
//         case 'POSTS/IS-LOADING':
//             return {...state, isLoading: action.isLoading}
//
//         case 'POSTS/IS-DISABLED':
//             return {
//                 ...state, posts: state.posts.map((t) => {
//                     if (t.id === action.id) {
//                         return {...t, isDisabled: action.isDisabled}
//                     } else {
//                         return t
//                     }
//                 })
//             }
//
//         default:
//             return state
//     }
// }
//
// const getPostsAC = (posts: PostType[]) => ({type: 'POSTS/GET-POSTS', posts} as const)
// const deletePostAC = (id: string) => ({type: 'POSTS/DELETE-POST', id} as const)
// const setLoadingAC = (isLoading: boolean) => ({type: 'POSTS/IS-LOADING', isLoading} as const)
// const setIsDisabled = (isDisabled: boolean, id: string) => ({type: 'POSTS/IS-DISABLED', isDisabled, id} as const)
// type ActionsType =
//     | ReturnType<typeof getPostsAC>
//     | ReturnType<typeof deletePostAC>
//     | ReturnType<typeof setLoadingAC>
//     | ReturnType<typeof setIsDisabled>
//
// // Thunk
// const getPostsTC = (): AppThunk => (dispatch) => {
//     postsAPI.getPosts()
//         .then((res) => {
//             dispatch(getPostsAC(res.data))
//         })
// }
//
// const deletePostTC = (id: string): AppThunk => (dispatch) => {
//     dispatch(setIsDisabled(true, id))
//     dispatch(setLoadingAC(true))
//     postsAPI.deletePost(id)
//         .then((res) => {
//             dispatch(deletePostAC(id))
//             dispatch(setLoadingAC(false))
//         })
// }
//
// // Store
// const rootReducer = combineReducers({
//     posts: postsReducer,
// })
//
// const store = createStore(rootReducer, applyMiddleware(thunk))
// type RootState = ReturnType<typeof store.getState>
// type AppDispatch = ThunkDispatch<RootState, unknown, ActionsType>
// type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, ActionsType>
// const useAppDispatch = () => useDispatch<AppDispatch>()
// const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
//
//
// // Loader
// export const Loader = () => {
//     return (
//         <h1>Loading ...</h1>
//     )
// }
//
// // App
// const App = () => {
//     const dispatch = useAppDispatch()
//     const posts = useAppSelector(state => state.posts.posts)
//     const isLoading = useAppSelector(state => state.posts.isLoading)
//
//     useEffect(() => {
//         dispatch(getPostsTC())
//     }, [])
//
//     const deletePostHandler = (id: string) => {
//         dispatch(deletePostTC(id))
//     };
//
//     return (
//         <div>
//             <div style={{position: 'absolute', top: '0px'}}>
//                 {isLoading && <Loader/>}
//             </div>
//             <div style={{marginTop: '100px'}}>
//                 <h1>📜 Список постов</h1>
//                 {posts.map(p => {
//                     return (
//                         <div key={p.id}>
//                             <b>title</b>: {p.title}
//                             <button style={{marginLeft: '15px'}}
//                                     onClick={() => deletePostHandler(p.id)}
//                                     disabled={p.isDisabled}
//                             >
//                                 удалить пост
//                             </button>
//                         </div>
//                     )
//                 })}
//             </div>
//         </div>
//     )
// }
//
// const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
// root.render(<Provider store={store}> <App/></Provider>)
//
// // 📜 Описание:
// // Перед вами список постов.
// // Откройте network и быстро нажмите на кнопку удалить пост несколько раз подряд.
// // Откройте вкладку Preview и проанализируйте ответ с сервера
// // Первое сообщение будет "Post has been successfully deleted",
// // а следующие "Post with id: 63626ac315d01f80765587ee does not exist"
// // Т.е. бэкенд первый раз удаляет, а потом уже не может, т.к. пост удален из базы данных.
//
// // Ваша задача при первом клике задизаблить кнопку удаления,
// // соответсвенно не давать пользователю возможности слать повторные запросы
// // Необходимую строку кода для решения этой задачи напишите в качестве ответа.
//
// // 🖥 Пример ответа: style={{marginRight: '20px'}}

import React from 'react'
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'


export const PageNotFound = () => {
    return <h2>⛔ 404. Page not found ⛔</h2>
}

export const Profile = () => {
    return <h2>😎 Профиль</h2>
}


export const Main = () => {
    return (
        <>
            <h2>✅ Список тудулистов</h2>
            <h2>📜 Список постов</h2>
        </>
    )
}

// App
export const App = () => {

    return (
        <Routes>
            <Route path={'profile'} element={<Profile/>}/>
            <Route path={'*'} element={<Navigate to="/profile" />} />
        </Routes>
    )
}


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<BrowserRouter><App/></BrowserRouter>)

// 📜 Описание:
// Вместо ХХХ напишите роут таким образом, чтобы вне зависимости от того чтобы будет в урле (login или home или...)
// вас всегда редиректило на страницу профиля и при в это в урле по итогу
// был адрес /profile

// 🖥 Пример ответа: <Route path={'/'} element={'to profile page'}/>