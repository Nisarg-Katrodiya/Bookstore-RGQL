import React, {ReactElement, FC} from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

import { 
  Grid, 
  Box, 
  Paper,
  Typography,
  Divider,
  InputLabel, TextField,
  Button,
} from "@mui/material";
import { styled } from '@mui/material/styles';
import { makeStyles } from "@mui/styles";

import {createUser} from '../redux/action/user';
import {TypedDispatch} from '../redux/store/store';
import { CREATE_USER_ERROR } from '../utils/constant';

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
  textInputEmail: {
    marginBottom: '20px'
  },
  textInputPassword: {
    marginTop: '20px'
  },
  inputLabel: {
    marginBottom: '10px',
    fontSize: '14px',
  },
  buttonSpace: {
    marginTop: '20px'
  },
  buttonStyle: {
    height: '45px',
    backgroundColor : '#f14d54',
  },
  color: {
    color : '#FFF',
    textDecoration: 'none',
  }
}));

type userDataType = {
  firstname: string,
  lastname: string,
  email: string,
  password: string,
  password_c?: string,
}

const validate = (values: userDataType) => {
  let errors: userDataType = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    password_c: '',
  };

  if(!values.firstname) {
    errors.firstname = 'Required';
  } else if (values.firstname.length < 0) {
    errors.firstname = 'Firstname can not be null';
  }
  if(!values.lastname) {
    errors.lastname = 'Required';
  } else if (values.lastname.length < 0) {
    errors.lastname = 'Lastname can not be null';
  }
  if(!values.email) {
    errors.email = 'Required';
  } else if ((!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email))) {
    errors.email = 'Invalid email format';
  }
  if(!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 8 && values.password.length > 16) {
    errors.password = 'Must be atleast more then 8 characters or less then 16 characters';
  }
  if(!values.password_c) {
    errors.password_c = 'Required';
  } else if (values.password_c !== values.password) {
    errors.password_c = 'Conform password is note same as password';
  }

  return errors;
}

const Login: FC<any> = (): ReactElement => {

  const dispatch = useDispatch<TypedDispatch>();
  const classes = useStyle();
  const navigate = useNavigate();

  const initialValues: userDataType = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    password_c: '',
  }

  const handleRegister = async (values: userDataType) => {
    delete values?.password_c;
    const result: any = await dispatch(createUser(values));
    if (result.type === CREATE_USER_ERROR) {}
    navigate('/');
  }

  const formik = useFormik({
    initialValues,
    validate,
    onSubmit: async values => handleRegister(values),    
  });

  return (
    <>
      <Typography variant="h3" sx={{ mb: '40px', display: 'flex', justifyContent: 'center'}}>
        Create an Account
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Item>
              <Typography variant="h6" sx={{mb: 2}}>
                Personal Information
              </Typography>
              <Divider />
              <Typography variant="body2" sx={{mt: 2, mb: 2}}>
                please enter the following information to create your account.
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6} >
                  <InputLabel className={classes.inputLabel}>
                    First Name
                  </InputLabel>
                  <TextField 
                    type='text' 
                    size="small"
                    name="firstname"
                    fullWidth
                    value={formik.values.firstname}
                    onChange={formik.handleChange}
                    variant="outlined" />
                </Grid>
                <Grid item xs={6} >
                  <InputLabel className={classes.inputLabel}>
                    Last Name
                  </InputLabel>
                  <TextField
                    type='text'
                    size="small"
                    name="lastname"
                    fullWidth
                    value={formik.values.lastname}
                    onChange={formik.handleChange}
                    variant="outlined" />
                </Grid>
                <Grid item xs={12} >
                  <InputLabel className={classes.inputLabel}>
                    Email Address*
                  </InputLabel>
                  <TextField
                    type='email'
                    size="small"
                    name="email"
                    fullWidth
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    variant="outlined" />
                </Grid>
              </Grid>
            </Item>
          </Grid>
          <Grid item xs={12}>
            <Item>
              <Typography variant="h6" sx={{mb: 2}}>
                Personal Information
              </Typography>
              <Divider />
              <Grid container spacing={2}>
                <form onSubmit={formik.handleSubmit}>
                  <Grid item xs={6} sx={{mt: 2, mb: 2}}>
                    <InputLabel className={classes.inputLabel}>
                      Password*
                    </InputLabel>
                    <TextField 
                      type='password' 
                      size="small" 
                      name="password"
                      variant="outlined" 
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      fullWidth />
                  </Grid>
                  <Grid item xs={6} sx={{mt: 2, mb: 2}}>
                    <InputLabel className={classes.inputLabel}>
                      Confirm Password*
                    </InputLabel>
                    <TextField 
                      type='password'
                      size="small" 
                      name="password_c"
                      variant="outlined"
                      value={formik.values.password_c}
                      onChange={formik.handleChange}
                      fullWidth />
                  </Grid>
                  <Grid item xs={12}>
                    <Button variant="contained" type='submit' className={classes.buttonStyle}>
                        Register
                    </Button>
                  </Grid>
                </form>
              </Grid>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Login;