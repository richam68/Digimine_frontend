/*
 * Categories
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useEffect, useState, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
// import {
//   makeSelectRepos,
//   makeSelectLoading,
//   makeSelectError,
// } from 'containers/App/selectors';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { Card, CardContent, FormGroup, Typography } from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import { green } from '@material-ui/core/colors';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import {
  alpha,
  styled,
  withStyles,
  makeStyles,
} from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import AddCategory from './addCategories';
import AddSubCategory from './subCategories';
import CategoryListPage from './categoryListPage';
import './style.css';
import reducer from './reducer';
import saga from './saga';
import {
  getAllDepartmentInCategory,
  getCategoryList,
  addCategoryRule,
  addCategorySubRule,
  setSearchData,
  ClearSortnSearch,
  setDialogMsg,
  getSubRuleDetail,
  openSubRuleDialog,
  closeSubRuleDialog,
  setDataInSubRuleDialog,
  setFileInDialog,
} from './actions';
import AddSubCategories from './subCategories';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    borderRadius: '50px',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

const GreenSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: green[600],
    '&:hover': {
      backgroundColor: alpha(green[600], theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: green[600],
  },
}));
const label = { inputProps: { 'aria-label': 'Switch demo' } };
const key = 'categories';

export function Categories({
  getCategoryList,
  getAllDepartmentInCategory,
  departmentLisInCategory,
  addCategoryRule,
  categoryList,
  addCategorySubRule,
  setSearchData,
  categoryListReplica,
  ClearSortnSearch,
  subRuleDetail,
  setDialogMsg,
  getSubRuleDetail,
  openSubRuleDialog,
  closeSubRuleDialog,
  subRuleDialog,
  setDataInSubRuleDialog,
  setFileInDialog,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    getCategoryList();
    getAllDepartmentInCategory();
  }, []);

  // const reposListProps = {
  //   loading,
  //   error,
  //   repos,
  // };

  const [showAddCategory, setShowAddCategory] = useState(false);

  const openNewCategories = () => {
    setShowAddCategory(true);
  };
  const handleCloseBtn = () => {
    setShowAddCategory(false);
    setShowSubCategory(false);
  };

  const [showSubCategory, setShowSubCategory] = useState(false);
  const openSubCategory = (parentRule, index) => {
    console.log('here for sub open==', parentRule);
    if (parentRule.editable === true) {
      setShowSubCategory(true);
    } else {
      const obj = {
        errMsg: 'This Rule is not Editable',
        index,
      };
      setDialogMsg(obj);
    }
  };

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');
  const [searchText, setSearch] = React.useState('');
  const [addRuleMsgErr, setErrMsg] = React.useState('');
  const [addSubRuleMsgErr, setSubRuleErrMsg] = React.useState('');

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleSubCategoryOpen = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : panel);
  };

  const handleOpenSubRuleDialog = data => {
    openSubRuleDialog(data);
  };
  function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
  }

  const createCategory = (deptName, newRule) => {
    if (deptName === '') {
      setErrMsg('Department is Required');
    } else if (newRule === '') {
      setErrMsg('Rule Name is Required');
    } else if (deptName === '' && newRule === '') {
      setErrMsg('Department & Rule Name is Required');
    } else {
      const obj = {
        id: '',
        name: newRule,
        deleted: false,
        departmentId: deptName,
      };
      addCategoryRule(obj);
      setErrMsg('');
      handleCloseBtn();
    }
  };

  const createSubRuleInCategory = obj => {
    console.log('here the the data to add in sub rule==', obj);
    if (obj.name === '' || obj.title === '' || obj.responsibility === '') {
      setSubRuleErrMsg('Fill the Required Field');
    } else {
      addCategorySubRule(obj);
      setSubRuleErrMsg('');
      closeSubRuleDialog();
    }
  };

  const search = e => {
    setSearch(e.target.value);
    const keyword = e.target.value;
    console.log('Seacrh according to ====', keyword.length);
    if (keyword !== '' && keyword.length > 2) {
      const result = categoryListReplica.filter(value =>
        value.name.toLowerCase().includes(keyword.toLowerCase()),
      );
      console.log('show result name inside filter', result);
      setSearchData(result);
    }

    if (keyword.length === 0) {
      ClearSortnSearch(categoryListReplica);
    }
  };

  const ClearSortnSearchFnc = () => {
    setSearch('');
    ClearSortnSearch(categoryListReplica);
  };

  const getDetailOfSubRule = (ruleId, subruleId, panel) => {
    const data = {
      ruleId,
      subruleId,
    };
    getSubRuleDetail(data);
    handleSubCategoryOpen(panel);
  };

  const setDataInSubRule = event => {
    const obj = {
      [event.target.name]: event.target.value,
    };
    setDataInSubRuleDialog(obj);
  };

  const setFileInSubrule = data => {
    console.log('here the file gooooo===', data);
    const obj = {
      name: data.name,
      size: data.size,
      type: data.type,
    };
    setFileInDialog(obj);
  };

  return (
    <div className="content font-sans">
      <div className="w-full ">
        <div className="ml-8 ">
          <div className="mt-3 text-xl ">
            <Breadcrumbs
              aria-label="breadcrumb"
              className="font-sans font-bold text-xl"
              style={{ marginLeft: '0px', fontWeight: '800', fontSize: '20px' }}
            >
              <Typography
                sx={{ display: 'flex', alignItems: 'center' }}
                color="text.primary"
                className="font-sans font-bold text-xl"
                style={{
                  marginLeft: '30px',
                  fontWeight: '500',
                  fontSize: '21px',
                  color: '#132B6B',
                }}
              >
                <ClearAllIcon
                  sx={{ mr: 0.8 }}
                  fontSize="inherit"
                  className=""
                />
                Categories
              </Typography>
            </Breadcrumbs>
            <p
              style={{ color: '#F66B6B', fontSize: '13px' }}
              className=" font-sans ml-14 -mt-1"
            >
              <Link
                color="inherit"
                href="/"
                onClick={handleClick}
                className="font-sans"
              >
                Categories /
              </Link>
              <Link
                color="textPrimary"
                href="/components/breadcrumbs/"
                onClick={handleClick}
                aria-current="page"
                className="font-sans"
              >
                categories
              </Link>
            </p>
            <hr />
          </div>

          <div className="flex font-sans flex justify-between">
            <div className="flex mt-5 flex justify-start ml-2">
              <form>
                <select
                  className="w-24 font-sans px-2 border-2 rounded-[20px] h-9"
                  style={{ boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.15)' }}
                >
                  <option className="font-sans text-black">Sort by</option>
                </select>
              </form>

              <div
                className="font-sans flex justify-between ml-5 w-80 h-9 flex item-strech border-2 px-6 rounded-[20px]"
                style={{ boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.15)' }}
              >
                <InputBase
                  placeholder="Search by Rule"
                  name="searchText"
                  value={searchText}
                  onChange={e => search(e)}
                  inputProps={{ 'aria-label': 'search' }}
                  className="font-sans font-normal"
                  style={{
                    fontSize: '13px',
                    color: '#AAAAAA',
                    fontWeight: '300',
                  }}
                />
                <SearchIcon
                  className="px-0 mt-1"
                  style={{ color: '#0F4C4F' }}
                />
              </div>

              <button
                className="font-sans border-2 text-red-400 w-20 ml-6  h-8 rounded-[20px]"
                style={{ boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.15)' }}
                onClick={() => ClearSortnSearchFnc()}
              >
                Clear
              </button>
            </div>

            <div
              className="font-sans w-56 h-9 mt-5 mr-24 border-2 rounded-full flex justify-center m-2"
              style={{ background: '#132B6B' }}
            >
              {/* <AddIcon className="text-white mt-1 " /> */}
              <button className="text-white ml-2" onClick={openNewCategories}>
                ADD NEW CATEGORIES
              </button>
            </div>
          </div>
          <div className="flex justify-between rounded-full ">
            <Dialog
              style={{
                width: '50%',
                borderRadius: '50px',
                marginLeft: '30%',
                marginTop: '7%',
              }}
              className="w-full h-3/4 "
              open={showAddCategory}
              onClose={handleCloseBtn}
            >
              <DialogContent
                // style={{
                //   borderRadius: '15px',
                //   background: '#FFFFFF',
                //   boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.15)',
                //   Width: '70%',
                //   Height: '80%',
                // }}
                className="flex justify-start"
              >
                <AddCategory
                  departmentList={departmentLisInCategory}
                  createCategory={createCategory}
                  handleCloseBtn={handleCloseBtn}
                  addRuleMsgErr={addRuleMsgErr}
                />
              </DialogContent>
            </Dialog>
          </div>

          {categoryList.map((list, index) => (
            <div>
              <CategoryListPage
                list={list}
                index={index}
                openSubCategory={openSubCategory}
                handleChange={handleChange}
                handleCloseBtn={handleCloseBtn}
                showSubCategory={showSubCategory}
                handleClick={handleClick}
                departmentList={departmentLisInCategory}
                createSubRuleInCategory={createSubRuleInCategory}
                classes={classes}
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                expanded={expanded}
                searchText={searchText}
                subRuleDetail={subRuleDetail}
                getDetailOfSubRule={getDetailOfSubRule}
                handleOpenSubRuleDialog={handleOpenSubRuleDialog}
                closeSubRuleDialog={closeSubRuleDialog}
                subRuleDialog={subRuleDialog}
                setDataInSubRule={setDataInSubRule}
                addSubRuleMsgErr={addSubRuleMsgErr}
                setFileInDialog={setFileInSubrule}
              />
            </div>
          ))}
        </div>
      </div>
      {/* <AddSubCategory closeSubRuleDialog={closeSubRuleDialog} 
      createSubRuleInCategory={createSubRuleInCategory}
      /> */}
    </div>
  );
}

