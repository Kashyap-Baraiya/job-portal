import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { setSingleCompany } from '@/redux/companySlice';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';

function UpdateCompany() {
    const dispatch = useDispatch();
    const params = useParams();
    const jobId = params.id;
    const { singleCompany } = useSelector(store => store.company);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
    });


    useEffect(() => {
        if (singleCompany) {
            setFormData({
                name: singleCompany.name || "",
                description: singleCompany.description || "",
                website: singleCompany.website || "",
                location: singleCompany.location || "",
            });
        }
    }, [singleCompany]);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        console.log(formData);
        e.preventDefault();

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

            const res = await axios.put(`http://localhost:8080/api/v1/company/update/${jobId}`, form, { withCredentials: true });

            if (res.data.success) {
                toast.success(res.data?.message);
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



    useEffect(() => {
        const getSingleCompany = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/v1/company/get/${jobId}`, { withCredentials: true });

                if (res.data.success) {
                    dispatch(setSingleCompany(res.data.company));
                }
            } catch (error) {
                console.log(error);
            }
        }
        getSingleCompany();
    }, []);


    return (
        <div className="max-w-3xl mx-auto p-4 my-10">

            <div className="bg-[#f8f8ff]  shadow-md border-gray-200 border rounded-xl px-6 py-3">

                <h2 className="text-[#9370eb] pb-5 pt-5 rounded-t-xl text-2xl font-bold mb-6 ">
                    Update Company
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
                            required
                            className="w-full border rounded-md p-2 "
                        />
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
                        <Button className="w-1/2 bg-[#9370eb] text-white py-2 rounded-md hover:bg-[#a27ffb] transition">
                            {loading ? "Loading..." : "Create Company"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdateCompany
