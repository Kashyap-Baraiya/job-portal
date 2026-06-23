import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
    return (
        <div class="h-[60vh] flex items-center justify-center">

            <div class="text-center">
                <h1 class="text-8xl font-extrabold text-[#9f79ff]">
                    404
                </h1>


                <h2 class="mt-4 text-2xl font-semibold text-gray-800">
                    Page Not Found
                </h2>

                <p class="mt-2 text-gray-500 max-w-md mx-auto">
                    Sorry, the page you are looking for doesn't exist or has been moved.
                </p>


                <Link to="/" class="mt-6 bg-[#af8fff] text-white inline-block px-8 py-3 font-medium rounded-full shadow-lg">
                    Go Back Home
                </Link>

            </div>

        </div>)
}

export default PageNotFound
