import React, { useState } from 'react';
import Job from './Job.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hookes/useGetAllJobs.jsx';

const JobPage = () => {

  const { allJob, searchQuery } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [sortBy, setSortBy] = useState("");
  useGetAllJobs(location, jobType, sortBy);

  const uniqueLocations = [...new Set((allJob || []).map(job => job.location).filter(Boolean))];




  return (
    <div className="max-w-7xl p-4 mx-auto">

      <div className="px-2 mt-3">
        <h2 className="text-3xl font-bold">Browse Jobs</h2>
        <p className="text-gray-500">Discover your next opportunity</p>
      </div>

    
      <div className="flex flex-col gap-3 p-4 md:flex-row">

     
        <div className="w-full md:w-1/4 border border-gray-300 rounded-md">
          <input
            type="text"
            placeholder="Search jobs..."
            value={searchQuery || ""}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            className="w-full p-2 outline-none"
          />
        </div>

       
        <div className="w-full md:w-1/4 border border-gray-300 rounded-md">
          <select
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            className="w-full p-2 outline-none"
          >
            <option value="">All Types</option>
            <option value="Full-time">Full time</option>
            <option value="Part-time">Part time</option>
            <option value="Internship">Internship</option>
          </select>
        </div>

        
        <div className="w-full md:w-1/4 border border-gray-300 rounded-md">
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-2 outline-none"
          >
            <option value="">All Locations</option>
            {uniqueLocations.map((loc, i) => (
              <option key={i} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

      
        <div className="w-full md:w-1/4 border border-gray-300 rounded-md">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full p-2 outline-none"
          >
            <option value="">Sort By</option>
            <option value="latest">Latest</option>
            <option value="salaryLowHigh">Salary: Low → High</option>
            <option value="salaryHighLow">Salary: High → Low</option>
          </select>
        </div>

      </div>

      
      <div className="px-4">
        <button
          onClick={() => {
            dispatch(setSearchQuery(""));
            setLocation("");
            setJobType("");
            setSortBy("");
          }}
          className="px-4 py-2 text-sm bg-gray-200 rounded-md hover:bg-gray-300"
        >
          Clear Filters
        </button>
      </div>


      <div className="mt-6">
        {allJob.length === 0 ? (
          <p className="text-gray-500">No jobs found</p>
        ) : (
          allJob.map((job) => (
            <Job key={job?._id} job={job} />
          ))
        )}
      </div>

    </div>
  );
};

export default JobPage;