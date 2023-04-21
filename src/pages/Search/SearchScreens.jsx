import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {searchProduct} from "../../api/product.api";
import ProductComponent from "../../components/Product/Product.component"
const SearchScreens = (props) => {
    const categoryID = useParams().categoryID;
    const search = useParams().search;
    const [arr, setArr] = useState([]);
    useEffect(async () => {
        props.handleLoading(true)
        if(categoryID && search){
            await searchProduct(categoryID, search).then(res => {
                setArr(res.data);
            });
            props.handleLoading(false);
        }
    }, [categoryID, search])

    const showProduct = arr.map((e, index) => {
        return(
            <Grid item lg={3} key={index}>
                <ProductComponent data={e} />
            </Grid>
        )
    })
    return (
        <Grid className="wrap-body">
            <Grid container spacing={2} className='mt-5'>
                {showProduct}
            </Grid>
        </Grid>
    );
}

export default SearchScreens;
