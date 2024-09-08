import { Link } from "react-router-dom"
const Signin = () => {
    return (
        <div className='h-full w-full flex flex-col gap-3  items-center'>
            <form className='border mt-5 h-fit w-1/2 p-5 flex flex-col gap-5 rounded-xl items-center'>
                <h1 className='text-center text-orange-500 font-semibold text-2xl'>SignIn</h1>

                <div className='w-full flex flex-col gap-2'>
                    <label htmlFor="email" className='text-orange-500 text-lg font-semibold'>Email</label>
                    <input type="email" name="email" placeholder='Enter your email' className='outline-none border h-10 rounded-md p-3' />
                </div>
                <div className='flex  w-full flex-col gap-2'>
                    <label htmlFor="" className='text-orange-500 text-lg font-semibold'>password</label>
                    <input type="password" name="password" placeholder="Enter your password" className='outline-none border h-10 rounded-md p-3' />
                </div>

                <button className='h-[3rem] rounded-xl w-64 bg-orange-400 text-white font-semibold'>Sign In</button>
                <p>Don't have an account?</p>
                <Link to="/signup">Signup</Link>
            </form>
        </div>
    )
}

export default Signin