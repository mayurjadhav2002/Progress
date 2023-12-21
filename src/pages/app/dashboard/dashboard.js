import React from 'react'
import { Sidebar } from '../../../components/dashboard/Misc/sidebar'
import { Button, Typography } from '@material-tailwind/react'
import { useUserContext } from '../../../utils/UserContext/UserContext'

function Dashboard() {
  const { user } = useUserContext()
  return (
    <>
      <div className='flex justify-between items-start container px-5'>
        <h1 className='text-2xl font-bold'>Welcome, {user?.name}</h1>
        <Button color="blue">Create Project</Button>
      </div>

      <div className='block'>
        <Typography variant='h1' className='text-center py-10'>Dashboard is in development! likes got some errors. please visit Projects for demo of Progress. </Typography>
      </div>

    </>
  )
}

export default Dashboard