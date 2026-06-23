import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useEffect } from 'react'
import ComapnyTable from './ComapnyTable'
import { useNavigate } from 'react-router-dom'
import useGetAllAdminJob from '@/hookes/useGetAllAdminJob'


function Companies() {
    const navigate = useNavigate();
    useGetAllAdminJob();

    return (
        <div className='max-w-6xl mx-auto my-5 p-3 min-h-[50vh]'>
        <div className='justify-between flex '>
            <div className='font-bold text-lg my-2 p-1'> My Companies </div>
            <div><Button variant='outline' onClick={() => navigate('/admin/dashboard/new')} className='bg-[#9068f5] w-full text-white'> Create Company</Button></div>
        </div>
        
        <ComapnyTable  />
        </div>
    )
}

export default Companies
