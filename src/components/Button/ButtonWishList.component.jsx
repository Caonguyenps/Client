import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";

const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: "center",
    marginTop: "20px",
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  buttonSuccess: {
    backgroundColor: "#F5F5F5",
    "&:hover": {
      backgroundColor: green[700],
    },
    color: "black",
  },
  fabProgress: {
    color: green[500],
    position: "absolute",
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default function ButtonWishListComponent(props) {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef();

  const buttonClassname = clsx({
    [classes.buttonSuccess]: props.success,
  });

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = () => {
    if (!loading) {
      props.handleClickWishList();
      //   setSuccess(false);
      //   setLoading(true);
      //   timer.current = window.setTimeout(() => {
      //     setSuccess(true);
      //     setLoading(false);
      //   }, 2000);
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <Button
          variant="contained"
          color="primary"
          size="small"
          className={buttonClassname}
          disabled={props.loading}
          onClick={handleButtonClick}
          style={{ borderRadius: "8px" }}
        >
          {props.success ? (
            <>
              <FavoriteIcon className="mr-1" style={{ color: "red" }} /> Remove{" "}
            </>
          ) : (
            <>
              <FavoriteBorderIcon className="mr-1" /> Add to wish list{" "}
            </>
          )}
        </Button>
        {props.loading && (
          <CircularProgress size={24} className={classes.buttonProgress} />
        )}
      </div>
    </div>
  );
}
