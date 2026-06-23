import { setAdminSingleJob } from '@/redux/companySlice';
import axios from 'axios'
import { Badge } from '@/components/ui/badge';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import ApplicationPage from './ApplicationPage';
import useGetAdminSingleJob from '@/hookes/useGetAdminSingleJob';
import toast from 'react-hot-toast';

function AdminJobDescription() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { singleAdminJob } = useSelector(store => store.company);
  const params = useParams();
  const jobId = params.id;

  useGetAdminSingleJob(jobId);

  const handelDelete = async (e) => {
    try {
      
      const res = await axios.delete(`http://localhost:8080/api/v1/job/delete/${jobId}`, { withCredentials: true });
      if(res.data.success){
        toast.success(res.data?.message);
        navigate('/admin/job');
      }
    } catch (error) {
       toast.error(error?.response?.data?.message);
    }

  }

  return (
    <div className='max-w-7xl mx-auto my-10 p-5 '>

      <div className='flex justify-between items-center'>
        <h1 className='font-bold text-2xl mb-2'>{singleAdminJob?.title}</h1>
        <button className='bg-black font-semibold text-white px-4 py-1 rounded-md' value={singleAdminJob?._id} onClick={(e) => { handelDelete(e) }}>DELETE</button>
        {/* <Button className={isApplied ? "bg-[#c8c8c8] text-black" : "bg-[#0b1128] text-white"} onClick={() => { jobApplyHandler() }} >{loading ? "Loading ..." : isApplied ? "Already Applied" : "Apply Now"}</Button> */}
      </div>

      <div className='flex flex-col '>
        <div className='flex text-center items-center gap-2 mb-3'>
          <Badge variant='outline' className='text-[blue]'>position :{singleAdminJob?.position}</Badge>
          <Badge variant='outline' className='text-[#F83002]'>{singleAdminJob?.jobType}</Badge>
          <Badge variant='outline' className='text-[#6A38C2]'>Salary : {singleAdminJob?.salary}</Badge>
        </div>

        <div className='font-bold my-2'>
          Job Description :
        </div>
        <hr />

        <div className='flex flex-col gap-0.5'>
          <div> <span className='font-semibold'>Role : </span><span className='text-gray-600'>{singleAdminJob?.title}</span></div>
          <div> <span className='font-semibold'>Location : </span><span className='text-gray-600'>{singleAdminJob?.location}</span></div>
          <div> <span className='font-semibold'>Description : </span><span className='text-gray-600'>{singleAdminJob?.description}</span></div>
          <div> <span className='font-semibold'>Experience Level : </span><span className='text-gray-600'>{singleAdminJob?.experienceLevel}</span></div>
          <div> <span className='font-semibold'>Salary : </span><span className='text-gray-600'>{singleAdminJob?.salary}</span></div>
          <div> <span className='font-semibold'>Total Applicants : </span><span className='text-gray-600'>{singleAdminJob?.applications.length}</span></div>
          <div className='flex'> <span className='font-semibold mr-3'>Requirements : </span><span className='text-gray-600'><div className='flex gap-2'>{singleAdminJob?.requirements.map(el => <Badge variant='outline' className='text-[#000000]'>{el}</Badge>)}</div></span></div>
          <div> <span className='font-semibold'>Posted Date : </span><span className='text-gray-600'>{singleAdminJob?.createdAt.split('T')[0]}</span></div>
        </div>
      </div>
      <br />
      <br />

      <div className='font-bold text-lg mb-5'>Applicant :</div>


      {singleAdminJob?.applications?.length > 0 ? (<div>{singleAdminJob?.applications.map((application) => { return <ApplicationPage application={application} /> })}</div>) : (<div>No applicant found</div>)}

    </div>
  )
}

export default AdminJobDescription
