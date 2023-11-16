import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Board from '../kanban/board';
import { Sidebar } from '../../../components/dashboard/Misc/sidebar';
import Header from '../../../components/dashboard/kanban/header';
import Search from '../../../components/dashboard/kanban/search';
import Users from '../../../components/dashboard/kanban/users';
import { getKanban } from '../../../utils/Queries';

function KanbanBoard() {
  const params = useParams();
  const [board, setBoard] = useState({ data: { board: [] } });

  useEffect(() => {
    let isMounted = true;

    if (params.id) {
      getKanban(params.id)
        .then(data => {
          if (isMounted && data && data.data) {
            setBoard(data);
          } else {
            console.error("Invalid data received:", data);
          }
        })
        .catch(error => {
          console.error("Error retrieving projects: ", error);
        });
    }

    // Cleanup function to avoid memory leaks
    return () => {
      isMounted = false;
    };
  }, [params]);
  console.log(board.data?.projectId)
  return (
    <div className='flex items-start gap-5'>
      <Sidebar />
      <div className='w-[calc(100vw-24rem)] overflow-x-hidden p-5'>
        <Header  title={board.data?.projectId?.title} timeline={board.data?.projectId?.timeline} />
        <div className='flex gap-4 justify-start items-center'>
          {/* Menu bars */}
          <Search />
          <Users />
        </div>
        {/* Check if board.data and board.data.board exist before rendering */}
        {board.data && board.data.board && board.data.board.length > 0 &&
          <Board board={board.data.board} />
        }
      </div>
    </div>
  );
}

export default KanbanBoard;
