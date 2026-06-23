import React from 'react'
import { useNavigate } from 'react-router-dom'


function AdminJobCard({job}) {
  const navigate = useNavigate();
  return (
    <div className="border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 bg-white">
      
     
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">{job.title}</h2>
        <span className="text-sm text-gray-500">{job.location}</span>
      </div>

      
      <p className="text-gray-700 font-medium">
        {job?.company?.name}
      </p>

     
      <p className="text-sm text-gray-500 mt-2">
        {job?.description}
      </p>

   
      <div className="flex flex-wrap gap-2 mt-3">
        <span className="bg-[#f1edf9] px-3 py-1 text-xs rounded-full">
          {job?.jobType}
        </span>
        <span className="bg-[#f1edf9] px-3 py-1 text-xs rounded-full">
          Position : {job?.position}
        </span>
        <span className="bg-[#f1edf9] px-3 py-1 text-xs rounded-full">
          Salary : {job?.salary}
        </span>
      </div>

     
      <div className="mt-4">
        <button
          onClick={() => navigate(`/admin/job/description/${job._id}`)}
          className="w-full  bg-[#9068f5] text-white  py-2 rounded-md hover:bg-[#ac8ef9] transition"
        >
          View Description / Applicant
        </button>
      </div>

    </div>
  )
}

export default AdminJobCard;
