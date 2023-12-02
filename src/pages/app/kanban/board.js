import React, { useState, useEffect } from 'react'
import useLocalStorage from "use-local-storage";
import { DragDropContext } from 'react-beautiful-dnd';
import KanbanBoard from '../../../components/dashboard/kanban/main/Board';
import Editable from '../../../components/dashboard/kanban/main/Editable';
import { v4 as uuidv4 } from "uuid";
import { useUserContext } from '../../../utils/UserContext/UserContext';
import axios from 'axios';

function Board(props) {
  const [data, setData] = useState(props.board);
  const [updated, setUpdated] = useState(false)
  const { user } = useUserContext()
  const id = props.id;
  const HandleSetUpdated = () => {
    setUpdated(true)
    props.setSaving(true)
  }


  const setName = (title, bid) => {
    const index = data.findIndex((item) => item.id === bid);
    const tempData = [...data];
    tempData[index].boardName = title;

    setData(tempData);
    HandleSetUpdated()
  };

  const dragCardInBoard = (source, destination) => {
    let tempData = [...data];
    const destinationBoardIdx = tempData.findIndex(
      (item) => item.id.toString() === destination.droppableId
    );
    const sourceBoardIdx = tempData.findIndex(
      (item) => item.id.toString() === source.droppableId
    );
    tempData[destinationBoardIdx].card.splice(
      destination.index,
      0,
      tempData[sourceBoardIdx].card[source.index]
    );
    tempData[sourceBoardIdx].card.splice(source.index, 1);
    HandleSetUpdated()

    return tempData;

  };

  // const dragCardInSameBoard = (source, destination) => {
  //   let tempData = Array.from(data);
  //   console.log("Data", tempData);
  //   const index = tempData.findIndex(
  //     (item) => item.id.toString() === source.droppableId
  //   );
  //   console.log(tempData[index], index);
  //   let [removedCard] = tempData[index].card.splice(source.index, 1);
  //   tempData[index].card.splice(destination.index, 0, removedCard);
  //   setData(tempData);
  // };

  const addCard = async (props, bid) => {
    const index = data.findIndex((item) => item.id === bid);
    const tempData = [...data];
    tempData[index].card.push({
      id: await uuidv4(),
      bid: await uuidv4(),
      title: props.title,
      description: props.description,
      user_avatar: user.avatar,
      user_id: user._id,
      assignee: null,
      reporter: null,
      documentation: null,
      priority: "low",
      tags: [],
      task: [],

    });
    setData(tempData);
    HandleSetUpdated()

  };

  const removeCard = (boardId, cardId) => {
    const index = data.findIndex((item) => item.id === boardId);
    const tempData = [...data];
    const cardIndex = data[index].card.findIndex((item) => item.id === cardId);

    tempData[index].card.splice(cardIndex, 1);
    setData(tempData);
    HandleSetUpdated()

  };

  const addBoard = (title) => {
    const tempData = [...data];
    tempData.push({
      id: uuidv4(),
      boardName: title,
      card: [],
    });
    setData(tempData);
    HandleSetUpdated()

  };

  const removeBoard = (bid) => {
    const tempData = [...data];
    const index = data.findIndex((item) => item.id === bid);
    tempData.splice(index, 1);
    setData(tempData);
    HandleSetUpdated()

  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    if (source.droppableId === destination.droppableId) return;

    setData(dragCardInBoard(source, destination));
    HandleSetUpdated()

  };

  const updateCard = (bid, cid, card) => {
    const index = data.findIndex((item) => item.id === bid);
    if (index < 0) return;

    const tempBoards = [...data];
    const cards = tempBoards[index].card;

    const cardIndex = cards.findIndex((item) => item.id === cid);
    if (cardIndex < 0) return;

    tempBoards[index].card[cardIndex] = card;
    console.log(tempBoards);
    setData(tempBoards);
    HandleSetUpdated()
  };

  // useEffect(() => {
  //   localStorage.setItem("kanban-board", JSON.stringify(data));
  //   console.log("Data set")
  // }, [data]);

  console.log(data.length)
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (updated & (data.length > 1 ||  data[0]?.card?.length > 0)) {
        // Make Axios request to update data
        const updateData = async () => {
          try {
            const response = await axios.put('/kanban/updateboard', {
              projectid: id, // Replace with the actual projectId
              board: data,
            });

            if (response.status === 200) {
              console.log('Data updated successfully');
              setUpdated(false); // Reset the updated state after successful update
              props.setSaving(false)

            }
          } catch (error) {
            console.error('Error updating data:', error);
          }
        };

        updateData();
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [data, updated, id]);
  return (
    <div className='w-auto'>

      <DragDropContext onDragEnd={onDragEnd}>

        <div className=' overflow-x-scroll custom-scrollbar2 '>
          <div className='flex flex-row gap-5  items-start mt-8'>
            {data.map((item) => (
              <div key={item.id} className='kanban-board-wrapper'>
                <KanbanBoard
                  id={item.id}
                  name={item.boardName}
                  card={item.card}
                  setName={setName}
                  addCard={addCard}
                  removeCard={removeCard}
                  removeBoard={removeBoard}
                  updateCard={updateCard}
                  collaborators={props?.collab}
                  
                />
              </div>
            ))}
            <div className=''>
              <Editable
                class={"add__board"}
                name={"Add Board"}
                btnName={"Add Board"}
                onSubmit={addBoard}
                placeholder={"Enter Board  Title"}
              />
            </div>
          </div>
        </div>
      </DragDropContext>
    </div>

  )
}

export default Board