/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import {
	Box,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	Toolbar,
	Typography,
	Paper,
	Button,
	TextField,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

import {TypedDispatch} from '../redux/store/store';
import { fetchBook } from '../redux/action/book';
import { GET_BOOK_LIST_ERROR } from '../utils/constant';

const useStyles = makeStyles((theme: any) => ({
	inputStyle: {
    width: '350px',
		marginRight: '20px',
		
  },
	buttonStyle: {
    height: '40px',
    backgroundColor : '#f14d54',
		boxShadow: 'none'
  },
	updateStyle: {
    height: '30px',
		boxShadow: 'none',
    marginRight: '5px',
    borderColor: '#80BF32',
    color: '#80BF32',
  },
	deleteStyle: {
    marginLeft: '5px',
    height: '30px',
    borderColor: '#f14d54',
    color: '#f14d54',
		boxShadow: 'none'
  },
}));

interface Data {
  id: string;
  name: string;
  // description: string;
  price: number
	priceSale?: number | null,
  action: () => void
}

interface HeadCell {
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'id',
    numeric: false,
    label: 'ID',
  },
  {
    id: 'name',
    numeric: false,
    label: 'Name',
  },
  // {
  //   id: 'description',
  //   numeric: false,
  //   label: 'Description',
  // },
  {
    id: 'price',
    numeric: true,
    label: 'Price',
  },
  {
    id: 'priceSale',
    numeric: true,
    label: 'Sale Price',
  },
  {
    id: 'action',
    numeric: false,
    label: 'Action',
  },
];

function EnhancedTableHead() {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            sortDirection={false}
          >
            {headCell.label} 
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const EnhancedTableToolbar = () => {
	const classes = useStyles();
  const navigate = useNavigate();
  const handleAddEditProduct = () => {
    navigate(`/add-product`, { state: {type: "add-product"} });
  }

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
				display: 'flex',
				justifyContent: 'end'
      }}
		>
      <Box sx={{
				
			}}>
				<TextField type='text' size="small" variant="outlined" placeholder='Search..' className={classes.inputStyle}/>
				<Button 
          variant="contained"
          onClick={handleAddEditProduct}
          className={classes.buttonStyle}
        >
						Add Product
				</Button>
			</Box>
    </Toolbar>
  );
};

export default function EnhancedTable() {

  const dispatch = useDispatch<TypedDispatch>();
  const classes = useStyles();
  const navigation = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const bookList = useSelector((state: any) => state.Book);

  useEffect(() => {
    getBookList();
  }, [])

  const getBookList = async () => {
    const result: any = await dispatch(fetchBook());
    if (result.type === GET_BOOK_LIST_ERROR) {}
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAddEditProduct = (data: any) => {
    navigation(`/update-product`, { state: {type: "update-product", bookData: data} });
  }
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - bookList.bookList.length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
			<Typography variant="h3" sx={{ mb: 5, display: 'flex', justifyContent: 'center'}}>
				Product page
			</Typography>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar/>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={'medium'}
          >
            <EnhancedTableHead />
            <TableBody>
              {bookList.bookList.slice().sort()
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: any, index: number) => {
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow hover tabIndex={-1} key={row.name} >
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                      >
                        {row.id}
                      </TableCell>
                      <TableCell> {row.name} </TableCell>
                      <TableCell align="right">{row.price}</TableCell>
                      <TableCell align="right">{row.priceSale || '-'}</TableCell>
                      <TableCell align="left">
                        <Button 
                          variant="outlined"
                          name="edit-product"
                          className={classes.updateStyle}
                          onClick={() => handleAddEditProduct(row)}
                          >
                            Edit
                        </Button>
                        <Button variant="outlined" className={classes.deleteStyle}>
                            Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={bookList.bookList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
