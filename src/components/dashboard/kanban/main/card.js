import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Calendar, CheckSquare, Clock, MoreHorizontal } from "react-feather";
import Dropdown from "./Dropdown";
import Modal from "./Model";
import Tag from "./Tag";
import CardDetails from "./CardDetails";
import { IoClose } from "react-icons/io5";
import { RxDotFilled } from 'react-icons/rx'
import { HiOutlineCalendarDays } from 'react-icons/hi2'
import {
  Drawer,
  Button,
  Typography,
  Input,
  Textarea,
  Select,
  Option,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useProjectContext } from "../../../../utils/ProjectContext/ProjectContext";

const Card = (props) => {
  const { collaborators } = useProjectContext()

  const [dropdown, setDropdown] = useState(false);
  const [modalShow, setModalShow] = useState(false);
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
  const changeDescription = (desc) => {
    setDesc(desc)
    setValues({ ...values, description: desc })
  }
  const changeTitle = (title) => {
    setTitle(title)
    setValues({ ...values, title: title })
  }
  const changePriority = (priority) => {
    setValues({ ...values, priority: priority })
  }

  return (
    <Draggable
      key={props.id.toString()}
      draggableId={props.id.toString()}
      index={props.index}
    >
      {(provided) => (
        <>


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
                ` } />

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
                      <img src={props.user_avatar}
                        className='w-6 h-6 rounded-full'
                      />
                    </Link>
                  </p>
                  {console.log(props.user_avatar)}

                </div>

                {provided.placeholder}


              </div></div>



            {provided.placeholder}
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
                {title || "Update"}
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

                value={props && props.description ? props.description : ''}
                onChange={(e) => { changeDescription(e.target.value) }}
              />


              <div>
                <Select label="Assign this Task to.." id="assignee">

                  {collaborators && collaborators.length > 0
                    ? collaborators.map((user, index) => (
                      <Option value={user.userId.id} key={index}>
                        {user.userId.name}
                      </Option>
                    ))
                    : "No user Found"}
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



                  {collaborators && collaborators.length > 0
                    ? collaborators.map((user, index) => (
                      <Option value={user.userId.id} key={index}>
                        {user.userId.name}
                      </Option>
                    ))
                    : "No user Found"}
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
                  onChange={e => changePriority(e)}

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

              {/* This Causing the error */}
              {/* <div>
                <Select label="Select Documentation for this task..." id="assignee">
                  {props.userAllDocs && props?.userAllDocs?.map((i, j) => {
                    <Option key={j}>{i.name}</Option>
                  }
                  )}
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
              </div> */}
            </div>

            <div className="flex gap-2">

              <Button fullWidth >Save</Button>
            </div>
          </Drawer>

        </>
      )}
    </Draggable>
  );
};

export default Card;