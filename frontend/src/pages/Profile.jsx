import React, { useState } from "react";

import ProfileHeader from "../components/Profile/ProfileHeader";
import ProfileCard from "../components/Profile/ProfileCard";
import PersonalInfoCard from "../components/Profile/PersonalInfoCard";
import AcademicInfoCard from "../components/Profile/AcademicInfoCard";
import AccountStatusCard from "../components/Profile/AccountStatusCard";
import Sellerbadge from "../components/Profile/Sellerbadge";

const Profile = () => {

  const [profileData] = useState({
    name: "Rashmi Besra",
    profileImage: "",

    collegeEmail: "2023ugcs001@nitjsr.ac.in",
    personalEmail: "rashmi@gmail.com",
    phone: "9876543210",

    registrationNumber: "2023UGCS001",
    branch: "Computer Science & Engineering",
    semester: 5,
    hostel: "Hostel B",

    profileCompletion: 100,
    sellerStatus: "Pending",
    trustScore: 45,
    emailVerified: true,
  });

  return (
    <div className="border-t pt-14 min-h-screen ">

      <div className="max-w-6xl mx-auto px-4 py-4">

        <ProfileHeader
          userName={profileData.name}
          completion={profileData.profileCompletion}
        />

        <div className="mt-6 space-y-6">

          <ProfileCard profile={profileData} editable={false} onEdit={()=> Navigate("/edit-profile")} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            <PersonalInfoCard profile={profileData} editable={false} />

            <AcademicInfoCard profile={profileData} />

          </div>

          <AccountStatusCard profile={profileData} />
               {
          profileData.sellerStatus==="Pending" &&
          (
                     <Sellerbadge profile={profileData}/>

          )
        }

        </div>
  
      </div>

    </div>
  );
};

export default Profile;