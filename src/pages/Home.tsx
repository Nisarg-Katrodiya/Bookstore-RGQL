/* eslint-disable react-hooks/exhaustive-deps */
import React, {ReactElement, FC, useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';

import {Typography, Stack, Container} from "@mui/material";

import {
  ProductList,
	ProductSort
} from '../components/Dashboard/Products';

import {TypedDispatch} from '../redux/store/store';
import { fetchBook } from '../redux/action/book';
import { fetchCart } from '../redux/action/cart';
import { GET_BOOK_LIST_ERROR } from '../utils/constant';

const Home: FC<any> = (): ReactElement => {

  const dispatch = useDispatch<TypedDispatch>();

  const book = useSelector((state: any) => state.Book);

  useEffect(() => {
    getBookList();
    getCart()
  }, [])

  const getBookList = async () => {
    const result: any = await dispatch(fetchBook());
    if (result.type === GET_BOOK_LIST_ERROR) {}
  }
  const getCart = async () => {
    await dispatch(fetchCart());
  }

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

        <ProductList products={book.bookList} />
      </Container>
		</>
	);
};

export default Home;