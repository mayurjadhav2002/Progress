import { Input, Typography } from '@material-tailwind/react';
import React from 'react'
import { useState } from 'react';

import { useUserContext } from '../../../utils/UserContext/UserContext';
import { Avatar } from '@files-ui/react';
import { TfiEmail } from 'react-icons/tfi';
import { GoOrganization } from "react-icons/go";
import { RxCalendar } from "react-icons/rx";
import moment from 'moment';

function Profile(props) {
  const { user } = useUserContext()
  const [ImageSource2, setImageSource2] = useState(user?.avatar)

  const [file, setFile] = useState();
  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }
  return (
    <div>
      <div className='container w-3/4 mx-auto bg-gray-50 py-10 text-center '>
        <div className='flex justify-center w-full '>
        <Avatar
          src={ImageSource2 || user?.avatar}
          emptyLabel={"You can choose an image..."}

          onError={() => setImageSource2(user?.avatar)}
          onChange={(imgSource) => setImageSource2(imgSource)}
          accept=".jpg, .jpeg, .gif ,.png"
          alt="Avatar2"
          smartImgFit={"center"}
          variant="circle"
          changeLabel={"Click Here to Upload New Image"}
          loadingLabel={"You can drink a cup of coffee in the meanwhile"}


        />
        </div>
     <div className='py-1'>
        <Typography variant='h3'>{user?.name}</Typography>
     </div>
     <div className='w-full flex flex-col items-center justify-center gap-4 py-2'>
      <Typography variant='h6' className='flex items-center gap-2 text-center'> <TfiEmail/> {user?.email}</Typography>
      <Typography variant='h6' className='flex items-center gap-2 text-center'> <GoOrganization/> {user?.organization ? user?.organization_name : 'Individual Account'}</Typography>
      <Typography variant='h6' className='flex items-center gap-2 text-center'> <RxCalendar/> Joined on {moment(user?.createdAt).format('DD MMMM YYYY')}</Typography>

     </div>

     
      </div>

    </div>
  )
}

export default Profile