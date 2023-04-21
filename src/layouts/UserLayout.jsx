import { Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import { useState } from "react";
import { getUserInfor } from "../api/user.api";
import AvatarComponent from "../components/Avatar/Avatar.component";
import SidebarComponent from "../components/Sidebar/Sidebar.component";
import UserRoutes from "../routes/UserRoutes";
const UserLayout = (props) => {
  const [profile, setProfile] = useState();
  const [reload, setReload] = useState(false);
  useEffect(async () => {
    props.handleLoading(true);
    await getUserInfor().then((res) => {
      setProfile(res.data);
    });
    props.handleLoading(false);
  }, [reload]);

  const handleChangeReload = () => {
    setReload(!reload);
  };
  return (
    <Grid className="wrap-body mt-5">
      <Grid container spacing={1}>
        <Grid item lg={3}>
          <Grid>
            <AvatarComponent
              profile={profile}
              handleChangeReload={handleChangeReload}
              handleLoading={props.handleLoading}
            />
            <SidebarComponent handleChangeReload={handleChangeReload}/>
          </Grid>
        </Grid>
        <Grid item lg={9} className="content-right">
          <UserRoutes profile={profile} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UserLayout;
