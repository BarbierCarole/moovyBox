import { createMuiTheme } from '@material-ui/core/styles';
import { green, grey, red } from '@material-ui/core/colors';

const rawTheme = createMuiTheme({
  palette: {
    primary: {
      //light: '#69696a', // #eb61c1
      light: '#eb61c1',
      // main: '#04309e', //dark blue
      main: '#ea2aad', // pink
      dark: '#8c0087',
    },
    secondary: {
      light: '#fff5f8',
      //main: '#2858d2', // light blue
      main: '#2858d2', //
      dark: '#04309e',
    },
    warning: {
      main: '#ffc071',
      dark: '#ffb25e',
    },
    error: {
      xLight: red[50],
      main: red[500],
      dark: red[700],
    },
    success: {
      xLight: green[50],
      main: green[500],
      dark: green[700],
    },
  },
  typography: {
    fontFamily: "'Spartan', sans-serif",
    fontSize: 14,
    fontWeightLight: 300, // Work Sans
    fontWeightRegular: 500, // Work Sans
    fontWeightMedium: 700, // Roboto Condensed
    fontFamilySecondary: "'Josefin Sans', sans-serif",
  },
  text: {
    primary: {
      light: '#fff5f8',
      main: '#2858d2', // dark blue
      dark: '#04309e', 
    },
    secondary: {
      light: '#fff5f8',
      main: '#fff', 
      dark: '#f0f',
    },
  },
});

const fontHeader = {
  color: rawTheme.text.primary.main,
  fontWeight: rawTheme.typography.fontWeightMedium,
  fontFamily: rawTheme.typography.fontFamilySecondary,
  textTransform: 'uppercase',
};

const theme = {
  ...rawTheme,
  palette: {
    ...rawTheme.palette,
    background: {
      ...rawTheme.palette.background,
      default: rawTheme.palette.common.white,
      placeholder: grey[200],
    },
  },
  typography: {
    ...rawTheme.typography,
    fontHeader,
    h1: {
      ...rawTheme.typography.h1,
      ...fontHeader,
      letterSpacing: 0,
      fontSize: 42,  
      color: rawTheme.text.primary.main,     
    },
    h2: {
      ...rawTheme.typography.h2,
      ...fontHeader,
      fontSize: 36,
      color: rawTheme.text.primary.main,       
    },
    h3: {
      ...rawTheme.typography.h3,
      ...fontHeader,
      fontSize: 24,  
      color: rawTheme.text.primary.main,     
    },
    h4: {
      ...rawTheme.typography.h4,
      ...fontHeader,
      fontSize: 18,
      color: rawTheme.text.primary.main, 
    },
    h5: {
      ...rawTheme.typography.h5,
      fontSize: 18,
      fontWeight: rawTheme.typography.fontWeightLight,
      fontFamily: rawTheme.typography.fontFamily,
      color: rawTheme.text.primary.main, 
    },
    h6: {
      ...rawTheme.typography.h6,
      ...fontHeader,
      fontSize: 20,
      color: rawTheme.text.secondary.main,
    },
    subtitle1: {
      ...rawTheme.typography.subtitle1,
      fontSize: 30,
      color: rawTheme.text.primary.main, 

    },
    body1: {
      ...rawTheme.typography.body2,
      fontWeight: rawTheme.typography.fontWeightRegular,
      fontSize: 16,
      
    },
    body2: {
      ...rawTheme.typography.body1,
      fontSize: 14,
      color: rawTheme.text.primary.main, 
    },
  },
  
};

export default theme;
