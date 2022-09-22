/* eslint-disable react-hooks/exhaustive-deps */

import React, { FC, ReactElement, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import {
  Box,
  Link,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  ButtonGroup,
  Button
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { makeStyles } from "@mui/styles";

import { routes } from "./NavList";
import Logo from '../Logo';
import { CartButton } from "../Dashboard/Cart";
import LogoutButton from "./LogoutButton";

const useStyles = makeStyles((theme: any) => ({
  navButtons: {
    color: '#F14D54',
    marginLeft: '20px',
  }
}));

const Navbar: FC = (): ReactElement => {
  
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [navRoutes, setRoutes] = useState(routes);
  const classes = useStyles();

  const {user, token} = useSelector((state: any) => state.User);

  useEffect(() => {
    filterRoute()
  }, [token]);

  const filterRoute = () => {
    if(!token) {
      let filteredRoute = navRoutes.filter(data => data.type.includes('auth'));
      setRoutes(filteredRoute);
    } else {
      let filteredRoute = navRoutes.filter(data => data.type.includes(user.role === 'admin' ? 'admin' : 'user')).filter(x => x.path !== window.location.pathname);
      setRoutes(filteredRoute);
    }
  }

  const handleOpenNavMenu = (event: any) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
            }}
          >
            <Logo />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {navRoutes.map((page) => (
                <Link
                  key={page.key}
                  component={NavLink}
                  to={page.path}
                  color="black"
                  underline="none"
                  variant="button"
                >
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page.title}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            Book store app
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, justifyContent: 'end'}}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                marginLeft: "1rem",
              }}
            >
              <ButtonGroup variant="text" className={classes.navButtons}>
              {navRoutes.map((page) => (
                <Button style={{borderColor: navRoutes.length > 1  ? '#F14D54' : 'transparent'}} key={page.key}>
                  <Link
                    key={page.key}
                    component={NavLink}
                    to={page.path}
                    color="black"
                    underline="none"
                    variant="button"
                    sx={{ color: 'themered' }}
                  >
                    {page.title}
                  </Link>
                </Button>
              ))}
              </ButtonGroup>
              <CartButton />
              { token && <LogoutButton />}
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </Box>
  );
};

export default Navbar;
