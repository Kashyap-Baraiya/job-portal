import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup } from '@/components/ui/radio-group'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import React, { use, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import store from '@/redux/stor'
import { setLoading, setAuthUser } from '../../redux/authSlice'
import useGetAllJobs from '@/hookes/useGetAllJobs'


function registerPage() {
  const navigate = useNavigate();
  const { loading } = useSelector(store => store.auth);

  const dispatch = useDispatch();

  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "",
  });

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);

  }

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }


  const validate = () => {
    let err = {};

    if (!formData.fullname) err.fullname = "Full name required";

    if (!formData.email) {
      err.email = "Email required";
    } 

    if (!formData.phoneNumber) {
      err.phoneNumber = "Please enter valid Phone number";
    } 

    if (!formData.password) {
      err.password = "Password required";
    } else if (formData.password.length < 6) {
      err.password = "Minimum 6 characters";
    }

    if (!formData.role) {
      err.role = "Select a role";
    }

    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }


    const data = new FormData();

    data.append("fullname", formData.fullname);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("role", formData.role);
    data.append("phoneNumber", formData.phoneNumber);


    if (file) {
      data.append("profilePhoto", file);
    }

    dispatch(setLoading(true));
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/user/register",
        data, { withCredentials: true },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        }
      );


      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setAuthUser(res.data.newUser));
        navigate('/');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  }


  return (


    <div className='flex items-center justify-center max-w-7xl mx-auto px-4'>

      <form action="#" method='post' onSubmit={(e) => { handleSubmit(e) }} className='w-full md:w-1/2 border shadow-md border-gray-200 rounded-md p-6 my-10'>

        <h1 className='font-bold text-xl mb-5 text-[#9267ff]'>Sign Up</h1>

        <div className='my-2 mt-5'>
          <Label className='pb-1' htmlFor='fullname'>Full Name :</Label>
          <Input type='text' id='fullname' name='fullname' value={formData.fullname} placeholder="Baraiya Kashyap" onChange={(event) => {
            handleChange(event)
          }} />
          <p className="text-red-500 text-sm">{errors.fullname}</p>
        </div>


        <div className='my-2'>
          <Label className='pb-1' htmlFor='email'>Email :</Label>
          <Input type='email' id='email' name="email" value={formData.email} placeholder="abcd123@gmail.com" onChange={(event) => {
            handleChange(event)
          }} />
          <p className="text-red-500 text-sm">{errors.email}</p>
        </div>


        <div className='my-2'>
          <Label className='pb-1' htmlFor='phonenumber'>Phone Number :</Label>
          <Input type='text' id='phonenumber' name='phoneNumber' value={formData.phoneNumber} placeholder="99999 98989" onChange={(event) => {
            handleChange(event)
          }} />
          <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
        </div>


        <div className='my-2'>
          <Label className='pb-1' htmlFor='password'>Password :</Label>
          <Input type='password' id='password' name='password' value={formData.password} placeholder="*********" onChange={(event) => {
            handleChange(event)
          }} />
          <p className="text-red-500 text-sm">{errors.password}</p>
        </div>

          
        <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
          <div>
          <RadioGroup className='flex items-center gap-4 '>

            <div className="flex items-center gap-3 space-x-2">
              <Input type='radio' name='role' className='cursor-pointer' value='student' id='r1' onChange={(event) => {
                handleChange(event)
              }} />
              <Label htmlFor="r1">Student</Label>
            </div>

            <div className="flex items-center gap-3 space-x-2">
              <Input type='radio' name='role' value='recruiter' className='cursor-pointer' id='r2' onChange={(event) => {
                handleChange(event)
              }} />
              <Label htmlFor="r2">Recruiter</Label>
            </div>
          </RadioGroup>
          <p className="text-red-500 text-sm">{errors.role}</p>

          </div>
          <div className='flex items-center gap-2'>
            <Label htmlFor='profile' className='pb-1'>Profile  </Label>
            <Input type='file' id='profile' accept="image/*" name="profilePhoto" onChange={(e) => {
              handleFileChange(e);
            }} />
          </div>

        </div>

        <div className='mt-5'>
          {loading ? <Button className=' bg-black text-white w-full'>loading...</Button> : <Button className=' bg-[#a582ff] text-white w-full'>Submit</Button>}
        </div>
        <div className='mt-1'>Already have an account ? <Link className='text-[blue]' to="/login">login </Link></div>
      </form>
    </div>


  )
}

export default registerPage
