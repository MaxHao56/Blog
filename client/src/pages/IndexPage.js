import Post from "../Components/Post";
import {useEffect, useState} from 'react';  

export default function IndexPage(){

    const [posts,setPosts] = useState([]);
    useEffect(() => {
      fetch('http://localhost:3003/post').then(response => {
        response.json().then(posts => {
          setPosts(posts);
        });
      });
    }, []);


    
    return(
        <>
      {posts.length > 0 && posts.map(post => (
        <Post {...post} />
      ))}
        </>
    )
}

