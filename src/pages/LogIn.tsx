/* eslint-disable react-hooks/exhaustive-deps */
import React, {ReactElement, FC, useEffect} from "react";
import { useNavigate } from "react-router-dom";

import { 
  Grid, 
  Box, 
  Paper,
  Typography,
  Divider,
  Button,
} from "@mui/material";
import { styled } from '@mui/material/styles';
import { makeStyles } from "@mui/styles";

import LoginForm from '../components/Login/LoginForm';
import { getToken } from "../utils/common";

const Item = styled(Paper)(({ theme }: any) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#FFF',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

const useStyle = makeStyles(() => ({
  orderlistStyle: {
    listStylePosition: 'inside',
    margin: 0,
    paddingLeft: 0,
  },
  listStyle: {
    lineHeight: 22 / 14,
    fontSize: '14px',
  },
  buttonSpace: {
    marginTop: '20px'
  },
  buttonStyle: {
    height: '45px',
    backgroundColor : '#f14d54',
    marginLeft: '10px'
  }
}));

const Login: FC<any> = (): ReactElement => {

  const classes = useStyle();
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();

    if(token) {
      navigate('/');
    }
  }, []);
  
  const handleregister = () => {
    navigate('/register', { replace: true });
  };

    return (
      <>
        <Typography variant="h3" sx={{ mb: '40px', display: 'flex', justifyContent: 'center'}}>
          Login or Create an Account
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Item>
                <Typography variant="h6" sx={{mb: 2}}>
                  New Customer
                </Typography>
                <Divider />
                <Typography variant="body2" sx={{mt: 2, mb: 2}}>
                  Registration is free and easy.
                </Typography>
                <ul className={classes.orderlistStyle}>
                  <li className={classes.listStyle}>Faster checkout</li>
                  <li className={classes.listStyle}>Save muffle shipping addresses</li>
                  <li className={classes.listStyle}>View and track orders and more</li>
                </ul>
              </Item>
              <div className={classes.buttonSpace}>
                <Button variant="contained" className={classes.buttonStyle} onClick={handleregister}>
                  Create an Account
                </Button>
              </div>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <LoginForm />
              </Item>
            </Grid>
          </Grid>
        </Box>
      </>
    );
};

export default Login;