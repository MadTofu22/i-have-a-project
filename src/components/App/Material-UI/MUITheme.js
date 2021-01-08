import { createMuiTheme } from '@material-ui/core/styles';

// const useStyles = makeStyles(theme => ({
//     topTitleText: {
//         fontSize: "2.25rem",
//         fontFamily: "Arial",
//         fontWeight: "500",
//         letterSpacing: "0.0075em",
//         // color: theme.palette.secondary.main
//     }
// }));

export const theme = createMuiTheme({
    palette: {
        primary: {
          main: '#ffcc80',
        },
        secondary: {
          main: '#e57373',
        },
      },
    typography: {
        fontFamily: '"Helvetica Neue"',
        size: 100
    }
    
});
