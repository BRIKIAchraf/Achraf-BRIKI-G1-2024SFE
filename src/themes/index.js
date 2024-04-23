import { createTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

// project import
import value from '../assets/scss/_themes-vars.scss';

// Updated color definitions based on your request
const mainBackground = 'rgb(242, 247, 255)'; // F2F7FF
const secondaryBackground = 'rgb(232, 249, 253)'; // E8F9FD
const primaryColor = 'rgb(101, 183, 65)'; // 65B741
const blackColor = 'rgb(0, 0, 0)'; // 000000

// ==============================|| THEME ||============================== //

export function theme() {
  let textPrimary;
  let textSecondary;
  let textDark;
  let textHint;
  let background;
  let paper;
  let menuCaption;
  let textInversePrimary;

  textPrimary = textInversePrimary = menuCaption = blackColor; // Set text color to black
  textSecondary = value.textSecondary;
  textDark = blackColor; // Set dark text color to black
  textHint = value.textHint;

  background = mainBackground;
  paper = secondaryBackground;
  return createTheme({
    direction: 'ltr',
    palette: {
      mode: 'light',
      common: {
        black: blackColor
      },
      primary: {
        light: value.primaryLight,
        main: primaryColor,
        dark: value.primaryDark,
        100: value.primary100
      },
      secondary: {
        light: value.secondaryLight,
        main: value.secondary,
        dark: value.secondaryDark
      },
      error: {
        light: value.errorLight,
        main: value.error,
        dark: value.errorDark
      },
      warning: {
        light: value.warningLight,
        main: value.warning,
        dark: value.warningDark
      },
      info: {
        light: value.infoLight,
        main: value.info,
        dark: value.infoDark
      },
      success: {
        light: value.successLight,
        main: value.success,
        dark: value.successDark
      },
      grey: {
        300: value.grey300,
        400: value.grey400
      },
      bg: {
        100: value.bg100
      },
      textDark: {
        color: textDark
      },
      text: {
        primary: textPrimary,
        secondary: textSecondary,
        dark: textDark,
        hint: textHint
      },
      background: {
        paper: paper,
        default: background
      }
    },
    typography: {
      fontFamily: `'Poppins', sans-serif`,
      h6: {
        fontWeight: 600,
        color: textSecondary,
        fontSize: '0.875rem'
      },
      h5: {
        fontSize: '1.125rem',
        color: textSecondary,
        fontWeight: 600
      },
      h4: {
        fontSize: '1.25rem',
        color: textSecondary,
        fontWeight: 500
      },
      h3: {
        fontSize: '1.5rem',
        color: textDark,
        fontWeight: 600
      },
      h2: {
        fontSize: '2rem',
        color: textDark,
        fontWeight: 600
      },
      h1: {
        fontSize: '2.2rem',
        color: textDark,
        fontWeight: 600
      },
      subtitle1: {
        fontSize: '0.875rem',
        fontWeight: 500,
        color: textSecondary,
        lineHeight: '1.643em'
      },
      subtitle2: {
        fontSize: '0.8125rem',
        fontWeight: 400
      },
      caption: {
        fontSize: '0.68rem',
        color: textHint,
        fontWeight: 500
      },
      body1: {
        fontSize: '0.875rem',
        fontWeight: 400,
        lineHeight: '1.643em'
      },
      body2: {
        letterSpacing: '0em',
        fontWeight: 400,
        lineHeight: '1.643em'
      },
      menuCaption: {
        fontSize: '0.6875rem',
        fontWeight: 600,
        color: menuCaption,
        padding: '5px 15px 5px',
        textTransform: 'uppercase',
        marginTop: '10px'
      },
      subMenuCaption: {
        fontSize: '0.6875rem',
        fontWeight: 400,
        color: menuCaption,
        textTransform: 'capitalize'
      },
      subHeading: {
        color: 'red'
      },
      cardTitle: {
        color: primaryColor,
        fontSize: '1rem'
      },
      breadcrumbTitle: {
        fontWeight: 500,
        fontSize: '1.5rem',
        color: textDark
      }
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            margin: '8px',
          }
        }
      },
      MuiPaper: {
        styleOverrides: {
          elevation1: {
            boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)'
          },
          rounded: {
            borderRadius: '12px'
          }
        }
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: primaryColor,
            color: 'white'
          }
        }
      },
      MuiToolbar: {
        styleOverrides: {
          root: {
            minHeight: '64px',
            padding: '0 24px',
            backgroundColor: 'rgba(255, 255, 255, 0.72)',
            backdropFilter: 'blur(10px)'
          }
        }
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: value.secondary,
            color: 'white'
          }
        }
      }
    }
  });
}

export default theme;
