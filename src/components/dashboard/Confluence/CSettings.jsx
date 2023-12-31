
import React from 'react'
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel, Button, Input, Typography, } from "@material-tailwind/react";
import { FolderPlusIcon, UserPlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useConfluenceContext } from '../../../utils/WriteContext/ConfluenceContext';
import { Combobox } from '@headlessui/react';

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


function CSettings(props) {
    const {

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
    const HandleGroup = async(newGroupName) => {
        // Update the group state with the new name
        await setGroup({ ...group, name: newGroupName });
    };
    return (
        <>

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
                                        <Combobox.Input value={group.name} onChange={(event) => { props.setQuery(event.target.value); HandleGroup(event.target.value) }}
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

                            <Button variant="gradient" color="green" onClick={props.HandlePublish} >
                                <span>Confirm</span>
                            </Button>
                            <Button
                                variant="outlined"
                                color="red"
                                onClick={props.handleOpen}
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
                                        setLoading(true)

                                        setDeleted(true);
                                        HandleUpdate()
                                        props.handleOpen()
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
        </>

    )
}

export default CSettings