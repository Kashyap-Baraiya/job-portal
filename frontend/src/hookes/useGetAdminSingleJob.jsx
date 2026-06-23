import { setAdminSingleJob } from '@/redux/companySlice';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

function useGetAdminSingleJob(jobId) {
    const dispatch = useDispatch();
    useEffect(() => {
        const getSingleJob = async() => {
            try {
                const res = await axios.get(`http://localhost:8080/api/v1/job/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setAdminSingleJob(res.data.job));
                    // console.log(res.data.job)
                }
            } catch (error) {
                console.log(error);
            }
        }
        getSingleJob();
    }, [])
}

export default useGetAdminSingleJob;
