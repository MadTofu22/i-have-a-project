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
          main: '#458cf7',
        },
        secondary: {
          main: '#7ddbf0',
        },
      },
    typography: {
        fontFamily: '"Helvetica Neue"',
        size: 100
    }
    
});
