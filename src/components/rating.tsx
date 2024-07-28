import React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

export default function HalfRating() {
  return (
    <Stack spacing={1}>
      <Rating
        name="half-rating-read"
        defaultValue={4}
        precision={0.5}
        readOnly
        icon={<StarIcon style={{ fill: '#ffb400' }} />} // Màu vàng cho ngôi sao đầy
        emptyIcon={<StarBorderIcon style={{ fill: 'white' }} />} // Màu vàng cho ngôi sao trống
      />
    </Stack>
  );
}
