import React from 'react'
import { Sidebar } from '../../../components/dashboard/Misc/sidebar'
import { Button } from '@material-tailwind/react'
import { useUserContext } from '../../../utils/UserContext/UserContext'

function Dashboard() {
  const { user } = useUserContext()
  return (
    <div className='flex items-start gap-5'>
      <Sidebar />

      <div className='p-5 w-full overflow-y-auto'>
        <div className='flex justify-between items-start'>
          <h1 className='text-2xl font-bold'>Welcome, {user?.name}</h1>
          <Button color="blue">Create Project</Button>
        </div>

        <div className='block'>
        </div>
      </div>
    </div>)
}

export default Dashboard