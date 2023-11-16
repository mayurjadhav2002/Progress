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

function App() {
  
return (
    <UserContextProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/user/board/:id" element={<KanbanBoard />} />
        <Route path="/dashboard" element={<Dashboard/> } />
        <Route path="/dashboard/user/project" element={<Project />} />
        <Route path="/dashboard/user/project/new" element={<CreateProject />} />

        <Route path="/dashboard/user/project/documentation/" element={<Confluence/>} />

      </Routes>
    </UserContextProvider>

  );
}

export default App;
