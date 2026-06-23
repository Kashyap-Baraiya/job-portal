import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { setAllCompany } from '@/redux/companySlice';
import axios from 'axios';
import { Edit, Edit2Icon, LucideEdit, LucideLink2 } from 'lucide-react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function CompanyTable() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { allCompany } = useSelector(store => store.company);

    useEffect(() => {
        const getAllCompany = async () => {
            try {
                const res = await axios.get('http://localhost:8080/api/v1/company/get', { withCredentials: true });

                if (res.data.success) {
                    dispatch(setAllCompany(res.data.companies));
                }

            } catch (error) {
                console.log(error);
            }
        };

        getAllCompany();
    }, []);

    const dayAgoFunction = (createdAt) => {
        const createdAtTime = new Date(createdAt);
        const currentTime = new Date();

        const differenceTime = currentTime - createdAtTime;
        return Math.floor(differenceTime / (1000 * 24 * 60 * 60));
    }


    return (
        <div className='max-w-7xl mx-auto p-2 sm:p-5'>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3'>
                {allCompany.length>0 ? (<> {allCompany.map((company) => {
                    return <>
                        <div className='bg-[#f4f4ff] p-4 rounded-md hover:shadow-lg' key={company?._id}>
                            <div className='text-right text-gray-500 text-sm'>{dayAgoFunction(company?.createdAt) == 0 ? "Today" : `${dayAgoFunction(company?.createdAt)} day ago`}</div>
                            <div className='flex justify-between'>

                                <div className='flex'>
                                    <div><img className='w-12 h-12 rounded-full border border-black' src={company?.logo?.logoUrl} /></div>
                                    <div>
                                        <div className='ml-3 font-semibold'>{company?.name}</div>
                                        <Link to={company?.website} ><div className='ml-3 flex gap-2 text-sm text-[#1f1fffb6]'><LucideLink2 /> Website</div></Link>
                                    </div>
                                </div>

                                <div className='flex items-center justify-center'>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Edit className='cursor-pointer' />
                                        </PopoverTrigger>

                                        <PopoverContent>
                                            <div  className='flex gap-3 cursor-pointer' onClick={() => { navigate(`/company/${company._id}`) }}><Edit2Icon /> Edit</div>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </div>
                        </div>
                    </>
                })}</>):(<>Create your first Company</>)}
               



            </div>

        </div>
    );

}

export default CompanyTable;