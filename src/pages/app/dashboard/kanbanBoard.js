import React from 'react';
import Board from '../kanban/board';
import { Link, Route, Routes } from 'react-router-dom';
import { Sidebar } from '../../../components/dashboard/Misc/sidebar';
import Header from '../../../components/dashboard/kanban/header';
import Search from '../../../components/dashboard/kanban/search';
import Users from '../../../components/dashboard/kanban/users';

function KanbanBoard() {
  return (
    <div className='flex items-start gap-5'>
      <Sidebar />
      <div className='w-[calc(100vw-24rem)] overflow-x-hidden p-5' >
      <Header  />
      <div className='flex gap-4 justify-start items-center'>
        {/* Menu bars */}
        <Search />
        <Users />
      </div>
        {/* Assuming 'Board' is responsible for rendering the main content */}
        <Board />
      </div>
    </div>
  );
}

export default KanbanBoard;
