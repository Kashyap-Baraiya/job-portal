import React, { useEffect } from 'react'
import HeroSection from './HeroSection.jsx'

import LatestJob from './LatestJob.jsx'
import useGetAllJobs from '@/hookes/useGetAllJobs.jsx'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function HomePage() {
  useGetAllJobs();
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user && user.role === "recruiter") {
      navigate('admin/companies')
    }
  }, [])

  return (
    <div className='max-w-7xl mx-auto'>
      <HeroSection />
      <div className='flex flex-col sm:flex-row mt-2'>
  

  <div className='w-full sm:w-[12%]  text-center sm:text-center rounded-t-md sm:rounded-l-md sm:rounded-t-none bg-[#9f79ff]  p-2  font-semibold'>
    NOTE 
  </div>


  <div className='notice w-full sm:w-[88%]  bg-gray-100  p-2 rounded-b-md sm:rounded-r-md sm:rounded-b-none'>
    <p className='scroll-text text-sm sm:text-base'>
      Find your dream job today. New jobs added every day. Apply early for better chances. Keep your profile updated.
    </p>
  </div>

</div>

      <LatestJob />
    </div>
  )
}

export default HomePage
