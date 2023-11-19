import { Avatar } from '@material-tailwind/react'
import React from 'react'

function Users(props) {
  return (
    <div className="flex items-center -space-x-4">
   {
    props?.alldata?.map((i,j)=>
    <Avatar key={j}
      variant="circular"
      alt="user 5"
      title={i.userId.name}
      className="border-2 border-white hover:z-10 focus:z-10"
      src={i.userId.avatar}
    />
    )
   }
  </div>  )
}

export default Users