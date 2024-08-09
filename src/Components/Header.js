import { signOut } from 'firebase/auth';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../Utils/firebase';
import { useSelector } from 'react-redux';
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from '../Utils/userSlice';
import { LOGO, SIGNOUT, SUPPORTED_LANGUAGES } from '../Utils/constants';
import {toggleGptSearchView} from '../Utils/gptSlice'
import { changeLanguage } from '../Utils/configSlice';

const Header = () => {
    const dispatch = useDispatch();
   const navigate = useNavigate();
   const user = useSelector(store => store.user);
   const showGptSearch = useSelector(store => store.gpt.showGptSearch)


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

   const handleGptSearchClick = () => {
          dispatch(toggleGptSearchView());
   }

   const handleLanguageChange = (e) => {
        dispatch(changeLanguage(e.target.value))
   }
 
    // Deafault is mobile, sm is for tablet, md is for dekstop
   
  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between'>
        <img className='w-44 mx-auto md:mx-0' src={LOGO} alt='' />
    { user && ( <div className='flex p-2 justify-between'>
        {showGptSearch && <select className='p-2 m-4 rounded-lg bg-zinc-900 text-white outline-none' onChange={handleLanguageChange}>
          {SUPPORTED_LANGUAGES.map(lang => <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>)}         
        </select>}
        <button onClick={handleGptSearchClick} className='py-2 px-4 mx-4 my-4 bg-purple-800 text-white rounded-lg'>{showGptSearch? "Homepage" : "GPT Search"}</button>
        <div className='flex-col'>
        <img className='w-12 h-12 rounded-lg' src={SIGNOUT} alt='' />
        <button onClick={handleSignOut} className='font-bold text-red-500'>Sign Out</button>
        </div>
     </div>)}
    </div>

  )
}

export default Header