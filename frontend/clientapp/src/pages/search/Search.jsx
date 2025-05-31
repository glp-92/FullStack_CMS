import { useMemo, useState, useEffect } from 'react'
import { GetPostList } from '../../util/requests/Posts';
import PostList from './components/PostList'
import Loading from '../../components/loading/Loading';
import { useLocation, useNavigate } from 'react-router-dom';

import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const queryString = location.search
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [npages, setNPages] = useState(0);

  const label = useMemo(() => {
    if (searchParams.has('theme')) {
      return <>Entradas para tema <strong><em>{searchParams.get('theme')}</em></strong></>;
    } else if (searchParams.has('category')) {
      return <>Entradas para categoría <strong><em>{searchParams.get('category')}</em></strong></>;
    } else {
      return <>Resultados para palabras clave <strong><em>{searchParams.get('keyword')}</em></strong></>;
    }
  }, [queryString]);
  const handlePageChange = (_, value) => {
    const newParams = new URLSearchParams(location.search);
    if (value > 1) {
      newParams.set('page', value);
    } else {
      newParams.delete('page');
    }
    navigate(`?${newParams.toString()}`);
  };
  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      const postListResponse = await GetPostList(currentPage, queryString.replace('?', '&'));
      if (postListResponse) {
        setPosts(postListResponse.posts);
        setNPages(postListResponse.pages);
      } else {
        setPosts([]);
        setNPages(0);
      }
      setIsLoading(false);
    };
    fetchPosts();
  }, [currentPage, queryString]);

  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%', marginBottom: 3, marginTop: 3 }}>
      <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: 3 }} gutterBottom>{label}</Typography>
      {isLoading ? (
        <Loading height={200} />
      ) : posts.length ? (
        <PostList postArr={posts} />
      ) : (
        <Box sx={{ height: '40vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Typography borderRadius={1} padding={1} bgcolor='lightgray' variant="h2">SIN RESULTADOS</Typography>
        </Box>
      )}
      {npages > 1 && (
        <Pagination
          sx={{ marginTop: 5, alignSelf: 'center' }}
          size='small'
          count={npages}
          shape="rounded"
          page={currentPage}
          onChange={handlePageChange}
        />
      )}
    </Box>
  );
};

export default Search;