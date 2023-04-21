import React from "react";
import Grid from "@material-ui/core/Grid";
import logo from "../../assets/image/Toto.png";
import PersonIcon from "@material-ui/icons/Person";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import CategorySearchComponent from "../CategorySearch/CategorySearch.component";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import { useHistory } from "react-router-dom";
import { clearToken } from "../../helper/token";
import path from "../../resources/path";
import { checkLogin } from "../../auth/auth";
const HeaderMiddleComponent = (props) => {
  const history = useHistory();
  const handleClickLogo = () => {
    sessionStorage.clear();
    history.push("/");
  };
  const [anchorEl, setAnchorEl] = React.useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    clearToken();
    handleClose();
    window.location.href = "http://localhost:3000/";
  };

  const handleClickPath = async (path) => {
    handleClose();
    if (path == "/card") {
      if (await checkLogin()) {
        history.push(path);
      } else {
        history.push("/account/login");
      }
    } else {
      history.push(path);
    }
  };
  return (
    <Grid className="header-middle">
      <Grid container spacing={0}>
        <Grid item lg={3}>
          <div className="header-logo" onClick={handleClickLogo}>
            <img src={logo} alt="" />
          </div>
        </Grid>
        <Grid item lg={6}>
          <div className="header-search-bar">
            <CategorySearchComponent listsCategory={props.listsCategory} />
          </div>
        </Grid>
        <Grid item lg={3}>
          <div className="header-icon">
            <IconButton onClick={handleClick}>
              <PersonIcon />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {props.login ? (
                <>
                  <MenuItem
                    onClick={() => {
                      handleClickPath(path.USER_INFOR);
                    }}
                  >
                    Profile
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </>
              ) : (
                <>
                  <MenuItem
                    onClick={() => {
                      handleClickPath(path.LOGIN);
                    }}
                  >
                    Login
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleClickPath(path.REGISTER);
                    }}
                  >
                    Register
                  </MenuItem>
                </>
              )}
            </Menu>
            <IconButton
              onClick={() => {
                handleClickPath(path.CARD);
              }}
            >
              <ShoppingCartIcon />
            </IconButton>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default HeaderMiddleComponent;
