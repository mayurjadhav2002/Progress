import React from 'react'
import { Sidebar } from '../../../components/dashboard/Misc/sidebar'
import { Button, Input, Typography } from '@material-tailwind/react'
import { useState } from 'react';
import Datepicker from 'react-tailwindcss-datepicker';
import { useUserContext } from '../../../utils/UserContext/UserContext';
import { createProject } from '../../../utils/Queries';

function CreateProject() {
    const [selected, setSelected] = useState();
    const [date, setDate] = useState()
    const {user }= useUserContext()
    const [props, setProps] = useState({created_by: user?._id, title: '', description: '', timeline: '', keyword: '' })

    const OnSubmit = async() => {
        const response = await createProject(props);
        if(response){
            alert("project created")
        }
        else{
            console.log("error", response)
        }
    }

    return (
    <>
                <h1 className='text-2xl font-bold'>Managing Project is gonna be easy now!</h1>

                <div className='py-5'>
                    <div class="mb-6">
                        <Typography variant="h7" color="blue-gray" >
                            Project Name
                        </Typography>
                        <input type="text" id="default-input"
                        onChange={(e)=>{ 
                            setProps((prevProps) => ({
                            ...prevProps,
                            title: e.target.value,
                          }))}}
                            placeholder='e.g. frontend-google-chrome'
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
     dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>


                    <div class="mb-6">

                        <Typography variant="h7" color="blue-gray" >
                            Project Description
                        </Typography>
                        <input type="text" id="default-input"
                        onChange={(e)=>{ 
                            setProps((prevProps) => ({
                            ...prevProps,
                            description: e.target.value,
                          }))}}
                            placeholder='e.g. refer this for frontend work of chrome'
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
     dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>

                    <div class="mb-6 grid grid-cols-1  lg:grid-cols-3 lg:gap-12">
                        <div className=''>


                            <Typography variant="h7" color="blue-gray" >
                                Project Deadline
                            </Typography>
                            <input type="date" id="default-input"
                            onChange={(e)=>{ 
                                setProps((prevProps) => ({
                                ...prevProps,
                                timeline: e.target.value,
                              }))}}
                                placeholder='e.g. refer this for frontend work of chrome'
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
     dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />

                            <Typography
                                variant="small"
                                color="gray"
                                className="mt-2 flex items-center gap-1 font-normal"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="-mt-px h-4 w-4"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                You can update this anytime
                            </Typography>
                        </div>



                        <div className=''>


                            <Typography variant="h7" color="blue-gray" >
                                Team
                            </Typography>
                            <input type="text" id="default-input"
                            onChange={(e)=>{ 
                                setProps((prevProps) => ({
                                ...prevProps,
                                keyword: e.target.value,
                              }))}}
                                placeholder='e.g. Marketing, Frontend etc'
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />


                        </div>
                    </div>

                    <Button onClick={OnSubmit} type='button' variant='gradient' color='blue' size='lg'>Create Project</Button>
                </div>
                </>
                
    )
}

export default CreateProject