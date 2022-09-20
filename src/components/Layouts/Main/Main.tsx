import React from "react";
import {Box, Container} from '@mui/material';
import { makeStyles } from '@mui/styles';

import Navbar from "../../Navigation/Navbar";
import Searchbar from "../../SearchBar";
import Footer from "../../Footer";

const useStyles: any = makeStyles((theme: any) => ({
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '70vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  }
}));

const MainLayout = ({children}: any)  => {

  const classes = useStyles();
	return (
		<>
      <Box sx={{
        width: "100%",
        height: "5px",
        backgroundColor: 'error.main',
      }} />
			<Navbar />
      <Searchbar />
			<main className={classes.content}>
        {/* <div className={classes.appBarSpacer} /> */}
        <Container maxWidth="lg" className={classes.container}>
          {children}
        </Container>
      </main>
      <Footer />
		</>
	);
};

export default MainLayout;