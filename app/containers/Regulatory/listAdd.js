import React, { useState, useEffect, memo } from 'react';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import saga from './saga';
import './style.css';
import { getAllDepartment, getDropdownList } from './actions';

const key = 'regulatory';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 500,
  },
}));

export function ListAdd({
  getAllDepartment,
  departmentList,
  getDropdownList,
  assignPersonDropdownList,
  reviwerDropdownList,
  functionalHeadDropdownList,
}) {
  useInjectSaga({ key, saga });

  const [departmentId, setDepartmentId] = useState(0);
  const [selectOTCorPC, setSelectOTCorPC] = useState('OTC');
  useEffect(() => {
    getAllDepartment();

    console.log('departmentList in regulatory ===', departmentList);
  }, []);

  useEffect(() => {
    console.log('department list', departmentList);
  }, [departmentList]);

  useEffect(() => {
    // Functional Head id=3
    getDropdownList(3, departmentId);
    // id= 4 "Reviewer"
    getDropdownList(4, departmentId);
    // id= 5 Person Responsible
    getDropdownList(5, departmentId);
    console.log(
      'assignPersonDropdownList  reviwerDropdownList  functionalHeadDropdownList',
      assignPersonDropdownList,
      reviwerDropdownList,
      functionalHeadDropdownList,
    );
  }, [departmentId]);

  const history = useHistory();
  const listAddSubRule = () => {
    const path = `/listadd2`;
    history.push(path);
  };

  const [selectedDate, setSelectedDate] = useState(
    new Date('2014-08-18T21:11:54'),
  );

  const handleDateChange = date => {
    setSelectedDate(date);
  };
  const classes = useStyles();

  function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
  }

  const selectDepartmentId = e => {
    console.log(e.target.value);
    setDepartmentId(e.target.value);
    // Call api to show users list of particular Location
  };



  return (
    <div className="content">
      <div className="w-full">
        <div className="ml-3 pt-1">
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
                <ChevronLeftIcon
                  sx={{ mr: 0.8 }}
                  fontSize="inherit"
                  className=""
                />
                Add
              </Typography>
            </Breadcrumbs>
            <p
              style={{ color: '#F66B6B', fontSize: '13px' }}
              className=" font-sans ml-12 -mt-1"
            >
              <Link
                color="inherit"
                href="/"
                onClick={handleClick}
                className="font-sans"
              >
                Regulatory |
              </Link>

              <Link
                color="textPrimary"
                href="/components/breadcrumbs/"
                onClick={handleClick}
                aria-current="page"
                className="font-sans "
                style={{ marginLeft: '5px' }}
              >
                Add
              </Link>
            </p>
            <hr />
          </div>
        </div>
        <hr />
        <div className="flex w-full ">
          <div className="w-1/2">
            <form>
              <div className="ml-9 mt-8 font-sans font-semibold flex">
                <p
                  className="font-sans text-black"
                  style={{ fontSize: '13px', fontWeight: '700' }}
                >
                  Select Department
                </p>
                <p className="text-[red]">*</p>
              </div>
              <div className="ml-9 font-sans font-semibold ">
                <select
                  className="w-full font-sans mt-4 border-2 rounded-[20px] h-9"
                  style={{
                    color: '#66737E',
                    fontSize: '13px',
                    fontWeight: '400',
                  }}
                  name="departmentId"
                  required={true}
                  // value={departmentId}
                  onClick={(e) => selectDepartmentId(e)}

                >

                  {departmentList.map((dept, index) => {
                    console.log('dept============', dept);
                    return (
                      <option
                        className="ml-2 font-sans"
                        style={{ color: '#66737E' }}
                        key={index} value={dept.id} id={dept.id}
                      >
                        {dept.name}
                      </option>
                    );
                  })}
                </select>
                {/* <p
                  className="flex justify-end font-sans mr-3"
                  style={{ color: ' #FF0000', fontWeight: '400' }}
                >
                  Error Message
                </p> */}
              </div>

              <div className="ml-9 mt-3 font-sans font-semibold ">
                <p
                  className="font-sans text-black"
                  style={{ fontSize: '13px', fontWeight: '700' }}
                >
                  Select
                </p>
                <select
                  className="w-full font-sans mt-4 border-2 rounded-[20px] h-9"
                  style={{
                    color: '#66737E',
                    fontSize: '13px',
                    fontWeight: '400',
                  }}
                  onClick={(e) => setSelectOTCorPC(e.target.value)}
                >
                  <option
                    className="ml-2 font-sans"
                    style={{ color: '#66737E' }}
                  >
                    None
                  </option>
                  <option
                    className="ml-2 font-sans"
                    style={{ color: '#66737E' }}
                    value="OTC"
                  >
                    OTC
                  </option>
                  <option
                    className="ml-2 font-sans"
                    style={{ color: '#66737E' }}
                    value="PC"
                  >
                    PC
                  </option>
                </select>
              </div>

              <div className=" mt-8 font-sans font-semibold ">
                <div className="flex flex-col">
                  <label
                    className="font-sans ml-9"
                    style={{ fontSize: '13px', fontWeight: '700' }}
                  >
                    Select Your Date
                  </label>
                  {selectOTCorPC == "OTC"?
                  <div className=" ml-9 mt-6 border-2 rounded-full h-10 ">
                    <form className={classes.container} noValidate>
                      <TextField
                        //  variant="outlined"
                        id="date"
                        // placeholder="Weekely"
                        type="date"
                        defaultValue="YYYY-MM-DD"
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        style={{ marginTop: '4.3px', marginLeft: '13px' }}
                      />
                    </form>
                  </div>
                  :
                    <select
                  className=" ml-9 mt-6 border-2 rounded-full h-10"
                  style={{
                    color: '#66737E',
                    fontSize: '13px',
                    fontWeight: '400',
                  }}
                  // onClick={(e) => setSelectOTCorPC(e.target.value)}
                >
                  {/* <option
                    className="ml-2 font-sans"
                    style={{ color: '#66737E' }}
                  >
                    None
                  </option> */}
                  <option
                    className="ml-2 font-sans"
                    style={{ color: '#66737E' }}
                    value="Weekly"
                  >
                    Weekly
                  </option>
                  <option
                    className="ml-2 font-sans"
                    style={{ color: '#66737E' }}
                    value="Yearly"
                  >
                    Yearly
                  </option>
                </select>
                  }
                  
                </div>
                {/* <div className='flex flex-col ml-6'>
              <label className='font-sans text-sm ml-7' style={{fontSize: '13px', fontWeight: '700'}}>Pick Date</label>
                <div className="w-1/2 ml-5 mt-5 ">
                <select
                className='border-2 rounded-full h-10 w-52 font-sans'
                    style={{
                    color: '#66737E',
                    fontSize: '13px',
                    fontWeight: '400',
                  }}
                >
                  <option
                    className="ml-2 font-sans px-3"
                    style={{ color: '#66737E' }}
                  >
                    Weekely
                  </option>
                </select>
                </div>
                </div> */}
              </div>
            </form>
          </div>

          <div className=" w-1/2 bg-[#F7F8FA] rounded-lg  mt-8 mr-20 ml-12">
            <form className=" mb-6 -ml-3">
              <p className="ml-9 mt-3 font-sans font-semibold flex">
                <p className="font-sans">Select Assign Person</p>
                <p className="text-[red]">*</p>
              </p>
              <select className="font-sans w-10/12 ml-7 mt-3 border-2 rounded-[20px] h-10">
                {assignPersonDropdownList.map((person, index) => (
                  <option
                    className="ml-5 font-sans"
                    key={index}
                    value={person.id}
                  >
                    {' '}
                    {person.name}{' '}
                  </option>
                ))}
              </select>

              <p className="ml-9 mt-6 font-sans font-semibold">
                Select Slot 1 Senior
              </p>

              <select className="font-sans w-10/12 ml-7 mt-3 border-2 rounded-[20px] h-10">
                {reviwerDropdownList.map((reviewer, index) => (
                  <option
                    className="ml-5 font-sans"
                    key={index}
                    value={reviewer.id}
                  >
                    {' '}
                    {reviewer.name}{' '}
                  </option>
                ))}
              </select>

              <p className="ml-9 mt-6 font-sans font-semibold">
                Select Slot 2 Senior
              </p>

              <select className="w-10/12 ml-7 mt-3 border-2 rounded-[20px] h-10 font-sans">
                {functionalHeadDropdownList.map((person, index) => (
                  <option
                    className="ml-2 font-sans"
                    key={index}
                    value={person.id}
                  >
                    {' '}
                    {person.name}{' '}
                  </option>
                ))}
              </select>
            </form>
          </div>
        </div>
        <div className="-pt-3 ml-9">
          <button
            className="bg_red mx-auto font-sans text-white font-semibold reg_page w-32 h-10 rounded-3xl my-5"
            // className="w-28 h-10 font-sans"
            // style={{
            //   backgroundColor: 'rgb(246, 107, 107)',
            //   color: 'white',
            //   borderRadius: '50px',

            // }}
            onClick={listAddSubRule}
          >
            NEXT
          </button>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => (
  console.log('STATE===', state),
  {
    departmentList: state.regulatoryReducer.departmentList.length > 0 ? state.regulatoryReducer.departmentList : [],
    assignPersonDropdownList: state.regulatoryReducer.assignPersonDropdownList.length > 0 ? state.regulatoryReducer.assignPersonDropdownList : [],
    reviwerDropdownList: state.regulatoryReducer.reviwerDropdownList.length > 0 ? state.regulatoryReducer.reviwerDropdownList : [],
    functionalHeadDropdownList: state.regulatoryReducer.functionalHeadDropdownList.length > 0 ? state.regulatoryReducer.functionalHeadDropdownList : []
  });

export function mapDispatchToProps(dispatch) {
  return {
    getAllDepartment: () => dispatch(getAllDepartment()),
    getDropdownList: (roleId, departmentId) =>
      dispatch(getDropdownList(roleId, departmentId)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ListAdd);
