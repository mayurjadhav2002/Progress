import { Button } from '@material-tailwind/react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home/Home';
import Register from './pages/authentication/register';
import Login from './pages/authentication/login';
import KanbanBoard from './pages/app/dashboard/kanbanBoard';
import Project from './pages/app/dashboard/Project';
import { UserContextProvider } from './utils/UserContext/UserContext';
import axios from 'axios';
import Dashboard from './pages/app/dashboard/dashboard';
import Confluence from './pages/app/dashboard/confluence';
import CreateProject from './pages/app/dashboard/CreateProject';
import ListProject from './pages/app/dashboard/Conflence/ListProject';
import { ProjectContextProvider } from './utils/ProjectContext/ProjectContext';
import Main from './pages/app/dashboard/Main';
import ProfilePage from './pages/app/dashboard/ProfilePage';
import WriteNew from './pages/app/dashboard/Conflence/WriteNew';

function App() {

  return (
    <UserContextProvider>
          <ProjectContextProvider>

      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path='/dashboard' element={<Main/>}>

        <Route path="/dashboard/user/board/:id" element={<KanbanBoard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/user/project" element={<Project />} />
        <Route path="/dashboard/user/project/new" element={<CreateProject />} />
        <Route path="/dashboard/user/documentation/" element={<Confluence />} />
        <Route path="/dashboard/user/documentation/folder/:fname" element={<ListProject />} />
        <Route path="/dashboard/user/profile" element={<ProfilePage/>}/>
        <Route path="/dashboard/user/documentation/new" element={<WriteNew/>}/>
        </Route>

      </Routes>
      </ProjectContextProvider>
    </UserContextProvider>

  );
}

export default App;
