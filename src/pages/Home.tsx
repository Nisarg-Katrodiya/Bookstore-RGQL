/* eslint-disable react-hooks/exhaustive-deps */
import React, {ReactElement, FC, useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useQuery, gql } from "@apollo/client";

import {Typography, Stack, Container} from "@mui/material";

import {
  ProductList,
	ProductSort
} from '../components/Dashboard/Products';

import {TypedDispatch} from '../redux/store/store';
// import { fetchCart } from '../redux/action/cart';
import { fetchBook } from '../redux/action/book';
import Loader from '../components/Loader';

const BOOKS_QUERY = gql`
  query getBooks {
    books {
      id
      image
      name
      description
      price
    }
  }
`;


const Home: FC<any> = (): ReactElement => {

  const dispatch = useDispatch<TypedDispatch>();
  const { data, loading, error } = useQuery(BOOKS_QUERY);
  if (error) console.log("🚀 ~ file: Home.tsx ~ line 32 ~ error", error);

  const {bookList} = useSelector((state: any) => state.Book);

  useEffect(() => {
    getBookList();
    // getCart();
  }, [])

  const getBookList = async () => {
    if (data && data.books) {
      dispatch(fetchBook(data.books));
    }
  }

  // const getCart = async () => {
  //   await dispatch(fetchCart());
  // }

	return (
		<>
      <Container>
        <Typography variant="h3" sx={{ mb: 5, display: 'flex', justifyContent: 'center'}}>
          Product Listing
        </Typography>

        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ mb: 5 }}
        >
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductSort />
          </Stack>
        </Stack>

        { !loading && <ProductList products={bookList} />}
      </Container>
      <Loader loading={loading}/>
		</>
	);
};

export default Home;