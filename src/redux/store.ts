import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import { moviesReducer } from "@/redux/slice";
import {createWrapper} from "next-redux-wrapper";

const comb =combineReducers({
    movies: moviesReducer
});

const setupStore= () =>
    configureStore({
        reducer: comb,
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware({
                serializableCheck: false,
            }),
    });

type RootState = ReturnType<typeof comb>
type setup = ReturnType<typeof setupStore>
type AppDispatch = setup['dispatch']

export type {
    RootState,
    setup,
    AppDispatch
}

export {
    setupStore
}

export const wrapper =createWrapper<setup>(setupStore);
