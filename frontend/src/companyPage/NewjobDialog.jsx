import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function NewjobDialog({ open, setOpen }) {
    const { allCompany } = useSelector(store => store.company);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [validateError, setValidateError] = useState({});

    const [input, setInput] = useState({
        title: "",
        description: "",
        jobType: "",
        salary: "",
        company: "",
        location: "",
        position: "",
        experienceLevel: "",
        requirements: "",
    });

    // ✅ handle input change
    const changeInputHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    // ✅ validation
    const validate = () => {
        const err = {};
        if (
            !input.company ||
            !input.description ||
            !input.experienceLevel ||
            !input.jobType ||
            !input.location ||
            !input.position ||
            !input.requirements ||
            !input.salary ||
            !input.title
        ) {
            err.message = "Note: Something is missing";
        }
        return err;
    };

    // ✅ submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        const error = validate();
        if (Object.keys(error).length > 0) {
            setValidateError(error);
            return;
        }

        setLoading(true);
        try {
            const res = await axios.post(
                "http://localhost:8080/api/v1/job/post",
                input,
                { withCredentials: true }
            );

            if (res.data?.success) {
                toast.success(res.data?.message);
                setOpen(false);
            } else {
                toast.error(res.data?.message);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
        } finally {
            setLoading(false);
            navigate('/admin/dashboard');
        }
    };

    return (
        <Dialog open={open}>
            <DialogContent onInteractOutside={() => setOpen(false)} className="sm:max-w-[425px] max-h-[90vh] flex flex-col">

                
                <DialogHeader className="sticky top-0 bg-white z-10">
                    <h1 className='font-bold text-[#a886ff] text-lg'>
                        Create New Job :
                    </h1>
                </DialogHeader>

               
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col flex-1 overflow-hidden"
                >

                   
                    <div className="overflow-y-auto px-1 flex-1">

                        <div className='py-2'>
                            <Label htmlFor='title' className="mb-1.5">Title :</Label>
                            <Input
                                id='title'
                                name='title'
                                value={input.title}
                                onChange={changeInputHandler}
                            />
                        </div>

                        <div className='py-2'>
                            <Label htmlFor='description' className="mb-1.5">Description :</Label>
                            <textarea
                                id="description"
                                name="description"
                                value={input.description}
                                onChange={changeInputHandler}
                                className='border w-full rounded-md focus:outline-none focus:ring-2 focus:ring-black p-2'
                                rows="2"
                            />
                        </div>

                        <div className='py-2'>
                            <Label htmlFor='requirements' className="mb-1.5">Requirements :</Label>
                            <Input
                                id='requirements'
                                name='requirements'
                                value={input.requirements}
                                onChange={changeInputHandler}
                            />
                        </div>

                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
                            <div className='py-2'>
                                <Label htmlFor='company' className="mb-1.5">Company :</Label>
                                <select
                                    id="company"
                                    name="company"
                                    value={input.company}
                                    onChange={changeInputHandler}
                                    className='border w-full rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black'
                                >
                                    <option value="">Select Company</option>
                                    {allCompany?.map((el) => (
                                        <option key={el._id} value={el._id}>
                                            {el.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className='py-2'>
                                <Label htmlFor='jobType' className="mb-1.5">Job Type :</Label>
                                <Input
                                    id='jobType'
                                    name='jobType'
                                    value={input.jobType}
                                    onChange={changeInputHandler}
                                />
                            </div>
                        </div>

                        <div className='grid grid-cols-2 gap-2'>
                            <div className='py-2'>
                                <Label htmlFor='experienceLevel' className="mb-1.5">Experience :</Label>
                                <Input
                                    type='number'
                                    id='experienceLevel'
                                    name='experienceLevel'
                                    value={input.experienceLevel}
                                    onChange={changeInputHandler}
                                />
                            </div>

                            <div className='py-2'>
                                <Label htmlFor='position' className="mb-1.5">Position :</Label>
                                <Input
                                    type='number'
                                    id='position'
                                    name='position'
                                    value={input.position}
                                    onChange={changeInputHandler}
                                />
                            </div>
                        </div>

                        <div className='py-2'>
                            <Label htmlFor='salary' className="mb-1.5">Salary :</Label>
                            <Input
                                type='number'
                                id='salary'
                                name='salary'
                                value={input.salary}
                                onChange={changeInputHandler}
                            />
                        </div>

                        <div className='py-2 pb-5'>
                            <Label htmlFor='location' className="mb-1.5">Location :</Label>
                            <Input
                                id='location'
                                name='location'
                                value={input.location}
                                onChange={changeInputHandler}
                            />
                        </div>

                        
                        {validateError?.message && (
                            <p className='text-red-500 text-sm mb-3'>
                                {validateError.message}
                            </p>
                        )}

                    </div>

                  
                    <DialogFooter className="bg-white pt-2">
                        {loading ? (
                            <Button className='bg-[#a886ff] text-white w-full'>
                                loading...
                            </Button>
                        ) : (
                            <Button type="submit" className='bg-[#a480ff] text-white w-full'>
                                Create Job
                            </Button>
                        )}
                    </DialogFooter>

                </form>

            </DialogContent>
        </Dialog>
    );
}

export default NewjobDialog;