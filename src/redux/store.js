import { configureStore } from "@reduxjs/toolkit";
import { bucketReducer } from "./reducers/bucketReducer"; 
import { cardReducer } from "./reducers/cardReducer";

const store = configureStore({
    reducer : {
        bucket : bucketReducer,
        card : cardReducer
    }
})

export default store