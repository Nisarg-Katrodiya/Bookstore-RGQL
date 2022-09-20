/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { IconButton } from '@mui/material';
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';
import { makeStyles } from "@mui/styles";

import { removeUserSession } from '../../utils/common';
import {TypedDispatch} from '../../redux/store/store';
import { clearUser } from '../../redux/action/user';

const useStyles = makeStyles((theme: any) => ({
  navButtons: {
    color: '#F14D54',
    marginLeft: '10px',
    borderColor: "#F14D54"
  }
}));

const LogoutButton = () => {
  
  const dispatch = useDispatch<TypedDispatch>();
  const classes = useStyles();
  const navigate = useNavigate();
  
  const handleCart = async () => {
    removeUserSession();
    await dispatch(clearUser());
    navigate('/login')
  };

  return (
    <IconButton 
      className={classes.navButtons}
      onClick={handleCart}
    >
      <PowerSettingsNewOutlinedIcon />
    </IconButton>
  );
}

export default LogoutButton;



