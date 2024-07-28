import { FC } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  Typography,
  Box,
} from "@mui/material";
import { Product } from "src/types/Products";
import { Link } from 'react-router-dom';
import HalfRating from "./rating";


type ProductCardProps = {
    product: Product;
  
  };
  
  
const ProductCard: FC<ProductCardProps> = ({ product }) => {
    return (
      <Card style={{width:'270px'}}>
        <Link to={`/detail/${product._id}`} >
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image={product.image}
          sx={{ objectFit: "contain", my: 3}}
        />
        </Link>
        <Stack sx={{  alignItems: 'center', justifyContent:"space-between"}}>
          <Typography gutterBottom variant="h5" component="div">
            {product.title}
          </Typography>
          <Box sx={{display: 'flex'}}>
          <Typography variant="body2"  sx={{textDecoration:'line-through'}} mr={'20px'} fontSize='1.2rem' fontStyle={'italic'} fontWeight={'medium'}  style={{ color: 'gray' }} >
           {product.discount.toLocaleString('vi', {style : 'currency', currency : 'VND'})}
          </Typography>
          <Typography variant="body2" fontWeight={'medium'}  fontSize='1.2rem'  style={{ color: 'red' }} >
           {product.price.toLocaleString('vi', {style : 'currency', currency : 'VND'})}
          </Typography>
          </Box>
        </Stack> 
        <CardActions sx={{  justifyContent: 'center'}}>
         <HalfRating/>
        </CardActions>
      </Card>
    );
  };
  
  export default ProductCard;