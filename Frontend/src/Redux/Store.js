import {combineReducers}from 'redux';
import { configureStore } from "@reduxjs/toolkit";
import UserReducer from './Reducer/UserReducer';
const rootreducer=combineReducers({UserReducer});

export const Store=configureStore({
    reducer: rootreducer,
 }
);