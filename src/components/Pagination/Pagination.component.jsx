import { Grid } from "@material-ui/core";
import React from "react";
import Pagination from "@material-ui/lab/Pagination";
import "./pagination.css";
import { useEffect, useState } from "react";
const PaginationComponent = (props) => {
  const [totalPage, setTotalPage] = useState();
  useEffect(() => {
    if (props.count) {
      setTotalPage(Math.round(props.count / 18 + 1));
    }
  }, [props.count]);

  const handleChange = (event, value) => {
    // setPage(value);
    props.handleChangePage(value);
  };

  return (
    <Grid className="wrap-pagi">
      <Pagination
        count={totalPage}
        page={props?.page}
        onChange={handleChange}
      />
    </Grid>
  );
};

export default PaginationComponent;
