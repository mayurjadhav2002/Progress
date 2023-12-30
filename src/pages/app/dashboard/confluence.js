import React, { useEffect, useState } from 'react'
import Folder from '../../../components/dashboard/Confluence/Folder'
import { GetFolderDoc, getAllDataOfDocs } from '../../../utils/Queries'
import { useUserContext } from '../../../utils/UserContext/UserContext'

function Confluence() {
  const [folders, setFolders] = useState([])
  const [recentlyEdited, setRecentlyEdited] = useState([])
  const [sharedDocs, setSharedDocs] = useState([])
  const { user } = useUserContext()
  useEffect(() => {
    if (user?._id) {
      getAllDataOfDocs({ userId: user?._id })
        .then(res => {
          setFolders(res.data.distinctGroupNames)
          setRecentlyEdited(res.data.recentlyEditedDocs)
          setSharedDocs(res.data.sharedDocs)
        })
        .then(success => {
          console.log("Data fetched and saved");
        })
        .catch((error) => { console.log("Some Unexpected error occured while fetching the data", error) })

      // GetFolderDoc({ userId: user?._id }).then(res => {setFolders(res.data); console.log(res.data)}).catch((error) => { console.log("User dont have any docs") })

    }
  }, [user?._id])
  return (
    <Folder folders={folders} recentlyEdited={recentlyEdited}/>

  )
}

export default Confluence