import React, { useEffect, useState } from 'react'
import { useUserContext } from '../../../utils/UserContext/UserContext'
import { getProjectCounts } from '../../../utils/Queries';
import { MdDashboard } from "react-icons/md";
import {
    Card,
    CardContent, CardDescription, CardFooter, CardHeader, CardTitle
} from '../../ui/card';
import { SiGoogledocs } from "react-icons/si";
import { MdOutlineStorage } from "react-icons/md";
import { GrStorage } from "react-icons/gr";
import { HiOutlineCalendarDays } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import { RxDotFilled } from 'react-icons/rx';
import { RiDeleteBack2Fill } from 'react-icons/ri';
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '../../ui/context-menu';
import { Separator } from '../../ui/separator';

import { InfoCircledIcon } from '@radix-ui/react-icons';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { CiEdit } from 'react-icons/ci';
import { FaHistory } from 'react-icons/fa';
import { CardforDrag } from '../kanban/main/CardForDrag';
import { Loading } from '../../Misc/Loadings';



function CardComponent(props) {
    const { user, userActivityCount, setUserActivityCount } = useUserContext()
    const [DataFetched, setDataFetched] = useState(false)
    if (!DataFetched) {
        try {
            if (user?._id) {
                getProjectCounts(user._id)
                    .then((res) => {
                        setUserActivityCount(res);
                    }).then((data) => setDataFetched(true))

                    .catch((error) => {
                        setDataFetched(true)
                        console.error('Error fetching user activity counts:', error);
                    });
                const timeoutId = setTimeout(() => {
                    setDataFetched(false);
                }, 5 * 60 * 1000); // 5 minutes in milliseconds

                // Cleanup the timeout on component unmount
                return () => clearTimeout(timeoutId);
            }
        } catch (error) {
            console.log("Some error occured", error)
        }
    }
    if (!userActivityCount || !userActivityCount.success) {
        return <><Loading/></>
    }
    return (
        <section>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 px-5">
                <Card>
                    <CardHeader class="flex flex-row items-center justify-between space-y-0 px-6 py-2 pt-5">
                        <CardTitle class="text-md font-medium">
                            Boards
                        </CardTitle>
                        <MdDashboard className='dark:text-white ' />

                    </CardHeader>
                    <CardContent>
                        <div class="text-2xl font-bold">
                            {userActivityCount.projectCount}
                        </div>
                        <p class="text-xs text-muted-foreground">
                            boards created by you
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader class="flex flex-row items-center justify-between space-y-0 px-6 py-2 pt-5">
                        <CardTitle class="text-md font-medium">
                            Documentations
                        </CardTitle>
                        <SiGoogledocs className='dark:text-white ' />

                    </CardHeader>
                    <CardContent>
                        <div class="text-2xl font-bold">
                            {userActivityCount.documentCount}
                        </div>
                        <p class="text-xs text-muted-foreground">
                            Documents written by you
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader class="flex flex-row items-center justify-between space-y-0 px-6 py-2 pt-5">
                        <CardTitle class="text-md font-medium">
                            Space 1
                        </CardTitle>
                        <MdOutlineStorage className='dark:text-white ' />

                    </CardHeader>
                    <CardContent>
                        <div class="text-2xl font-bold">
                            {(userActivityCount.projectStorageStats / 1024).toFixed(2)} Mb
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Storage utilized for Boards
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader class="flex flex-row items-center justify-between space-y-0 px-6 py-2 pt-5">
                        <CardTitle class="text-md font-medium">
                            Space 2
                        </CardTitle>
                        <GrStorage className='dark:text-white ' />

                    </CardHeader>
                    <CardContent>
                        <div class="text-2xl font-bold">
                            {(userActivityCount.documentsStorageStats / 1024).toFixed(2)} Mb
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Storage utilized for Documentation
                        </p>
                    </CardContent>
                </Card>
            </div>
            <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card class="col-span-4">
                    <CardHeader>
                        <CardTitle>Overview</CardTitle>
                    </CardHeader>
                    <CardContent class="pl-2">
                    </CardContent>
                </Card>
                <Card class="col-span-3">
                    <CardHeader>
                        <CardTitle>Recent Sales</CardTitle>
                        <CardDescription>
                            You made 265 sales this month.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                    </CardContent>
                </Card>
            </div>

            <div className='grid grid-cols-4'>

                <ContextMenu>
                    <ContextMenuTrigger>
                        <CardforDrag />
                    </ContextMenuTrigger>
                    <ContextMenuContent>
                        <ContextMenuItem>
                            <InfoCircledIcon className='mr-2' />
                            Card Information
                        </ContextMenuItem>
                        <Separator />

                        <ContextMenuItem>
                            <CiEdit className='mr-2' />

                            Edit</ContextMenuItem>
                        <ContextMenuItem>
                            <FaHistory className='mr-2' />

                            History</ContextMenuItem>
                        <Separator />
                        {/*  */}
                        <ContextMenuItem>
                            <div className=" my-2 flex gap-2 items-start">
                                <IoDocumentTextOutline />
                                <div className='flex flex-col mr-5'>
                                    <h4 className="text-sm font-medium leading-none flex items-center gap-2" >

                                        Write Documentation</h4>
                                    <p className="text-xs text-muted-foreground">
                                        New Doc for this Card
                                    </p>

                                </div>

                            </div>
                        </ContextMenuItem>
                        <Separator />
                        <ContextMenuItem className="mt-2 bg-red-500 hover:bg-red-600 cursor-pointer text-white dark:text-white">
                            Delete</ContextMenuItem>
                    </ContextMenuContent>
                </ContextMenu>

            </div>
        </section>
    )
}




export default CardComponent