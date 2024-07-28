import { useEffect, useState } from "react";
import axios from "axios";
import {
  Alert,
  Box,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { Product } from "src/types/Products";
import ProductCard from "src/components/productCard";
import Loading from "src/components/loading";
import Banner from "src/components/banner";
import api from "src/api/ClientApi";
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import Text from "src/components/customText";
import subHeader from "src/components/subHeader";


function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [laptops, setLaptops] = useState<Product[]>([]);
  const [phones, setPhones] = useState<Product[]>([]);
  const [ipads, setIpads] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false); 
  const getAllProduct = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/products"); 
      setProducts(data);
      setError(false)
    } catch (error) {
      setError(true); 
    } finally {
      setLoading(false);
    }
  };
  const getAllLaptop = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/products"); 
      const filterLaptop = data.filter((product: Product) => product.category.name === 'Laptop');
     setLaptops(filterLaptop);
      setError(false)
    } catch (error) {
      setError(true); 
    } finally {
      setLoading(false);
    }
  };

  const getAllPhone = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/products"); 
      const filterPhone = data.filter((product: Product) => product.category.name === 'Điện thoại');
     setPhones(filterPhone);
      setError(false)
    } catch (error) {
      setError(true); 
    } finally {
      setLoading(false);
    }
  };

  const getAllIpad = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/products"); 
      const filterIpad = data.filter((product: Product) => product.category.name === 'Máy tính bảng');
     setIpads(filterIpad);
      setError(false)
    } catch (error) {
      setError(true); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllPhone();
    getAllLaptop();
    getAllProduct();
    getAllIpad();
  }, []);

   const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };

  
  
  return (
    <>
    <Loading isShow={loading} />
     <Banner />
    <Container sx={{mb:'50px'}}>
      <Box component="div" className="div_HotSale" sx={{backgroundColor:'#f8405d', mt:'30px', mb:'24px', borderRadius:'10px' }}>
       {/* Sản phẩm nổi bật */}
       <Box sx={{display:'flex', justifyContent:'start', alignItems:'center', pt:'20px', pb:'10px', pl:'20px'}}>
       <LocalFireDepartmentIcon style={{fill:'white', fontSize:'50px'}}/>
       <Typography ml={'10px'} sx={{ color: "white" , fontFamily:'inherit'}} fontWeight={'bold'} fontSize={'40px'} >HOT SALE</Typography>
       <Text/>
       </Box>
      <Slider {...settings} >
        {products.map((product, index) => (
          <Box key={index} padding="9px" >
            <ProductCard product={product}/>
          </Box>
        ))}
      </Slider>
       {/* end */}
      </Box>
       {/* Điện thoại */}
       <Box>
      <Typography  sx={{ color: "ballack" }} fontWeight={'bold'} fontSize={30} marginTop={5} marginBottom={1} >Điện thoại</Typography>
      <Slider {...settings}>
        {phones.map((phone, index) => (
          <Box key={index} padding="9px" >
            <ProductCard product={phone}/>
          </Box>
        ))}
      </Slider>
      </Box>
      {/* end */}
      {/* Laptop */}
      <Box>
      <Typography  sx={{ color: "ballack" }} fontWeight={'bold'} fontSize={30} marginTop={5} marginBottom={1}>Laptop</Typography>
      <Slider {...settings}>
        {laptops.map((laptop, index) => (
          <Box key={index} padding="9px" >
            <ProductCard product={laptop}/>
          </Box>
        ))}
      </Slider>
      </Box>
      {/* end */}
       {/* Máy tính bảng */}
       <Box>
      <Typography  sx={{ color: "ballack" }} fontWeight={'bold'} fontSize={30} marginTop={5} >Máy tính bảng</Typography>
      <Slider {...settings}>
        {ipads.map((ipad, index) => (
          <Box key={index} padding="9px" >
            <ProductCard product={ipad}/>
          </Box>
        ))}
      </Slider>
      </Box>
      {/* end */}
    </Container>
    </>
  );
}
const SampleNextArrow = (props:any) => {
  const { className, style, onClick } = props;
  return (
    <ArrowForwardIosIcon
      className={className}
      style={{ ...style,  fill:'#616161' }}
      onClick={onClick}
    />
  );
};

const SamplePrevArrow = (props:any) => {
  const { className, style, onClick } = props;
  return (
    <ArrowBackIosIcon
      className={className}
      style={{ ...style, fill:'#616161' }}
      onClick={onClick}
    />
  );
};

export default HomePage;
