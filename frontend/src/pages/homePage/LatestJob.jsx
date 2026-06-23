import { useSelector } from 'react-redux';
import LatestJobCards from './LatestJobCards.jsx'
import store from '@/redux/stor.js';

function LatestJob() {
    const {allJob} = useSelector(store =>store.job)
    
    
    return (
        <div className='w-full'>
        <div className='max-w-7xl mx-auto my-15'>
            <div className='text-4xl p-3 font-bold mb-3'>Latest & <span className='text-[#7C3AED]'>Top Job Openings</span></div>
            <div className='grid lg:grid-cols-3 p-5 md:grid-cols-2 gap-4 pt-3'>
                {allJob.slice(0,6).map((job) => {
                    return <LatestJobCards key={job._id} job={job} />
                })}

            </div>
        </div>
        </div>
    )
}

export default LatestJob
