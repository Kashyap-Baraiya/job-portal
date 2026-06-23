import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar.jsx';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover.jsx';
import { Button } from '../ui/button';
import { LogOut, User, User2, UserCircle } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import store from '@/redux/stor.js';
import axios from 'axios';
import toast from 'react-hot-toast';
import { setAuthUser } from '@/redux/authSlice.js';
import { setSingleJob } from '@/redux/jobSlice.js';



function Navbar() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [popOveropen, setPopOverOpen] = useState(false);
  const { user } = useSelector(store => store.auth);




  const handleLogedOut = async () => {
    try {
      const res = await axios.post('http://localhost:8080/api/v1/user/logout', {}, {
        withCredentials: true
      });

      if (res.data.success) {
        setPopOverOpen(false);
        dispatch(setAuthUser(null));
        dispatch(setSingleJob(null));
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }



    console.log(res.data.message)
  }

  return (

    <div className='bg-[#f4f4ff] sticky top-0 shadow-xl z-10'>

      <div className='flex justify-between w-full px-4 items-center mx-auto max-w-7xl h-16'>

        <div className='flex'>
          <div className="md:hidden px-2">
            <button onClick={() => setOpen(!open)} className="text-2xl">☰</button>
          </div>

          <Link to={(user && user.role === "recruiter") ? "/admin/dashboard" : "/"}> <h1 className='text-2xl font-bold'><span className='text-[#53509a]'>Job</span><span>portal</span></h1></Link>
        </div>


        <div className='flex gap-5'>
          <ul className='hidden md:flex font-medium gap-5 items-center'>
            {user && user.role === "recruiter" ? <>
              <li><Link to='/admin/dashboard'>Dashborad</Link></li>
              <li><Link to='/admin/job'>Jobs</Link></li>
              <li><Link className='rounded-sm px-2 py-1' to='/admin/dashboard/new'>Post Company</Link></li>
            </> : <>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/Jobs'>Browse Jobs</Link></li>
              {user && <li><Link to='/profile'>Profile</Link></li>}
            </>}

          </ul>



          {!user ? (<div className='flex items-center gap-2 '>
            <div><Link to='/login'><Button variant='outline'>login</Button></Link> </div>
            <div> <Link to='/signup'><Button className='bg-[#a582ff]  text-white'>SignUp</Button></Link></div>

          </div>) : (<div className='pl-5'>
            <Popover open={popOveropen} onOpenChange={setPopOverOpen}>
              <PopoverTrigger asChild>
                <Avatar>
                  <AvatarImage className='cursor-pointer' src={user.profile.profilePhoto.url} />
                  <AvatarFallback><UserCircle /></AvatarFallback>
                </Avatar>
              </PopoverTrigger>


              <PopoverContent className='w-80' >

                <div className='flex gap-4 space-y-2'>
                  <Avatar>
                    <AvatarImage className='cursor-pointer' src={user.profile?.profilePhoto?.url ?  user.profile?.profilePhoto?.url  : "https://res.cloudinary.com/dktmezpdt/image/upload/v1774536429/profilePhoto/ge2vbppuycnxpbgvawhz.jpg"} />
                    <AvatarFallback><User /></AvatarFallback>
                  </Avatar>

                  <div >
                    <h4 className='font-medium'>{user.fullname}</h4>
                    <p className="text-sm text-gray-500">{user.profile.bio}</p>
                  </div>

                </div>



                <div className='flex flex-col text-gray-600'>
                  {user && user.role === "student" && (
                    <div className='cursor-pointer flex items-center gap-2'>
                      <User2 />
                      <Link to='/profile'><Button className='cursor-pointer' onClick={() => { setPopOverOpen(false) }} variant='link'>View Profile</Button></Link>
                    </div>
                  )}


                  <div className='cursor-pointer flex items-center gap-2'>
                    <LogOut />
                    <Button variant='link' className='cursor-pointer' onClick={handleLogedOut}>Logout</Button></div>

                </div>

              </PopoverContent>
            </Popover>
          </div>)}



        </div>
      </div>
      {open && (
        <div className="md:hidden bg-white shadow-md px-4 pb-4">

          {!user && (<ul className="flex flex-col gap-4 font-medium pb-3">
            <li className='pt-1'><Link to="/" onClick={() => setOpen(false)}>Home</Link></li>
            <li><Link to="/jobs" onClick={() => setOpen(false)}>Browse Jobs</Link></li>
          </ul>)}



          {(user && user.role == "student") && (
            <div className="mt-4">
              <ul className="flex flex-col gap-4 font-medium pb-3">
                <li className='pt-1'><Link to="/" onClick={() => setOpen(false)}>Home</Link></li>
                <li><Link to="/jobs" onClick={() => setOpen(false)}>Browse Jobs</Link></li>
              </ul>
              <Link to="/profile"><Button className="border border-gray-500 mr-2" variant="link" onClick={() => setOpen(false)}>View Profile</Button></Link>
              <Button variant="link" className="border border-gray-500" onClick={handleLogedOut}>Logout</Button>
            </div>
          )}

          {(user && user.role == "recruiter") && (
            <div className="mt-2">
              <ul className="flex flex-col gap-4 font-medium pb-3">
                <li className='pt-1'><Link onClick={() => setOpen(false)} to="/admin/dashboard">Dashboard</Link></li>
                <li><Link onClick={() => setOpen(false)} to="/admin/dashboard/new">Post Company</Link></li>
                <li><Link onClick={() => setOpen(false)} to="/admin/job">My Jobs</Link></li>
              </ul>
              <Button variant="link" className="border border-gray-500" onClick={handleLogedOut}>Logout</Button>
            </div>
          )}


        </div>
      )}

    </div>
  )
}

export default Navbar;
