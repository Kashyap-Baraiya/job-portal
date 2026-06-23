import { setAdminAllJob } from '@/redux/companySlice';
import axios from 'axios';

import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

function useGetAllAdminJob() {
    const dispatch = useDispatch();
    useEffect(() => {
        const getAllJob = async () => {
            try {
                const res = await axios.get("http://localhost:8080/api/v1/job/getadminjob", { withCredentials: true });
                console.log(res.data)
                if (res.data?.success) {
                    dispatch(setAdminAllJob(res.data.job));
                }
            } catch (error) {
                console.log(error);
            }
        }
        getAllJob();
    }, [dispatch])
}

export default useGetAllAdminJob;
