import { createSlice } from "@reduxjs/toolkit";

export const companySlice = createSlice({
    name:"company",
    initialState:{
        allCompany:[],
        singleCompany:null,
        adminAllJob:[],
        adminSingleJob:null,
    },
    reducers:{
        setAllCompany:(state,action)=>{
            state.allCompany=action.payload;
        },
        setSingleCompany:(state,action)=>{
            state.singleCompany=action.payload;
        },
        setAdminAllJob:(state,action)=>{
            state.adminAllJob=action.payload;
        },
        setAdminSingleJob:(state,action)=>{
            state.singleAdminJob=action.payload;
        }
    }
})

export const{setSingleCompany,setAllCompany,setAdminAllJob,setAdminSingleJob} = companySlice.actions;
export default companySlice.reducer;