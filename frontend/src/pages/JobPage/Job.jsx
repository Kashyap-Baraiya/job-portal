import { Badge } from '@/components/ui/badge'
import { Bookmark } from 'lucide-react'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import axios from 'axios'


const Job = ({ job }) => {
    const navigate = useNavigate();
    const dayAgoFunction = (createdAt) => {
        const createdAtTime = new Date(createdAt);
        const currentTime = new Date();

        const differenceTime = currentTime - createdAtTime;
        return Math.floor(differenceTime / (1000 * 24 * 60 * 60));
    }


    return (
        <div className="max-w-7xl mx-auto px-4 mb-4 ">
            <Link to={`/description/${job._id}`} className="block">
                <div className=" border border-[#E5E7EB] rounded-xl p-6 shadow-sm hover:shadow-lg">
                    <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-500">
                            {dayAgoFunction(job?.createdAt) === 0
                                ? "Today"
                                : `${dayAgoFunction(job?.createdAt)} days ago`}
                        </p>
                        <Bookmark className="w-5 h-5 text-gray-500" />
                    </div>

                    <div className="flex items-center gap-4 mt-4">
                        <Avatar className="h-12 w-12 border">
                            <AvatarImage src={job?.company?.logo?.logoUrl} />
                            <AvatarFallback>
                                {job?.company?.name?.charAt(0)}
                            </AvatarFallback>
                        </Avatar>

                        <div>
                            <h2 className="text-lg font-semibold text-gray-800">
                                {job?.company?.name}
                            </h2>
                            <p className="text-sm text-gray-500">
                                {job?.company?.location}
                            </p>
                        </div>
                    </div>

                    <div className="mt-4">
                        <h1 className="text-xl font-bold text-gray-900">
                            {job?.title}
                        </h1>
                        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                            {job?.description}
                        </p>
                    </div>

                    <div className="flex justify-between flex-wrap gap-2 mt-4">
                        <div className='flex gap-2 mt-4 '>
                            <span className="px-3 py-1 text-xs bg-[#eaeaf6] rounded-full">
                                position : {job?.position}
                            </span>
                            <span className="px-3 py-1 text-xs bg-[#f0f0fd] rounded-full">
                                {job?.jobType}
                            </span>
                            <span className="px-3 py-1 text-xs bg-[#ebebf4] rounded-full">
                                ₹ {job?.salary}
                            </span>
                        </div>

                        <div className="w-full sm:w-auto mt-2">
                            <Button
                                variant="outline"
                                className="w-full sm:w-auto text-white bg-[#9f79ff]"
                            >
                                View Details
                            </Button>
                        </div>
                    </div>
                </div>
            </Link>
        </div>

    )
}

export default Job;


