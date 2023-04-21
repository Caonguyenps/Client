import { Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
import BreadcrumbsComponents from '../components/Breadcrumbs/Breadcrumbs.component';
import { useParams } from 'react-router-dom';
import {
  getBranchCategory,
  getDetailsCategory,
} from '../../../api/category.api';
import { useState } from 'react';
import './product.css';
import CategoryComponent from '../components/Category/Category.component';
import PriceFilterComponent from '../components/PriceFilter/PriceFilter.component';
import WrapProductComponent from '../components/WrapProduct/WrapProduct.component';
import PaginationComponent from '../../../components/Pagination/Pagination.component';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getListsProductFiler } from '../../../api/product.api';
import HeaderFilterComponent from '../components/HeaderFilter/HeaderFilter.component';
import ViewsSettingComponent from '../components/ViewsSetting/ViewsSetting.component';

const ProductScreens = (props) => {
  const history = useHistory();
  const categoryID = useParams().categoryID;
  const query = queryString.parse(props.location.search);
  const pageRoutes = query.p;
  const subcategoryID = query.subCategoryID;
  const branchID = query.branchID;
  const start = query.start;
  const end = query.end;

  const [category, setCategory] = useState();
  const [branch, setBranch] = useState();
  const [page, setPage] = useState(pageRoutes || 1);
  const [count, setCount] = useState(0);
  const [show, setShow] = useState(true);
  const [filter, setFilter] = useState({
    categoryID: categoryID,
    subCategoryID: subcategoryID || '',
    branchID: branchID || '',
    price: {
      start: start || 0,
      end: end || 0,
    },
  });

  const [activeSubCategory, setActiveSubCategory] = useState();
  const [activeBranch, setActiveBranch] = useState();

  const [arrFilter, setArrFilter] = useState([]);

  const [viewsType, setViewsType] = useState(1);

  useEffect(async () => {
    if (categoryID) {
      if (!sessionStorage.getItem('category')) {
        sessionStorage.setItem('categoryID', categoryID);
      }
      setFilter({
        categoryID: categoryID,
        subCategoryID: subcategoryID || '',
        branchID: branchID || '',
        price: {
          start: start || 0,
          end: end || 0,
        },
      })
      setArrFilter([]);
      setActiveSubCategory();
      setActiveBranch();
      await getDetailsCategory(categoryID).then((res) => {
        setCategory(res.data);
      });

      await getBranchCategory(categoryID).then((res) => {
        setBranch(res.data);
      });
    }
    console.log(filter)
  }, [categoryID]);

  useEffect(() => {
    if (sessionStorage.getItem('subCategoryID')) {
      setActiveSubCategory(JSON.parse(sessionStorage.getItem('subCategoryID')));
      const data = JSON.parse(sessionStorage.getItem('subCategoryID'));
      setArrFilter([{ name: data.name, type: data.type, id: data.id }]);
    } else {
      setArrFilter([]);
      setActiveSubCategory();
    }
  }, [sessionStorage.getItem('subCategoryID')]);


  useEffect(() => {
    if (pageRoutes) {
      setPage(parseInt(pageRoutes));
    } else {
      setPage(1);
    }
  }, [pageRoutes]);

  useEffect(async () => {
    if (branch && category && (subcategoryID || branchID || start || end)) {
      let data = { ...filter };
      if (subcategoryID) {
        data.subCategoryID = subcategoryID;

        if (!sessionStorage.getItem('subCategoryID')) {
          let index = category.subCategory.findIndex((e) => {
            return e._id == subcategoryID;
          });
          let dataSub = category.subCategory[index];
          sessionStorage.setItem(
            'subCategoryID',
            JSON.stringify({
              name: dataSub.subCategoryName,
              type: 'category',
              id: dataSub._id,
            })
          );
        }
      }
      if (branchID) {
        data.branchID = branchID;
        if (!sessionStorage.getItem('branchID')) {
          let index = branch.findIndex((e) => {
            return e._id == branchID;
          });
          let dataSub = branch[index];
          sessionStorage.setItem(
            'branchID',
            JSON.stringify({
              name: dataSub.branchName,
              type: 'branch',
              id: dataSub._id,
            })
          );
        }
      } else {
        data.branchID = '';
      }
      if (start && end) {
        data.price.start = parseInt(start);
        data.price.end = parseInt(end);
      }
      setFilter(data);
    } else {
      setFilter({
        categoryID: categoryID,
        subCategoryID: '',
        branchID: '',
        price: {
          start: 0,
          end: 0,
        },
      });
    }
  }, [category, branch, subcategoryID, branchID, start, end]);

  const getCountProduct = (count) => {
    setCount(count);
  };

  const handleChangePage = (page) => {
    let search;
    if (subcategoryID) {
      search = `subCategoryID=${subcategoryID}&p=${page}`;
    } else {
      search = `p=${page}`;
    }
    history.push({ search: search });
    setPage(page);
  };

  const handleChangeShow = (status) => {
    setShow(status);
  };

  const handleClickCategoryOrBranch = (id, type, name) => {
    let search;
    let tmp = [...arrFilter];
    let index = arrFilter.findIndex((e) => {
      return e.type == type;
    });
    console.log("index", index);

    if (index == -1) {
      tmp.push({ name: name, type: type });
    } else {
      tmp[index].name = name;
      tmp[index].type = type;
    }

    if(type == "branch"){
      setActiveBranch({id: id});
    }
    setArrFilter(tmp);

    if (type == 'category') {
      search = `subCategoryID=${id}`;
    } else if (type == 'branch') {
      if (subcategoryID) {
        search = `subCategoryID=${subcategoryID}&branchID=${id}`;
      } else {
        search = `branchID=${id}`;
      }
    }

    history.push({ search: search });
  };

  console.log(arrFilter);

  const handleClickApply = (start, end) => {
    let search = `&start=${start}&end=${end}`;
    if (subcategoryID && branchID) {
      search = `subCategoryID=${subcategoryID}&branchID=${branchID}` + search;
    } else if (branchID) {
      search = `branchID=${branchID}` + search;
    } else if (subcategoryID) {
      search = `subCategoryID=${subcategoryID}` + search;
    }
    history.push({ search: search });
  };

  const handleDeleteFilterItem = (data) => {
    let tmp = [...arrFilter];
    let search;

    if (data.type == 'branch') {
      tmp = tmp.filter((e) => {
        return e.name != data.name && e.type != data.type;
      });
      setArrFilter(tmp);
      sessionStorage.removeItem('branchID');
      if (subcategoryID) {
        search = `subCategoryID=${subcategoryID}`;
      } else {
        search = '';
      }
    } else if (data.type == 'category') {
      search = '';
      sessionStorage.removeItem('subCategoryID');
      sessionStorage.removeItem('branchID');
    }
    history.push({ search: search });
  };

  const handleViewsType = (type) => {
    setViewsType(type);
  };

  return (
    <Grid className="wrap-body" id="product">
      <BreadcrumbsComponents categoryName={category?.categoryName} />
      <Grid className="mt-3 mb-3 categoryName">
        <span>{category?.categoryName}</span>
        <Grid className="category-right">
          <ViewsSettingComponent
            type={viewsType}
            handleViewsType={handleViewsType}
            count={count}
          />
        </Grid>
      </Grid>
      <Grid className="mt-3 mb-3">
        <HeaderFilterComponent
          arrFilter={arrFilter}
          handleDeleteFilterItem={handleDeleteFilterItem}
        />
      </Grid>
      <Grid container spacing={1}>
        <Grid item lg={2}>
          <CategoryComponent
            data={category?.subCategory}
            title="Categories"
            type="category"
            handleClick={handleClickCategoryOrBranch}
            active={activeSubCategory}
          />
          <CategoryComponent
            data={branch}
            title="Branchs"
            type="branch"
            handleClick={handleClickCategoryOrBranch}
            active={activeBranch}
          />
          <PriceFilterComponent handleClickApply={handleClickApply} />
        </Grid>

        <Grid item lg={9}>
          <WrapProductComponent
            categoryID={categoryID}
            page={page}
            setCountProduct={getCountProduct}
            handleChangeShow={handleChangeShow}
            filter={filter}
            viewsType={viewsType}
          />
          {show ? (
            <></>
          ) : count > 18 ? (
            <PaginationComponent
              count={count}
              page={page}
              handleChangePage={handleChangePage}
            />
          ) : (
            <></>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProductScreens;
