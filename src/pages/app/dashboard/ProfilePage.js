import React from 'react'
import { useUserContext } from '../../../utils/UserContext/UserContext'
import Profile from '../../../components/dashboard/user/Profile'

function ProfilePage() {
  const {user} = useUserContext()
  return (
    <div>
      <Profile user={user}/>
    </div>
  )
}

export default ProfilePage