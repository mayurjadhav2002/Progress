import React, { useContext, useEffect, useState } from 'react'
import { Sidebar } from '../../../components/dashboard/Misc/sidebar'
import { MdCreateNewFolder } from 'react-icons/md'
import ListingProject from '../../../components/dashboard/project/listingProject'
import { Button } from '@material-tailwind/react'
import { Link } from 'react-router-dom'
import { useUserContext } from '../../../utils/UserContext/UserContext'
import { getprojects } from '../../../utils/Queries'

function Project() {
  const { user } = useUserContext();
  const [projects, setProjects] = useState([])

  useEffect(() => {
    let isMounted = true;

    if (user) {
      getprojects(user._id)
        .then(data => {
          if (isMounted && data && data.data) {
            setProjects(data.data);
          } else {
            console.error("Invalid data received:", data);
          }
        })
        .catch(error => {
          console.error("Error retrieving projects: ", error);
        });
    }

    // Cleanup function to avoid memory leaks
    return () => {
      isMounted = false;
    };
  }, [user]);


  return (
    <>
      <div className='p-5 w-full overflow-y-auto'>
        <div className='flex justify-between items-start'>
          <h1 className='text-2xl font-bold'>Projects</h1>
          <Link
            className="select-none rounded-lg bg-blue-500 py-2 px-6 text-center align-middle font-sans  text-md font-semibold  text-white shadow-md 
        shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            to="/dashboard/user/project/new" color="blue" >Create Project</Link>
        </div>
        <div className='block'>
          <ListingProject projects={projects} />
        </div>
      </div>
    </>
  )
}

export default Project