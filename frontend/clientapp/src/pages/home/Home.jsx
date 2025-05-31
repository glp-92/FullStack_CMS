import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import PostList from './components/PostList';
import { GetPostList } from '../../util/requests/Posts';
import Loading from '../../components/loading/Loading';
import LandingPage from './components/LandingPage';

import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';

const postsPerPage = 5;

const Home = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const currentPage = parseInt(queryParams.get('page') || '1', 10);

  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [npages, setNPages] = useState(0);

  const handlePageChange = (event, value) => {
    navigate(value > 1 ? `/?page=${value}` : "/");
  };

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      const postListResponse = await GetPostList(currentPage, `&perpage=${postsPerPage}`);
      if (postListResponse != null) {
        setPosts(postListResponse["posts"]);
        setNPages(postListResponse["pages"]);
      } else {
        setPosts([]);
        setNPages(0);
      }
      setIsLoading(false);
    };

    fetchPosts();
  }, [currentPage]);

  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', marginBottom: 3, marginTop: 3 }}>
      {isLoading ? (
        <Loading height={300} />
      ) : (
        currentPage === 1 ? (
          <LandingPage posts={posts} />
        ) :
          (
            <PostList postArr={posts} />
          )
      )
      }
      {
        npages > 1 &&
        <Pagination sx={{
          marginTop: 5,
          alignSelf: 'center',
        }} size='small' count={npages} shape="rounded" page={currentPage} onChange={handlePageChange} />
      }
    </Box>
  )
}

export default Home;