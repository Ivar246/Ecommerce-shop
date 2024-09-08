import React from 'react'
import { Link } from 'react-router-dom'
const Home = () => {
    return (
        <div className='border h-[100vh] flex flex-col gap-5 items-center justify-center'>
            <h1 className='font-semibold text-3xl'>Welcome To My Shop</h1>
            <Link to="/products">
                <button className='h-[3rem] rounded-xl w-64 bg-orange-400'>
                    Go to products page
                </button>
            </Link>

        </div>
    )
}

export default Home