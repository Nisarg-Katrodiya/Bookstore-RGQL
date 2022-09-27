import React, {ReactElement, FC, useEffect, useState, useCallback} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';

import { useMutation, gql } from "@apollo/client";
import { generateGUID } from '../utils/formatNumber';

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
// import { createBook, updateBook } from '../redux/action/book';
// import { ADD_BOOK_ERROR, UPDATE_BOOK_ERROR } from '../utils/constant';


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

const ADDPRODUCT_QUERY = gql`
mutation addBook($image: String!, $name: String!, $category: String!, $price: Int!, $user: ID!) {
  addBook(image: $image, name: $name, category: $category, price: $price, user: $user) {
    id
    image
    name
    category
    description
    price
  }
}
`;

type formDataType = {
  id?: string,
  name: string,
  price: number,
  category: string | null,
  description: string,
  image?: any
  user?: string
}

const ProductPage: FC<any> = (): ReactElement => {

  const dispatch = useDispatch<TypedDispatch>();
  const [addBook, { data, loading, error }] = useMutation(ADDPRODUCT_QUERY);
  if (error) console.log("🚀 ~ file: ProductPage.tsx ~ line 112 ~ error", error);
  const classes = useStyle();
  const navigate = useNavigate();
  const {state}: any = useLocation();

  const [pageName, setPageName] = useState('Add');
	const [selectedFile, setSelectedFile] = useState(null);

  const [formData, setFormData] = useState<formDataType>({
    image: '',
    name: '',
    category: '',
    description: '',
    price: 0,
    user: ''
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
        image: bookData['image']
      })
    }
  }, [state]);

  const handleSave = async() => {
    if (state?.type !== 'update-product') {
      console.log("🚀 ~ file: ProductPage.tsx ~ line 155 ~ handleSave ~ formData", formData)
      // const result: any = await dispatch(createBook(bookData));
      // if (result.type === ADD_BOOK_ERROR) {}
      addBook({
        variables: formData
      })

      // setFormData({
      //   ...formData,
      //   name: '',
      //   price: 0,
      //   category: '',
      //   description: '',
      //   image: ''
      // });
    } 
    // else {
      // bookData.append('id', state?.bookData?.id)
      // const result: any = await dispatch(updateBook(bookData));
      // if (result.type === UPDATE_BOOK_ERROR) {
      //   setFormData({
      //     ...formData,
      //     name: '',
      //     price: 0,
      //     category: '',
      //     description: '',
      //     image: ''
      //   });
      // }
    // }
  }

  if (data && data.book) {
    console.log("🚀 ~ file: ProductPage.tsx ~ line 112 ~ data", data);
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

  function readFileAsync(data: any) {
    return new Promise((resolve, reject) => {
      const file = data;
      if (!file) {
        return;
      }
      const reader: any = new FileReader();

      reader.onload = () => {
        resolve({
          id: generateGUID(),
          url: `data:${file.type};base64,${btoa(reader.result)}`,
          type: 'image'
        });
      };

      reader.onerror = reject;
      reader.readAsBinaryString(file);
      console.log("🚀 ~ file: ProductPage.tsx ~ line 217 ~ returnnewPromise ~ reader", reader)
    })
  }

  const uploadSingleFile = async (e: any)  =>{
    // setFormData({
    //   ...formData,
    //   image: e.target.files[0],
    // });

    setSelectedFile(e.target.files[0]);
    const newImage: any = await readFileAsync(e.target.files[0]);
    console.log("🚀 ~ file: ProductPage.tsx ~ line 228 ~ uploadSingleFile ~ newImage", newImage)
    setFormData({...formData, image: newImage.url});
  }

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