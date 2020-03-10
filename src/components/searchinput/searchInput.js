import React from "react";
import TextField from "@material-ui/core/TextField";
import { createMuiTheme, makeStyles } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";

const theme = createMuiTheme({
  overrides: {
    MuiOutlinedInput: {
      root: {
        width: "60%",
        margin: "auto"
      },
      input: {
        padding: 10
      },
      notchedOutline: {
        borderRadius: 20
      }
    },
    MuiTextField: {
      root: {
        marginTop: 10
      }
    }
  }
});

const useStyle = makeStyles(theme => ({
  input: {
    "&::placeholder": {
      textOverflow: "ellipsis !important",
      fontSize: "15px"
    },
    paddingLeft: "4px",
    paddingRight: "4px"
  }
}));

const SearchInput = props => {
  const style = useStyle();
  return (
    <ThemeProvider theme={theme}>
      <TextField
        placeholder={props.placeholder}
        variant="outlined"
        fullWidth
        onChange={props.onChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="start">
              <CloseIcon />
            </InputAdornment>
          ),
          classes: { input: style.input }
        }}
      />
    </ThemeProvider>
  );
};

export default SearchInput;
