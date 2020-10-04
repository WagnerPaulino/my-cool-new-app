import { createMuiTheme, makeStyles } from "@material-ui/core";
import { deepPurple } from "@material-ui/core/colors";

export const mainTheme = createMuiTheme({
    palette: {
        primary: deepPurple,
        secondary: {
            main: '#8c9eff',
        },
    },
})

export const appbarStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1,
    },
}));