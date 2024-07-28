import { Button, Container, Stack, Typography , Box, Alert} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import Loading from "src/components/loading";
import { Product } from "src/types/Products";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import HalfRating from "src/components/rating";
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import Banner from "src/components/banner";
import BasicAlerts from "src/components/alert";
import BannerDetail from "src/components/bannerDetail";
import { toast } from "react-toastify";
import { useCart } from "src/contexts/Cart";
import api from "src/api/ClientApi";

function Detail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false); 
  const [quantity, setQuantity] = useState(1);
  const [cartItemss, setCartItemss] = useState([]);
  


  const getProductDetail = async (id: string) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`http://localhost:3000/products/${id}`);
      setProduct(data);
      setError(false); 
    } catch (error) {
      setError(true); 
    } finally {
      setLoading(false);
    }
  };

  const getCartUser = async ()=>{
    if(!user) return;
  const {data} = await api.get(`/carts/user/${userId}`);
  
  }
   // Hàm xử lý tăng số lượng
   const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  useEffect(() => {
    if (!id) return;
    getProductDetail(id);
  }, [id]);
  if (!id || error) {
    return <Navigate to="/404" replace />;
  }

  useEffect(()=>{
    getCartUser()
  },[])

  const getUserFromLocalStorage = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  };
  const user = getUserFromLocalStorage();
  const userId = user ? user._id : null;

  const handleAddToCart = async () => {
    if (!userId) {
      toast.error("User is not logged in.");
      return;
    }
    try {
      await api.post("/carts", {
      user: userId,
      product: id, 
      quantity,
      });
      toast.success("Product added to cart!");
    } catch (error) {
      toast.error("There was an error adding the product to the cart.");
    }
  };
       
    
 

  return (
    <>
    {error && ( 
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert variant="filled" severity="error">
            Error fetching products. Please try again later.
          </Alert>
        </Stack>
      )}
      <Loading isShow={loading} />
      <Container sx={{ my: 15}}>
        {product && (
          <Stack direction={"row"} gap={3}>
            <Box>
            <img src={product.image} alt="" height={"300px"} width={"300px"} />
            <Box sx={{ml: '35px', mt: '30px'}}>
            <img src={product.image2} alt="" height={"100px"} width={"100px"} />
            <img src={product.image2} alt="" height={"100px"} width={"100px"} />
            </Box>  
            </Box>
            <Stack gap={"20px"}>
              <Typography variant="h3" component={"h1"} fontSize={"40px"} fontWeight={"bold"}>
                {product.title}
              </Typography>
              <HalfRating/>
              <Typography sx={{width: 510}} fontSize={"18px"}>{product.description}</Typography>
              <Box sx={{display: 'flex', alignItems:'center'}}>
              <Typography marginRight={'10px'} color={"red"} fontWeight={"bold"}  fontSize={"25px"} >
               Giá:   {product.price.toLocaleString('vi', {style : 'currency', currency : 'VND'})}
              </Typography>
            <Typography variant="body2"  sx={{textDecoration:'line-through'}} ml={'20px'} fontSize='1.2rem' fontStyle={'italic'}   style={{ color: 'gray' }} >
                {product.discount.toLocaleString('vi', {style : 'currency', currency : 'VND'})}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography color="gray" mr="10px" fontSize="20px">
                  Số lượng:
                </Typography>
                <Button variant="outlined" onClick={decreaseQuantity} sx={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', padding: '5px 5px', border: '1px solid rgba(0, 0, 0, 0.23)', borderRadius: 0 }}>
                  <HorizontalRuleIcon />
                </Button>
                <Typography sx={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', padding: '5px 20px', border: '1px solid rgba(0, 0, 0, 0.23)', borderRadius: 0 }}>{quantity}</Typography>
                <Button variant="outlined" onClick={increaseQuantity} sx={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', padding: '5px 5px', border: '1px solid rgba(0, 0, 0, 0.23)', borderRadius: 0 }}>
                  <AddIcon />
                </Button>
              </Box>
              <Box sx={{display: 'flex'}}>
              <Button  sx={{width: 150, color: 'white', backgroundColor:"#696969", mr:'20px', ":hover":{backgroundColor:"black"} } }>Mua Ngay</Button>
              <Button  sx={{width: 200, color: 'white', backgroundColor:"black", ":hover":{backgroundColor:"gray"} } }  onClick={handleAddToCart}>Thêm Vào Giỏ Hàng
              <AddShoppingCartIcon sx={{ml:'5px'}} style={{ fill: 'white' }}/>
              </Button>
              </Box>
            </Stack>
          </Stack>
        )}
      </Container>
    </>
  );
}

export default Detail;