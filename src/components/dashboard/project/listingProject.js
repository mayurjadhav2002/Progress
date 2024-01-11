import * as React from 'react'
import { useState } from 'react'
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from '@tanstack/react-table'
import InputSearch from './InputSearch'

import {

    Typography,

} from "@material-tailwind/react";
import { Link } from 'react-router-dom';

const ColumnHelper = createColumnHelper()
const columns = [

    ColumnHelper.accessor("title", {
        cell: (info) => (<Link to={`/dashboard/user/board/${info.row.original._id}`}
            className='text-blue-800 underline underline-offset-4 text-sm'>
            {info.getValue()}
        </Link>),
        header: "Name"
    }),
    ColumnHelper.accessor("keyword", {
        cell: (info) => <span>{info.getValue()}</span>,
        header: "Team"
    }),

    ColumnHelper.accessor("description", {
        cell: (info) => <span>{info.getValue()}</span>,
        header: "Description"
    }),
    ColumnHelper.accessor("created_by", {
        cell: (info) => (
            <Link to="#" className='flex items-center gap-1'>
                <img
                    src={info.getValue().avatar}
                    title={info.getValue().name}
                    alt="Creator Avatar"
                    style={{ width: "30px", height: "30px", borderRadius: "50%" }}
                />
            </Link>
        ),
        header: "Creator"
    }),

]

export default function ListingProject(props) {
    const data = props.projects
    const [rowSelection, setRowSelection] = React.useState({})
    const [globalFilter, setGlobalFilter] = React.useState("");

    const table = useReactTable({
        data,
        columns,
        state: {
            globalFilter,
            rowSelection
        },
        getFilteredRowModel: getFilteredRowModel(),
        getCoreRowModel: getCoreRowModel(),
        enableRowSelection: true, //enable row selection for all rows
        enableRowSelection: row => row.original.age > 18, // or enable row selection conditionally per row
        onRowSelectionChange: setRowSelection,
        getPaginationRowModel: getPaginationRowModel(),
        initialState: { pageIndex: 0, pageSize: 7 }, // Set the initial page size to 7

    })

    return (
        <div className="p-2 ">
            <div className='w-full'>

                <div className='grid grid-cols-1  lg:grid-cols-4'>

                    <InputSearch value={globalFilter ?? ""}
                        onChange={
                            (value) => setGlobalFilter(String(value))
                        }
                    />
                </div>
                <table className="mt-4 w-full text-left rounded-lg border-2">
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id} className='rounded-lg'>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        className="cursor-pointer border-y border-blue-gray-100 p-4 transition-colors bg-blue-gray-50
                                        dark:bg-black dark:text-white
                                        "
                                    >
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="flex items-center dark:text-white justify-between gap-2 font-normal leading-none opacity-70"
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map((row,i) => {
                            return (
                                <tr key={row.id} className={`py-5 items-start hover:bg-gray-50 ${i % 2 === 0
                                    ? 'bg-white dark:bg-dark dark:text-white'
                                    : 'bg-gray-50 dark:bg-black dark:text-white'
                                    }`}>
                                    {row.getVisibleCells().map(cell => {
                                        return (
                                            <td key={cell.id} className={i === 0 ? "p-4" : "p-4 border-b border-blue-gray-50 text-ellipsis"}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </td>
                                        )
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>

                </table>




                < div className='flex items-center justify-end mt-2 gap-2'>
                    <button
                        onClick={() => {
                            table.previousPage()
                        }}
                        disabled={!table.getCanPreviousPage()}
                        className='p-1 border border-gray-300 px-2 py-1 disabled:opacity-30'
                    >
                        {"<"}
                    </button>

                    <button
                        onClick={() => {
                            table.nextPage()
                        }}
                        disabled={!table.getCanNextPage()}
                        className='p-1 border border-gray-300 px-2 py-1 disabled:opacity-30'
                    >
                        {">"}
                    </button>

                    <span className='flex items-center gap-2'><div>page</div>
                        <strong>{table.getState().pagination.pageIndex + 1} of {" "} {table.getPageCount()}</strong>
                    </span>
                </div>



            </div>


        </div >


    )
}

