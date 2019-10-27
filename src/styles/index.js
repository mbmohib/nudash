import React, { Fragment } from 'react';
import { ThemeProvider } from 'styled-components';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { StylesProvider } from '@material-ui/styles';
import BaseStyle from './baseStyle';
import theme from './theme';

const Theme = ({ children }) => {
  const MuiTheme = createMuiTheme(theme);

  return (
    <StylesProvider injectFirst>
      <MuiThemeProvider theme={MuiTheme}>
        <ThemeProvider theme={theme}>
          <Fragment>
            <CssBaseline />
            <BaseStyle />
            {children}
          </Fragment>
        </ThemeProvider>
      </MuiThemeProvider>
    </StylesProvider>
  );
};

export default Theme;
