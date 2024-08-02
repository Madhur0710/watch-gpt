import React, { useState } from 'react'
import Header from './Header';

const Login = () => {
   
    const [isSignIn, SetIsSignIn] = useState(true);

    const toggleSignIn = () => {
        SetIsSignIn(!isSignIn);
    }

  return (
    <div>
        <Header />
        <div className='absolute'> 
            <img src='https://assets.nflxext.com/ffe/siteui/vlv3/826348c2-cdcb-42a0-bc11-a788478ba5a2/6d20b198-e7ab-4e9f-a1aa-666faa0298f9/IN-en-20240729-POP_SIGNUP_TWO_WEEKS-perspective_WEB_a67d8c9e-8121-4a74-98e4-8005eb2df227_large.jpg' alt='' />
        </div>
        <form className='absolute p-12 bg-black w-3/12  my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80'>
          <h1 className='font-bold text-3xl py-4'>{isSignIn? "Sign In" : "Sign Up"}</h1>
          {!isSignIn && <input className='p-4 my-4 w-full bg-gray-600' type='text' placeholder='Full Name' />}
            <input className='p-4 my-4 w-full bg-gray-600' type='text' placeholder='Email Address' />
            <input className='p-4 my-4 w-full bg-gray-600' type='password' placeholder='Password' />
            <button className='p-4 my-6 bg-red-700 w-full rounded-lg'>{isSignIn? "Sign In" : "Sign Up"}</button>
            <p onClick={toggleSignIn} className='py-4 cursor-pointer'>
            {isSignIn? "New to Netflix? Sign Up Now" : "Already Registered? Sign In Now"}
                </p>
        </form>
    </div>
  )
}

export default Login;