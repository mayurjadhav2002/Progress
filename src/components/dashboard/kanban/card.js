import React, { useState } from 'react'
import { RxDotFilled } from 'react-icons/rx'
import { HiOutlineCalendarDays } from 'react-icons/hi2'
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
  } from "@material-tailwind/react";
function Card(props) {
    const [open, setOpen] = useState(false);
 
    const handleOpen = () => setOpen(!open);
    return (

        <div onClick={handleOpen} className="rounded-xl border-2 border-gray-100 bg-white">
            <div className="flex items-start gap-4 p-4 sm:p-4 lg:p-4">
                <div>

                    <RxDotFilled className='w-6 h-6  -mt-4 -ml-4 text-green-600' />
                    <h3 className="font-normal sm:text-lg  mb-1">

                            Question about Livewire Rendering and Alpine JS ajdbjasbjdbasj aj a dbjhasbjh j dbja dj asj
                    </h3>

                    <p className="line-clamp-2 text-sm text-gray-700">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus, a a a a a
                        accusantium temporibus iure delectus ut totam natus nesciunt ex?
                        Ducimus, enim.
                    </p>

                    <div className="mt-2 sm:flex sm:items-center sm:gap-2">
                        <div className="flex items-center gap-1 text-gray-500">
                            <HiOutlineCalendarDays className="h-4 w-4" />

                            <p className="text-xs">2 days remaining</p>
                        </div>
                        <span className="hidden sm:block" aria-hidden="true">&middot;</span>

                        <div className="flex items-center gap-1 text-gray-500">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                                />
                            </svg>

                            <p className="text-xs">14 comments</p>
                        </div>

                        <span className="hidden sm:block" aria-hidden="true">&middot;</span>

                        <p className="hidden sm:block sm:text-xs sm:text-gray-500 lg:flex gap-1 items-center">
                            Created by
                            <a href="#" className="font-medium underline hover:text-gray-700 flex items-center gap-1">
                                <img src='https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1760&q=80'
                                    className='w-6 h-6 rounded-full'
                                /> John
                            </a>
                        </p>
                    </div>
                </div>
            </div>
  <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Card Dialog Box {props.id}</DialogHeader>
        <DialogBody>
          The key to more success is to have a lot of pillows. Put it this way,
          it took me twenty five years to get these plants, twenty five years of
          blood sweat and tears, and I&apos;m never giving up, I&apos;m just
          getting started. I&apos;m up to something. Fan luv.
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>

        </div>)
}

export default Card