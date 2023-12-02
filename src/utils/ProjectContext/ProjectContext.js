import React, { createContext, useContext, useEffect, useState } from 'react';
import { UpdateCard, UpdateProject, getKanban } from '../Queries';
import { useUserContext } from '../UserContext/UserContext';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'
// Create the context
const ProjectContext = createContext();

// Create the context provider component
export function ProjectContextProvider({ children }) {
    const { user } = useUserContext()
    const [id, setId] = useState('')
    const [board, setBoard] = useState({ data: { board: [] } });
    const [saving, setSaving] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [collaborators, setCollaborators] = useState()
    const [title, setTitle] = useState('')
    const [description, setDesc] = useState('')
    const [keyword, setKeyword] = useState('')
    const [timeline, setTimeline] = useState('');
    const [create_by, setCreated_by] = useState('')
    // const defaultDate = props?.data?.timeline instanceof Date ? props.data.timeline : new Date();
    const [originalData, setOriginalData] = useState({
        title: '',
        description: '',
        keyword: '',
        timeline: '',
    });

    function formatDate(date) {
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    }
    async function formatDate1(dateString) {
        const date = new Date(dateString);
    
        if (isNaN(date.getTime())) {
            console.error('Invalid date string:', dateString);
            return;
        }
    
        const newDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        setTimeline(newDate);
    }
    
    

    const HandleFetchBoard = async (props) => {
        try {
            await setLoading(true)
            await setId(props.id)
            const res = await getKanban(id ? id : props.id);
            console.log("Data", res)
            if (res) {
                setBoard({ data: { board: res.data.board } })
                setTitle(prevTitle => res.data.projectId.title);
                setDesc(prevDesc => res.data.projectId.description);
                setKeyword(prevKeyword => res.data.projectId.keyword);
                setCollaborators(res.data.projectId.collaborators);
                setCreated_by(res.data.projectId.created_by)
                const DefaultDate = await res.data.projectId.timeline instanceof Date ? res.data.projectId.timeline : new Date()
                const date = await formatDate(DefaultDate)
                await setTimeline(date)
                await setOriginalData({
                    title: title, description: description, keyword: keyword, timeline: timeline
                })
                console.log("Data fetched")
                setLoading(false)
            } else {
                console.log("Some error while fetching the data")
                setLoading(false)
                setError(true)
            }
        } catch (error) {
            console.log("Error while Fetching data")
            setError(true)
            throw new Error()
        }
    }


    const HandleUpdateProject = async (props) => {
        await setSaving(true)
        const changedData = {};

        // Compare each field with the original data
        if (title !== originalData.title) {
            changedData.title = title;
        }
        if (description !== originalData.description) {
            changedData.description = description;
        }
        if (keyword !== originalData.keyword) {
            changedData.keyword = keyword;
        }
        if (timeline !== originalData.timeline) {
            changedData.timeline = timeline;
        }

        // Do something with the changesList, e.g., print it
        try {
            console.log("Project Data Updated ", changedData)
            const res = await UpdateProject({ id: id, data: changedData });
            if (res) {
                console.log(res)
                setSaving(false)
            } else {
                console.log("Some error occured while updating the data")
                setSaving(false)
                setError(true)


            }
            // Assuming UpdateProject is a function that takes the changed data as an argument
        } catch (error) {
            console.log("Error while Updating data")
            setError(true)
            throw new Error()
        }
    }











    const setName = (title, bid) => {
        const index = board?.data?.board.findIndex((item) => item.id === bid);
        const tempData = [...board];
        tempData[index].boardName = title;

        setBoard(tempData);
        setSaving(true)
    };

    const dragCardInBoard = (source, destination) => {
        let tempData = [...board?.data?.board];
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
        setSaving(true)

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
    const addCard = async (props) => {

        if (!board?.data?.board) {
            console.error("Invalid board structure.");
            return;
        }

        const index = board?.data?.board?.findIndex((item) => item.id === props.bid);
        if (index < 0 || !board?.data?.board[index]) {
            console.error("Invalid board index or board structure.", index);
            return;
        }

        const tempData = [...board.data.board];
        const cards = tempData[index]?.card || [];

        tempData[index].card = [
            ...cards,
            {
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
            },
        ];

        setBoard(tempData);
        setSaving(true);
    };



    const removeCard = (boardId, cardId) => {
        const index = board?.data?.board.findIndex((item) => item.bid === boardId);
        const tempData = [...board?.data?.board];
        const cardIndex = board[index].card.findIndex((item) => item.bid === cardId);

        tempData[index].card.splice(cardIndex, 1);
        setBoard(tempData);
        setSaving(true)

    };

    const addBoard = (title) => {
        const tempData = [...board?.data?.board];
        tempData.push({
            id: uuidv4(),
            boardName: title,
            card: [],
        });
        setBoard(tempData);
        setSaving(true)
    };

    const removeBoard = (id) => {
        const tempData = [...board?.data?.board];
        const index = board?.data?.board.findIndex((item) => item.id === id);
        tempData.splice(index, 1);
        setBoard(tempData);
        setSaving(true)

    };

    const onDragEnd = (result) => {
        const { source, destination } = result;
        if (!destination) return;

        if (source.droppableId === destination.droppableId) return;

        setBoard(dragCardInBoard(source, destination));
        setSaving(true)

    };

    const updateCard = async (bid, cid, card) => {
        const index = board?.data?.board.findIndex((item) => item.bid === bid);
        console.log("INdex of board", index)
        if (index < 0) return;

        const tempBoards = [...board?.data?.board];
        const cards = tempBoards[index].card;

        const cardIndex = cards.findIndex((item) => item.id === cid);
        if (cardIndex < 0) return;

        tempBoards[index].card[cardIndex] = card;
        const res = await UpdateCard({ projectId: id, id: index, card: card, cardId: cardIndex});
        if (res) {
            console.log(tempBoards);
            setBoard(tempBoards);
        } else {
            console.log("Cannot update some error occured")
        }

        setSaving(true)

    };





    const exportValues = {
        id, setId, board, setBoard, saving, setSaving, loading, setLoading,
        error, setError, title, setTitle, description, setDesc,
        keyword, setKeyword, timeline, setTimeline, formatDate1,
        HandleFetchBoard, HandleUpdateProject, setName, dragCardInBoard,create_by,
        addBoard, addCard, removeCard, onDragEnd, updateCard, removeBoard,collaborators, setCollaborators
    }
    return (
        <ProjectContext.Provider value={exportValues}>
            {children}
        </ProjectContext.Provider>
    );
}

// Custom hook to use the context
export function useProjectContext() {
    return useContext(ProjectContext);
}
