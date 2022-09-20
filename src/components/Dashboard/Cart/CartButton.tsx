/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

import { Button } from '@mui/material';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: any) => ({
  navButtons: {
    color: '#F14D54',
    marginLeft: '20px',
    borderColor: "#F14D54"
  }
}));

export default function CartButton() {
  
  const classes = useStyles();
  const navigate = useNavigate();
  
  const cart = useSelector((state: any) => state.Cart);

  const [cartNumber, setCartNumber] = useState(cart.totalProduct);

  useEffect(() => {
    setCartNumber(cart.totalProduct);
  }, [])

  const handleCart = () => {
    navigate('/cart')
  };

  return (
    <Button 
      variant="outlined"
      startIcon={<ShoppingCartRoundedIcon />}
      className={classes.navButtons}
      onClick={handleCart}
    >
      {cartNumber > 0 && cartNumber}{" "}Cart
    </Button>
  );
}




