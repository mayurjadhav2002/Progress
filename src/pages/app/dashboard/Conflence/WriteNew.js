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
import CSettings from '../../../../components/dashboard/Confluence/CSettings';


function WriteNew() {

    let { id } = useParams();

    const { document_title, setDocument_title, HandleGetFolders,
        folders, setChange,
        published,
        setFolder, loading, setLoading,
        group, setGroup, setDocId, doc_id,HandleUpdate
    } = useConfluenceContext()
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);
    const [query, setQuery] = useState('')

    useEffect(() => {
        setDocId(id);
    }, [id]);

    const HandlePublish = async () => {
        HandleUpdate({ published: true })
        handleOpen()
    }

    if (loading) { return "loading" }
    return (
        <>
            <div className='px-5'>
                <div className='flex justify-between items-start'>
                    <Typography variant='h4' className='flex gap-2'>
                        New Doc</Typography>
                    <div className='flex items-center gap-5'>
                        <Button variant='text'>Saved a Draft</Button>
                        <button className="text-white bg-gradient-to-r from-blue-700 via-blue-800 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center" onClick={HandlePublish}>
                            {published ? 'Published' : 'Publish'}
                        </button>
                        <TbSettings className='h-10 w-10 cursor-pointer hover:bg-blue-gray-50 rounded-md hover:scale-105 p-1 duration-150' onClick={handleOpen} />
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
                    <CSettings handleOpen={handleOpen} setQuery={setQuery} HandlePublish={HandlePublish}/>

                </DialogBody>

            </Dialog>
        </>
    )
}

export default WriteNew