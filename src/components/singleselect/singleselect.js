import React from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
  overrides: {
    MuiInput: {
      root: {
        width: "100%"
      }
    }
  }
});

const SingleSelect = React.forwardRef((props, ref) => {
  var labelId = props.id + "label";
  return (
    <ThemeProvider theme={theme}>
      <div style={{ paddingTop: "16px" }}>
        <InputLabel htmlFor={props.id + "label"}> {props.label}</InputLabel>
        <Select
          native
          labelId={props.id + "label"}
          id={props.id}
          value={props.defaultValue}
          onChange={props.handleChange}
          autoWidth
          inputProps={{
            name: "age",
            id: labelId
          }}
          ref={ref}
        >
          {props.values.map(values => (
            <option value={values.value} key={values.value}>
              {values.text}
            </option>
          ))}
        </Select>
      </div>
    </ThemeProvider>
  );
});

export default SingleSelect;
