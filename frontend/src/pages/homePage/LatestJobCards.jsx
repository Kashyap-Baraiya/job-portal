import { Badge } from '@/components/ui/badge'
import React from 'react'
import { Link } from 'react-router-dom'

const LatestJobCards = ({job}) => {
    return (
        
    <div className='bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg'>

        <Link to={`description/${job._id}`}>
        <div >
            <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
            <p className='text-sm text-gray-500'>{job?.company?.location}</p>
        </div>

        <div>
            <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
            <p className='text-sm text-gray-600 my-2'> {job?.description}</p>
        </div>

      <div className='flex text-center items-center gap-2'>
        <Badge variant='outline' className='text-[blue]'>Position : {job?.position}</Badge>
         <Badge variant='outline'className='text-[#F83002]'> {job?.jobType}</Badge>
         <Badge variant='outline'className='text-[#6A38C2]'>Salary : {job?.salary}</Badge></div>
         </Link>
    </div>
    )
}

export default LatestJobCards
