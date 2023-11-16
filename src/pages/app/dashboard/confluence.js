import React from 'react'
import { Sidebar } from '../../../components/dashboard/Misc/sidebar'
import { MdCreateNewFolder } from 'react-icons/md'
import ListingProject from '../../../components/dashboard/project/listingProject'
import { Button } from '@material-tailwind/react'

function Confluence() {
  return (
    <div className='flex items-start gap-5'>
      <Sidebar />

      <div className='p-5 w-full overflow-y-auto'>
        <div className='flex justify-between items-start'>
          <h1 className='text-2xl font-bold'>Projects</h1>
          <Button color="blue">Create Project</Button>


        </div>

        <div className='block'>
        </div>
      </div>
    </div>)
}

export default Confluence