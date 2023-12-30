import React from 'react'
import { useParams } from 'react-router-dom';
import { Typography } from '@material-tailwind/react';
import { FaFolderOpen } from "react-icons/fa6";
import ListDocs from '../../../../components/dashboard/Confluence/ListDocs';
import { Link } from 'react-router-dom';
import { IoDocumentTextOutline } from "react-icons/io5";
import { v4 as uuidv4 } from 'uuid';
import { useUserContext } from '../../../../utils/UserContext/UserContext';
import { useState } from 'react';
import { useEffect } from 'react';
import { getDocumentByFolder } from '../../../../utils/Queries';

function ListProject() {
    const { user } = useUserContext()
    let { fname } = useParams();
    const [docs, setDocs] = useState([])
    const randomId = uuidv4();
    useEffect(() => {
        const HandleGetDocByFolder = async () => {
            try {
                const res = await getDocumentByFolder({ userId: user?._id, folder: fname.trim() });
                if (res) {
                    setDocs(res.data);
                    console.log(docs);
                } else {
                    console.log("Some error occurred");
                }
            } catch (error) {
                console.log("Error while fetching new Blog", error.message);
                // Handle the error gracefully, for example, by setting an error state.
                // If you rethrow the error, make sure it's caught higher in the component tree.
                // throw error;
            }
        };

        HandleGetDocByFolder();
    }, [user?._id, fname]);


    return (

        <div className='p-5 w-full overflow-y-auto'>
            <div className='flex justify-between items-start'>


                <Typography variant='h4' className='flex gap-2'>
                    <FaFolderOpen />
                    Folder - {fname && fname}</Typography>
      
                <Link to={`/dashboard/user/documentation/new/${randomId}`} className="text-white
                         bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none
                          focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 
                          text-center flex items-center gap-2
                          dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2 mb-2">
                    <IoDocumentTextOutline className='w-6 h-6' />
                    Create a New Doc
                </Link>
            </div>
            <br />
            <div className='w-full'>
                    <h1 className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 dark:text-white dark:bg-gray-800">
                        Recently Created Docs
                    </h1>

                </div>

            <ListDocs docs={docs} />
        </div>
    )
}

export default ListProject