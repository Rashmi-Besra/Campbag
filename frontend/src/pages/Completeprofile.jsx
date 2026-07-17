import React,{useState} from 'react'
import AcademicInfo from '../components/Profile/AcademicInfo'
import Profileheader from '../components/Profile/Profileheader'
import ProgressBar from '../components/Profile/ProgressBar'
import PersonalInfo from  '../components/Profile/PersonalInfo'
import { useNavigate } from 'react-router-dom'
const Completeprofile = () => {


  const navigate=useNavigate();
  const handleEditProfile=()=>{
    //navigate("/edit-profile");
    console.log('Edit Profile clicked');
    
  };

    const [profileData]=useState({
        name:"abcxyz",
        collegeEmail:"20xxxxxxxxx@nitjsr.ac.in",
        personalEmail:"xxxxxx@gmail.com",
        phone:"1111111111",
        registrationnumber:"202xxxxxxxx",
        branch:"CSE",
        semester:"5",
        profileImage:"",
        profileCompletion:60
    })
  return (
    <div className='border-t pt-14 min-h-screen bg-white'>
      <div className='max-w-5xl mx-auto px-4'>
       <Profileheader
       userName={profileData.name}
       Completion={profileData.profileCompletion}
       onEdit={handleEditProfile}/>
      

         {/*<ProgressBar Completion={profileData.profileCompletion}/>*/}
          <div className='mt-6 space-y-6'>
          <PersonalInfo profile={profileData}/>
          <AcademicInfo profile={profileData}/>
        </div>
        <div className='mt-8 flex justify-end'>
          <button className='bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-medium transition'>
            Save & Continue

          </button>
        </div>
       </div>
       </div>
    
  )
}

export default Completeprofile;
