import React from "react";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import path from "../../../../resources/path";
import { useHistory } from "react-router-dom";
import "./bre.css";

export default function BreadcrumbsComponents(props) {
  const history = useHistory();

  function handleClick(event) {
    event.preventDefault();
    history.push(path.HOME);
  }
  return (
    <Breadcrumbs aria-label="breadcrumb" className="mt-3 mb-3 click-home">
      <Link color="inherit" onClick={handleClick}>
        Home Page
      </Link>
      {props.productName ? (
        <Link
          color="inherit"
          href="/getting-started/installation/"
          onClick={handleClick}
        >
          {props?.categoryName}
        </Link>
      ) : (
        <Link
          color="inherit"
          href="/getting-started/installation/"
          onClick={handleClick}
          style={{ fontWeight: "500", color: "black" }}
        >
          {props?.categoryName}
        </Link>
      )}
      {props.productName ? (
        <Link
          color="inherit"
          href="/getting-started/installation/"
          onClick={handleClick}
          style={{ fontWeight: "500", color: "black" }}
        >
          {props?.productName}
        </Link>
      ) : (
        <></>
      )}
    </Breadcrumbs>
  );
}
