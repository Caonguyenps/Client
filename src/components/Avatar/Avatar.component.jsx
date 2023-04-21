import { Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import "./avatar.css";
import { useState } from "react";
import { updateAvatar } from "../../api/user.api";
import Image from "material-ui-image";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
}));

const AvatarComponent = (props) => {
  const classes = useStyles();
  const [imagePreviews, setImagePreviews] = useState();
  const [imageFile, setImageFile] = useState();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (props.profile) {
      setImagePreviews(props.profile.avatar.url);
    }
  }, [props.profile]);

  const handleChangeImage = (event) => {
    const image = event.target.files[0];
    const urlImage = URL.createObjectURL(image);
    setImageFile(image);
    setImagePreviews(urlImage);
    setShow(true);
  };

  const hanldeClick = async () => {
    props.handleLoading(true);
    await updateAvatar(imageFile).then((res) => {
      setShow(false);
      props.handleChangeReload();
    });
  };

  return (
    <Grid className="wrap-avatar">
      <Grid className="box-avatar">
        <Grid className="avatar-img">
          <Image src={imagePreviews} />
        </Grid>
        <Grid className="btn-upload">
          <input
            accept="image/*"
            className={classes.input}
            id="icon-button-file"
            type="file"
            onChange={handleChangeImage}
          />
          <label htmlFor="icon-button-file">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
              className="btn"
            >
              <PhotoCamera />
            </IconButton>
          </label>
        </Grid>
      </Grid>
      {show ? (
        <Grid style={{ textAlign: "center", marginTop: "10px" }}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            className={classes.button}
            startIcon={<SaveIcon />}
            onClick={hanldeClick}
          >
            Save
          </Button>
        </Grid>
      ) : (
        <></>
      )}

      
    </Grid>
  );
};

export default AvatarComponent;
