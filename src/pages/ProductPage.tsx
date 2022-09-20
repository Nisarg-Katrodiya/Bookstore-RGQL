import React, {ReactElement, FC, useEffect, useState, useCallback} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';

import { 
  Grid, 
  Box, 
  Paper,
  Typography,
  InputLabel, TextField,
  Button,
  Autocomplete
} from "@mui/material";
import { styled } from '@mui/material/styles';
import { makeStyles } from "@mui/styles";

import {TypedDispatch} from '../redux/store/store';
import { addBook, updateBook } from '../redux/action/book';
import { ADD_BOOK_ERROR, UPDATE_BOOK_ERROR } from '../utils/constant';


const Item = styled(Paper)(({ theme }: any) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#FFF',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

const top100Films = [
  'The Shawshank Redemption',
  'The Godfather',
  'The Godfather: Part II',
  'The Dark Knight',
  '12 Angry Men',
  "Schindler's List",
  'Pulp Fiction',
];

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
  saveButtonStyle: {
    width: '100px',
    height: '45px',
    backgroundColor : '#6FB637',
    marginRight: '10px'
  },
  buttonStyle: {
    width: '100px',
    height: '45px',
    backgroundColor : '#f14d54',
    marginLeft: '10px'
  },
  color: {
    color : '#FFF',
    textDecoration: 'none',
  },
  pickFile: {
    color : '#f14d54',
  }
}));

type formDataType = {
  id?: string,
  name: string,
  price: number,
  category: string | null,
  description: string,
  uploadFile?: any
}

const ProductPage: FC<any> = (): ReactElement => {

  const dispatch = useDispatch<TypedDispatch>();
  const classes = useStyle();
  const navigate = useNavigate();
  const {state}: any = useLocation();

  const [pageName, setPageName] = useState('Add');
  const [formData, setFormData] = useState<formDataType>({
    name: '',
    price: 0,
    category: '',
    description: '',
    uploadFile: ''
  });

  useEffect(() => {
    setPageName(state?.type === 'update-product' ? 'Edit' : 'Add');
    if(state?.bookData) {
      const bookData = state?.bookData;
      setFormData({
        id: bookData['id'],
        name: bookData['name'],
        price: bookData['price'],
        category: bookData['category'],
        description: bookData['description'],
        uploadFile: bookData['image']
      })
    }
  }, [state]);

  const handleSave = async() => {
    const bookData = new FormData();

    bookData.append('image', formData.uploadFile);
    bookData.append('name', formData.name);
    bookData.append('category', formData.category || '');
    bookData.append('description', formData.description);
    bookData.append('price', formData.price.toString());

    if (state?.type !== 'update-product') {
      const result: any = await dispatch(addBook(bookData));
      if (result.type === ADD_BOOK_ERROR) {}
      setFormData({
        ...formData,
        name: '',
        price: 0,
        category: '',
        description: '',
        uploadFile: ''
      });
    } else {
      bookData.append('id', state?.bookData?.id)
      const result: any = await dispatch(updateBook(bookData));
      if (result.type === UPDATE_BOOK_ERROR) {
        setFormData({
          ...formData,
          name: '',
          price: 0,
          category: '',
          description: '',
          uploadFile: ''
        });
      }
    }
    navigate('/products');
  }

  const handleCancle = () => {
    navigate('/products');
  }
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => 
    setFormData({ ...formData, [e.target.name]: e.target.value }),
    [formData]
  );

  const handleSeletctChange = useCallback((e: any, values: any) => {
    setFormData({...formData, category: values});
  }, [formData]);

  const uploadSingleFile = (e: any)  =>{
    setFormData({
      ...formData,
      uploadFile: e.target.files[0],
    });
  };

  return (
    <>
      <Typography variant="h3" sx={{ mb: '40px', display: 'flex', justifyContent: 'center'}}>
        {pageName} Product
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        <Item>
          <Grid container spacing={2}>
            <Grid item xs={6} >
              <InputLabel className={classes.inputLabel}>
                Name
              </InputLabel>
              <TextField 
                type='text'
                size="small"
                fullWidth
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                variant="outlined" />
            </Grid>
            <Grid item xs={6} >
              <InputLabel className={classes.inputLabel}>
                Price
              </InputLabel>
              <TextField
                type='number'
                size="small"
                fullWidth
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                variant="outlined" />
            </Grid>
            <Grid item xs={6} >
              <InputLabel className={classes.inputLabel}>
                Shop by Categories
              </InputLabel>
              <Autocomplete
                autoComplete
                size="small"
                fullWidth
                includeInputInList
                onChange={handleSeletctChange}
                options={top100Films}
                renderInput={(params) => <TextField value={formData.category} name="Categories" {...params} />}
              />
            </Grid>
            <Grid item xs={6} >
              <InputLabel className={classes.inputLabel}>
                Discription
              </InputLabel>
              <TextField
                type='text'
                size="small"
                fullWidth
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                variant="outlined" />
            </Grid>
            <Grid item xs={12} >
              <TextField
                type='file'
                size="small"
                fullWidth
                variant="outlined"
                onChange={uploadSingleFile}
                className={classes.pickFile} />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" className={classes.saveButtonStyle} onClick={handleSave}>
                Save
              </Button>
              <Button variant="contained" className={classes.buttonStyle} onClick={handleCancle}>
                Cancle
              </Button>
            </Grid>
          </Grid>
        </Item>
      </Box>
    </>
  );
};

export default ProductPage;