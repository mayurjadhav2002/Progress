import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Board from '../kanban/board';
import { Sidebar } from '../../../components/dashboard/Misc/sidebar';
import Header from '../../../components/dashboard/kanban/header';
import Search from '../../../components/dashboard/kanban/search';
import Users from '../../../components/dashboard/kanban/users';
import { useProjectContext } from '../../../utils/ProjectContext/ProjectContext';

function KanbanBoard() {
  const params = useParams();

  const { board, saving, setSaving, loading, error,HandleFetchBoard } = useProjectContext()
useEffect(()=>{
  HandleFetchBoard({ id: params.id });

}, [])
  if (loading) {
    return "Loading..."
  }
  if (error) {
    return "Some error occured"
  }
  return (


    <>
      <div className='w-full lg:w-[calc(100vw-24rem)] overflow-x-hidden p-5'>
        <Header />
        <div className='flex gap-4 justify-start items-center'>
          {/* Menu bars */}
          <Search />
          <Users />
        </div>
        {/* Check if board.data and board.data.board exist before rendering */}
        {board.data && board.data.board && board.data.board.length > 0 &&
          <Board board={board.data.board} id={params.id} setSaving={setSaving}/>
        }        
      </div>
    </>

  );
}

export default KanbanBoard;
