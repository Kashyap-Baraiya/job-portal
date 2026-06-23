import { setAllJobs } from '@/redux/jobSlice';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function useGetAllJobs(location, jobType, sortBy) {
  const dispatch = useDispatch();
  const { searchQuery } = useSelector((store) => store.job);

  useEffect(() => {
    const getAllJobs = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/v1/job/get",
          {
            params: {
              q: searchQuery,   
              location,
              jobType,
              sortBy
            }
          }
        );

      
        if (res.data.success) {
          dispatch(setAllJobs(res.data.job));
        }

      } catch (error) {
        console.log(error);
      }
    };

    getAllJobs();
  }, [searchQuery, location, jobType, sortBy, dispatch]);
}

export default useGetAllJobs;