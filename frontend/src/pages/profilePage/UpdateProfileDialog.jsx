import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { setAuthUser } from '@/redux/authSlice';
import store from '@/redux/stor';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

function UpdateProfileDialog({ open, setOpen }) {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);
      const dispatch = useDispatch();
    const [file, setFile] = useState(null);

    const [input, setInput] = useState({
        fullname: user?.fullname,
        email: user?.email,
        bio: user?.profile?.bio,
        skills: user?.profile?.skills.map(el => el),
    });

    const changeInputHandal = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const changeFileHandal = (e) => {
        setFile(e.target.files[0]);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);

        if (file) {
            formData.append("resume", file);
        }

// https://res.cloudinary.com/dktmezpdt/raw/upload/fl_attachment/v1772030038/resume/gawqkv5falzb1nn6qtox.pdf

        setLoading(true);
        try {
            const res = await axios.put("http://localhost:8080/api/v1/user/profile/update", formData,
             {
                withCredentials: true 
            });

            if(res.data.success){
                console.log(res.data.user)
                toast.success(res.data.message);
                dispatch(setAuthUser(res.data.user)),[user]
                setOpen(false);
            }
        } catch (error) {
            console.log(error.response?.data?.message || "Something went wrong");
        }finally{
            setLoading(false);
        }

    }

    return (
        <div>
            <div className="bg-[#f4f4ff]">

                <Dialog open={open} className="bg-white z-10">
                    <DialogContent className="sm:max-w-[425px] " onInteractOutside={() => setOpen(false)}>
                        <DialogHeader>
                            <DialogTitle>Update Profile</DialogTitle>
                        </DialogHeader>

                        <form action="" onSubmit={(e) => handleSubmit(e)}>
                            <div className='py-2'>
                                <Label className='pb-1' htmlFor='Name'>Name :</Label>
                                <Input type='text' id='Name' name='fullname' onChange={(e) => { changeInputHandal(e) }} value={input.fullname} />
                            </div>

                            <div className='py-2'>
                                <Label className='pb-1' htmlFor='Email'>Email :</Label>
                                <Input type='text' id='Email' name='email' onChange={(e) => { changeInputHandal(e) }} value={input.email} />
                            </div>

                            <div className='py-2'>
                                <Label className=' pb-1' htmlFor='Bio'>Bio :</Label>
                                <Input type='text' id='Bio' name='bio' onChange={(e) => { changeInputHandal(e) }} value={input.bio} />
                            </div>

                            <div className=' py-2'>
                                <Label className=' pb-1' htmlFor='Skill'>Skills :</Label>
                                <Input type='text' id='Skill' name='skills' onChange={(e) => { changeInputHandal(e) }} value={input.skills} />
                            </div>

                            <div className=' py-2'>
                                <Label className=' pb-1' htmlFor='Resume'>Resume :</Label>
                                <Input type='file' accept=".pdf,.doc,.docx" onChange={(e) => { changeFileHandal(e) }} id='Resume' name='resume' />
                            </div>
                            <DialogFooter>
                                {loading ? <Button className=' bg-black text-white w-full'>loading...</Button> : <Button className=' bg-[#302d6e] text-white w-full'>Update</Button>}
                            </DialogFooter>
                        </form>

                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}

export default UpdateProfileDialog;
