import React, { useRef, useState } from 'react'
import Header from './Header';
import { checkValidData } from '../Utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../Utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../Utils/userSlice';


const Login = () => {
   
    const [isSignIn, SetIsSignIn] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();
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
                navigate('/browse');
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
           navigate('/browse')
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
            <img src='https://assets.nflxext.com/ffe/siteui/vlv3/826348c2-cdcb-42a0-bc11-a788478ba5a2/6d20b198-e7ab-4e9f-a1aa-666faa0298f9/IN-en-20240729-POP_SIGNUP_TWO_WEEKS-perspective_WEB_a67d8c9e-8121-4a74-98e4-8005eb2df227_large.jpg' alt='' />
        </div>
        <form onSubmit={(e) => e.preventDefault()} className='absolute p-12 bg-black w-3/12  my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80'>
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