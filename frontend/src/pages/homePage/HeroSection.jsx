import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Search } from 'lucide-react';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchQuery } from '@/redux/jobSlice.js';

function HeroSection() {
    const [keyWord,setKeyWord] = useState("");
    const dispatch = useDispatch();
    // const {setSearchQuery} = useSelector(store => store.job);
    const navigate = useNavigate()
    const handleSubmit =async (e)=>{
        e.preventDefault();
        dispatch(setSearchQuery(keyWord));
        navigate('/jobs');
    }


    return (
        <div className=' text-center lg:w-full border-gray-200 border-t-0  border bg-[#f5f5ff] rounded-b-2xl  py-10'>
            <div className='flex flex-col gap-5 my-6'>
                <span id='heder' className='px-4 py-2 m-auto font-medium text-[red] border-gray-200 border bg-white rounded-full'>No 1. job Portal Website</span>
                <h1 className='text-5xl text-[#292929] font-bold p-3'>Search , Apply &<br />Get Your <span className='text-[#9f79ff]'>Dream Job</span></h1>
                <p className='px-3'>Build your future with the right opportunity discover, apply, and get hired with confidence.</p>
            </div>


            <form onSubmit={(e)=>handleSubmit(e)}>
            <div className='flex w-[80%]  sm:w-[60%] md:w-[35%] mx-auto rounded-full shadow-lg border bg-white border-gray-200 gap-4 pl-3 items-center'>
                <input type="text" className='outline-none border-none text-black w-full ' value={keyWord} onChange={(e)=>setKeyWord(e.target.value)} placeholder='search your deram job' name="" id="" />
                <Button className='bg-[#9f79ff] rounded-r-full'>
                    <Search className='text-white w-5 h-5'/>
                </Button>
            </div>
            </form>
        </div>
       
    )
}

export default HeroSection;
