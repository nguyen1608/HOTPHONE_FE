import React, { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, IconButton, Box } from '@mui/material';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { toast } from 'react-toastify';
import { useCart } from 'src/contexts/Cart';
import api from 'src/api/ClientApi';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { Link } from 'react-router-dom';
interface CartItem {
  productId: string;
  title: string;
  quantity: number;
  price: number;
  image: string;
}

function Cart() {
  const { cart, getCartUser } = useCart();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<{ _id : string } | null>(null);


  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if(storedUser){
       setUserId(JSON.parse(storedUser)._id)
    }
  }, []);

 
  useEffect(() => {
    if (userId) {
      getCartUser();
    }
  }, [userId, getCartUser]);
  
  const dataCart = cart && cart.products ? cart.products.map(product => ({
    id: product.product._id,
    title: product.product.title,
    price: product.product.price,
    quantity: product.quantity,
    image: product.product.image
  })) : [];
  
  

  const totalAmount = dataCart.reduce((total, item) => {
    return total + (item.quantity * item.price);
  }, 0);
  
  const formattedTotalAmount = totalAmount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  
  const Separator = () => (
    <hr style={{ border: '0', borderTop: '1px solid #ccc', margin: '20px 20px' }} />
  );

  const handleRemoveItem = async (productId: string) => {
    const user = localStorage.getItem('user');
    if (user) {
      const userId = JSON.parse(user)._id;
      try {
        await api.delete(`/carts/userid/${userId}/productid/${productId}`);
        setCartItems(prevItems => prevItems.filter(item => item.productId !== productId));
        toast.success('Product removed from cart');
      }   catch (error) {
        console.error('Error removing product from cart:', error);
        toast.error('Error removing product from cart');
      }
    } else {
      console.error('User not found in localStorage');
      toast.error('User not found');
    }
  };

  const handleQuantityChange = async (productId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      toast.error('Quantity cannot be less than 1');
      return;
    }

    const user = localStorage.getItem('user');
    if (user) {
      const userId = JSON.parse(user)._id;
      try {
        await api.put(`/carts/product/${productId}`, { quantity: newQuantity, user: userId, product: productId });
        setCartItems(prevItems =>
          prevItems.map(item =>
            item.productId === productId ? { ...item, quantity: newQuantity } : item
          )
        );
      } catch (error) {
        console.error('Error updating quantity:', error);
        toast.error('Error updating quantity');
      }
    } else {
      console.error('User not found in localStorage');
      toast.error('User not found, please log in');
    }
  };  
  
  return (
    <>
    {dataCart.length > 0 ? (
      <Container sx={{ my: 10 }}>
        <Typography variant="h4" gutterBottom fontWeight={'medium'}>
          Giỏ hàng của bạn
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ textAlign: 'center', fontSize: '20px', fontWeight: 'medium', textTransform: 'uppercase' }}>Image</TableCell>
                <TableCell style={{ textAlign: 'center', fontSize: '20px', fontWeight: 'medium', textTransform: 'uppercase' }}>Title</TableCell>
                <TableCell style={{ textAlign: 'center', fontSize: '20px', fontWeight: 'medium', textTransform: 'uppercase' }}>Price</TableCell>
                <TableCell style={{ textAlign: 'center', fontSize: '20px', fontWeight: 'medium', textTransform: 'uppercase' }}>Quantity</TableCell>
                <TableCell style={{ textAlign: 'center', fontSize: '20px', fontWeight: 'medium', textTransform: 'uppercase' }}>Subtotal</TableCell>
                <TableCell style={{ textAlign: 'center', fontSize: '20px', fontWeight: 'medium', textTransform: 'uppercase' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataCart.map(item => (
                <TableRow key={item.id}>
                  <TableCell style={{ textAlign: 'center' }}>
                    <img src={item.image} alt={item.image} style={{ width: '100px', height: '100px' }} />
                  </TableCell>
                  <TableCell style={{ textAlign: 'center', fontSize: '20px' }}>{item.title}</TableCell>
                  <TableCell style={{ textAlign: 'center', fontSize: '20px' }}>
                    {item.price ? item.price.toLocaleString('vi', { style: 'currency', currency: 'VND' }) : 'N/A'}
                  </TableCell>
                  <TableCell style={{ textAlign: 'center' }}>
                    <Box component={'div'} className='div_quantity' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Box sx={{ border: '1px solid rgba(0, 0, 0, 0.23)', padding: '5px' }}>
                        <IconButton onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>
                          <RemoveIcon />
                        </IconButton>
                      </Box>
                      <Box sx={{ border: '1px solid rgba(0, 0, 0, 0.23)', padding: '15px 15px' }}>
                        {item.quantity}
                      </Box>
                      <Box sx={{ border: '1px solid rgba(0, 0, 0, 0.23)', padding: '5px' }}>
                        <IconButton onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>
                          <AddIcon />
                        </IconButton>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell style={{ textAlign: 'center', fontSize: '20px' }}>{(item.quantity * item.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>
                    <IconButton color="error" onClick={() => handleRemoveItem(item.id)}>
                      <DeleteOutlineOutlinedIcon style={{ fill: '#202020', fontSize: '30px' }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Box component={'div'} className={'div_checkout'} sx={{ border: '1px solid #f2f2f2', width: '400px', float: 'right', backgroundColor: '#f2f2f2', borderRadius: '2px' }} mt={10}>
            <Typography variant='h5' textAlign={'center'} mt={3} fontWeight={'bold'}>TÓM TẮT ĐƠN HÀNG</Typography>
            <Box component={'div'} className={'div_subtotal'} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '20px 20px' }}>
              <Typography fontSize={'18px'}>SUBTOTAL</Typography>
              <Box sx={{ ml: '30px', fontSize: '20px' }}>{formattedTotalAmount}</Box>
            </Box>
            <Separator />
            <Box component={'div'} className={'div_total'} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mx: '20px', mb: '30px' }}>
              <Typography fontSize={'18px'}>TOTAL</Typography>
              <Box sx={{ ml: '30px', fontSize: '30px', fontWeight: 'bold' }}>{formattedTotalAmount}</Box>
            </Box>
            <Separator />
            <Typography textAlign={'center'} fontSize={'15px'} >PHƯƠNG THỨC THANH TOÁN ĐƯỢC CHẤP NHẬN</Typography>
            <Box sx={{display:'flex', justifyContent:'start', alignItems:'center', gap:'10px', mt:'10px', ml:'30px'}}>
              <img src="https://www.adidas.com.vn/static/checkout/react/bfdf630/assets/img/accepted-payment-methods/icon-adidas-cash_on_delivery.svg"/>
              <img src="https://www.adidas.com.vn/static/checkout/react/bfdf630/assets/img/accepted-payment-methods/icon-adidas-mastercard.svg"/>
              <img src="https://www.adidas.com.vn/static/checkout/react/bfdf630/assets/img/accepted-payment-methods/icon-adidas-visa.svg"/>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', py: '20px' }}>
              <Button sx={{ width: '90%', backgroundColor: 'black', fontSize: '15px', color: 'white', height: '45px', '&:hover': { bgcolor: 'gray' } }}>PROCEED TO CHECKOUT</Button>
            </Box>
          </Box>
        </TableContainer>
      </Container>
    ) : (
      <Container sx={{ mb:'160px', mt:'80px' }}>
        <Typography variant="h4" gutterBottom fontWeight={'medium'} textTransform={'uppercase'}>
          Giỏ hàng của bạn đang trống
        </Typography>
        <Typography sx={{my:3}} fontSize={'18px'}>
        Once you add something to your cart - it will appear here. Ready to get started?
        </Typography>
        <Link to='/'>
        <Button variant='contained' style={{backgroundColor:'black', height:'50px', fontSize:'16px'}}>Mua sắm ngay
        <ArrowRightAltIcon style={{fill:'white', fontSize:'30px'}}/>
        </Button>
        </Link>
      </Container>
    )}
  </>
);
};

export default Cart;
