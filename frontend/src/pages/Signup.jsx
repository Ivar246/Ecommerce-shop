import React from 'react'

const Signup = () => {
    return (
        <div className='h-full w-full flex flex-col gap-3  items-center'>
            <form className='border mt-5 h-fit w-1/2 p-5 flex flex-col gap-5 rounded-xl items-center'>
                <h1 className='text-center text-orange-500 font-semibold text-2xl'>Sign Up</h1>

                <div className='w-full flex flex-col gap-2'>
                    <label htmlFor="username" className='text-orange-500 text-lg font-semibold'>Username</label>
                    <input type="text" name="username" placeholder='Enter your name' className='outline-none border h-10 rounded-md p-3' />
                </div>
                <div className='w-full flex flex-col gap-2'>
                    <label htmlFor="email" className='text-orange-500 text-lg font-semibold'>Email</label>
                    <input type="email" name="email" placeholder='Enter your email' className='outline-none border h-10 rounded-md p-3' />
                </div>
                <div className='flex  w-full flex-col gap-2'>
                    <label htmlFor="" className='text-orange-500 text-lg font-semibold'>password</label>
                    <input type="password" name="password" placeholder="Enter your password" className='outline-none border h-10 rounded-md p-3' />
                </div>

                <button className='h-[3rem] rounded-xl w-64 bg-orange-400 text-white font-semibold'>Sign Up</button>
            </form>
        </div>
    )
}

export default Signup