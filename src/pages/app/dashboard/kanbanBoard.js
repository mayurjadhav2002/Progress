import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Board from '../kanban/board';
import { Sidebar } from '../../../components/dashboard/Misc/sidebar';
import Header from '../../../components/dashboard/kanban/header';
import Search from '../../../components/dashboard/kanban/search';
import Users from '../../../components/dashboard/kanban/users';
import { useProjectContext } from '../../../utils/ProjectContext/ProjectContext';
import { useConfluenceContext } from '../../../utils/WriteContext/ConfluenceContext';

function KanbanBoard() {
  const params = useParams();
  const { HandleFetchAllDocuments, userAllDocs, setUserAllDocs } = useConfluenceContext()
  const { board, saving, setSaving, loading, error, HandleFetchBoard, collaborators, setCollaborators } = useProjectContext()
  useEffect(() => {
    HandleFetchBoard({ id: params.id });
    // HandleFetchAllDocuments()
  }, [])
  if (loading) {
    return "Loading..."
  }
  if (error) {
    return "Some error occured"
  }
  console.log(board.data)
  return (


    <>
      <div className='w-full lg:w-[calc(100vw-26rem)] overflow-x-hidden custom-scrollbar2  px-5 pt-5'>
        <Header />
        <div className='flex gap-4 justify-start items-center'>
          {/* Menu bars */}
          <Search />
          <Users collab={collaborators} />
        </div>
        {/* Check if board.data and board.data.board exist before rendering */}
        {board.data && board.data.board && board.data.board.length > 0 &&
          <Board board={board.data.board} id={params.id} setSaving={setSaving} collab={collaborators} />
        }
      </div>
    </>

  );
}

export default KanbanBoard;
