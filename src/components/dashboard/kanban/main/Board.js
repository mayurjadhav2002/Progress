import React, { useEffect, useState } from "react";
import Card from "./card";

import { AiTwotoneDelete } from 'react-icons/ai'
import { IoIosAdd } from 'react-icons/io'
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
} from "@material-tailwind/react";
import { TfiLayoutMenuSeparated } from 'react-icons/tfi'
import { Droppable } from "react-beautiful-dnd";
import Editable2 from "./Editable2";
import { ScrollArea } from "../../../ui/scroll-area";
import './Board.css'
export default function KanbanBoard(props) {

    const [show, setShow] = useState(false);
    if (props.id === undefined) {
        return "loading"
    }
    return (
        <div className="board w-96  flex-shrink-0  ">
            <div className='col-span-1 h-[calc(100vh-250px)] border-[1px]
            shadow-md
            border-[#d5d2d2]
            
            dark:border-[#252426] dark:bg-[#101010] rounded-lg  overflow-y-scroll hidden-scrollbar'>

                <div className="board__top dark:bg-[#111111] flex justify-between items-center sticky top-0  p-5 shadow-lg border-b-2 z-40 bg-white">

                    <div>
                        {show ? (
                            <div>
                                <input
                                    className="title__input"
                                    type={"text"}
                                    defaultValue={props.name}
                                    onChange={(e) => {
                                        props.setName(e.target.value, props.id);
                                    }}
                                />
                            </div>
                        ) : (

                            <h1 onClick={() => {
                                setShow(true);
                            }} className='text-lg font-semibold exo-font  dark:text-primary'>

                                {props?.name || "Name of Board"}
                                <span className="total__cards exo-font text-blue-gray-400 text-sm ml-2">{props.card?.length} Task</span>

                            </h1>
                        )}
                    </div>

                    <Menu>
                        <MenuHandler className="cursor-pointer ">
                            <span variant="text"><TfiLayoutMenuSeparated className="w-6 h-6" /></span>
                        </MenuHandler> 
                        <MenuList className="dark:bg-dark border-1 border-[#1c1c1c] shadow-md shadow-gray-900">
                            <MenuItem className="text-red-500 flex gap-2 items-center hover:bg-red-700 hover:text-white" onClick={() => props.removeBoard(props.id)}><AiTwotoneDelete />Delete Board</MenuItem>
                            <MenuItem className=" flex gap-2 items-center" onSubmit={(value) => props.addCard(value, props.id)}><IoIosAdd /> Add Task</MenuItem>
                        </MenuList>
                    </Menu>
                </div>
                <Droppable droppableId={props.id.toString()}>
                    {(provided) => (
                        <ScrollArea
                            className=' flex flex-col overflow-y-auto p-3 gap-2'
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {props.card?.map((items, index) => (
                                <Card
                                    bid={items.bid}
                                    boardId={props.id}
                                    id={items.id}
                                    index={index}
                                    key={items.bid}
                                    priority={items.priority}
                                    description={items.description}
                                    title={items.title}
                                    tags={items.tags}
                                    updateCard={props.updateCard}
                                    removeCard={props.removeCard}
                                    card={items}
                                    user_avatar={items.user_avatar}
                                    deadline={items.deadline && items.deadline}
                                // collab={props.collaborators}
                                />
                            ))}
                            {provided.placeholder}
                        </ScrollArea>
                    )}
                </Droppable>

                <div className='flex flex-col overflow-y-auto p-3 gap-2'>
                    <Editable2
                        name={"Add Card"}
                        btnName={"Add Card"}
                        placeholder={"Task Detail"}
                        onSubmit={(value) => props.addCard(value, props.id)}
                    />
                </div>
            </div>
        </div>
    );
}