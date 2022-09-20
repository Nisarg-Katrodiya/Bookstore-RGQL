import React, {ReactElement, FC, useState} from "react";
import { useDispatch } from 'react-redux';

import { makeStyles } from "@mui/styles";
import {
	Typography,
	Box,
	Card,
	CardContent,
	CardMedia,
	IconButton,
	Button,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import { IMG_URL } from "../../../utils/common";

import {TypedDispatch} from '../../../redux/store/store';
import { addToCart } from '../../../redux/action/cart';
import { ADD_CART_ERROR } from '../../../utils/constant';


const useStyles = makeStyles(() => ({
	cardList: {
		display: 'flex', 
		justifyContent: 'center',
	},
	buttonList: {
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 20
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
		'&:hover': {
			backgroundColor: '#F14D54'
	 },
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

const CartCard: FC<any> = ({product, getCart}: any): ReactElement => {
	let {id, productId, price, quantity} = product;
	
  const dispatch = useDispatch<TypedDispatch>();
	const classes = useStyles();

	const [counter, setCounter] = useState<number>(quantity);

	const handleCounterAdd = () => {
		let count = counter + 1;
		setCounter(count);
		updateCart(productId.id, count);
	}
	
	const handleCounterRemove = () => {
		let count = counter - 1;
		setCounter(count);
		updateCart(productId.id, count);
	}

	const updateCart = async(productId: string, quantity: number) => {
		const cartData = {
      productId,
      quantity
    }
    const result: any = await dispatch(addToCart(cartData));
    if (result.type !== ADD_CART_ERROR) {
			getCart();
		}
	}
	
	return (
		<div className={classes.cardList}>
			<Card sx={{ display: 'flex', p: 2}} key={id.toString()} className={classes.card}>
				<CardMedia
					component="img"
					sx={{ width: 200 }}
					image={IMG_URL + productId.image}
					alt="Live from space album cover"
				/>
				<Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
					<CardContent>
						<Box className={classes.buttonList}>
							<Typography component="div" variant="h5">
								{productId.name}
							</Typography>
							<Typography component="div" variant="h5">
								{price}$
							</Typography>
						</Box>
						<Typography variant="subtitle1" color="text.secondary" component="div">
							{productId.category || '-'}
						</Typography>
					</CardContent>
					<Box className={classes.buttonList}>
						<Box sx={{ display: 'flex', alignItems: 'center', pl: 3, pb: 1 }}>
							<IconButton className={classes.productCountButton} onClick={handleCounterRemove}>
								<RemoveIcon />
							</IconButton>
							<IconButton className={classes.countButton} sx={{ml: 2, mr: 2}} >
								<Typography variant="body1" >
									{counter}
								</Typography>
							</IconButton>
							<IconButton className={classes.productCountButton} onClick={handleCounterAdd} >
								<AddIcon />
							</IconButton>
						</Box>
						<Box>
							<Button variant="text" className={classes.buttonStyle} >
								Remove
							</Button>
						</Box>
					</Box>
				</Box>
			</Card>
		</div>
	);
};

export default CartCard;