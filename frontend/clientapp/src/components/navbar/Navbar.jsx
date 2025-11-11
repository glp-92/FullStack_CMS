import React from 'react'
import { Link } from 'react-router-dom';
import DrawerList from './DrawerList';

import { AppBar, Toolbar, Container, Button, Box, Typography } from '@mui/material';

// import HomeIcon from '@mui/icons-material/Home';
const blogName = import.meta.env.VITE_BLOG_NAME;
const blogfirstChar = blogName.charAt(0).toUpperCase();
const blogrestChars = blogName.slice(1).toUpperCase();

const NavBar = () => {

  return (
    <AppBar position="static" sx={{ backgroundColor: "#555454", marginBottom: 2 }} >
      <Container maxWidth="md">
        <Toolbar sx={{ display: 'flex' }}>
          <DrawerList />
          <Box flex={1} display={'flex'} justifyContent={'center'}>
            <Button
              component={Link}
              to="/"
              sx={{ padding: 1, margin: 0, borderRadius: 2 }}
            >
              <Typography variant='logocolor'>{blogfirstChar}</Typography><Typography variant='logogray'>{blogrestChars}</Typography>
              {/*<HomeIcon sx={{fontSize:'2rem'}} />*/}
            </Button>
          </Box>
          <Box flex={1} />
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default NavBar