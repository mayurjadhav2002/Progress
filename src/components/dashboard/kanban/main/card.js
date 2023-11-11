import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Calendar, CheckSquare, Clock, MoreHorizontal } from "react-feather";
import Dropdown from "./Dropdown";
import Tag from "./Tag";
import CardDetails from "./CardDetails";
import { RxDotFilled } from 'react-icons/rx'
import { HiOutlineCalendarDays } from 'react-icons/hi2'
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
const Card = (props) => {
    const [dropdown, setDropdown] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(!open);
    return (

        <Draggable
            key={props.id.toString()}
            draggableId={props.id.toString()}
            index={props.index}
        >
            {(provided) => (
                <>
                    {/* {modalShow && (
                        <CardDetails
                            updateCard={props.updateCard}
                            onClose={setModalShow}
                            card={props.card}
                            bid={props.bid}
                            removeCard={props.removeCard}
                        />
                    )} */}
                    {/* <Dialog open={open} handler={handleOpen}>
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
                    </Dialog> */}
                    <div className="rounded-xl border-2 border-gray-100 bg-white"

                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        <div className="flex items-start gap-4 p-4 sm:p-4 lg:p-4">
                            <div>

                                <RxDotFilled className='w-6 h-6  -mt-4 -ml-4 text-green-600' />

                                <div className="card__text">
                                    <p>{props.title}</p>

                                </div>

                                <div className="card__tags">
                                    {props.tags?.map((item, index) => (
                                        <Tag key={index} tagName={item.tagName} color={item.color} />
                                    ))}
                                </div>
                                <p className="line-clamp-2 text-sm text-gray-700">
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus, a a a a a
                                    accusantium temporibus iure delectus ut totam natus nesciunt ex?
                                    Ducimus, enim.
                                </p>

                                <div className="mt-2 sm:flex sm:items-center sm:gap-2 justify-between">


                                    <div className="flex gap-2 items-center">
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

                                    </div>



                                    <p className="hidden sm:block sm:text-xs sm:text-gray-500 lg:flex gap-1 items-center">
                                        <a href="#" className="font-medium underline hover:text-gray-700 flex items-center gap-1">
                                            <img src='https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1760&q=80'
                                                className='w-6 h-6 rounded-full'
                                            />
                                        </a>
                                    </p>
                                </div>
                                <div className="card__footer">
                                    {/* <div className="time">
                <Clock />
                <span>Sun 12:30</span>
              </div> */}
                                   
                                </div>


                                {provided.placeholder}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </Draggable>
    );
};

export default Card;