import React from 'react'
import { Sidebar } from '../../../components/dashboard/Misc/sidebar'
import { Button } from '@material-tailwind/react'
import { useUserContext } from '../../../utils/UserContext/UserContext'
import { Outlet } from 'react-router-dom'

function Main() {
    return (
        <div className='flex items-start gap-5'>
            <Sidebar />

            <div className='p-5 w-full overflow-y-auto'>
                <Outlet/>
            </div>
        </div>
    )
}

export default Main