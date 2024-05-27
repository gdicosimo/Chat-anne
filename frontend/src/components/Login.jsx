import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { OrbitProgress } from 'react-loading-indicators';
import useAuth from '../Hooks/useAuth';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loading, error, authenticate } = useAuth();

  const handleAuth = async (endpoint) => {
    await authenticate(email, password, endpoint);
  };

  return (
    <div className='bg-color-black pclarge:h-lvh h-dvh flex flex-col items-center justify-between'>
      <Helmet>
        <title>Chat-anne</title>
      </Helmet>
      {loading && (
        <div className='absolute z-10 flex items-center w-full h-full bg-color-black/10 backdrop-blur-lg justify-center transition-all'>
          <OrbitProgress variant='bubble-dotted' color='#FDF0D5' size='medium' text='' textColor='' easing='ease-in-out' />
        </div>
      )}
      <div className='flex flex-col gap-4 h-full w-2/3 max-w-[700px] justify-center'>
        <h1 className='text-4xl'>{props.login ? 'Welcome Back to Chat-anne!' : 'Join Chat-anne!'}</h1>
        <div className='mt-8 '>
          <div className='flex flex-col'>
            <label className='text-lg font-medium text-color-cream font-poppins ml-2 mb-2'>Email</label>
            <input
              className="font-poppins font-medium text-color-cream placeholder:text-color-cream/50 
              placeholder:font-poppins placeholder:font-medium block bg-color-middleblack hover:bg-color-lightblack transition-all duration-500 w-full  rounded-xl p-4 focus:outline-none" 
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='flex flex-col mt-4'>
            <label className='text-lg font-medium text-color-cream font-poppins ml-2 mb-2'>Password</label>
              <input
                className="font-poppins font-medium text-color-cream placeholder:text-color-cream/50 
                placeholder:font-poppins placeholder:font-medium block bg-color-middleblack hover:bg-color-lightblack transition-all duration-500 w-full  rounded-xl p-4 focus:outline-none" 
                placeholder='Enter your password'
                value={password}
                type='password'
                onChange={(e) => setPassword(e.target.value)}
              />
          </div>
          <div className='mt-8 flex flex-col gap-y-4 font-poppins'>
            <Link
              onClick={() => handleAuth(props.login ? 'GET_LOGIN' : 'GET_REGISTER')}
              className='active:scale-[.98] active:duration-75 transition-all hover:scale-[0.99] 
                        hover:opacity-95 ease-in-out transform py-4 bg-color-cream rounded-xl text-black 
                        font-bold text-lg text-center'
            >
              {props.login ? 'Log in' : 'Sign up'}
            </Link>
          </div>
          {error && <h1 className='font-light text-base text-red-600 text-center my-2'>{error}</h1>}
        </div>
      </div>
    </div>
  );
};

export default Login;
