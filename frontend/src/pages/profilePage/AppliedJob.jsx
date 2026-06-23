import { Heading1 } from 'lucide-react';
import React from 'react'

function AppliedJob({ appliedAllJob }) {
    const headerData = ["date", "job role", "company", "status"];


    return (
        <div className="w-full my-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {appliedAllJob.length==0 ? (<p>You not applied any job </p>) : (<>{appliedAllJob.map((job) => (
                <div key={job._id} className="bg-white border border-gray-200 rounded-2xl shadow-sm  hover:shadow-lg p-5">

                    <div className="flex justify-between items-start mb-3">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800">{job?.job?.title}</h2>
                            <p className="text-sm text-gray-500">{job?.job?.company?.name} </p>
                        </div>

                        <span className={`px-3 py-1 text-xs font-medium rounded-full 
                                ${job?.status === "accepted"
                                ? "bg-green-100 text-green-600"
                                : job?.status === "rejected"
                                    ? "bg-red-100 text-red-600"
                                    : "bg-yellow-100 text-yellow-600"}`}>{job?.status}
                        </span>
                    </div>


                    <div className="border-t border-gray-100 my-3"></div>

                    <div className="flex justify-between text-sm text-gray-600">
                        <span>Applied On:</span>
                        <span>{job?.createdAt.split("T")[0]}</span>
                    </div>
                </div>
            ))}</>)}
            
        </div>
    )
}

export default AppliedJob
