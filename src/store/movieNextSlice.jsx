import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    bannerData :[],
    baseURL : '',
    nowPlaying: []
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
            },
            setNowPlaying:(state, action)=>{
                state.nowPlaying = action.payload
            }
        }
    }
)

export const {setBannerData, setBaseURL, setNowPlaying} = movieNextSlice.actions

export const movieNextReducer = movieNextSlice.reducer