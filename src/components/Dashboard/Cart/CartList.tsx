// import { Grid } from '@mui/material';
import React from 'react';

import {
	Typography,
	Card,
  Grid,
} from "@mui/material";
import {makeStyles} from '@mui/styles';

import CartCard from './CartCard';

const useStyles = makeStyles(() => ({
  cardList: {
		display: 'flex', 
		justifyContent: 'center',
    width: '100%'
	},
  card: {
		border: '1px solid #000', 
		boxShadow: 'none',
		borderRadius: 8,
		width: '60%',
		justifyContent: 'center',
	},
  nullText: {
    color: '#919EAB',
  }
}));

const NullCard = () => {
  const classes = useStyles()
  return (
    <div className={classes.cardList}>
      <Card sx={{ display: 'flex', p: 2}} className={classes.card} >
        <Typography component="div" variant="h5" className={classes.nullText}>
          No product at cart
        </Typography>
      </Card>
    </div>
  )
}

export default function CartList({ cart, getCartList, ...other }: any) {
  
  return (
    <Grid container spacing={3} {...other}>
      {cart && cart.length > 0 ? cart.map((product: any) => {
        return (
          <Grid key={product.id} item xs={12}>
            <CartCard product={product} getCart={getCartList}/>
          </Grid>
        )}
      ) : (
        <Grid item xs={12} >
          <NullCard />
        </Grid>
      )}
    </Grid>
  );
}
