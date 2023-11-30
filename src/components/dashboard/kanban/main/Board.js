import React, { useEffect, useState } from "react";
import Card from "./card";

import { AiTwotoneDelete } from 'react-icons/ai'
import { IoIosAdd } from 'react-icons/io'
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Button,
} from "@material-tailwind/react";
import { TfiLayoutMenuSeparated } from 'react-icons/tfi'
import { Droppable } from "react-beautiful-dnd";
import Editable2 from "./Editable2";
export default function KanbanBoard(props) {
    console.log("board props",)
    const [show, setShow] = useState(false);
    return (
        <div className="board w-96  flex-shrink-0  ">
            <div className='col-span-1 h-[calc(100vh-270px)] border-b-4 border-b-gray-200 bg-gray-200 overflow-y-scroll custom-scrollbar'>

                <div className="board__top flex justify-between items-center sticky top-0 bg-gray-100 p-5 shadow-lg">

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

                            <h1    onClick={() => {
                                setShow(true);
                              }} className='text-lg font-semibold  dark:text-primary'>

                                {props?.name || "Name of Board"}
                                <span className="total__cards text-blue-gray-400 text-sm">({props.card?.length})</span>

                            </h1>
                        )}
                    </div>

                    <Menu>
                        <MenuHandler className="cursor-pointer">
                            <span variant="text"><TfiLayoutMenuSeparated className="w-6 h-6" /></span>
                        </MenuHandler>
                        <MenuList>
                            <MenuItem className="text-red-500 flex gap-2 items-center hover:bg-red-700 hover:text-white" onClick={() => props.removeBoard(props.id)}><AiTwotoneDelete />Delete Board</MenuItem>
                            <MenuItem className=" flex gap-2 items-center" onSubmit={(value) => props.addCard(value, props.id)}
                            ><IoIosAdd /> Add Task</MenuItem>

                        </MenuList>
                    </Menu>


                    {console.log(props.id.toString())}
                </div>
                <Droppable droppableId={props.id.toString()}>
                    {(provided) => (
                        <div
                            className=' flex flex-col overflow-y-auto p-3 gap-2'
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {props.card?.map((items, index) => (
                                <Card
                                    bid={props.id}
                                    id={items.id}
                                    index={index}
                                    key={items.id}
                                    priority={items.priority}
                                    description={items.description}
                                    title={items.title}
                                    tags={items.tags}
                                    updateCard={props.updateCard}
                                    removeCard={props.removeCard}
                                    card={items}
                                    user_avatar={items.user_avatar}
                                />
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>

                <div className='flex flex-col overflow-y-auto p-3 gap-2'>
                    <Editable2
                        name={"Add Card"}
                        btnName={"Add Card"}
                        placeholder={"Enter Card Title"}
                        onSubmit={(value) => props.addCard(value, props.id)}
                    />
                </div>
            </div>
        </div>
    );
}