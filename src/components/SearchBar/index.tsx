import React, {ReactElement, FC} from "react";

import {Box, Button} from "@mui/material";
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

import { makeStyles } from '@mui/styles';

const useStyles: any = makeStyles((theme: any) => ({
  appBarSpacer: theme.mixins.toolbar,
  textfield: {
		justifyContent: 'center',
		width: "500px",
	},
	btnSuccess: {
		maxWidth: '129px',
		height: '40px',
		fontWeight: 'body2',
		backgroundColor: '#80bf32',
		marginLeft: '20px',
		marginRight: '10px'
	},
	btnDanger: {
		maxWidth: '129px',
		height: '40px',
		fontWeight: 'body2',
		backgroundColor: '#f14d54',
		marginLeft: '10px',
		marginRight: '20px'
	},
	centersearch: {
		display: 'flex',
  	justifyContent: 'center',
  	alignItems: 'center',
	}
}));


const SearchBar: FC<any> = (): ReactElement => {
  const classes = useStyles();

	return (
		<>
			<Box sx={{
				flexGrow: 1,
				backgroundColor: 'grey.200',
				display: 'flex',
				justifyContent: 'center',
				height: '80px'
			}}>
				<div className={classes.centersearch}>
					<InputBase
						sx={{ 
							justifyContent: 'center',
							width: "425px",
							height: '40px',
							backgroundColor: 'grey.0',
							color: 'grey.700',
							pl: 2,
						}}
						placeholder="What are you looking for ..."
						inputProps={{ 'aria-label': 'What are you looking for ...' }}
						/>
					<Button variant="contained" className={classes.btnSuccess} startIcon={<SearchIcon />}>Search</Button>
					<Button variant="contained" className={classes.btnDanger} >Cancle</Button>
				</div>
			</Box>
		</>
	);
};

export default SearchBar;