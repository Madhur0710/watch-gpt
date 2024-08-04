import { signOut } from 'firebase/auth';
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../Utils/firebase';
import { useSelector } from 'react-redux';

const Header = () => {

   const navigate = useNavigate();
   const user = useSelector(store => store.user);

   const handleSignOut = () => {
    signOut(auth).then(() => {
        navigate('/');
      }).catch((error) => {
        navigate('/error');
    });
   }

  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
        <img className='w-48' src='https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png' alt='' />
    { user && ( <div className=' p-4'>
        <img className='w-12 h-12 rounded-lg' src='https://i.pinimg.com/originals/30/db/47/30db479e1558c3ed46b4ed23b3cd98ae.png' alt='' />
        <button onClick={handleSignOut} className='font-bold text-red-500'>Sign Out</button>
     </div>)}
    </div>

  )
}

export default Header