import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import TagFacesIcon from "@material-ui/icons/TagFaces";
import { Grid } from "@material-ui/core";
import "./headerFilter.css";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

export default function HeaderFilterComponent(props) {
  const classes = useStyles();

  const handleDelete = (data) => () => {
    // setChipData((chips) =>
    //   chips.filter((chip) => chip.key !== chipToDelete.key)
    // );
    props.handleDeleteFilterItem(data);
  };

  const showListsFilter = props.arrFilter.map((e, index) => {
    return (
      <Grid className="filter-item">
        <Chip
          label={e.name}
          onDelete={e.name === "React" ? undefined : handleDelete(e)}
          className={classes.chip}
        />
      </Grid>
    );
  });

  return <>{showListsFilter}</>;
}
