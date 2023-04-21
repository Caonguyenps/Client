import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import "./priceFilter.css";
import { Grid } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

function valuetext(value) {
  return `${value}°C`;
}

export default function PriceFilterComponent(props) {
  const classes = useStyles();
  const [valuePrice, setValuePrice] = React.useState([0, 0]);
  const [defaultValue, setDefaultVaue] = React.useState([0, 0]);

  const [price, setPrice] = useState({
    start: 0,
    end: 0,
  });
  const handleChange = (event, newValue) => {
    setValuePrice(newValue);
    setPrice({
      start: newValue[0],
      end: newValue[1],
    });
  };

  const handleChangePrice = (event) => {
    let arrValue = [];
    let { name, value } = event.target;
    if (value == "") {
      value = 0;
    }
    if (name == "start") {
      arrValue[0] = parseInt(value);
      arrValue[1] = valuePrice[1];
    } else {
      arrValue[1] = parseInt(value);
      arrValue[0] = valuePrice[0];
      value = value * 1000;
    }

    setPrice({ ...price, [name]: parseInt(value) });
    setValuePrice(arrValue);
  };

  const handleClickReset = () => {
    let arr = [0, 0];
    setValuePrice(arr);
  };

  const handleClickApply = () => {
    props.handleClickApply(price.start, price.end);
  };

  return (
    <div className={"mt-5 wrap-category " + classes.root}>
      <Typography id="range-slider" gutterBottom className="category-title">
        Price
      </Typography>
      <Slider
        value={valuePrice}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
        max={1000000}
      />
      <Grid container spacing={0} className="mt-3">
        <Grid item lg={5}>
          <TextField
            id="outlined-basic"
            variant="outlined"
            className="btn-price"
            placeholder="0"
            onChange={handleChangePrice}
            name="start"
            value={valuePrice[0]}
          />
        </Grid>
        <Grid
          item
          lg={2}
          style={{ padding: "14.5px", fontWeight: "500", fontSize: "18px" }}
        >
          -
        </Grid>
        <Grid item lg={5}>
          <TextField
            id="outlined-basic"
            variant="outlined"
            className="btn-price"
            placeholder="000"
            onChange={handleChangePrice}
            name="end"
            value={valuePrice[1]}
          />
        </Grid>
        <Grid item lg={12} className="mt-4">
          <span
            className="btn-submit-price"
            onClick={() => {
              handleClickApply();
            }}
          >
            Apply
          </span>
          <span
            className="btn-reset"
            style={{ float: "right" }}
            onClick={handleClickReset}
          >
            Reset
          </span>
        </Grid>
      </Grid>
    </div>
  );
}
