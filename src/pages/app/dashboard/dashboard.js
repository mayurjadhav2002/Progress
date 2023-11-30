import React from 'react'
import { Sidebar } from '../../../components/dashboard/Misc/sidebar'
import { Button } from '@material-tailwind/react'
import { useUserContext } from '../../../utils/UserContext/UserContext'

function Dashboard() {
  const { user } = useUserContext()
  return (
    <>
      <div className='flex justify-between items-start'>
        <h1 className='text-2xl font-bold'>Welcome, {user?.name}</h1>
        <Button color="blue">Create Project</Button>
      </div>

      <div className='block'>
      </div>

    </>
  )
}

export default Dashboard