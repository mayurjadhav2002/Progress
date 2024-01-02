import React, { useEffect, useState } from 'react'
import { useConfluenceContext } from '../../../../utils/WriteContext/ConfluenceContext'
import WriteDoc from '../../../../components/dashboard/Confluence/WriteDoc'
import { Button, Typography, Dialog, DialogHeader, DialogBody, DialogFooter, Input } from '@material-tailwind/react'
import { TbSettings } from "react-icons/tb";
import { useParams } from 'react-router-dom';
import { useUserContext } from '../../../../utils/UserContext/UserContext';
import axios from 'axios';
import CSettings from '../../../../components/dashboard/Confluence/CSettings';


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


    const HandlePublish = async () => {
        HandleUpdate({ published: true })
        handleOpen()
    }

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

                    <CSettings handleOpen={handleOpen} setQuery={setQuery} HandlePublish={HandlePublish}/>




                </DialogBody>

            </Dialog>
        </>
    )
}

export default UpdateDoc