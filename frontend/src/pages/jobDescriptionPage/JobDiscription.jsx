import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { setSingleJob } from '@/redux/jobSlice';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

function JobDiscription() {
    const navigate = useNavigate();
    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.auth);
    const { singleJob } = useSelector(store => store.job);
    const[loading,setLoading] = useState(false);

    const isApplied = singleJob?.applications?.some(
        (app) => app?.applicant?._id === user?._id
    );



    useEffect(() => {
        const getSingleJob = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/v1/job/${jobId}`, { withCredentials: true });

                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                }

            } catch (error) {
                toast.error(error.response?.data?.message);
                navigate('/jobs');
            }
        }
        getSingleJob();
    }, [jobId, dispatch, isApplied]);


    const jobApplyHandler = async () => {
        try {
            setLoading(true);
            const res = await axios.post(`http://localhost:8080/api/v1/application/apply/${jobId}`, {}, {
                withCredentials: true,
            });
            if (res.data.success) {

                toast.success(res.data?.message);
                const updatedJob = await axios.get(
                    `http://localhost:8080/api/v1/job/${jobId}`,
                    { withCredentials: true }
                );

                dispatch(setSingleJob(updatedJob.data.job));
            }
        } catch (error) {
            toast.error(error.response?.data?.message);
            console.log(error?.response?.data?.message || "somthing went wrong");
        }finally{
            setLoading(false);
        }
    }



    return (
        <div className='max-w-7xl mx-auto my-10 p-5'>

            <div className='flex justify-between items-center '>
                <h1 className='font-bold text-2xl mb-2'>Fullstack WebDev Job</h1>
                <Button className={isApplied ? "bg-[#c8c8c8] text-black" : "bg-[#0b1128] text-white"} onClick={() => { jobApplyHandler() }} >{loading ? "Loading ..." : isApplied ? "Already Applied" : "Apply Now" }</Button>
            </div>

            <div className='flex flex-col '>
                <div className='flex text-center items-center gap-2 mb-3'>
                    <Badge variant='outline' className='text-[blue]'>position :{singleJob?.position}</Badge>
                    <Badge variant='outline' className='text-[#F83002]'>{singleJob?.jobType}</Badge>
                    <Badge variant='outline' className='text-[#6A38C2]'>Salary : {singleJob?.salary}</Badge>
                </div>

                <div className='font-bold my-2'>
                    Job Description :
                </div>
                <hr />

                <div className='flex flex-col gap-0.5'>
                    <div> <span className='font-semibold'>Role : </span><span className='text-gray-600'>{singleJob?.title}</span></div>
                    <div> <span className='font-semibold'>Location : </span><span className='text-gray-600'>{singleJob?.location}</span></div>
                    <div> <span className='font-semibold'>Description : </span><span className='text-gray-600'>{singleJob?.description}</span></div>
                    <div> <span className='font-semibold'>Experience Level : </span><span className='text-gray-600'>{singleJob?.experienceLevel}</span></div>
                    <div> <span className='font-semibold'>Salary : </span><span className='text-gray-600'>{singleJob?.salary}</span></div>
                    <div> <span className='font-semibold'>Total Applicants : </span><span className='text-gray-600'>{singleJob?.applications.length}</span></div>
                    <div className='flex flex-wrap'> <span className='font-semibold mr-3'>Requirements : </span><span className='text-gray-600'><div className='flex gap-2'>{singleJob?.requirements.map(el => <Badge variant='outline' className='text-[#000000]'>{el}</Badge>)}</div></span></div>
                    <div> <span className='font-semibold'>Posted Date : </span><span className='text-gray-600'>{singleJob?.createdAt.split('T')[0]}</span></div>

                </div>

            </div>
        </div>
    )
}

export default JobDiscription;
