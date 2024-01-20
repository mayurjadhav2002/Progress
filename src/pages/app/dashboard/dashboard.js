import React from 'react'
import { useUserContext } from '../../../utils/UserContext/UserContext'
import Card from '../../../components/dashboard/home/Card'
import { Link } from 'react-router-dom'
import { Button } from '../../../components/ui/button'

function Dashboard() {
  const { user } = useUserContext()

  return (
    <>
      <div className='flex justify-between items-center'>
        <h2 className="text-3xl font-extrabold">Welcome, {user?.name}</h2>

<Link to="/dashboard/user/project/new">
<Button className="font-semibold font-sans">Create New Board</Button>
</Link>

      </div>

      <div className='block mt-5'>
        <Card />
        {/* <Typography variant='h1' className='text-center py-10'>Dashboard is in development! likes got some errors. please visit Projects for demo of Progress. </Typography> */}
      </div>

    </>
  )
}

export default Dashboard