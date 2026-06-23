import { PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Edit } from 'lucide-react'
import { Popover } from '@/components/ui/popover'
import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { setAdminSingleJob } from '@/redux/companySlice'

function ApplicationPage({ application }) {
    const params = useParams();
    const jobId = params.id;
    // console.log(jobId);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [status,setStatus] = useState("");
    const[loading,setLoading] = useState(false);
    console.log(status)
    const handleStatusChange =(e)=>{
        setStatus(e.target.value);
    }
    
    const handleSubmit=async(e)=>{
        e.preventDefault();
        // console.log(status);
        setLoading(true);
        try {
           const res = await axios.put(`http://localhost:8080/api/v1/application/status/${application._id}/update`,{status:status},{withCredentials:true});
           if(res.data.success){
            toast.success(res.data?.message);
            const updatedJob = await axios.get(`http://localhost:8080/api/v1/job/${jobId}`, { withCredentials: true })
            dispatch(setAdminSingleJob(updatedJob.data.job));
            // navigate(`/admin/job/description/${jobId}`);
           }else{
            console.log("error");
           }

        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message);
        }finally{
            setLoading(false);
             setStatus("")
        }
       
    }
    return (
       <div className="bg-white rounded-xl shadow-sm border p-5 hover:shadow-md transition-all duration-200 mb-4">

  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

    <div className="flex items-center gap-4">
      <img
        src={application?.applicant?.profile?.profilePhoto?.url ? application?.applicant?.profile?.profilePhoto?.url : "https://res.cloudinary.com/dktmezpdt/image/upload/v1774536429/profilePhoto/ge2vbppuycnxpbgvawhz.jpg"}
        alt="profile"
        className="h-14 w-14 rounded-full object-cover border"
      />

      <div>
        <h3 className="font-semibold text-lg">
          {application?.applicant?.fullname}
        </h3>
        <p className="text-sm text-gray-500">
          {application?.applicant?.email}
        </p>
      </div>
    </div>

    <div className="flex flex-col sm:flex-row sm:items-center gap-4">

{application?.applicant?.profile?.resume && ( <Link
        to={application?.applicant?.profile?.resume}
        target="_blank"
        className="text-blue-600 text-sm hover:underline"
      >
        View Resume
      </Link>)}
     

      <span className="text-sm text-gray-500">
        {application?.createdAt?.split("T")[0]}
      </span>

      <Popover>
        <PopoverTrigger asChild>
          <button
            className={`px-3 py-1 text-sm rounded-full font-medium capitalize
              ${
                application?.status === "accepted"
                  ? "bg-green-100 text-green-600"
                  : application?.status === "rejected"
                  ? "bg-red-100 text-red-600"
                  : "bg-yellow-100 text-yellow-600"
              }`}
          >
            {application?.status}
          </button>
        </PopoverTrigger>

        <PopoverContent className="bg-white p-4 rounded-lg shadow-md w-56">
          <form onSubmit={handleSubmit}>
            <div className="flex gap-3 mb-4">

              <label className="cursor-pointer w-full">
                <input
                  type="radio"
                  name="status"
                  value="accepted"
                  onChange={handleStatusChange}
                  className="hidden peer"
                />
                <div className="text-center py-2 border rounded-md 
                                peer-checked:bg-green-500 
                                peer-checked:text-white">
                  Accept
                </div>
              </label>

              <label className="cursor-pointer w-full">
                <input
                  type="radio"
                  name="status"
                  value="rejected"
                  onChange={handleStatusChange}
                  className="hidden peer"
                />
                <div className="text-center py-2 border rounded-md 
                                peer-checked:bg-red-500 
                                peer-checked:text-white">
                  Reject
                </div>
              </label>

            </div>

            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
              {loading ? "Loading..." : "Update Status"}
            </button>
          </form>
        </PopoverContent>
      </Popover>

    </div>

  </div>
</div>
    )
}

export default ApplicationPage
