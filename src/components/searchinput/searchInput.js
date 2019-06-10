import React from 'react';
import TextField from '@material-ui/core/TextField';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

const theme = createMuiTheme({
    overrides: {
        MuiOutlinedInput: {
            root: {
                width: '60%',
                margin: 'auto'
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

const SearchInput = (props) => {
    return (
        <ThemeProvider theme={theme}>
            <TextField placeholder={props.placeholder} variant='outlined' fullWidth 
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}/>
        </ThemeProvider>
    );
};

export default SearchInput;