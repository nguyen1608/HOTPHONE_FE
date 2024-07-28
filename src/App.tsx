import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Grid, LinearProgress, Stack, Typography } from "@mui/material";
import { Product } from "src/types/Products";
import "./App.css";
import LayoutAdmin from "./layout/AdminLayout";
import * as React from "react";
import ProductCard from "./components/productCard";
import Loading from "./components/loading";
import SearchAppBar from "./components/header";
import PrimarySearchAppBar from "./components/header";
import Footer from "./components/footer";
import { useRoutes } from "react-router-dom";
import HomePage from "./pages/Homepage";
import Detail from "./pages/Detail";
import ClientLayout from "src/layout/ClientLayout";
import SideBar from "./components/sidebar";
import NotFound from "src/pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CustomizedTables from "./pages/Admin/listProduct";
import AddProductForm from "src/pages/Admin/addProduct";
import EditProductForm from "./pages/Admin/editProduct";
import Cart from "./pages/Cart";
function App() {

  let element = useRoutes([
    {
      path: "/",
      element: <ClientLayout/>,
      children: [
        {
          path: "detail/:id",
          element: <Detail/>,
        },
        {
          path: "",
          element: <HomePage/>,
        },
        {
          path: "/login",
          element: <Login/>
        },
        {
          path: "/register",
          element: <Register/>
        },
        {
          path: "/cart",
          element: <Cart/>
        },
       
      ]

    },
    {
      path: "/admin",
      element: <LayoutAdmin/>,
      children:[
        {
          path: "",
          element: <CustomizedTables/>,
        },
        {
          path: "add",
          element: <AddProductForm/>,
        },
        {
          path: "edit/:id",
          element: <EditProductForm/>,
        }
      ]
      
    },
    {
      path: "/404",
      element: <NotFound/>
    },
    {
      path: "*",
      element: <NotFound/>
    }
   
  
  ]);

  return element;
}

export default App;
