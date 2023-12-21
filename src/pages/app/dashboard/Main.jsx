import React from 'react';
import { Sidebar } from '../../../components/dashboard/Misc/sidebar';
import { Outlet } from 'react-router-dom';
import { ProjectContextProvider } from '../../../utils/ProjectContext/ProjectContext';
import { ConfluenceContextProvider } from '../../../utils/WriteContext/ConfluenceContext';

function Main() {
  return (
    <ProjectContextProvider>
    <ConfluenceContextProvider>
    <div className="grid md:grid-cols-4 gap-48 grid-cols-1 lg:grid-cols-5 lg:px-0 px-5">

      {/* Fixed Sidebar */}
      <div className="col-span-1 w-full left-0 top-0 overflow-y-auto">
        <div className='h-[100vh] fixed'>
        <Sidebar />

        </div>
      </div>

      {/* Scrollable Content */}
      <div className="col-span-4 py-5 w-full overflow-y-auto">
        <Outlet />
      </div>
    </div>
    </ConfluenceContextProvider>
</ProjectContextProvider>
  );
}

export default Main;
