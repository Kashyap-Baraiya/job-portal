import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NewjobDialog from './NewjobDialog';
import { setAllCompany } from '@/redux/companySlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import AdminJobCard from './AdminJobCard';
import useGetAllAdminJob from '@/hookes/useGetAllAdminJob';

function AdminJob() {
    useGetAllAdminJob();
    const [open,setOpen] = useState(false);
    const{adminAllJob} = useSelector(store => store.company);
     const navigate = useNavigate();
    const dispatch = useDispatch();
   
        useEffect(() => {
           const getAllCompany = async () => {
               try {
                   const res = await axios.get(
                       'http://localhost:8080/api/v1/company/get',
                       { withCredentials: true }
                   );
   
                   if (res.data.success) {
                       dispatch(setAllCompany(res.data.companies));
                   }
               } catch (error) {
                   console.log(error);
               }
           };
   
           getAllCompany();
       }, [dispatch]);
   
  return (
     <div className='max-w-7xl mx-auto my-10 p-3 min-h-[50vh]'>
        <div className='justify-between flex '>
            <div className='font-bold text-lg my-2 p-1'> My Jobs </div>
            <div><Button variant='outline' onClick={()=> setOpen(true)} className='bg-[#f4f4ff] w-full text-black'> Create Job</Button></div>
        </div>
         <NewjobDialog open={open} setOpen={setOpen} />

         <div className='grid grid-cols-1 sm:grid-cols-2  gap-3'>
          {adminAllJob.length>0 ? (<>{adminAllJob.map((job)=><AdminJobCard job={job} key={job._id}/>)}</>) : ( <p className='p-2'>Crate your first Job</p>)} 
         </div>
        </div>
  )
}

export default AdminJob
