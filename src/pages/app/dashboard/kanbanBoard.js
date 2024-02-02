import React, { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import Board from '../kanban/board';
import Header from '../../../components/dashboard/kanban/header';
import Search from '../../../components/dashboard/kanban/search';
import Users from '../../../components/dashboard/kanban/users';
import { useProjectContext } from '../../../utils/ProjectContext/ProjectContext';
import { Loading } from '../../../components/Misc/Loadings';

function KanbanBoard() {
  const params = useParams();
  const { board, setSaving, loading, error, HandleFetchBoard, collaborators } = useProjectContext()
  useEffect(() => {
    HandleFetchBoard({ id: params.id });
  }, [])
  if (loading) {
    return <><Loading /></>
  }
  if (error) {
    return "Some error occured"
  }
  return (


    <>
      <div className='w-full overflow-x-hidden custom-scrollbar2'>
        <Header />
        <div className='flex gap-4 justify-start items-center'>
          {/* Menu bars */}
          <Search className="hidden lg:block xl:block"/>
          <Users collab={collaborators} />
        </div>
        {/* Check if board.data and board.data.board exist before rendering */}
        {board.data && board.data.board && board.data.board.length > 0 &&
          <Board board={board.data.board} id={params.id} setSaving={setSaving} collab={collaborators} />
        }
      </div>
      <Outlet/>
    </>

  );
}

export default KanbanBoard;
