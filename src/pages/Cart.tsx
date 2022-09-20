/* eslint-disable react-hooks/exhaustive-deps */
import React, {ReactElement, FC, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
	Typography, 
	Container,
	Box,
	Button,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import CartList from '../components/Dashboard/Cart/CartList';
import {TypedDispatch} from '../redux/store/store';
import { fetchCart, clearCart } from '../redux/action/cart';

const useStyles = makeStyles(() => ({
	cardList: {
		display: 'flex', 
		justifyContent: 'center',
	},
	buttonList: {
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	card: {
		border: '1px solid #000', 
		boxShadow: 'none',
		borderRadius: 8,
		width: '60%',
	},
	productCountButton: {
		backgroundColor: '#F14D54',
		borderRadius: 0,
		color: '#FFF',
		padding: 0,
	},
	countButton: {
		border: '1px solid #000',	
		borderRadius: 0,
		paddingTop: 0,
		paddingBottom: 0,
	},
	buttonStyle: {
		color: '#F14D54',
	},
	checkOut: {
		display: 'flex',
		marginTop: 20,
		justifyContent: 'center',
	},
	buttonComp: {
		width: '60%',
	},
	addToCard: {
		color: '#FFF',
    backgroundColor: '#f14d54',
  }
}))

const Product: FC<any> = (): ReactElement => {

	const dispatch = useDispatch<TypedDispatch>();
	const navigate = useNavigate();
	const classes = useStyles();
	const {cart} = useSelector((state: any) => state.Cart);

	useEffect(() => {
		getCart();
	}, [])

	const getCart = async () => {
    await dispatch(fetchCart());
  }
	
	const handleAddToCart = () => {
		navigate('/');
	}
	
	const handleCheckOut = async() => {
		alert('You checkout');
		await dispatch(clearCart());
		navigate('/');
	}

	return (
		<Container>
			<Typography variant="h3" sx={{ mb: 5, display: 'flex', justifyContent: 'center'}}>
				Cart Page
			</Typography>
			<CartList cart={cart.items} getCartList={getCart}/>
			<Box className={classes.checkOut}>
				<div className={classes.buttonComp}>
					{ cart.items && cart.items.length > 0 ? (
						<Button variant="contained" className={classes.addToCard} onClick={handleCheckOut}>
							Place order
						</Button>
					) : (
						<Button variant="contained" className={classes.addToCard} onClick={handleAddToCart}>
							Add to cart
						</Button>
					)}
				</div>
			</Box>
		</Container>
	);
};

export default Product;