import React from 'react'

const Login = (props) => {
  return (
    <div className='flex flex-col gap-4 h-full w-2/3 max-w-[700px] justify-center'>
        <h1 className='text-4xl'>
            {
                props.login ? "Welcome Back to Chat-anne!" : "Join Chat-anne!"
            }
        </h1>
        <div className='mt-8 '>
            <div className='flex flex-col'>
                <label className='text-lg font-medium text-color-cream'>Email</label>
                <input 
                    className='text-white w-full border-[1px] border-color-cream rounded-xl p-4 mt-2 bg-transparent focus:border-color-cream focus:outline-none'
                    placeholder="Enter your email"/>
            </div>
            <div className='flex flex-col mt-4'>
                <label className='text-lg font-medium text-color-cream'>Password</label>
                <input 
                    className='text-white w-full border-[1px] border-color-cream rounded-xl p-4 mt-2 bg-transparent focus:border-color-cream focus:outline-none'
                    placeholder="Enter your email"
                    type={"password"}
                />
            </div>
            <div className='mt-8 flex flex-col gap-y-4'>
                <button className='active:scale-[.98] active:duration-75 transition-all hover:scale-[0.99] hover:opacity-95 ease-in-out transform py-4 bg-color-cream rounded-xl text-black font-bold text-lg'>
                    {
                        props.login ? "Log in" : "Sign up"
                    }
                </button>
            </div>
        </div>
    </div>
  )
}

export default Login
