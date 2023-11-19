import React, { useEffect, useState } from 'react'
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
    Input,
    Textarea,
    Typography,
} from "@material-tailwind/react";
import { GiSettingsKnobs } from 'react-icons/gi'
import { format } from 'date-fns';

import { IoSettings } from "react-icons/io5";
import Team from './subComponents/Team';
import { useUserContext } from '../../../utils/UserContext/UserContext';
function Settings(props) {
    console.log(props)
    const {user} = useUserContext()
    const [open, setOpen] = React.useState(false);
    const originalDateString = props?.data?.timeline;
    const originalDate = new Date(originalDateString);
    const [formattedDate, setFormattedDate] = useState('');
    let isOwner = false;
    if(props?.data?.created_by === user?._id){
        isOwner = true;
    }
    const handleOpen = () => setOpen(!open);
    useEffect(() => {
        const year = originalDate.getFullYear();

        const month = String(originalDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based
        const day = String(originalDate.getDate()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;
        setFormattedDate(formattedDate);
    
    }, [originalDate])

    return (
        <div>


            <Button onClick={handleOpen} size="sm" color="blue" className='flex items-center gap-3'>
                <GiSettingsKnobs className='w-6 h-6' />
                <p className='text-md font-medium font-sans'>Setting</p>

            </Button>

            <Dialog
                size='lg'
                open={open}
                handler={handleOpen}
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                }}
            >
                <DialogBody>
                    <Tabs value="tab" orientation="vertical">
                        <TabsHeader className="w-32">
                            <Tab key={1} value={'tab'}>
                                Project
                            </Tab>
                            <Tab key={2} value={'tab2'}>
                                Collaborate
                            </Tab>
                            <Tab key={3} value={'tab3'} className='text-red-500'>
                                Delete
                            </Tab>

                        </TabsHeader>
                        <TabsBody>
                            <TabPanel key={1} value={'tab'} className="py-0">
                                <Typography variant='h4' className='flex gap-3  items-center'><IoSettings /> Project Details</Typography>
                                <div className='my-5 flex flex-col gap-5'>
                                    <Input variant="standard" label="Project Name" className='' value={props?.data?.title} />
                                    <Textarea variant='outlined' label='Description' value={props?.data?.description} />


                                    <div class="mb-6 grid grid-cols-1  lg:grid-cols-3 lg:gap-12">
                                        <div className=''>


                                            <Typography variant="h7" color="blue-gray" >
                                                Project Deadline
                                            </Typography>
                                            <input type="date" id="default-input"
                                                value={formattedDate}
                                                placeholder='e.g. refer this for frontend work of chrome'
                                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
     dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />

                                        </div>



                                        <div className=''>


                                            <Typography variant="h7" color="blue-gray" >
                                                Team
                                            </Typography>
                                            <input type="text" id="default-input"
                                            value={props?.data?.keyword}
                                                placeholder='e.g. Marketing, Frontend etc'
                                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />


                                        </div>
                                    </div>

                                </div>
                            </TabPanel>
                            <TabPanel key={2} value={'tab2'} className="py-0">
                                <Typography variant='h4' className='flex gap-3  items-center'><IoSettings /> Collaborate with Team</Typography>
                                <div className='my-5 flex flex-col gap-5'>
                                    <div className="relative flex w-full max-w-[24rem]">
                                        <Input
                                            variant='standard'
                                            type="email"
                                            label="Enter Email Address of Member to Invite"
                                            // value={email}
                                            // onChange={onChange}
                                            className="pr-20"
                                            containerProps={{
                                                className: "min-w-0",
                                            }}
                                        />
                                        <Button
                                            size="sm"
                                            // color={email ? "gray" : "blue-gray"}
                                            // disabled={!email}
                                            className="!absolute right-1 top-1 rounded"
                                        >
                                            Invite
                                        </Button>
                                    </div>

                                    <div className='w-full'>
                                        <Typography variant='h6'>Your Team</Typography>
                                        {props?.data?.collaborators?.length > 0 ? 
                                        
                                        <Team team={props?.data?.collaborators} isowner={isOwner} />
                                    :"No Team created yet"
                                    }
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel key={3} value={'tab3'} className="py-0">
                                <Typography variant='h3' color='red'> Delete Your Project</Typography>
                                {isOwner?
                                 <div className='my-5 '>
                                 <div className="relative flex w-full ">
                                     <Input
                                         type="text"
                                         label="Enter Your Project Name"
                                         // value={email}
                                         // onChange={onChange}
                                         className="pr-20"
                                         containerProps={{
                                             className: "min-w-0",
                                         }}
                                     />
                                     <Button
                                         size="sm"
                                         // color={email ? "gray" : "blue-gray"}
                                         // disabled={!email}
                                         color='red'
                                         className="!absolute right-1 top-1 rounded"
                                     >
                                         Delete
                                     </Button>
                                 </div>

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
                                     Enter <strong>Your project name</strong> above
                                 </Typography>
                             </div>:
                             <div>
                                <Typography>
                                    You can't Delete this Project
                                </Typography>
                             </div>
                            }
                               
                            </TabPanel>
                        </TabsBody>
                    </Tabs>
                </DialogBody>

            </Dialog>
        </div>
    )
}

export default Settings