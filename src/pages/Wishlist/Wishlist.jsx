import React, { useEffect, useState } from 'react';
import Grid from "@material-ui/core/Grid";
import { getDetailsWishList } from '../../api/user.api';
import ProductListsComponent from '../../components/Product/ProductLists.component';

const Wishlist = (props) => {
    const [arr, setArr] = useState([]);
    const [reload, setReload] = useState(false);
    useEffect(async () => {
        props.handleLoading(true);
        await getDetailsWishList().then(res => {
            setArr(res.data);
        })
        props.handleLoading(false);
    }, [reload])

    const handleChangeReload = () => {
        setReload(!reload);
    }

    const showLists = arr.map((e, index) => {
        return (
            <Grid item lg={12} className='mt-3'>
                <ProductListsComponent
                    data={e}
                    wishList={true}
                    handleChangeReload={handleChangeReload}
                />  
            </Grid>
            
        )
    })
    return (
        <Grid className="wrap-content-right">
            <Grid container spacing={0}>
                {showLists}
            </Grid>
        </Grid>
    );
}

export default Wishlist;
