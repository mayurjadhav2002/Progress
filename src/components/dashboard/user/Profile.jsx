import { Typography } from '@material-tailwind/react';
import React from 'react'
import { useState } from 'react';
import { HiMiniBuildingOffice2 } from "react-icons/hi2";
import { TfiEmail } from "react-icons/tfi";
import ProfileImage from './ProfileImage';

function Profile(props) {
  const [file, setFile] = useState();
  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }
  return (
    <div>


      <div className='grid lg:grid-cols-3 md:grid-cols-1 gap-10  p-5'>
        <div className='col-span-1'>
          <div className="max-w-sm mx-auto bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg">
            <div className="border-b px-4 pb-6">
              <div className="text-center my-4">
                <ProfileImage image={props?.user?.avatar}/>
                
                <div className="py-2">
                  <h3 className="font-bold text-2xl text-gray-800 dark:text-white mb-1">
                    {props?.user?.name}
                  </h3>

                  <div className="inline-flex text-gray-700 dark:text-gray-300 items-center">
                    <svg
                      className="h-5 w-5 text-gray-400 dark:text-gray-600 mr-1"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width={24}
                      height={24}
                    >
                      <path
                        className=""
                        d="M5.64 16.36a9 9 0 1 1 12.72 0l-5.65 5.66a1 1 0 0 1-1.42 0l-5.65-5.66zm11.31-1.41a7 7 0 1 0-9.9 0L12 19.9l4.95-4.95zM12 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
                      />
                    </svg>
                    New York, NY
                  </div>
                  <br />

                  <div className="inline-flex text-gray-700 dark:text-gray-300 items-center">
                    <HiMiniBuildingOffice2 className="h-5 w-5 text-gray-400 dark:text-gray-600 mr-1" />
                    Progress
                  </div>
                </div>
              </div>
              <div className="flex gap-2 px-2">
                <button className="flex-1 rounded-full bg-blue-600 dark:bg-blue-800 text-white dark:text-white antialiased font-bold hover:bg-blue-800 dark:hover:bg-blue-900 px-4 py-2">
                  Edit profile
                </button>

              </div>
            </div>

          </div>
        </div>

        <div className='col-span-2 gap-4 items-center justify-center'>
          <div className='about-me'>
            <Typography variant='h4'>About Me</Typography>
            <p>
            {props?.user?.about || "About Section Empty"}            </p>
          </div>
          <div className='flex gap-5 items-center pt-6 '>
            <TfiEmail                 className="h-6 w-6 text-gray-600 dark:text-gray-400"
 />
          {props?.user?.email}
          </div>
          <div className=" pt-6">
            <div className="flex gap-2 items-center text-gray-800 dark:text-gray-300 mb-6">
              <svg
                className="h-6 w-6 text-gray-600 dark:text-gray-400"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width={24}
                height={24}
              >
                <path
                  className=""
                  d="M12 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm9 11a1 1 0 0 1-2 0v-2a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v2a1 1 0 0 1-2 0v-2a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v2z"
                />
              </svg>
              <span>
                <strong className="text-black dark:text-white">12</strong> Peoples
                from same Corporation
              </span>
            </div>

          </div>
        </div>
      </div>

    </div>
  )
}

export default Profile