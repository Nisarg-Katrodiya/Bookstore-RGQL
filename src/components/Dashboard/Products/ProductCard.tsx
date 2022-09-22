import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Box, Card, Link, Typography, Stack, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

import { fCurrency } from '../../../utils/formatNumber';
// import {IMG_URL} from '../../../utils/common';

import {TypedDispatch} from '../../../redux/store/store';
import { addToCart } from '../../../redux/action/cart';
import { ADD_CART_ERROR } from '../../../utils/constant';

const useStyles = makeStyles((theme: any) => ({
  addToCard: {
    backgroundColor: '#f14d54',
  }
}))

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

ShopProductCard.propTypes = {
  product: PropTypes.object
};

export default function ShopProductCard({ product }: any) {

  const dispatch = useDispatch<TypedDispatch>();
  const classes = useStyles();
  const { id, name, description, image, price, priceSale } = product;
  
  const handleAddtoCart = async() => {
    const cartData = {
      productId: id,
      quantity: 1
    }
    const result: any = await dispatch(addToCart(cartData));
    if (result.type === ADD_CART_ERROR) {}
  }

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {/* <ProductImgStyle alt={name} src={IMG_URL + image} /> */}
        <ProductImgStyle alt={name} src={image} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link to="#" color="inherit" underline="hover" component={RouterLink}>
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Link>
        <Typography variant='caption'>
          {description}
        </Typography>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle1">
            {"MRP"}
            { priceSale && (
              <>
                &nbsp;
                <Typography
                  component="span"
                  variant="body1"
                  sx={{
                    color: 'text.disabled',
                    textDecoration: 'line-through'
                  }}
                >
                  {fCurrency(priceSale)}
                </Typography>
              </>
            )}
            &nbsp;
            {fCurrency(price)}
          </Typography>
        </Stack>
        <Button className={classes.addToCard} variant='contained' onClick={handleAddtoCart} >
          Add to Cart
        </Button>
      </Stack>
    </Card>
  );
}
