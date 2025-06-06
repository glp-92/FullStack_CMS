import { useState, useEffect } from 'react'
import { GetPostList, DeletePost } from '../../../util/requests/Posts';

import { useNavigate } from "react-router-dom";

const usePost = () => {

  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [postPage, setPostPage] = useState(1);
  const [nPostPages, setNPostPages] = useState(0);

  const handleCreatePost = () => {
    navigate(`/wpannel/writer`);
  }

  const handleEditPost = (post) => {
    navigate(`/wpannel/writer`, { state: post })
  }

  const handleDeletePost = (id) => {
    const deletePost = async () => {
      try {
        const response = await DeletePost(id);
        if (!response.ok) {
          throw new Error(`DeletePostError`);
        }
        fetchPosts(postPage);
      } catch (error) {
        console.error(`${error}`);
      }
    };

    if (confirm('Esta accion borrara el Post de la base de datos, continuar?')) {
      deletePost();
    }
  }


  const fetchPosts = async (page) => {
    const posts = await GetPostList(page, null);
    if (posts != null) {
      setPosts(posts.posts);
      setNPostPages(posts.pages)
    }
    else {
      setPosts([]);
    }
  }

  useEffect(() => {
    fetchPosts(postPage);
  }, [postPage])

  return {
    posts,
    postPage,
    setPostPage,
    nPostPages,
    handleCreatePost,
    handleEditPost,
    handleDeletePost
  }
}

export default usePost