import React from "react";
import GridOnIcon from "@material-ui/icons/GridOn";
import ReorderIcon from "@material-ui/icons/Reorder";
import { Grid } from "@material-ui/core";
import "./views.css";
const ViewsSettingComponent = (props) => {
  const handleClick = (type) => {
    props.handleViewsType(type);
  };
  return (
    <Grid>
      <Grid
        className={"views-item mr-3 " + (props.type == 1 ? "active" : "")}
        onClick={() => {
          handleClick(1);
        }}
      >
        <GridOnIcon className="views-icon" />
        <span>Grid view</span>
      </Grid>
      <Grid
        className={"views-item mr-3 " + (props.type == 2 ? "active" : "")}
        onClick={() => {
          handleClick(2);
        }}
      >
        <ReorderIcon className="views-icon" />

        <span>List view</span>
      </Grid>
      <Grid className="views-item ">
        <span className="count-product">{props.count}</span>

        <span>Products</span>
      </Grid>
    </Grid>
  );
};

export default ViewsSettingComponent;
