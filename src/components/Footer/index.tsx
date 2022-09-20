import React, { FC, ReactElement } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";

export const Footer: FC = (): ReactElement => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        backgroundColor: "grey.200",
        paddingTop: "1rem",
      }}
    >
      <Container maxWidth="lg">
        <Grid container direction="column" alignItems="center">
          <Grid item xs={12}>
            <Typography color="text.primary" variant="h5">
              Book Store App
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography color="text.secondary" variant="subtitle1">
              {`${new Date().getFullYear()} || Tatvasoft`}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;