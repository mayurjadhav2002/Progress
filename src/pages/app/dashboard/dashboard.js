import React from 'react'
import { Button, Typography } from '@material-tailwind/react'
import { useUserContext } from '../../../utils/UserContext/UserContext'
import Card from '../../../components/dashboard/home/Card'
import { Link } from 'react-router-dom'

function Dashboard() {
  const { user } = useUserContext()

  return (
    <>
      <div className='flex justify-between items-start container px-5'>
        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Welcome, {user?.name}</h2>

        <Link to="/dashboard/user/project/new" class="button-50" role="button">Create New</Link>
      </div>

      <div className='block'>
        <Card />
        {/* <Typography variant='h1' className='text-center py-10'>Dashboard is in development! likes got some errors. please visit Projects for demo of Progress. </Typography> */}
      </div>

    </>
  )
}

export default Dashboard