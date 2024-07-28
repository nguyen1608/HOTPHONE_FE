import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import SideBar from 'src/components/sidebar';
import SearchAppBar from 'src/components/headerAdmin';
import { Box, Stack } from '@mui/material';



const LayoutAdmin = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
  }, [navigate, token]);

  return (
      <Box display="flex" justifyContent={'space-between'}>
        <Box sx={{position:'fixed'}}>
        <SideBar />
        </Box>
        <Box width={'100%'}>
          <SearchAppBar />
            <Outlet />
        </Box>
      </Box>
  );
};

export default LayoutAdmin;
