import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    bannerData :[],
    baseURL : ''
}

export const movieNextSlice = createSlice(
    {
        name:'movienext',
        initialState,
        reducers: {
            setBannerData: (state, action)=>{
                state.bannerData = action.payload
            },
            setBaseURL : (state, action)=>{
                state.baseURL = action.payload
            }
        }
    }
)

export const {setBannerData, setBaseURL} = movieNextSlice.actions

export const movieNextReducer = movieNextSlice.reducer