Categories.propTypes = {
  // loading: PropTypes.bool,
  // error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  // repos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  // onSubmitForm: PropTypes.func,
  // username: PropTypes.string,
  // onChangeUsername: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    getCategoryList: () => dispatch(getCategoryList()),
    getAllDepartmentInCategory: () => dispatch(getAllDepartmentInCategory()),
    addCategoryRule: obj => dispatch(addCategoryRule(obj)),
    addCategorySubRule: obj => dispatch(addCategorySubRule(obj)),
    setSearchData: obj => dispatch(setSearchData(obj)),
    ClearSortnSearch: obj => dispatch(ClearSortnSearch(obj)),
    setDialogMsg: err => dispatch(setDialogMsg(err)),
    getSubRuleDetail: data => dispatch(getSubRuleDetail(data)),
    openSubRuleDialog: data => dispatch(openSubRuleDialog(data)),
    closeSubRuleDialog: data => dispatch(closeSubRuleDialog(data)),
    setDataInSubRuleDialog: data => dispatch(setDataInSubRuleDialog(data)),
    setFileInDialog: data => dispatch(setFileInDialog(data)),
  };
}

const mapStateToProps = state => ({
  categoryList:
    state.categories.categoryList.length > 0
      ? state.categories.categoryList
      : [],
  categoryListReplica:
    state.categories.categoryListReplica.length > 0
      ? state.categories.categoryListReplica
      : [],
  departmentLisInCategory:
    state.categories.departmentLisInCategory.length > 0
      ? state.categories.departmentLisInCategory
      : [],

  subRuleDetail: state.categories.subRuleDetail,
  subRuleDialog: state.categories.subRuleDialog,
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Categories);
