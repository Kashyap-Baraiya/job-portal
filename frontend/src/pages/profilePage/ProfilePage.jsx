import React, { useEffect, useState } from "react";
import AppliedJob from "./AppliedJob";
import { Button } from "@/components/ui/button";
import UpdateProfileDialog from "./UpdateProfileDialog.jsx";
import {  useDispatch, useSelector } from "react-redux";
import store from "@/redux/stor";
import axios from "axios";
import { setAppliedAllJob } from "@/redux/jobSlice";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const{appliedAllJob} = useSelector(store =>store.job);
   const {user} = useSelector(store => store.auth)
  const skills = user.profile.skills;
 
  const [open,setOpen] = useState(false);
  


  useEffect(()=>{
    const getAllAppliedJob = async()=>{
        try {
          const res =await axios.get('http://localhost:8080/api/v1/application/get',{withCredentials:true});
          if(res.data.success){
            dispatch(setAppliedAllJob(res.data.appliedJob))
          }
        } catch (error) {
          console.log(error);
        }
    }
    getAllAppliedJob();
  },[dispatch])
 

  return (
    <div className="my-5 m-3">
      <div className="max-w-7xl mx-auto border-2 border-gray-200 rounded-2xl bg-white">
        <div className="h-40 rounded-t-2xl bg-[#d3d3f1] relative">
          
          <div className="absolute -bottom-16 left-8">
            <img
              src={ user.profile.profilePhoto.url}
              alt="profile"
              className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-md"
            />
          </div>

          <div className=" p-5 absolute -right-1"><Button variant="outline " onClick={()=>{return setOpen(true)}} className='bg-[#9f79ff] text-white'>Edit Profile</Button></div>
        </div>

        <div className="pt-20 px-8 pb-8">

          <h2 className="text-3xl font-bold text-gray-800">
           {user.fullname}
          </h2>

          <p className="text-gray-600 mt-2 max-w-2xl">
            {user.profile.bio}
          </p>

          
          <div className="mt-4 space-y-2 text-gray-700">
            <p><span className="font-semibold">Email:</span> {user.email}</p>
            <p><span className="font-semibold">Phone:</span> +91 {user.phoneNumber}</p>
          </div>

          {user.profile.resume==="undefined" ? ( <div className="mt-4 flex gap-3">
            <div className=" font-semibold text-gray-800">Resume :</div>
            <div><button onClick={()=>{return setOpen(true)}} className="text-blue-700">Upload resume</button></div>
           
          </div>) :(<div className="mt-4 flex gap-3">
            <div className=" font-semibold text-gray-800">Resume :</div>
            
            <div> <a
              href={user?.profile?.resume}
              target="_blank"
              className="inline-block bg-[#9f79ff] text-white px-5 py-2 rounded-lg"
            >
              {user.profile.resumeOriginalname}
            </a></div>
           
          </div>) }

          
         {skills.length !=0 && ( <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Skills
            </h3>
          <div className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-[#e7e7f6] text-black px-4 py-1 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
          </div> 
          
          </div>)}


        </div>
      </div>


      <div className="max-w-7xl mx-auto my-4 p-5 ">
        <div className="font-bold text-3xl">Applied Jobs </div>
        <AppliedJob appliedAllJob={appliedAllJob}/>
        </div>

           <UpdateProfileDialog open={open} setOpen={setOpen}/>  
    </div>
  );
};

export default ProfilePage;