import React, { useState } from 'react';
import { Grid } from "@material-ui/core";
import { getUserID } from '../../helper/token';
import TextField from '@material-ui/core/TextField';
import { changePassword } from '../../api/user.api';

const ChangePassword = (props) => {
    const [data, setData] = useState({
        ownerID: getUserID(),
        oldPassword: '',
        newPassword: ''
    })

    const handleChangeData = (event) => {
        let {name, value} = event.target;
        setData((data) => ({
            ...data,
            [name]: value,
          }));
    }

    const handleClick = async () => {
        props.handleLoading(true);
        await changePassword(data).then(res => {
            props.handleLoading(false);
        }).catch(error => {
           alert("Old Password not success")
           props.handleLoading(false);
        })
    }
    return (
        <Grid style={{ width: "60%", margin: "0 auto" }}>
            <Grid>
                <TextField id="outlined-basic" label="Old Password" name='oldPassword' type='password' variant="outlined" style={{width:"100%"}} onChange={(e) => {handleChangeData(e)}}/>
            </Grid>
            <Grid className='mt-3'>
                <TextField id="outlined-basic" label="New Password" name='newPassword' type='password' variant="outlined" style={{width:"100%"}} onChange={(e) => {handleChangeData(e)}}/>
            </Grid>

            <div className="mt-4">
                <button type="button" class="btn btn-primary" style={{float:"right"}} onClick={handleClick}>Change Password</button>
            </div>
        </Grid>
    );
}

export default ChangePassword;
