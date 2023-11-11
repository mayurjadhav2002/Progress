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

function App() {
  
return (
    <UserContextProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/board" element={<KanbanBoard />} />
        <Route path="/user/project" element={<Project />} />
      </Routes>
    </UserContextProvider>

  );
}

export default App;
