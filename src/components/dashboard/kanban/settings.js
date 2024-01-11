import React, { useEffect, useState } from 'react'

import { GiSettingsKnobs } from 'react-icons/gi'
import { format } from 'date-fns';

import { IoSettings } from "react-icons/io5";
import Team from './subComponents/Team';
import { useUserContext } from '../../../utils/UserContext/UserContext';
import { InviteCollaborator, UpdateProject } from '../../../utils/Queries';
import { useProjectContext } from '../../../utils/ProjectContext/ProjectContext';
import { ToastContainer, toast } from 'react-toastify';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import DeleteProject from './subComponents/DeleteProject';
import InviteUsers from './subComponents/InviteUsers';
import ProjectSetting from './subComponents/ProjectSetting';
import { Separator } from '../../ui/separator';
import { RiSettings3Fill } from 'react-icons/ri';
function Settings(props) {

    const { create_by, collaborators } = useProjectContext()

    const { user } = useUserContext()
    const [open, setOpen] = React.useState(false);



    const [changesList, setChangesList] = useState([]);
    const [owner, setOwner] = useState(false)
    useEffect(() => {
        if (user && create_by === user._id) {
            setOwner(true)
        }
    }, [owner, create_by])
    const handleOpen = () => setOpen(!open);



    return (
        <div>

            <Dialog>
                <DialogTrigger>
                    <Button variant="secondary" title={"Setting"}>

                        <RiSettings3Fill className='w-6 h-6'/>

                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <Tabs defaultValue="Project" className="w-full">
                        <TabsList>
                            <TabsTrigger value="Project">Project</TabsTrigger>
                            <TabsTrigger value="Share">Invite </TabsTrigger>
                            <TabsTrigger value="Delete" className="text-red-500">Delete </TabsTrigger>

                        </TabsList>
                        <Separator className="my-2" />
                        <TabsContent value="Project">
                            <ProjectSetting />
                        </TabsContent>
                        <TabsContent value="Share">
                            <InviteUsers collaborators={collaborators} owner={owner} />
                        </TabsContent>
                        <TabsContent value="Delete">
                            <DeleteProject owner={owner} />
                        </TabsContent>

                    </Tabs>


                </DialogContent>
            </Dialog>





            {/* <Dialog
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
                                    <Input variant="standard" label="Project Name"
                                        onChange={(e) => setTitle(e.target.value)}
                                        className='' value={title} />
                                    <Textarea variant='outlined' label='Description'
                                        onChange={(e) => setDesc(e.target.value)}
                                        value={description} />


                                    <div class="mb-6 grid grid-cols-1  lg:grid-cols-3 lg:gap-12">
                                        <div className=''>


                                            <Typography variant="h7" color="blue-gray" >
                                                Project Deadline
                                            </Typography>
                                            <input type="date" id="default-input"
                                                value={timeline}
                                                onChange={e => formatDate1(e.target.value)}
                                                placeholder='e.g. refer this for frontend work of chrome'
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
     dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />

                                        </div>



                                        <div className=''>


                                            <Typography variant="h7" color="blue-gray" >
                                                Team
                                            </Typography>
                                            <input type="text" id="default-input"
                                                value={keyword}
                                                onChange={(e) => setKeyword(e.target.value)}
                                                placeholder='e.g. Marketing, Frontend etc'
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />


                                        </div>
                                    </div>
                                    <Button variant='gradient' color='blue' onClick={HandleUpdateProject}>save</Button>
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

                                            onChange={(e) => setInviteEmail(e.target.value)}
                                        />
                                        <Button
                                            size="sm"
                                            onClick={HandleInvite}
                                            // color={email ? "gray" : "blue-gray"}
                                            // disabled={!email}
                                            className="!absolute right-1 top-1 rounded"
                                        >
                                            Invite
                                        </Button>
                                    </div>
                                    <ToastContainer />

                                    <div className='w-full'>
                                        <Typography variant='h6'>Your Team</Typography>
                                        {collaborators.length > 0 ?

                                            <Team team={collaborators} isowner={owner} />
                                            : "No Team created yet"
                                        }
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel key={3} value={'tab3'} className="py-0">
                                <Typography variant='h3' color='red'> Delete Your Project</Typography>
                                {console.log(owner)}

                                {owner ?
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
                                    </div> :
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

            </Dialog> */}
        </div>
    )
}

export default Settings