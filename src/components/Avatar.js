import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import { Logout } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import { ListItemIcon } from "@mui/material";
import { logOut } from "../store/action/user";

function ResponsiveAppBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [arr, setArr] = useState([]);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  let { user } = useSelector((state) => {
    return {
      user: state.user.currentUser,
    };
  }, shallowEqual);

  const disconnected = async () => {
    dispatch(logOut());
    navigate("/");
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    setArr([
      {
        name: "התחברות",
        to: "/login",
        icon: <PersonIcon fontSize="small" />,
        role: [0],
      },
      {
        to: "/ordersUserList",
        name: "ההזמנות שלי",
        role: [3],
        icon: <ShoppingBasketIcon fontSize="small" />,
      },
      {
        to: "/allFoods",
        name: "כל המאכלים",
        role: [1],
        icon: <DinnerDiningIcon fontSize="small" />,
      },
    ]);
  }, []);

  return (
    arr.length > 0 && (
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="פתח הגדרות">
          <IconButton
            onClick={handleOpenUserMenu}
            sx={{ p: 0 }}
            style={{ backgroundColor: "#f0f0f0" }}
            className="px-2 py-1"
          >
            {user ? (
              <div>
                {" "}
                {user.FirstName[0]}
                {user.LastName[0]}
              </div>
            ) : (
              <PersonIcon />
            )}
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {user ? arr.map((x) => {
            return x.role.map((item) => {
              if (item == user?.UserType)
                return (
                  <MenuItem
                    onClick={() => {
                      handleCloseUserMenu();
                      navigate(`${x.to}`);
                    }}
                  >
                    {x.icon} {x.name}
                  </MenuItem>
                );
            });
          }):
            <MenuItem
              onClick={() => {
                handleCloseUserMenu();
                navigate(`/login`);
              }}
            >
              <PersonIcon fontSize="small" /> התחברות
            </MenuItem>
          }

          {user && <MenuItem onClick={disconnected}>
            <Logout fontSize="small" />
            התנתק\י
          </MenuItem>}
        </Menu>
      </Box>
    )
  );
}
export default ResponsiveAppBar;
