import React from 'react'
import { Link, redirect } from 'react-router-dom'
import { useState } from 'react';

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLogin = async () => {
      try {
        const response = await fetch('http://localhost:5000/auth/login/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ "username": email, "pwd": password }),
        });
  
        if (response.ok) {
          console.log('Login successful');
        } else {
          console.error('Login failed');
          console.log(response)
        }
      } catch (error) {
        console.error('Error occurred:', error);
      }
    };
  
    const handleRegister = async () => {
      try {
        console.log(password)
        console.log(email)
        const response = await fetch('http://localhost:5000/auth/register/', {
          method: 'POST',
          withCredentials:true,
          credentials:'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ "username": email, "pwd": password }),
        });
        
        if (response.ok) {
          console.log('Registration successful');
        } else {
          console.error('Registration failed');
          console.log(response.status)
          
        }
      } catch (error) {
        console.error('Error occurred:', error);
      }
    };

    function fetch_data6(){
      console.log("fetching data 2")
      fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        withCredntials: true,
        credentials: 'include',
        body:  JSON.stringify({"username": email,"pwd": password}),
      })
      .then((res) => {
          console.log(res); 
          res.json().then(
            (data) => {
              console.log(data); 
              redirect("/")
            }
          )
        }
      )
      
  
    }
  return (
    <div className='bg-color-black pclarge:h-lvh h-dvh flex flex-col items-center justify-between'>

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
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                </div>
                <div className='flex flex-col mt-4'>
                    <label className='text-lg font-medium text-color-cream'>Password</label>
                    <input 
                        className='text-white w-full border-[1px] border-color-cream rounded-xl p-4 mt-2 bg-transparent focus:border-color-cream focus:outline-none'
                        placeholder="Enter your password"
                        value={password}
                        type={"password"}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className='mt-8 flex flex-col gap-y-4'>
                    <Link 
                    
                    onClick={props.login ? ()=>{fetch_data6()} : ()=>{fetch_data6()}}
                    className='active:scale-[.98] active:duration-75 transition-all hover:scale-[0.99] 
                    hover:opacity-95 ease-in-out transform py-4 bg-color-cream rounded-xl text-black 
                    font-bold text-lg text-center'>
                        {
                            props.login ? "Log in" : "Sign up"
                        }
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login
