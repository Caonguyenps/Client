import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { InputAdornment } from "@material-ui/core";
const InputSelectAddressComponents = (props) => {
  return (
    <Autocomplete
      id="combo-box-demo"
      options={props.provice || props.districts || props.wards}
      getOptionLabel={(option) => option.name}
      style={{ width: "100%" }}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">{props.title}</InputAdornment>
            ),
          }}
        />
      )}
      onChange={(event, newValue) => {
        props.handleChange(newValue);
      }}
    />
  );
};

export default InputSelectAddressComponents;
