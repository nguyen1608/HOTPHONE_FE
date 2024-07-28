import React from 'react';
import { styled, keyframes } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const blinkAnimation = keyframes`
  0% {
    color: white;
  }
  50% {
    color: gold;
  }
  100% {
    color: white;
  }
`;

const BlinkingText = styled(Typography)(({ theme }) => ({
  color: 'white',
  transition: 'color 0.3s ease-in-out',
  animation: `${blinkAnimation} 2s infinite`,
  fontWeight:'bold',
  textShadow: '0 0 2px white, 0 0 2px white',
  fontFamily:'inherit',
  fontSize:'40px',
}));

function Text() {
  return (
      <BlinkingText sx={{ml:'10px'}}>ĐẶC BIỆT</BlinkingText>
  
  );
}

export default Text;
