import React from 'react'
import { ConfluenceContextProvider, useConfluenceContext } from '../../../../utils/WriteContext/ConfluenceContext'
import WriteDoc from '../../../../components/dashboard/Confluence/WriteDoc'
import {
    Button, Typography, Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from '@material-tailwind/react'
import { TbSettings } from "react-icons/tb";
import { Combobox } from '@headlessui/react'
import { useState } from 'react';
import { Await, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useUserContext } from '../../../../utils/UserContext/UserContext';
import axios from 'axios';
const people = [
    'Durward Reynolds',
    'Kenton Towne',
    'Therese Wunsch',
    'Benedict Kessler',
    'Katelyn Rohan',
]

function UpdateDoc() {

    let { id } = useParams();
    const { user } = useUserContext();
    const {
        document_title,
        setDocument_title,
        HandleGetFolders,
        folders,
        setChange,
        setFolder,
        loading,
        setLoading,
        HandleGetDocs,
        group,
        setGroup,
        doc,
        setDocument,
        setDocId,
        doc_id,
        published,
        setPublished,
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
    }, [id, user._id]);

    if (loading) {
        return 'Loading...';
    }
    const HandleGroup = (newGroupName) => {
        // Update the group state with the new name
        setGroup({ ...group, name: newGroupName });
      };

    return (
        <>

            <div>
                <div className='flex justify-between items-start'>


                    <Typography variant='h4' className='flex gap-2'>
                        New Doc</Typography>
                    <div className='flex items-center gap-5'>
                        <Button variant='text'>Saved a Draft</Button>
                        <Button onClick={handleOpen}>
                            {published ? 
                        'Published'    
                        :
                            'Publish'
                            }   
                            </Button>
                        <TbSettings className='h-8 w-8' />
                    </div>
                </div>
                <div className="my-5">
                    <label htmlFor="base-input" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Headline/Title of Documentation</label>
                    <input type="text" id="base-input" placeholder='e.g. Frontend Testing Module Guide' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={document_title}
                        onChange={(e) => {
                            setDocument_title(e.target.value);
                            setChange(true);
                        }}

                    />
                </div>
                <div>
                    <WriteDoc />
                </div>

            </div>
            <Dialog open={open} handler={handleOpen}>
                <DialogHeader className='bg-gray-50'>Additional Info...</DialogHeader>
                <DialogBody>

                    <div className='my-5'>
                        <label htmlFor="email" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Save in Folder</label>

                        <Combobox value={group.name} onChange={HandleGroup}>
                            <Combobox.Input onChange={(event) => setQuery(event.target.value)}
                            
                                placeholder='type the name of folder you want save this file'
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                            <Combobox.Options className={'overflow-y-scroll max-h-32 bg-gray-100 rounded-e-lg'}>
                                {folders && folders?.map((person) => (
                                    <Combobox.Option key={person}
                                        value={person}
                                        className="px-5 py-2 text-black hover:text-primary hover:bg-blue-100 cursor-pointer">
                                        {person}
                                    </Combobox.Option>
                                ))}
                            </Combobox.Options>
                        </Combobox>
                    </div>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button variant="gradient" color="green" onClick={handleOpen}>
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    )
}

export default UpdateDoc