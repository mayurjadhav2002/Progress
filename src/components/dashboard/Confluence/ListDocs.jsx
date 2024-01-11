import moment from 'moment'
import React from 'react'
import { Link } from 'react-router-dom'
import { LiaEditSolid } from "react-icons/lia";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { FaRegTrashAlt } from 'react-icons/fa';

function ListDocs(props) {
    return (
        <div className="relative overflow-x-auto sm:rounded-lg py-5">

            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-left">Title</TableHead>
                        <TableHead className="text-right">Folder</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                        <TableHead className="text-center w-[200px]">Last Opened</TableHead>

                        <TableHead className="w-[100px] text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {props.docs.map((i, j) =>
                    (<TableRow key={j}>
                        <TableCell className="font-medium">
                            <Link to={`/dashboard/user/documentation/doc/${i.docID}`} className='break-words font-medium'> {i.document_title}</Link>
                        </TableCell>
                        <TableCell className="text-right">
                            {i.group.name || 'main'}
                        </TableCell>
                        <TableCell className="text-right">
                            {i.published ? 'Published' : 'Draft, Not Published'}
                        </TableCell>
                        <TableCell className="text-center">
                            {moment(i.updatedAt, moment.ISO_8601).fromNow()}
                        </TableCell>
                        <TableCell className="text-right flex gap-2 items-center justify-end">
                            <Link to={`/dashboard/user/documentation/doc/${i.docID}`} className='text-blue-400 underline font-medium flex  items-center gap-3 mx-auto'>
                                <LiaEditSolid /> 
                            </Link>
                            <FaRegTrashAlt className='text-red-500 text-bold'/>
                        </TableCell>
                    </TableRow>)
                    )
                    }
                </TableBody>
            </Table>


        
        </div>

    )
}

export default ListDocs