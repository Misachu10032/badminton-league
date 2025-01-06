import React from 'react';
import TextField from '@mui/material/TextField';

const ScoreInput = ({ value, onChange, className }) => {
  return (
    <TextField
      type="number"
      className={` ${className}`} // Allow customization via the className prop
      placeholder="0"
      value={value}
      onChange={onChange}
      InputProps={{
        inputProps: {
          style: { textAlign: "center" }, // Center-align text
        },
        sx: {
          '& input[type=number]': {
            MozAppearance: 'textfield', // Remove arrows in Firefox
          },
          '& input[type=number]::-webkit-inner-spin-button, & input[type=number]::-webkit-outer-spin-button': {
            WebkitAppearance: 'none', // Remove arrows in WebKit browsers
            margin: 0,
          },
        },
      }}
    />
  );
};

export default ScoreInput;
