import { Link } from "react-router-dom";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import React from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PostAddIcon from "@mui/icons-material/PostAdd";
import ArchiveIcon from "@mui/icons-material/Archive";
import PieChartIcon from "@mui/icons-material/PieChart";
import { Typography, Box, Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import WarehouseIcon from '@mui/icons-material/Warehouse';

function SideBar() {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  const theme = createTheme({
    components: {
      MuiListItemText: {
        styleOverrides: {
          primary: {
            color: "lightgray",
          },
        },
      },
    },
  });

  return (
    <List
      sx={{ width: "250px", bgcolor: "#1d2327", height: "2000px" }}
      component="nav"
      aria-labelledby="logo-admin-sidebar"
      subheader={
        <ListSubheader
          component="div"
          id="nested-list-subheader"
          sx={{
            backgroundColor: "Gold",
            display: "flex",
            justifyContent: "center",
            height:'65px'
          }}
        >
          <Typography my={"10px"} fontWeight={"bold"} variant="h4">
            LOGO
          </Typography>
        </ListSubheader>
      }
    >
      <ListItemIcon sx={{ ml: "10px", mt:'10px' }}>
        <Typography variant="body1" my={1} fontWeight="bold" color="white">
          ADMIN
        </Typography>
      </ListItemIcon>

      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon style={{ fill: "lightgray" }} />
        </ListItemIcon>
        <ThemeProvider theme={theme}>
          <ListItemText primary="DashBoard" />
        </ThemeProvider>
      </ListItemButton>

      {/* start sản phẩm */}
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <ShoppingBasketIcon style={{ fill: "lightgray" }} />
        </ListItemIcon>
        <ThemeProvider theme={theme}>
          <ListItemText primary="Sản phẩm" />
        </ThemeProvider>
        {open ? (
          <ExpandLess style={{ fill: "lightgray" }} />
        ) : (
          <ExpandMore style={{ fill: "lightgray" }} />
        )}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
             <FormatListBulletedIcon style={{fill:'lightgray'}}/>
            </ListItemIcon>
            <ThemeProvider theme={theme}>
          <ListItemText primary="Danh mục" />
        </ThemeProvider>
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
             <WarehouseIcon style={{fill:'lightgray'}}/>
            </ListItemIcon>
            <ThemeProvider theme={theme}>
          <ListItemText primary="Kho hàng" />
        </ThemeProvider>
          </ListItemButton>
        </List>
      </Collapse>
      {/* end sản phẩm */}

      {/* start đơn hàng */}
      <Link to="/don-hang">
        <ListItemButton>
          <ListItemIcon>
            <InboxIcon style={{ fill: "lightgray" }} />
          </ListItemIcon>
          <ThemeProvider theme={theme}>
          <ListItemText primary="Đơn hàng" />
        </ThemeProvider>
        </ListItemButton>
      </Link>
      {/* end đơn hàng */}
      <Link to="/don-hang">
        <ListItemButton>
          <ListItemIcon>
            <PieChartIcon style={{ fill: "lightgray" }} />
          </ListItemIcon>
          <ThemeProvider theme={theme}>
          <ListItemText primary="Thống kê" />
        </ThemeProvider>
        </ListItemButton>
      </Link>
      <ListItemIcon sx={{ ml: "10px" }}>
        <Typography variant="body1" my={1} fontWeight="bold" color="white">
          BLOG
        </Typography>
      </ListItemIcon>
      <Link to="/don-hang">
        <ListItemButton>
          <ListItemIcon>
            <PostAddIcon style={{ fill: "lightgray" }} />
          </ListItemIcon>
          <ThemeProvider theme={theme}>
          <ListItemText primary="Đăng tin" />
        </ThemeProvider>
        </ListItemButton>
      </Link>
      <Link to="/don-hang">
        <ListItemButton>
          <ListItemIcon>
            <ArchiveIcon style={{ fill: "lightgray" }} />
          </ListItemIcon>
          <ThemeProvider theme={theme}>
          <ListItemText primary="Lưu trữ" />
        </ThemeProvider>
        </ListItemButton>
      </Link>
      <ListItemIcon sx={{ ml: "10px" }}>
        <Typography variant="body1" my={1} fontWeight="bold" color="white">
          PERSONAL
        </Typography>
      </ListItemIcon>
      <Link to="/don-hang">
        <ListItemButton>
          <ListItemIcon>
            <NotificationsIcon style={{ fill: "lightgray" }} />
          </ListItemIcon>
          <ThemeProvider theme={theme}>
          <ListItemText primary="Thông báo" />
        </ThemeProvider>
        </ListItemButton>
      </Link>
      <Link to="/don-hang">
        <ListItemButton>
          <ListItemIcon>
            <LocalPostOfficeIcon style={{ fill: "lightgray" }} />
          </ListItemIcon>
          <ThemeProvider theme={theme}>
          <ListItemText primary="Tin nhắn" />
        </ThemeProvider>
        </ListItemButton>
      </Link>
    </List>
  );
}

export default SideBar;
