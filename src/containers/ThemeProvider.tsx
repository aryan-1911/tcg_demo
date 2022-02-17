import {
  ThemeProvider as MaterialThemeProvider
} from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';
import React from 'react';


// const theme = createMuiTheme({
//   typography: {
//     fontFamily: `'Kumbh Sans', 'Roboto', 'Helvetica Neue', Arial, sans-serif`
//   },
// });

const theme = createTheme({
  typography: {
    fontFamily: `'Kumbh Sans', 'Roboto', 'Helvetica Neue', Arial, sans-serif`
  },
});


export const ThemeProvider: React.FC = ({ children }) => {
  return (
    <MaterialThemeProvider theme={theme}>{children}</MaterialThemeProvider>
  );
};
