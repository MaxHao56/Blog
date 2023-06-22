
import { Routes,Route } from 'react-router-dom';
import './App.css';

import Layout from './Components/Layout';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CreatePostPage from './pages/CreatePostPage';
import PostPage from './pages/PostPage';
import EditPost from './pages/EditPost';
import axios from 'axios';
import {UserContextProvider} from "./Components/UserContext";


function App() {
  axios.defaults.withCredentials = true
  return (
    <UserContextProvider>
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<IndexPage/>}/>
        <Route path={'/Login'} element={<LoginPage/>}/>
        <Route path={'/Register'} element={<RegisterPage/>}/>
        <Route path={'/Create'} element={<CreatePostPage/>}/>
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/edit/:id" element={<EditPost />} />

        
      </Route>

    </Routes>
    </UserContextProvider>

  );
}

export default App;
