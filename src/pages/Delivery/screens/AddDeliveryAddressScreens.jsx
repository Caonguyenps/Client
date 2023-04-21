import { Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { addDeliveryAddress, getLocation } from "../../../api/user.api";
import InputComponent from "../../../components/Input/Input.component";
import InputSelectAddressComponents from "../../../components/Input/InputSelectAddress.components";
import TextField from '@material-ui/core/TextField';
import { getUserID } from "../../../helper/token";
import { useHistory } from "react-router-dom";
import path from "../../../resources/path";
const AddDeliveryAddressScreens = (props) => {
  const history = useHistory();
  const [arrLocation, setArrLocation] = useState([]);
  const [arrDistrict, setArrDistrict] = useState([]);
  const [arrWard, setArrWard] = useState([]);
  const [province, setProvince] = useState();
  const [district, setDistrict] = useState();
  const [ward, setWard] = useState();
  const [address, setAddress] = useState();
  useEffect(async () => {
    await getLocation().then((res) => {
      setArrLocation(res);
    });
  }, []);

  const handleChangeProvice = (data) => {
    setProvince(data);
    console.log(data);
    setArrDistrict(data.districts);
  };

  const handleChangeDistrict = (data) => {
    setDistrict(data);
    setArrWard(data.wards);
  };

  const handleChangeWard = (data) => {
    setWard(data);
  };

  const handleChangeAddress = (event) => {
    setAddress(event.target.value);
  }

  const handleAdd = async () => {
    props.handleLoading(true);
    let data = {
      ownerID: getUserID(),
      province: province.name,
      district: district.name,
      wards: ward.name,
      address: address
    }
    await addDeliveryAddress(data).then(() => {
      history.push(path.DELIVERY);
    })
  }

  return (
    <Grid style={{ width: "60%", margin: "0 auto" }}>
      <Grid>
        <TextField id="outlined-basic" label="Address" variant="outlined" style={{width:"100%"}} onChange={(e) => {handleChangeAddress(e)}}/>
      </Grid>
      <Grid className="mt-3">
        <InputSelectAddressComponents
          title="Province"
          provice={arrLocation}
          handleChange={handleChangeProvice}
        />
      </Grid>
      <Grid className="mt-3">
        <InputSelectAddressComponents
          title="District"
          districts={arrDistrict}
          handleChange={handleChangeDistrict}
        />
      </Grid>
      <Grid className="mt-3">
        <InputSelectAddressComponents
          title="Wards"
          wards={arrWard}
          handleChange={handleChangeWard}
        />
      </Grid>

      <div className="mt-4">
        <button type="button" class="btn btn-primary" style={{float:"right"}} onClick={() => {handleAdd()}}>Add Address</button>
      </div>
    </Grid>
  );
};

export default AddDeliveryAddressScreens;
