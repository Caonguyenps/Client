import { Grid } from "@material-ui/core";
import React, { useState } from "react";
import "./image.css";
import ImageGallery from "react-image-gallery";
import { useEffect } from "react";
const ImageProductComponent = (props) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (props.listsImage) {
      let image = props.listsImage.map((e) => {
        return { original: e.url, thumbnail: e.url };
      });
      setImages(image);
      //   let arr = [];
      //   for (let item of props.listsImage) {
      //     arr.push({ original: item.url, thumbnail: item.url });
      //   }
      //   setImages(arr);
    }
  }, [props.listsImage]);

  return <ImageGallery items={images} showPlayButton={false} />;
};

export default ImageProductComponent;
