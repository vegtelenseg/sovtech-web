import { ThemeOptions, createMuiTheme } from "@material-ui/core";

export const theme: ThemeOptions = createMuiTheme({
  overrides: {},
  palette: {},
  typography: {
    allVariants: {
      color: "#fff",
      fontFamily: "starwars",
    },

    body1: {
      color: "#a53535",
    },
    h2: {
      fontSize: "1.5rem",
    },
    h4: {
      fontSize: "1.2rem",
    },
    h6: {
      fontSize: "1rem",
    },
  },
  props: {
    MuiTypography: {},
    MuiListItemText: {
      primary: "red",
    },
    MuiAppBar: {
      color: "primary",
    },
    MuiGrid: {},
  },
});
