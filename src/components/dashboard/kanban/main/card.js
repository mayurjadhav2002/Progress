import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";

import { IoClose } from "react-icons/io5";
import {
  Drawer,
  Typography,
  Input,
  Textarea,
  Select,
  Option,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useProjectContext } from "../../../../utils/ProjectContext/ProjectContext";
import { CardforDrag } from "./CardForDrag";
import { Button } from "../../../ui/button";

const Card = (props) => {
  const { collaborators } = useProjectContext()
  const [openRight, setOpenRight] = useState(false);
  const [title, setTitle] = useState(props?.title)
  const [desc, setDesc] = useState(props?.description)
  const openDrawerRight = () => setOpenRight(true);
  const closeDrawerRight = () => setOpenRight(false);
  const [values, setValues] = useState({ ...props.card });

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
  const changeAssignee = (assignee) => {
    console.log(assignee)
    setValues({ ...values, assignee: assignee })
  }

  const HandleRemoveCard = async (e) => {
    const shouldDelete = window.confirm('Are you sure you want to delete this card?');

    if (shouldDelete) {
      // Call your delete card function here
      props.removeCard(props.boardId, props.id)
    }

  }


  const HandleUpdateChanges = async (e) => {
    // Boardid, cardId, and card values
    try {
      const res = await props.updateCard(props.boardId, props.id, values)
      if (res) {
        console.log("Card Data Updated ")
      }
    } catch (error) {
      console.log("Some error occured while updating the card", error)
    }
  }
  return (
    <Draggable
      key={props.id.toString()}
      draggableId={props.id.toString()}
      index={props.index}
    >
      {(provided) => (
        <>


          <div onClick={openDrawerRight}
          className="z-10 my-2 "
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
        
        <CardforDrag {...props} HandleRemoveCard={HandleRemoveCard} location={location.href}/>



            {provided.placeholder}
          </div>
          <Drawer
            placement="right"
            overlay={false}
            open={openRight}
            onClose={closeDrawerRight}
            className="p-4 bg-[#e9e9ea] dark:bg-[#242323] dark:rounded-none rounded-s-xl scrollbar-hidden"
          >
            <div className="mb-6 flex w-full   items-center justify-between ">

              <Typography variant="h5" className="dark:text-white text-dark">
                {title || "Update"}
              </Typography>




              <span
                className="cursor-pointer dark:text-white"
                onClick={closeDrawerRight}
              >
                <IoClose className="r-0" />
              </span>
            </div>
            <hr />


            <div className="h-[calc(100vh-20vh)] w-full flex flex-col gap-5 overflow-y-scroll py-1 scrollbar-hidden">

              <Input
                defaultValue={title}
                variant="outlined"
                type={"text"}
                className="dark:text-white dark:bg-dark"
                onChange={(e) => {
                  changeTitle(e.target.value);
                }} label="Project title" value={title} />

              <Textarea variant="outlined" label="Description"
                className="dark:text-white dark:bg-dark"
                rows={2}

                value={values.description}
                onChange={(e) => { changeDescription(e.target.value) }}
              />


              <div>


                
                <Select label="Assign this Task to.." id="assignee"
                  value={values.assignee || ''}
                  className="dark:bg-dark dark:text-white "
                  onChange={e => changeAssignee(e)}
                >

                  {collaborators && collaborators.length > 0
                    ? collaborators.map((user, index) => (
                      <Option value={user?.userId?._id} key={index}>
                        {user?.userId?.name}
                      </Option>
                    ))
                    : "No user Found"}
                </Select>
                <div class="flex items-center cursor-pointer mb-4 text-gray-600 rounded-lg px-1 mt-1  dark:text-gray-700" role="alert">
                  <svg class="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                  </svg>
                  <span class="sr-only">Info</span>
                  <div class="ms-1 text-xs font-medium">
                    Assign task to someone  <span className="text-gray-700 font-semibold">(hover me)</span>
                  </div>

                </div>
              </div>


              <div>
                <Select label="Report this Task to.."
                                  className="dark:bg-dark dark:text-white"

                id="reporter" value={values.reporter} onChange={e => setValues({ ...values, reporter: e })}>
                  {collaborators && collaborators.length > 0
                    ? collaborators.map((user, index) => (
                      <Option value={user?.userId?._id} key={index}>
                        {user?.userId?.name}
                      </Option>
                    ))
                    : "No user Found"}
                </Select>
                <div class="flex items-center cursor-pointer mb-4 text-gray-600 rounded-lg px-1 mt-1  dark:text-gray-700" role="alert">
                  <svg class="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                  </svg>
                  <span class="sr-only">Info</span>
                  <div class="ms-1 text-xs font-medium">
                    Choose whom to report <span className="text-gray-700 font-semibold">(hover me)</span>
                  </div>

                </div>
              </div>
              <div>
                <Select label="Priority of the task" id="reporter"
                  onChange={e => changePriority(e)}
                  className="dark:bg-dark dark:text-white "


                >
                  <Option value="low">Low</Option>
                  <Option value="medium">Medium</Option>
                  <Option value="high">High</Option>
                </Select>
                <div class="flex items-center cursor-pointer mb-4 text-gray-600 rounded-lg px-1 mt-1  dark:text-gray-700" role="alert">
                  <svg class="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                  </svg>
                  <span class="sr-only">Info</span>
                  <div class="ms-1 text-xs font-medium">
                    Select Priority of this task <span className="text-gray-700 font-semibold">(hover me)</span>
                  </div>

                </div>
              </div>

              <Input
                defaultValue={values.deadline ? new Date(values.deadline).toISOString().slice(0, 10) : ''}
                variant="outlined"
                className="dark:bg-dark dark:text-white"
                type={"date"}
                onChange={(e) => {
                  setValues({ ...values, deadline: e.target.value });
                }}
                label="Deadline for this Task"
              />
              {/* This Causing the error */}
              {/* <div>
                <Select label="Select Documentation for this task..." id="assignee">
                  {props.userAllDocs && props?.userAllDocs?.map((i, j) => {
                    <Option key={j}>{i.name}</Option>
                  }
                  )}
                </Select>
                <div class="flex items-center cursor-pointer mb-4 text-gray-600 rounded-lg px-1 mt-1  dark:text-gray-700" role="alert">
                  <svg class="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                  </svg>
                  <span class="sr-only">Info</span>
                  <div class="ms-1 text-xs font-medium">
                    helps to understand the tasks <span className="text-gray-700 font-semibold">(hover me)</span>
                  </div>

                </div>
              </div> */}
            </div>

            <div className="flex gap-2">

              <Button className="w-full" fullWidth onClick={HandleUpdateChanges}>Save</Button>
            </div>
          </Drawer>

        </>
      )}
    </Draggable>
  );
};

export default Card;