import { Grid } from "@material-ui/core";
import React, { useState } from "react";
import { useEffect } from "react";
import { getCategoryProduct } from "../../../../api/product.api";
import "./category.css";
import { useHistory } from "react-router-dom";
const CategoryComponent = () => {
  const history = useHistory();
  const [category, setCategory] = useState([]);
  useEffect(async () => {
    await getCategoryProduct().then((res) => {
      setCategory(res.data);
    });
  }, []);
  const showListsCategory = category.map((e, index) => {
    return (
      <div className="category-item" onClick={() => {handleClick(e._id)}}>
        <span>{e.categoryName}</span>
      </div>
    );
  });

  const handleClick = (id) => {
    history.push(`product/${id}`);
  }
  return (
    <Grid className="category">
      <div className="category-title">
        <span>Category menu</span>
      </div>
      {showListsCategory}
    </Grid>
  );
};

export default CategoryComponent;
