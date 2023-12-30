import moment from 'moment'
import React from 'react'
import { Link } from 'react-router-dom'
import { FaPenFancy } from "react-icons/fa";

function ListDocs(props) {
    return (
        <div className="relative overflow-x-auto sm:rounded-lg py-5">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-blue-800 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400 rounded-md">
                    <tr>
                        <th scope="col" className="px-6 py-3 " style={{ minWidth: '50%' }}>
                            Title
                        </th>
                        <th scope="col" className="px-6 py-3 min-w-[100px]  text-center">
                            Folder
                        </th>
                        <th scope="col" className="px-6 py-3 min-w-[100px]  text-center">
                            Status
                        </th>
                        <th scope="col" className="px-6 py-3 min-w-[180px] text-center">
                            Last Opened
                        </th>
                        <th scope="col" className="px-6 py-3 min-w-[80px] text-center">
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {props.docs.map((i, j) =>
                        <tr key={j} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 break-words max-w-xs">
                            <th scope="row" className="px-2 py-4 break-all w-auto font-medium text-gray-900   dark:text-white">
                                <Link to={`/dashboard/user/documentation/doc/${i.docID}`} className='break-words font-medium'> {i.document_title}</Link>
                            </th>
                            <td className="px-6 py-4  w-44  text-center">
                                {/* {moment(i.updateAt).fromNow()} */}

                                {i.group.name || 'main'}
                            </td>
                            <td className="px-6 py-4 w-44  text-center">
                                {i.published ? 'Published' : 'Draft, Not Published'}
                            </td>
                            <td className="px-6 py-4 w-52  text-center">
                                {moment(i.updatedAt, moment.ISO_8601).fromNow()}
                            </td>

                            <td className="px-6 py-4 w-44  text-center">
                                <Link to={`/dashboard/user/documentation/doc/${i.docID}`} className='text-blue-400 underline font-medium flex text-center items-center gap-3 mx-auto'>
                                    <FaPenFancy className='w-4 h-4' /> Edit
                                </Link>

                            </td>
                        </tr>
                    )}

                </tbody>
            </table>
        </div>

    )
}

export default ListDocs