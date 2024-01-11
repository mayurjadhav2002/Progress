import React from 'react';
import { Outlet } from 'react-router-dom';
import { ProjectContextProvider } from '../../../utils/ProjectContext/ProjectContext';
import { ConfluenceContextProvider } from '../../../utils/WriteContext/ConfluenceContext';

function Main() {
  return (
    <ProjectContextProvider>
      <ConfluenceContextProvider>
        <div className="w-11/12 mx-auto py-5">
          <Outlet />
        </div>
      </ConfluenceContextProvider>
    </ProjectContextProvider>
  );
}

export default Main;
