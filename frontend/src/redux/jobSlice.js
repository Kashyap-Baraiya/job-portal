import { createSlice } from "@reduxjs/toolkit";


const jobSlice =createSlice({
    name:"job",

    initialState:{
        allJob:[],
        singleJob:null,
        appliedAllJob:[],
        searchQuery:null,
    },
    reducers:{
        setAllJobs:(state,action)=>{
            state.allJob = action.payload;
        },
        setSingleJob:(state,action)=>{
            state.singleJob = action.payload;
        },
        setAppliedAllJob:(state,action)=>{
            state.appliedAllJob=action.payload;
        },
        setSearchQuery:(state,action)=>{
            state.searchQuery=action.payload;
        }
    }
});

export const {setAllJobs,setSingleJob,setAppliedAllJob,setSearchQuery} = jobSlice.actions;
export default jobSlice.reducer;