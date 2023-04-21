import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import path from "../../resources/path";
const HeaderBottomComponent = (props) => {
  const history = useHistory();

  const [categoryID, setCategoryID] = useState("");
  const [listsCategory, setListsCategory] = useState([]);

  useEffect(() => {
    if (sessionStorage.getItem("categoryID")) {
      setCategoryID(sessionStorage.getItem("categoryID"));
    } else {
      setCategoryID("");
    }
  }, [sessionStorage.getItem("categoryID")]);

  const handleClickCategory = (id) => {
    sessionStorage.setItem("categoryID", id);
    setCategoryID(id);
    history.push(`${path.DEFAULT_PRODUCT}/${id}`);
  };

  const showListsCategory = props.listsCategory.map((e, index) => {
    return (
      <div
        className="category-item"
        key={index}
        onClick={() => {
          handleClickCategory(e._id);
        }}
      >
        <span
          className={"category-name " + (e._id == categoryID ? "active" : "")}
        >
          {e.categoryName}
        </span>
        {e.subCategory.length > 0 ? (
          <i class="fa-solid fa-chevron-down ml-2 mt-1"></i>
        ) : (
          <></>
        )}
        {e.subCategory.length > 0 ? (
          <div className="sub-category">
            {e.subCategory.map((sub, i) => {
              return (
                <div className="sub-category-item" key={i}>
                  <span>{sub.subCategoryName}</span>
                </div>
              );
            })}
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  });
  return (
    <Grid className="header-bottom">
      <div className="wrap-category">{showListsCategory}</div>
    </Grid>
  );
};

export default HeaderBottomComponent;
