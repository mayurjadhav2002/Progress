import React, { useEffect, useState } from 'react'
import { useConfluenceContext } from '../../../../utils/WriteContext/ConfluenceContext'
import WriteDoc from '../../../../components/dashboard/Confluence/WriteDoc'
import { Button, Typography, Dialog, DialogHeader, DialogBody, DialogFooter, Input } from '@material-tailwind/react'
import { TbSettings } from "react-icons/tb";
import { Combobox } from '@headlessui/react'
import { useParams } from 'react-router-dom';
import { useUserContext } from '../../../../utils/UserContext/UserContext';
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel, } from "@material-tailwind/react";
import { FolderPlusIcon, UserPlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import axios from 'axios';


function UpdateDoc() {

    let { id } = useParams();
    const { user } = useUserContext();
    const {
        document_title,
        setDocument_title,
        folders,
        setChange,
        loading,
        setLoading,
        group,
        setGroup,
        setDocument,
        setDocId,
        HandleUpdate,
        published,
        setPublished, setDeleted, setFolder
    } = useConfluenceContext();
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const handleOpen = () => { setOpen(!open) }
    useEffect(() => {
        setDocId(id);
        setLoading(true);

        async function getData() {
            try {
                const response = await axios.post('/document/getDocumentById', {
                    doc_id: id,
                    created_by: user._id,
                });

                if (response.data.success) {
                    console.log(response.data)
                    const documentData = response.data.data[0];
                    setDocument(documentData.document);
                    setDocument_title(documentData.document_title);
                    setPublished(documentData.published);
                    setGroup(documentData.group);
                } else {
                    console.log('Some error occurred');
                }
            } catch (error) {
                console.error('Error fetching document data', error);
            } finally {
                setLoading(false);
            }
        }

        getData();
    }, [id, user?._id]);

    if (loading) {
        return 'Loading...';
    }
    const HandleGroup = (newGroupName) => {
        // Update the group state with the new name
        setGroup({ ...group, name: newGroupName });
    };

    const HandlePublish = async () => {
        HandleUpdate({ published: true })
        handleOpen()
    }

    const data = [
        {
            label: "folder",
            value: "folder",
            icon: FolderPlusIcon

        },
        {
            label: "invite",
            value: "invite",
            icon: UserPlusIcon

        },
        {
            label: "delete",
            value: "delete",
            icon: TrashIcon

        },
    ];
    return (
        <>

            <div className='pr-10 pl-5 '>
                <div className='flex justify-between items-start'>
                    <Typography variant='h4' className='flex gap-2'>New Doc</Typography>
                    <div className='flex items-center gap-5'>
                        <Button variant='text'>Saved a Draft</Button>
                        <button className="text-white bg-gradient-to-r from-blue-700 via-blue-800 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center" onClick={HandlePublish}>
                            {published ? 'Published' : 'Publish'}
                        </button>
                        <TbSettings className='h-10 w-10 cursor-pointer hover:bg-blue-gray-50 rounded-md hover:scale-105 p-1 duration-150' onClick={handleOpen} />
                    </div>
                </div>
                <div className="my-5">
                    <label htmlFor="base-input" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Headline/Title of Documentation</label>
                    <input type="text" id="base-input" placeholder='e.g. Frontend Testing Module Guide' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={document_title}
                        onChange={(e) => { setDocument_title(e.target.value); setChange(true); }} />
                </div>
                <div>
                    <WriteDoc />
                </div>

            </div>
            <Dialog open={open} handler={handleOpen} >
                <DialogHeader className='bg-gray-50'>Additional Info...</DialogHeader>
                <DialogBody>

                    <Tabs value="folder">
                        <TabsHeader>
                            {data.map(({ label, value, icon }) => (
                                <Tab key={value} value={value}>
                                    <div className="flex items-center gap-2">
                                        {React.createElement(icon, { className: "w-5 h-5" })}
                                        {label}
                                    </div>
                                </Tab>
                            ))}
                        </TabsHeader>
                        <TabsBody>
                            <TabPanel key={'folder'} value={'folder'}>
                                <div className='my-5'>
                                    <label htmlFor="email" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Save in Folder</label>
                                    <div class="relative mb-6">
                                        <Combobox value={group.name} onChange={HandleGroup}>
                                            <div className='relative'>
                                                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 cursor-pointer">
                                                    <input type="color" className='w-8 h-8 text-gray-500 dark:text-gray-400 rounded-lg' value={group.color} onChange={(e) => setGroup({ ...group, color: e.target.value })} />
                                                </div>
                                                <Combobox.Input value={group.name} onChange={(event) => { setQuery(event.target.value); HandleGroup(event.target.value) }}
                                                    placeholder='type the name of folder you want save this file'
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg ps-14 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                />
                                            </div>
                                            <Combobox.Options className={'overflow-y-scroll max-h-32 bg-gray-100 rounded-e-lg'}>
                                                {folders && folders?.map((person) => (
                                                    <Combobox.Option key={person} value={person} className="px-5 py-2 text-black hover:text-primary hover:bg-blue-100 cursor-pointer">
                                                        {person}
                                                    </Combobox.Option>
                                                ))}
                                            </Combobox.Options>
                                        </Combobox>
                                    </div>

                                    <Button variant="gradient" color="green" >
                                        <span>Confirm</span>
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="red"
                                        onClick={handleOpen}
                                        className="mx-2"
                                    >
                                        <span>Cancel</span>
                                    </Button>
                                </div>
                            </TabPanel>



                            <TabPanel key={'invite'} value={'invite'}>
                                <div>
                                    <div className="relative flex w-full">
                                        <Input type="email" label="Email Address"
                                            // onChange={}
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
                                        Enter the Email of the User you want to invite to collaborate in document
                                    </Typography>
                                </div>

                            </TabPanel>

                            <TabPanel key={'delete'} value={'delete'}>
                                <div>
                                    <p className='text-blue font-medium '>Enter <span className='text-red-500 font-bold'>DELETE</span> in below input box</p>
                                    <div className="relative flex w-full mt-2">
                                        <Input type="text" label="Do you Want to Delete this Document"
                                            // onChange={}
                                            className="pr-20"
                                            variant='standard'
                                            containerProps={{
                                                className: "min-w-0",
                                            }}
                                        />
                                        <Button
                                            size="sm"
                                            color='red'
                                            // color={email ? "gray" : "blue-gray"}
                                            // disabled={!email}
                                            className="!absolute right-1 top-1 rounded"
                                            onClick={(e) => {
                                                setDeleted(true);
                                                HandleUpdate()
                                                handleOpen()
                                            }}
                                        >
                                            DELETE
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
                                        Once you delete Document you cannot able to recover it again in future, so reconsider again
                                    </Typography>
                                </div>
                            </TabPanel>


                        </TabsBody>
                    </Tabs>





                </DialogBody>

            </Dialog>
        </>
    )
}

export default UpdateDoc