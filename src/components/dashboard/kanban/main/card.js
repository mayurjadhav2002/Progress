import React, { useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Calendar, CheckSquare, Clock, MoreHorizontal } from "react-feather";
import Dropdown from "./Dropdown";
import Tag from "./Tag";
import CardDetails from "./CardDetails";
import { RxDotFilled } from 'react-icons/rx'
import { HiOutlineCalendarDays } from 'react-icons/hi2'
import { v4 as uuidv4 } from "uuid";
import { IoClose } from "react-icons/io5";

import {
  Drawer,
  Button,
  Typography,
  IconButton,
  Input,
  Textarea,
  Select,
  Option,
} from "@material-tailwind/react";
import { FaPencilAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useProjectContext } from "../../../../utils/ProjectContext/ProjectContext";

const Card = (props) => {
  console.log(props)
  const [show, setShow] = React.useState('');
  const [openRight, setOpenRight] = React.useState(false);
  const [title, setTitle] = useState(props?.title)
  const [desc, setDesc] = useState(props?.description)
  const openDrawerRight = () => setOpenRight(true);
  const closeDrawerRight = () => setOpenRight(false);
  const colors = ["#61bd4f", "#f2d600", "#ff9f1a", "#eb5a46", "#c377e0"];

  const [values, setValues] = useState({ ...props.card });
  const [input, setInput] = useState(false);
  const [labelShow, setLabelShow] = useState(false);
  // const Input = (props) => {
  //   return (
  //     <div className="">
  //       <input
  //         autoFocus
  //         defaultValue={text}
  //         type={"text"}
  //         onChange={(e) => {
  //           setText(e.target.value);
  //         }}
  //       />
  //     </div>
  //   );
  // };
  const addTask = (value) => {
    values.task.push({
      id: uuidv4(),
      task: value,
      completed: false,
    });
    setValues({ ...values });
  };


  const changeDescription = (desc) => {
    setDesc(desc)
    setValues({ ...values, description: desc })
  }
const changeTitle = (title) =>{
  setTitle(title)
  setValues({...values, title:title})
}
const changePriority = (priority) =>{
  setValues({...values, priority:priority})
}
  const removeTask = (id) => {
    const remaningTask = values.task.filter((item) => item.id !== id);
    setValues({ ...values, task: remaningTask });
  };

  const deleteAllTask = () => {
    setValues({
      ...values,
      task: [],
    });
  };

  const updateTask = (id) => {
    const taskIndex = values.task.findIndex((item) => item.id === id);
    values.task[taskIndex].completed = !values.task[taskIndex].completed;
    setValues({ ...values });
  };
  const updateTitle = (value) => {
    setValues({ ...values, title: value });
  };

  const calculatePercent = () => {
    const totalTask = values.task.length;
    const completedTask = values.task.filter(
      (item) => item.completed === true
    ).length;

    return Math.floor((completedTask * 100) / totalTask) || 0;
  };

  const removeTag = (id) => {
    const tempTag = values.tags.filter((item) => item.id !== id);
    setValues({
      ...values,
      tags: tempTag,
    });
  };

  const addTag = (value, color) => {
    values.tags.push({
      id: uuidv4(),
      tagName: value,
      color: color,
    });

    setValues({ ...values });
  };




  useEffect(() => {
    if (props.updateCard) props.updateCard(props.bid, values.id, values);
  }, [values]);

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
          <div onClick={openDrawerRight} className="rounded-xl border-2 border-gray-100 bg-white"

            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <div className="flex items-start gap-4 p-4 sm:p-4 lg:p-4">
              <div>




                <RxDotFilled className={`w-6 h-6  -mt-4 -ml-4 
                ${props?.priority === 'low' && 'text-green-500'}
                ${props?.priority === 'medium' && 'text-yellow-500'}
                ${props?.priority === 'high' && 'text-red-500'}
                ` }/>

                <div className="card__text">
                  <p>{props.title}</p>

                </div>

                <div className="card__tags">
                  {props.tags?.map((item, index) => (
                    <Tag key={index} tagName={item.tagName} color={item.color} />
                  ))}
                </div>
                <p className="line-clamp-2 text-sm text-gray-700">
                  {props.description || "none"}
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
                    <Link to="#" className="font-medium underline hover:text-gray-700 flex items-center gap-1">
                      <img src={props?.user_avatar ? props.user_avatar : null}
                        className='w-6 h-6 rounded-full'
                      />
                    </Link>
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
          <Drawer
            placement="right"
            overlay={false}
            open={openRight}
            onClose={closeDrawerRight}
            className="p-4 bg-blue-50 rounded-s-xl"
          >
            <div className="mb-6 flex w-full   items-center justify-between ">

              <Typography variant="h5" color="blue-gray">
                {title}
              </Typography>




              <span
                className="cursor-pointer"
                onClick={closeDrawerRight}
              >
                <IoClose className="r-0" />
              </span>
            </div>
            <hr />


            <div className="h-[calc(100vh-20vh)] w-full flex flex-col gap-5 overflow-y-scroll py-1 custom-scrollbar">

              <Input
                defaultValue={title}
                variant="outlined"
                type={"text"}
                onChange={(e) => {
                  changeTitle(e.target.value);
                }} label="Project title" value={title} />

              <Textarea variant="outlined" label="Description" rows={2}

                value={props.description} onChange={(e) => { changeDescription(e.target.value) }}
              />


              <div>
                <Select label="Assign this Task to.." id="assignee">
                  <Option>Mayur</Option>

                  <Option>Mayur</Option>
                </Select>
                <div class="flex items-center cursor-pointer mb-4 text-blue-800 rounded-lg px-1 mt-1  dark:text-blue-400" role="alert">
                  <svg class="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                  </svg>
                  <span class="sr-only">Info</span>
                  <div class="ms-1 text-xs font-medium">
                    Assign task to someone  <span className="text-blue-400 font-semibold">(hover me)</span>
                  </div>

                </div>
              </div>


              <div>
                <Select label="Report this Task to.." id="reporter">
                  <Option>Mayur</Option>

                  <Option>Mayur</Option>
                </Select>
                <div class="flex items-center cursor-pointer mb-4 text-blue-800 rounded-lg px-1 mt-1  dark:text-blue-400" role="alert">
                  <svg class="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                  </svg>
                  <span class="sr-only">Info</span>
                  <div class="ms-1 text-xs font-medium">
                    Choose whom to report <span className="text-blue-400 font-semibold">(hover me)</span>
                  </div>

                </div>
              </div>
              <div>
                <Select label="Priority of the task" id="reporter"
                onChange={e=>changePriority(e)}

                >
                  <Option value="low">Low</Option>
                  <Option value="medium">Medium</Option>
                  <Option value="high">High</Option>
                </Select>
                <div class="flex items-center cursor-pointer mb-4 text-blue-800 rounded-lg px-1 mt-1  dark:text-blue-400" role="alert">
                  <svg class="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                  </svg>
                  <span class="sr-only">Info</span>
                  <div class="ms-1 text-xs font-medium">
                    Select Priority of this task <span className="text-blue-400 font-semibold">(hover me)</span>
                  </div>

                </div>
              </div>


              <div>
                <Select label="Select Documentation for this task..." id="assignee">
                  <Option>Mayur</Option>

                  <Option>Mayur</Option>
                </Select>
                <div class="flex items-center cursor-pointer mb-4 text-blue-800 rounded-lg px-1 mt-1  dark:text-blue-400" role="alert">
                  <svg class="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                  </svg>
                  <span class="sr-only">Info</span>
                  <div class="ms-1 text-xs font-medium">
                    helps to understand the tasks <span className="text-blue-400 font-semibold">(hover me)</span>
                  </div>

                </div>
              </div>
            </div>

            <div className="flex gap-2">

              <Button fullWidth  >Save</Button>
            </div>
          </Drawer>

        </>
      )}
    </Draggable>
  );
};

export default Card;