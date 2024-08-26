import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { categoryApiReducer, categoryApiMiddleware } from '../api/categoryApi'
import { itemApiReducer, itemApiMiddleware } from '../api/itemApi'
import { infoReducer } from './infoSlice'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

const reducer = combineReducers({
    categoryApiReducer,
    itemApiReducer,
    infoReducer
})

export const store = configureStore({
    reducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(
            categoryApiMiddleware,
            itemApiMiddleware
        )
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector