import React from 'react'
import { ConfluenceContextProvider } from '../../../../utils/WriteContext/ConfluenceContext'
import { Sidebar } from '../../../../components/dashboard/Misc/sidebar'
import { useParams } from 'react-router-dom';
import { Typography } from '@material-tailwind/react';
import { FaFolderOpen } from "react-icons/fa6";
import ListDocs from '../../../../components/dashboard/Confluence/ListDocs';
import { Link } from 'react-router-dom';
import { IoDocumentTextOutline } from "react-icons/io5";

function ListProject() {
    let { fname } = useParams();

    return (
        <ConfluenceContextProvider>

            <div className='p-5 w-full overflow-y-auto'>
                <div className='flex justify-between items-start'>


                    <Typography variant='h4' className='flex gap-2'>
                        <FaFolderOpen />
                        Folder - {fname && fname}</Typography>

                    <Link to={'/dashboard/user/documentation/new'} className="text-white
                         bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none
                          focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 
                          text-center flex items-center gap-2
                          dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2 mb-2">
                        <IoDocumentTextOutline className='w-6 h-6' />
                        Create a New Doc
                    </Link>
                </div>
                <br />
                <ListDocs />
            </div>
        </ConfluenceContextProvider>
    )
}

export default ListProject