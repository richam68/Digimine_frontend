/*
 * Regulatory
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useEffect, useState, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  Card,
  CardContent,
  FormGroup,
  Typography,
  Divider,
} from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import Popover from '@material-ui/core/Popover';
import Switch from '@material-ui/core/Switch';
import MoreVert from '@material-ui/icons/MoreVert';
import { useInjectSaga } from 'utils/injectSaga';
import { alpha, styled, withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import reducer from './reducer';
import saga from './saga';

//import UsersUtility from './UsersUtility';
import emp_image from '../../images/emp_image.png';
import { lastIndexOf } from 'lodash';
import './style.css';
import userImage from '../LoginPage/images/addImage.png';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Link from '@material-ui/core/Link';
import { useHistory } from 'react-router-dom';
import { getAssignedWorks } from './actions';

const key = 'regulatory';

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

export function Regulatory({
  getAssignedWorks,
  assignedWorkList
}) {
  useInjectSaga({ key, saga });

  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    checkedC: true,
  });

  useEffect(() => {
    getAssignedWorks();
    console.log("assignedWorkList ===",assignedWorkList)
  }, []);


  // useEffect(() => {
  //   console.log('department list', departmentList);
  // }, []);

 

  const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const [anchor, setAnchor] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  // const [deleteId, setDeleteId] = useState(0);

  // const handleClickAdd = (event, index) => {
  //   console.log("================", index)
  //   setEditUserData(usersList[index]);
  //   setDeleteId(index);
  //   setAnchor(event.currentTarget);
  // };

  const handleCloseAdd = () => {
    setAnchor(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const openAdd = Boolean(anchor);
  const idAdd = openAdd ? 'simple-popover' : undefined;

  // const [editUserData, setEditUserData] = useState({});
  const [showEdit, setShowEdit] = useState(false);
  const openEdit = () => {
    setShowEdit(true);
    handleCloseAdd();
  };
  const handleExit = () => {
    setShowEdit(false);
  };

  // useEffect(() => { }, [usersList]);
  // const onDeleteUser = () => {

  //   console.log("onDeleteUser===", deleteId);
  //   deleteUser(usersList[deleteId].id);
  //   // }
  // };

  const [showExport, setShowExport] = useState(false);
  const openExport = () => {
    setShowExport(true);
    handleClose();
  };
  const handleCloseBtn = () => {
    setShowExport(false);
  };

  const openDetailsPage = () => {
    const path = `/details`;
    history.push(path);
  }

  // const [name, setName] = useState('');

  // const filter = e => {
  //   const keyword = e.target.value;
  //   // setName(searchBy);
  //   console.log("Seacrh according to ====", searchBy, name, keyword.length)
  //   let obj = {
  //     fromSaga: false,
  //     results: [],
  //   };

  //   if (keyword !== '' && keyword.length > 1) {
  //     if (searchBy === 'name' && keyword.length > 2) {
  //       const results = usersListreplica.filter((list) => {
  //         return list.name.toLowerCase().startsWith(keyword.toLowerCase());
  //       });
  //       // setFoundUsers(results);
  //       console.log('show result name inside filter', results);
  //       obj.results = results;
  //       setEmployee(obj);
  //     }
  //     else if (searchBy === 'departmentName') {
  //       const results = usersListreplica.filter((list) => {
  //         return list.departmentName.toLowerCase().startsWith(keyword.toLowerCase());
  //       });
  //       // setFoundUsers(results);
  //       console.log('show result department inside filter', results);
  //       obj.results = results;
  //       setEmployee(obj);
  //     }
  //     else if (searchBy === 'emailId' && keyword.length > 2) {
  //       const results = usersListreplica.filter((list) => {
  //         return list.emailId.toLowerCase().startsWith(keyword.toLowerCase());
  //       });
  //       // setFoundUsers(results);
  //       console.log('show result emailID inside filter', results);
  //       obj.results = results;
  //       setEmployee(obj);
  //     } else {
  //       obj.results = usersListreplica;
  //       // setFoundUsers(usersList);
  //       setEmployee(obj);
  //     }
  //   } else {
  //     obj.results = usersListreplica;
  //     // setFoundUsers(usersList);
  //     setEmployee(obj);
  //   }
  //   setName(keyword);
  // };

  // const [searchBy, setSearchBy] = useState('name');

  // let sortBy = 'name';

  // const searchByOptions = [
  //   {
  //     label: 'Name',
  //     value: 'name'
  //   },
  //   {
  //     label: 'Department',
  //     value: 'departmentName'
  //   },
  //   {
  //     label: 'Email',
  //     value: 'emailId'
  //   }
  // ]

  // const handleSelectSeachByOption = (e) => {

  //   setSearchBy(e.target.value);
  //   console.log("Search By ===== ", e.target.value, searchBy)
  // }

  // const clearAll = () => {
  //   console.log("clear All ===", usersList, usersListreplica)

  //   setName('');
  //   let obj1 = {
  //     fromSaga: false,
  //     results: [],
  //   };
  //   obj1.results = usersListreplica;

  //   setEmployee(obj1);
  // }

  // useEffect(() => {

  // }, [name])

  // const orderBy = (e) => {
  //   sortBy = e.target.value;
  //   console.log("orderBy .................... ", sortBy);

  //   console.log("Sortong according to ====", sortBy)
  //   let obj = {
  //     fromSaga: false,
  //     results: []
  //   };

  //   if (sortBy === 'name') {
  //     const results = usersList.sort((a, b) => a.name > b.name ? 1 : -1
  //     );
  //     console.log('SORTING result name inside filter', results);
  //     obj.results = results;
  //     setEmployee(obj);
  //   }
  //   else if (sortBy === 'employeeId') {
  //     const results = usersList.sort((a, b) => a.employeeId > b.employeeId ? 1 : -1);
  //     console.log('SORTING Id inside filter', results);
  //     obj.results = results;
  //     setEmployee(obj);
  //   }
  //   else if (sortBy === 'emailId') {
  //     const results = usersList.sort((a, b) => a.emailId > b.emailId ? 1 : -1);
  //     console.log('SORTING EmailId inside filter', results);
  //     obj.results = results;
  //     setEmployee(obj);
  //   }
  //   else if (sortBy === 'departmentName') {
  //     const results = usersList.sort((a, b) => a.departmentName > b.departmentName ? 1 : -1);
  //     console.log('SORTING department inside filter', results);
  //     obj.results = results;
  //     setEmployee(obj);
  //   } else {
  //     console.log(" ELSE In SORTING ", usersList, usersListreplica)

  //     obj.results = usersListreplica;
  //     setEmployee(obj);
  //   }

  // }
  const IOSSwitch = withStyles(theme => ({
    root: {
      width: 42,
      height: 26,
      padding: 0,
      margin: theme.spacing(1),
    },
    switchBase: {
      padding: 1,
      '&$checked': {
        transform: 'translateX(16px)',
        color: theme.palette.common.white,
        '& + $track': {
          backgroundColor: '#52d869',
          opacity: 1,
          border: 'none',
        },
      },
      '&$focusVisible $thumb': {
        color: '#52d869',
        border: '6px solid #fff',
      },
    },
    thumb: {
      width: 24,
      height: 24,
    },
    track: {
      borderRadius: 26 / 2,
      border: `1px solid ${theme.palette.grey[400]}`,
      backgroundColor: theme.palette.grey[50],
      opacity: 1,
      transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {},
    focusVisible: {},
  }))(({ classes, ...props }) => (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  ));
  const history = useHistory();

  const listAddRule = () => {
    const path = `/listadd`;
    history.push(path);
  }

  return (
    <div className="content">
      <div className="mx-5 mt-1 w-[95%]">
        <Breadcrumbs
          aria-label="breadcrumb"
          className="font-sans font-bold text-xl"
          style={{ marginLeft: '0px', fontWeight: '800', fontSize: '30px' }}
        >
          <Typography
            sx={{ display: 'flex', alignItems: 'center' }}
            color="text.primary"
            className="font-sans font-bold text-xl"
            style={{
              marginLeft: '30px',
              fontWeight: '500',
              fontSize: '25px',
              color: '#132B6B',
            }}
          >
            <ClearAllIcon sx={{ mr: 0.8 }} fontSize="inherit" />
            List
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
            Regulatory /
          </Link>
          <Link
            color="textPrimary"
            href="/components/breadcrumbs/"
            onClick={handleClick}
            aria-current="page"
            className="font-sans"
          >
            regulatory
          </Link>
        </p>
        <div className="mt-3 mb-6 w-full">
          <Divider style={{ color: '#36454F' }} />
        </div>
        <div className="flex font-sans justify-between">
          <div className="flex  justify-start ml-2">
            <form>
              <select
                className="w-24 font-sans px-2 border-2 rounded-[20px] h-9"
                style={{ boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.15)' }}
              >
                <option className="font-sans text-black" style={{ fontSize: '12px' }}>Sort by</option>
              </select>
            </form>

            <div>
              <p className="font-sans w-24 px-4 mt-3 ml-2" style={{ fontSize: '13px' }}> Search By</p>
            </div>
            <div>
              <form>
                <select
                  className="w-28 font-sans px-2 border-2 rounded-[20px] h-9"
                  style={{ boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.15)', color: '#AAAAAA', fontSize: '10px' }}
                >
                  <option className="font-sans " style={{ color: '#AAAAAA' }}>PC</option>
                </select>
              </form>
            </div>

            <div
              className="font-sans flex justify-between ml-7 w-96 h-9  item-strech border-2 px-6 rounded-[20px]"
              style={{ boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.15)' }}
            >
              <InputBase
                placeholder="Search by Department, Person"
                inputProps={{ 'aria-label': 'search' }}
                className="font-sans font-normal"
                style={{
                  fontSize: '13px',
                  color: '#AAAAAA',
                  fontWeight: '300',
                }}
              />
              <SearchIcon className="px-0 mt-1" style={{ color: '#0F4C4F' }} />
            </div>

            <button
              className="font-sans border-2 text-red-400 w-20 ml-6  h-8 rounded-[20px]"
              style={{ boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.15)' }}
            >
              Clear
            </button>
          </div>

          <div
            className="font-sans w-56 h-9 ml-3  border-2 rounded-full flex justify-center "
            style={{ background: '#132B6B' }}
            onClick={listAddRule}
          >
            {/* <AddIcon className="text-white mt-1 " /> */}
            <button className="text-white ml-2 ">ADD NEW REGULATORY</button>
          </div>
        </div>
        <div className="">
          <div className=" w-full">
            {/* gap-x-1 */}

            {/* {usersList &&
              usersList.length > 0 &&
              usersList.map((list, index) => {
                return ( */}
            <div
              className="block text-gray lg:ml-1 md:ml-7 sm:ml-9  "

            // style={{border:'2px solid red', marginLeft:'6px',marginRight:'6px'}}
            >
              <div className="my-7 w-full justify-center " />
              <div>
                <Card
                  className="w-full rounded-full h-[60px] pointer"
                  style={{ borderRadius: '50px', marginTop: '10px' }}
                  onClick={openDetailsPage}
                >
                  <CardContent className="justify-center">
                    <div className="flex justify-between rounded-full -mt-1">
                      <div className="flex">
                        <div className="rounded-full h-[41px] w-[41px] ml-3 bg-[#132B6B]">
                          <p className="text-white ml-[11px] mt-[11px] font-sans">
                            RK
                          </p>
                        </div>
                      </div>
                      <div className="">
                        <p className="text-[11px] font-sans font-semibold text-[#66737E] ">
                          Department
                        </p>
                        <p className="text-[13px] font-sans font-bold text-[#132B6B] mt-[8px]">
                          Mining
                        </p>
                      </div>
                      <div className="">
                        <p className="text-[11px] font-sans font-semibold text-[#66737E] ">
                          Assign Person
                        </p>
                        <div className="flex font-sans text-[13px]  font-bold text-[#132B6B] mt-[8px]">
                          Rajat Kumar
                          <div className="flex justify-center w-24 bg-[#F66B6B] ml-1 mt-[1px] rounded-md h-4">
                            <p className="text-center m-2 text-[11px] mt-[2px] text-white font-sans">
                              #0123456789
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="">
                        <p className="text-[11px] font-sans font-semibold text-[#66737E] ">
                          Slot 1 Senior
                        </p>
                        <p className="text-[13px] font-sans font-bold text-[#132B6B] mt-[8px]">
                          Rupal Banarjee
                        </p>
                      </div>
                      <div className="">
                        <p className="text-[11px] font-sans font-semibold text-[#66737E] ">
                          Slot 2 Senior
                        </p>
                        <p className="text-[13px] font-sans font-bold text-[#132B6B] mt-[8px]">
                          Abhirupa Majumdar
                        </p>
                      </div>
                      <div className="">
                        <p className="text-[11px] font-sans font-semibold text-[#66737E] ">
                          Categories
                        </p>
                        <p className="text-[13px] font-sans font-bold text-[#132B6B] mt-[8px]">
                          PC
                        </p>
                      </div>
                      <div className="ml-5">
                        <p className="text-[11px] font-sans font-semibold text-[#66737E] ">
                          Status
                        </p>
                        {/* <FormControlLabel
control={<IOSSwitch checked={state.checkedB} onChange={handleChange} name="checkedB" />}

/> */}
                        <FormGroup>
                          <FormControlLabel
                            control={
                              <IOSSwitch
                                checked={state.checkedB}
                                onChange={handleChange}
                                name="checkedB"
                              />
                            }
                          />
                        </FormGroup>
                      </div>
                      <div className="mt-2 mr-3 ">
                        <MoreVert />
                      </div>
                      <Popover
                        id={idAdd}
                        open={openAdd}
                        anchorEl={anchor}
                        // onClose={handleCloseAdd}
                        style={{
                          borderRadius: '15px',
                          // background: '#FFFFFF',
                          // boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.15)'
                        }}
                        anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'left',
                        }}
                      >
                        <div className="p-2 m-2">
                          <div>
                            <button
                              className="my-1 mx-4 font-sans"
                            // value={list.id}
                            // onClick={() => openEdit()}
                            >
                              Edit
                            </button>
                          </div>
                          <div>
                            <button
                              className="my-1 mx-4 font-sans"
                            // value={list.id}
                            // onClick={() => onDeleteUser()}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </Popover>
                      <Dialog
                        // open={showEdit}
                        // onClose={handleExit}
                        className="w-50 h-50"
                      >
                        <DialogContent
                          style={{
                            borderRadius: '15px',
                            background: '#FFFFFF',
                            boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.15)',
                            Width: '604px',
                            Height: '494px',
                          }}
                        >
                          {/* <EditUser
                                  list={editUserData}
                                  editUser={editUser}
                                  rolesList={rolesList}
                                  departmentList={departmentList}
                                  getAllDepartment={getAllDepartment}
                                  getAllRoles={getAllRoles}
                                  handleExit={handleExit}
                                /> */}
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                  <CardActions />
                </Card>
              </div>
            </div>
            {/* )
              })} */}
          </div>
        </div>
      </div>
    </div>
  );
}



const mapStateToProps = state => ({
  assignedWorkList: state.regulatoryReducer.assignedWorkList.length > 0 ? state.regulatoryReducer.assignedWorkList : [],

});

export function mapDispatchToProps(dispatch) {
  return {
    getAssignedWorks: data => dispatch(getAssignedWorks(data)),

  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Regulatory);
