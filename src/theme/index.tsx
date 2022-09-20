import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
// material
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme, StyledEngineProvider } from '@mui/material/styles';
//
import shape from './shape';
import palette from './palette';
import typography from './typography';
// import GlobalStyles from './globalStyles';
import componentsOverride from './overrides';
import shadows, { customShadows } from './shadows';

// ----------------------------------------------------------------------

ThemeConfig.propTypes = {
  children: PropTypes.node
};

export default function ThemeConfig({ children }: any) {
  const themeOptions: any = useMemo(
    () => ({
      palette,
      shape,
      typography,
      shadows,
      customShadows,
      // GlobalStyles
    }),
    []
  );

  const theme = createTheme(themeOptions);
  theme.components = componentsOverride(theme);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* <GlobalStyles /> */}
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
