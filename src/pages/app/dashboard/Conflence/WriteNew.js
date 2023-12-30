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
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
const people = [
    'Durward Reynolds',
    'Kenton Towne',
    'Therese Wunsch',
    'Benedict Kessler',
    'Katelyn Rohan',
]

function WriteNew() {

    let { id } = useParams();

    const { document_title, setDocument_title, HandleGetFolders,
        folders, setChange,
        setFolder, loading, setLoading,
        group, setGroup, setDocId, doc_id,
    } = useConfluenceContext()
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);
    const [query, setQuery] = useState('')
    const filteredPeople =
        query === ''
            ? people
            : people.filter((person) => {
                return person.toLowerCase().includes(query.toLowerCase())
            })
    useEffect(() => { setDocId(id);
}, [id]);
    if (loading) { return "loading" }
    return (
        <>
            <div className='px-5'>
                <div className='flex justify-between items-start'>
                    <Typography variant='h4' className='flex gap-2'>
                        New Doc</Typography>
                    <div className='flex items-center gap-5'>
                        <Button variant='text'>Saved a Draft</Button>
                        <Button onClick={handleOpen}>Publish</Button>
                        <TbSettings className='h-8 w-8' />
                    </div>
                </div>
                <div class="my-5">
                    <label for="base-input" class="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Headline/Title of Documentation</label>
                    <input type="text" id="base-input" placeholder='e.g. Frontend Testing Module Guide' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={document_title}
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
                        <label for="email" class="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Save in Folder</label>

                        <Combobox value={group} onChange={setGroup}>
                            <Combobox.Input onChange={(event) =>{ setQuery(event.target.value); 
                                      setGroup({name: event.target.value, ...group });

                            setChange(true)}}
                                placeholder='type the name of folder you want save this file'
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                            <Combobox.Options className={'overflow-y-scroll max-h-32 bg-gray-100 rounded-e-lg'}>
                                {folders.length > 0 && folders?.map((person) => (
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

export default WriteNew