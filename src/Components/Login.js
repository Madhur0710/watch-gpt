import React, { useRef, useState } from 'react'
import Header from './Header';
import { checkValidData } from '../Utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../Utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../Utils/userSlice';
import { BG_URL } from '../Utils/constants';


const Login = () => {
   
    const [isSignIn, SetIsSignIn] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const dispatch = useDispatch();

    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    const handleButtonClick = () => {

        const message = checkValidData(name.current?.value,email.current?.value,password.current?.value)
        setErrorMessage(message);
        if(message) return;

        if(!isSignIn){
            createUserWithEmailAndPassword(auth,email.current.value,password.current.value)
            .then((userCredential) => {
             const user = userCredential.user;
             updateProfile(user, {
                displayName: name.current.value,
              }).then(() => {
                const {uid,email,displayName} = auth.currentUser;
               dispatch(addUser({uid:uid,email:email,displayName:displayName}));
              }).catch((error) => {
                 setErrorMessage(error.message);
              });
        })
            .catch((error) => {
             const errorCode = error.code;
             const errorMessage = error.message;
             setErrorMessage(errorCode+ "-" + errorMessage);
        });

        } else{
           signInWithEmailAndPassword(auth,email.current.value,password.current.value)
           .then((userCredential) => {
           const user = userCredential.user;
           console.log(user);
        })
          .catch((error) => {
           const errorCode = error.code;
           const errorMessage = error.message;
           setErrorMessage(errorCode+ "-" + errorMessage);
        });
        }
    }


    const toggleSignIn = () => {
        SetIsSignIn(!isSignIn);
    }

  return (
    <div>
        <Header />
        <div className='absolute'> 
            <img className='h-screen object-cover w-screen' src={BG_URL} alt='' />
        </div>
        <form onSubmit={(e) => e.preventDefault()} className='absolute p-12 bg-black w-3/4 md:w-3/12  my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80'>
          <h1 className='font-bold text-3xl py-4'>{isSignIn? "Sign In" : "Sign Up"}</h1>
          {!isSignIn && <input ref={name} className='p-4 my-4 w-full bg-zinc-900 rounded-lg outline-none' type='text' placeholder='Full Name' />}
            <input ref={email} className='p-4 my-4 w-full bg-zinc-900 rounded-lg outline-none' type='text' placeholder='Email Address' />
            <input ref={password} className='p-4 my-4 w-full bg-zinc-900 rounded-lg outline-none' type='password' placeholder='Password' />
            <p className='text-red-700 font-bold text-lg py-2'>{errorMessage}</p>
            <button onClick={handleButtonClick} className='p-4 my-6 bg-red-700 w-full rounded-lg'>{isSignIn? "Sign In" : "Sign Up"}</button>
            <p onClick={toggleSignIn} className='py-4 cursor-pointer'>
            {isSignIn? "New to Netflix? Sign Up Now" : "Already Registered? Sign In Now"}
                </p>
        </form>
    </div>
  )
}

export default Login;