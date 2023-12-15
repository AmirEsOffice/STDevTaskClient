import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  typography: {
    fontSize: 12,
    h1: {
      fontSize: 40,
      fontWeight: 900,
    },
    h2: {
      fontSize: 36,
      fontWeight: 800,
    },
    h3: {
      fontSize: 24,
      fontWeight: 800,
    },
    h4: {
      fontSize: 18,
      fontWeight: 700,
    },
    h5: {
      fontSize: 16,
      fontWeight: 700,
    },
    h6: {
      fontSize: 14,
      fontWeight: 700,
    },
  },
  palette: {
    mode: "light",
    background: {
      main: "#ffffff",
      default: "#F6F6F6",
      paper: "#ffffff",
    },
    primary: {
      100: "#d4edf8",
      200: "#a9dbf0",
      300: "#7ec8e9",
      400: "#53b6e1",
      500: "#28a4da",
      600: "#2083ae",
      700: "#186283",
      800: "#104257",
      900: "#08212c",
      main: "#28a4da",
      contrastText: "#fff",
    },
    secondary: {
      100: "#d2d2d2",
      200: "#a4a4a4",
      300: "#777777",
      400: "#494949",
      500: "#1c1c1c",
      600: "#161616",
      700: "#111111",
      800: "#0b0b0b",
      900: "#060606",
      main: "#060606",
      contrastText: "ccc",
    },

    text: {
      primary: "#1c1c1c",
      secondary: "#28a4da",
      disabled: "#ccc",
    },
    grey: {
      100: "#f5f5f5",
      200: "#ebebeb",
      300: "#e0e0e0",
      400: "#d6d6d6",
      500: "#cccccc",
      600: "#a3a3a3",
      700: "#7a7a7a",
      800: "#525252",
      900: "#292929",
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 15,
          
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
      },
    },
  },
});
