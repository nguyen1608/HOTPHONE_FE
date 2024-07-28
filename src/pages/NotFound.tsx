import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';

// Hàm tạo hiệu ứng bóng đổ nhiều lớp
const multipleShadow = (length: number) => {
  let value = '2px -1px 0 #000';
  for (let i = 2; i <= length; i++) {
    const ho = i * 2;
    const vo = -(ho / 2);
    const col = `hsl(0deg, 0%, ${i * 2}%)`;
    value += `, ${ho}px ${vo}px 0 ${col}`;
  }
  return value;
};

// Các thành phần phong cách
const Number = styled('div')({
  background: '#fff',
  position: 'relative',
  font: '900 30vmin "Consolas"',
  letterSpacing: '5vmin',
  textShadow: multipleShadow(8),
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: '#673ab7',
    backgroundImage: `
      radial-gradient(closest-side at 50% 50%, #ffc107 100%, rgba(0, 0, 0, 0)),
      radial-gradient(closest-side at 50% 50%, #e91e63 100%, rgba(0, 0, 0, 0))
    `,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '40vmin 40vmin',
    backgroundPosition: '-100vmin 20vmin, 100vmin -25vmin',
    mixBlendMode: 'screen',
    zIndex: -1,
    animation: 'moving 10s linear infinite both',
  },
  '@keyframes moving': {
    to: {
      backgroundPosition: '100vmin 20vmin, -100vmin -25vmin',
    },
  },
});

const Text = styled('div')({
  font: '400 5vmin "Courgette"',
  textAlign: 'center',
  span: {
    fontSize: '10vmin',
  },
});

const NotFound = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
      
      }}
    >
      <Number sx={{color: 'red'}}>404</Number>
      <Typography fontSize={'80px'} fontWeight={'bold'} color={'red'}>
        Page Not Found
      </Typography>
      <Link to="/">
      <Typography fontSize={'30px'} fontWeight={'medium'} sx={{color:'blue',':hover':{color:'red'}}}>
        Back to Home
      </Typography>
      </Link>
    </Box>
  );
};

export default NotFound;
