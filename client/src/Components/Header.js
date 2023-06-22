
import { useContext, useEffect } from 'react';
import { Link } from "react-router-dom";
import {UserContext} from './UserContext'

export default function Header(){

  const {setUserInfo,userInfo} = useContext(UserContext)

  useEffect(() => {
    fetch('http://localhost:3003/profile', {
      credentials: 'include',
    })
      .then(response => response.json())
      .then(userInfo => {
        setUserInfo(userInfo);
      })
      .catch(error => {
        console.error('Error fetching profile data:', error);
      });
  },[]);


    function logout(){
      fetch('http://localhost:3003/logout', {
        credentials: 'include',
        method: 'POST',
      });
      setUserInfo(null);
    }
    

    const username = userInfo?.username;
  
  
    return(
        <header>
        <Link to={'/'} className='logo'>MyBlog</Link>
        <nav>
          {username &&(<>
          <Link to={'/Create'}>Create New Posts</Link>
          <Link onClick={logout}>Log Out</Link>
          </>)}


          {!username &&(<>
          <Link to={'/Login'}>Login</Link>
          <Link to={'/Register'}>Register</Link>
          </>)}
 
        </nav>
      </header>
    )
}