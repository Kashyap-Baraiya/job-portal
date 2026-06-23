import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function NewCompany() {
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const [validateError, setValidateError] = useState({});
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
    });

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    }

    const navigate = useNavigate();


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validate = () => {
        const err = {};
        if (!formData.name) {
            err.name = "Name is required";
        }

        if (!formData.location) {
            err.location = "location is required";
        }
        if(!formData.description){
            err.description="Description is required";
        }
        return err;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validateError = validate();

        if (Object.keys(validateError).length > 0) {
            setValidateError(validateError)
            return;
        }
        const form = new FormData()

        form.append("name", formData.name);
        form.append("description", formData.description);
        form.append("location", formData.location);
        form.append("website", formData.website);


        if (file) {
            form.append("companyPhoto", file);
        }
        setLoading(true);
        try {

            const res = await axios.post('http://localhost:8080/api/v1/company/register', form, { withCredentials: true });

            if (res.data.success) {
                toast.success(res.data?.message);
                console.log(res.data.newCompany);
                navigate('/admin/dashboard');
            } else {
                toast.error(error?.response?.data?.message)
            }

        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl my-10 mx-auto p-4">

            <div className="bg-[#f4f4ff] shadow-md border-gray-200 border rounded-xl px-6 py-3">

                <h2 className="pb-5 text-[#9370eb] pt-5 rounded-t-xl text-2xl font-bold mb-6 text-center">
                    Create Company
                </h2>
                <form onSubmit={(e) => { handleSubmit(e) }} className="space-y-4" encType='multipart/form-data'>


                    <div>
                        <Label htmlFor="companyName" className="block mb-2 font-medium">Company Name</Label>
                        <Input
                            type="text"
                            name="name"
                            id="companyName"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter Company Name"
                            className="w-full border rounded-md p-2 "
                        />
                        <p className='text-red-500 text-sm'>{validateError.name}</p>
                    </div>


                    <div>
                        <Label htmlFor="description" className="block mb-2 font-medium">Description</Label>
                        <textarea
                            name="description"
                            rows="3"
                            id="description"
                            placeholder="Enter info about company"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
                        />
                         <p className='text-red-500 text-sm'>{validateError.description}</p>
                    </div>


                    <div>
                        <Label htmlFor="website" className="block mb-2 font-medium">Website</Label>
                        <Input
                            type="text"
                            name="website"
                            id="website"
                            value={formData.website}
                            placeholder="Enter wbsite URL"
                            onChange={handleChange}
                            className="w-full border rounded-md p-2 "
                        />
                    </div>


                    <div>
                        <Label htmlFor="location" className="block mb-2 font-medium">Location</Label>
                        <Input
                            type="text"
                            name="location"
                            id="location"
                            placeholder="Enter company location"
                            value={formData.location}
                            onChange={handleChange}
                            className="w-full border rounded-md p-2 "
                        />
                         <p className='text-red-500 text-sm'>{validateError.location}</p>
                    </div>


                    <div>
                        <Label htmlFor="file" className="block mb-2 font-medium">Company Logo</Label>
                        <Input
                            type="file"
                            id="file"
                            name="companyPhoto"
                            accept="image/*"
                            onChange={(e) => { handleFileChange(e) }}
                            className="w-full border rounded-md p-2  bg-gray-50"
                        />
                    </div>


                    <div className='flex justify-center items-center'>
                        <Button className="w-1/2 bg-[#9370eb] text-white py-2 rounded-md hover:bg-[#8555c9] transition">
                            {loading ? "Loading..." : "Create Company"}
                        </Button>
                    </div>



                </form>
            </div>
        </div>
    );
}

export default NewCompany
