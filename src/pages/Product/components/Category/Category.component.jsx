import { Grid } from "@material-ui/core";
import React from "react";
import { useEffect, useState } from "react";
import "./category.css";
const CategoryComponent = (props) => {
  const [activeSubCategory, setActiveSubCategory] = useState();
  const [activeBranch, setActiveBranch] = useState();

  const handleClick = (id, name) => {
    if (props.type == "category") {
      sessionStorage.setItem(
        "subCategoryID",
        JSON.stringify({ name: name, id: id, type: "category" })
      );
    } else if (props.type == "branch") {
      sessionStorage.setItem(
        "branchID",
        JSON.stringify({ name: name, id: id, type: "branch" })
      );
    }
    props.handleClick(id, props.type, name);
  };

  const showCategory = props?.data?.map((e, index) => {
    return (
      <div
        key={index}
        className={
          "category-item mt-2 " + (e._id === props?.active?.id ? "active" : "")
        }
      >
        <span
          onClick={() => handleClick(e._id, e.subCategoryName || e.branchName)}
        >
          {e?.subCategoryName || e?.branchName}
        </span>
      </div>
    );
  });

  return (
    <Grid className="mt-5 wrap-category">
      <div className="category-title">
        <span>{props?.title}</span>
      </div>
      <div>{showCategory}</div>
    </Grid>
  );
};

export default CategoryComponent;
