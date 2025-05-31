import { useState, useEffect } from 'react'
import PostContent from './components/PostContent'
import { Navigate } from "react-router-dom";
import Loading from '../../components/loading/Loading';
import { getPost } from '../../util/requests/Posts';

import Box from '@mui/material/Box';

const Post = () => {
  const slug = window.location.pathname.replace(`/post/`, "");
  const [postData, setPostData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPostData = async () => {
      setIsLoading(true);
      const postData = await getPost(slug);
      if (postData != null) {
        setPostData(postData);
      } else {
        setPostData(null);
      }
      setIsLoading(false);
    }
    fetchPostData();
  }, [slug])

  return (
    <Box sx={{ width: '100%', marginBottom: 3 }}>
      {isLoading ? (
        <Loading height={'70vh'} />
      ) : (
        postData ? (
          <PostContent postData={postData} />
        ) : (
          <Navigate to="/not-found" replace={true} />
        )
      )}
    </Box>
  )
}

export default Post;