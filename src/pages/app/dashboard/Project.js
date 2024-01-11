import React, { useContext, useEffect, useState } from 'react'
import { Sidebar } from '../../../components/dashboard/Misc/sidebar'
import { MdCreateNewFolder } from 'react-icons/md'
import ListingProject from '../../../components/dashboard/project/listingProject'
import { Link } from 'react-router-dom'
import { useUserContext } from '../../../utils/UserContext/UserContext'
import { getprojects } from '../../../utils/Queries'
import { Button } from '../../../components/ui/button'

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
        <div className='flex justify-between items-center'>
          <h1 className='text-2xl font-bold'>Projects</h1>
          <Link to="/dashboard/user/project/new">
            <Button className="font-semibold font-sans">Create New Board</Button>
          </Link>

        </div>
        <div className='block'>
          <ListingProject projects={projects} />
        </div>
      </div>
    </>
  )
}

export default Project