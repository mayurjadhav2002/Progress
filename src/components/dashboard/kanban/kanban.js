import React from 'react'
import Card from './card'

function Kanban() {
    return (
        <div className='grid grid-cols-3 gap-6 '>
            <div className='col-span-1 h-[calc(100vh-280px)] bg-gray-200 overflow-y-scroll custom-scrollbar'>
                <div className='sticky top-0 bg-gray-100 p-5 shadow-lg'>
                    <h1 className='text-lg font-semibold  dark:text-primary'>Todo</h1>
                </div>
                <div className=' flex flex-col overflow-y-auto p-3 gap-2'>
                    {Array(1, 2, 1, 3, 4, 4, 5, 3, 1, 2, 3, 4, 4, 5, 3, 2, 3, 4, 4, 5, 3, 1, 2, 3, 4, 4, 5, 3).map(i => (
                        <Card />
                    ))}
                </div>
            </div>



            <div className='col-span-1 h-[calc(100vh-280px)] bg-gray-200 overflow-y-scroll custom-scrollbar'>
                <div className='sticky top-0 bg-gray-100 p-5 shadow-lg'>
                    <h1 className='text-lg font-semibold  dark:text-primary'>Todo</h1>
                </div>
                <div className=' flex flex-col overflow-y-auto p-3 gap-2'>
                    {Array(1, 2, 1, 3, 4, 4, 5, 3, 1, 2, 3, 4, 4, 5, 3, 2, 3, 4, 4, 5, 3, 1, 2, 3, 4, 4, 5, 3).map(i => (
                        <Card id={i} />
                    ))}
                </div>
            </div>




            <div className='col-span-1 h-[calc(100vh-280px)] bg-gray-200 overflow-y-scroll custom-scrollbar'>
                <div className='sticky top-0 bg-gray-100 p-5 shadow-lg'>
                    <h1 className='text-lg font-semibold  dark:text-primary'>Todo</h1>
                </div>
                <div className=' flex flex-col overflow-y-auto p-3 gap-2'>
                    {Array(1, 2, 1, 3, 4, 4, 5, 3, 1, 2, 3, 4, 4, 5, 3, 2, 3, 4, 4, 5, 3, 1, 2, 3, 4, 4, 5, 3).map(i => (
                        <Card />
                    ))}
                </div>
            </div>
        </div>

    )
}

export default Kanban