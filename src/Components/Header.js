import { signOut } from 'firebase/auth';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../Utils/firebase';
import { useSelector } from 'react-redux';
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from '../Utils/userSlice';
import { LOGO, SIGNOUT } from '../Utils/constants';

const Header = () => {
    const dispatch = useDispatch();
   const navigate = useNavigate();
   const user = useSelector(store => store.user);

   const handleSignOut = () => {
    signOut(auth).then(() => {
      }).catch((error) => {
        navigate('/error');
    });
   }

   useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const {uid,email,displayName} = user;
        dispatch(addUser({uid:uid,email:email,displayName:displayName}));
        navigate('/browse');
      } else {
          dispatch(removeUser());
          navigate('/');
      }
    });
    return () => unsubscribe();
   },[]);


  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
        <img className='w-48' src={LOGO} alt='' />
    { user && ( <div className=' p-4'>
        <img className='w-12 h-12 rounded-lg' src={SIGNOUT} alt='' />
        <button onClick={handleSignOut} className='font-bold text-red-500'>Sign Out</button>
     </div>)}
    </div>

  )
}

export default Header