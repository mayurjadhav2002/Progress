import React, { useEffect, useState } from 'react'
import Folder from '../../../components/dashboard/Confluence/Folder'
import { GetFolderDoc } from '../../../utils/Queries'
import { useUserContext } from '../../../utils/UserContext/UserContext'

function Confluence() {
  const [folders, setFolders] = useState()
const {user} = useUserContext()
  useEffect(()=>{
    if(user?._id){
      GetFolderDoc({userId: user?._id}).then(res=>setFolders(res.data))

    }
  }, [user?._id])
  return (
    <Folder folders={folders}/>

  )
}

export default Confluence