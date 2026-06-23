import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup } from '@/components/ui/radio-group'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux'
import store from '@/redux/stor'
import { setLoading, setAuthUser } from '@/redux/authSlice'



export default function LoginPage() {
  const { loading } = useSelector(store => store.auth);
  const dispatch = useDispatch();

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
    // file:""
  });


  const navigate = useNavigate();

  const validate = () => {
    let err = {};

    if (!formData.email) {
      err.email = "Email is required";
    }

    if (!formData.password) {
      err.password = "Password is required";
    } else if (formData.password.length < 6) {
      err.password = "Password must be at least 6 characters";
    }

    if (!formData.role) {
      err.role = "Please select a role";
    }

    return err;
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }


  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const validationErrors = validate();
      dispatch(setLoading(true));

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      const res = await axios.post(
        "http://localhost:8080/api/v1/user/login",
        formData, {
        withCredentials: true
      }
      );


      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setAuthUser(res.data.user));
        res.data.user.role === "recruiter" ? navigate("/admin/dashboard") : navigate("/");
      }

    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  }

  return (

    <div className='flex items-center justify-center max-w-7xl mx-auto px-4'>

      <form method='post' onSubmit={(e) => { handleSubmit(e) }} className='w-full md:w-1/2 border border-gray-200 rounded-md p-6 my-10'>

        <h1 className='font-bold text-[#7c77ff] text-xl mb-5'>LogIn</h1>

        <div className='my-2'>
          <Label className='pb-1' htmlFor='email'>Email :</Label>
          <Input type='email' id='email' name="email" value={formData.email} placeholder="abcd123@gmail.com" onChange={(event) => {
            handleChange(event)
          }} />
          <p className="text-red-500 text-sm">{errors.email}</p>
        </div>


        <div className='my-2'>
          <Label className='pb-1' htmlFor='password'>Password :</Label>
          <Input type='password' id='password' name='password' value={formData.password} placeholder="*********" onChange={(event) => {
            handleChange(event)
          }} />
          <p className="text-red-500 text-sm">{errors.password}</p>
        </div>

        <div>
          <div className='flex items-center justify-between'>

            <RadioGroup className='flex items-center gap-4 my-1'>

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



          </div>
          <p className="text-red-500 text-sm pb-2">{errors.role}</p>
        </div>

        <div>

          {loading ? <Button className='text-white bg-[#8480ef]  w-full'>loading...</Button> : <Button className=' bg-[#857fe5] text-white w-full'>Submit</Button>}
        </div>

        <div className='mt-1'>don't have an account ? <Link className='text-[blue]' to="/signup"> signup </Link></div>

      </form>
    </div>

  )
}
