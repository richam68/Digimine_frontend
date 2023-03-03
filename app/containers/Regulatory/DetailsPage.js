/*
 * Regulatory
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import {
  makeSelectRepos,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';
// import { Card, CardContent } from '@material-ui/core';
// import Typography from '@material-ui/core/Typography';
// import ArrowBackIosIcon from '@material-ui/core/AccordionActions/ArrowBackIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Divider from '@material-ui/core/Divider';
import { alpha, styled, withStyles , makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardContent,
  FormGroup,
  Typography,
  FormControlLabel,
} from '@material-ui/core';
import Switch from '@material-ui/core/Switch';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
// import { makeStyles } from '@material-ui/core/styles';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Redirect, useHistory } from 'react-router-dom';
import ManageRemark from './ManagRema';
import map from './image/new.png';
import photo from './image/profilepic.png';
import Users from './Users';
import saga from './saga';
import reducer from './reducer';
import { makeSelectUsername } from './selectors';
import { changeUsername } from './actions';
import { loadRepos } from '../App/actions';
import { setNavBar } from '../App/actions';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MoreVert from '@material-ui/icons/MoreVert';
// import { makeStyles, styled, alpha } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

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

const key = 'regulatory';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export function DetailsPage({
  username,
  loading,
  error,
  repos,
  onSubmitForm,
  onChangeUsername,
  setNavBar,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const history = useHistory();

  useEffect(() => {
    // When initial state username is not null, submit the form to load repos
    if (username && username.trim().length > 0) onSubmitForm();
  }, []);
  const classes = useStyles();

  const reposListProps = {
    loading,
    error,
    repos,
  };

  const [age, setAge] = React.useState('RuleA');

  const handleChange = event => {
    setAge(event.target.value);
  };

  function toDetails() {
    history.push('/regulatory/details');
    setNavBar(true);
  }

  function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
  }

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

  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    checkedC: true,
  });

  const label = { inputProps: { 'aria-label': 'Switch demo' } };

  return (
    <div className="maindash2">
      <div className=" mt-4  w-full">
        <div className="-mt-2 text-xl ml-5 ">
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
              Details
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
              className="font-sans ml-2"
              style={{ marginLeft: '5px' }}
            >
              Details
            </Link>
          </p>
        </div>
        <Divider />

        <div className=" flex w-full mt-6 " style={{ borderRadius: '20px' }}>
          <div className="ml-7" style={{ width: '7rem', borderRadius: '8px' }}>
            <img style={{ width: '7rem', height: '' }} src={map} />
          </div>
          <div className="ml-6 w-full" style={{}}>
            <div className="flex justify-between">
              <div>
                <p className="text-[25px] font-sans font-semibold text-[#000000] ">
                  Rajat Kapoor
                </p>
                <div className="flex justify-center w-24 bg-[#F66B6B] ml-1 mt-[6px] rounded-md h-5">
                  <p className="text-center text-[11px] mt-[3px] text-white font-sans">
                    #0123456789
                  </p>
                </div>
              </div>
              <div />
              <div className="flex mr-36 ">
                <GreenSwitch {...label} defaultChecked />
                {/* <FormGroup>
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

                <div className="mt-2 mr-3 ">
                  <MoreVert />
                </div> */}
              </div>
            </div>

            <div className="flex mt-7 flex justify-between mr-36" style={{}}>
              <div className="ml-2">
                <p className="text-[11px] font-sans font-semibold text-[#66737E] mt-[2px]">
                  Reviewer
                </p>
                <p className="text-[13px] font-sans font-bold text-[#132B6B] mt-[8px]">
                  Abhinandan Banerjee
                </p>
              </div>
              <div className="">
                <p className="text-[11px] font-sans font-semibold text-[#66737E] mt-[2px]">
                  Lead Reviewer
                </p>
                <p className="text-[13px] font-sans font-bold text-[#132B6B] mt-[8px]">
                  Rupesh Bansal
                </p>
              </div>
              <div className="">
                <p className="text-[11px] font-sans font-semibold text-[#66737E] mt-[2px]">
                  Category
                </p>
                <p className="text-[13px] font-sans font-bold text-[#132B6B] mt-[8px]">
                  OTC
                </p>
              </div>
              <div className="">
                <p className="text-[11px] font-sans font-semibold text-[#66737E] mt-[2px]">
                  Department
                </p>
                <p className="text-[13px] font-sans font-bold text-[#132B6B] mt-[8px]">
                  Mining
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between w-full mt-9 " style={{}}>
          <div className="ml-9">
            <Typography className="font-sans flex px-3 mt-3 " style={{color: '#132B6B', fontWeight: '400',}}>
              Select Rule
              <div className="rounded-full ml-4 w-40">
                <select
                  className="w-full font-sans border-2 border-[#0F4C4F] rounded-[20px] h-9 px-3 "
                  style={{
                    color: '#132B6B',
                    fontSize: '18px',
                    fontWeight: '700',
                  }}
                >
                  <option className="ml-2 font-sans" style={{ color: '#132B6B' }}>
                    Rule A
                  </option>
                </select>
                <p
                  className=" absolute rounded-xl w-12 h-5 -mt-7 ml-24 text-white font-sans  px-1"
                  style={{
                    background: '#F66B6B',
                    fontSize: '13px',
                    width: '28px',
                  }}
                >
                  25
                </p>
              </div>
            </Typography>
          </div>

          <div className="mt-3 mr-24">
            <div className="">
              <ArrowBackIosIcon className="ml-2" style={{ fontSize: '1rem' }} />
              <span
                className="ml-4 p-0.5 rounded font-sans"
                style={{
                  backgroundColor: '#ECEDEF',
                  fontSize: '14px',
                  borderRadius: '4px', }}
              >
                5(4)
              </span>

              <span
                className="ml-4 p-0.5 rounded font-sans"
                style={{
                  backgroundColor: '#8EF4D2',
                  fontSize: '14px',
                  borderRadius: '4px',
                }}
              >
                5(4)
              </span>
              <span
                className="ml-4 p-0.5  rounded font-sans "
                style={{
                  backgroundColor: '#CCFF7D',
                  fontSize: '14px',
                  borderRadius: '4px',
                }}
              >
                5(4)
              </span>
              <span
                className="ml-4 p-0.5 rounded font-sans"
                style={{
                  backgroundColor: '#ECEDEF',
                  fontSize: '14px',
                  borderRadius: '4px',
                }}
              >
                5(4)
              </span>

              <ArrowForwardIosIcon
                className="ml-5"
                style={{ fontSize: '1rem' }}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-3 mr-28">
          <span className="flex">
            <FiberManualRecordIcon
              className="font-sans "
              style={{ fontSize: '10px', color: '8EF4D2' }}
            />
            <p
              className="font-sans"
              style={{ fontWeight: '500', fontSize: '10px' }}
            >
              Selected
            </p>
          </span>
          <span className="flex">
            <FiberManualRecordIcon
              className="font-sans"
              style={{ fontSize: '10px', color: 'ECEDEF' }}
            />
            <p
              className="font-sans"
              style={{ fontWeight: '500', fontSize: '10px' }}
            >
              Completed
            </p>
          </span>
          <span className="flex">
            <FiberManualRecordIcon
              className="font-sans"
              style={{ fontSize: '10px', color: 'CCFF7D' }}
            />
            <p
              className="font-sans"
              style={{ fontWeight: '500', fontSize: '10px' }}
            >
              Incomplete
            </p>
          </span>
        </div>
        <Grid
          className="mt-3 ml-6 rounded-t-3xl rounded-b-3xl rounded-lg mr-4"
          style={{ border: '1px solid #EAEAEA' }}
        >
          <div
            className="pt-2 pl-10 "
            style={{
              backgroundColor: '#EAEAEA',
              height: '40px',
              borderRadius: '19px 19px 2px 2px',
              opacity: '0.5',
            }}
          >
            <Typography className="text-[14px] font-sans font-semibold text-[#132B6B] ">
              Section/Rules/ Clause/ Subclause No.{' '}
              <span
                className="ml-2 p-2 font-sans"
                style={{
                  backgroundColor: '#8EF4D2',
                  borderRadius: '4px',
                  width: '10px',
                  height: '1px',
                }}
              >
                5(4)
              </span>
            </Typography>
          </div>
          <div className="mt-4">
            <Typography
              className="text-[18px] font-sans  text-[#132B6B]  pl-10"
              style={{ fontWeight: '500' }}
            >
              Title of the Rules/Regulations
            </Typography>
            <p className="text-[14px] font-sans font-normal text-[#000000] mt-[8px] pl-10 pb-4">
              Electrical Safety Officer
            </p>
          </div>
          <Divider className="mt-2" />
          <div className="mt-4">
            <Typography
              className="text-[18px] font-sans font-extrabold  text-[#132B6B]  pl-10"
              style={{ fontWeight: '500' }}
            >
              Responsibility
            </Typography>
            <p className="text-[14px] font-sans font-normal text-[#000000] mt-[8px] pl-10 pb-4">
              Owner/Agent/Manager
            </p>
          </div>
          <Divider className="mt-2" />

          <div className="mt-4">
            <Typography
              className="text-[18px] font-sans font-extrabold  text-[#132B6B]  pl-10"
              style={{ fontWeight: '500' }}
            >
              Description
            </Typography>
            <p className="text-[14px] font-sans font-normal text-[#000000] mt-[8px] pl-10 pb-4">
              (4) For every factory registered under Factory Act,1948, where
              more than 250 kW of electrical load is connected, the management
              of the factory shall designate a person having qualification
              specified in sub-regulation (2), for ensuring the observance of
              the safety provisions laid under the Act and the regulations made
              thereunder, who shall periodically inspect such installation, get
              them tested and keep a record thereof and such records shall be
              made available to the Electrical Inspector if and when required.
            </p>
          </div>
          <Divider className="mt-2" />
          <div className="mt-4">
            <Typography
              className="text-[18px] font-sans font-extrabold  text-[#132B6B]  pl-10"
              style={{ fontWeight: '500' }}
            >
              Relevant Circulars
            </Typography>
            <p className="text-[14px] font-sans font-normal text-[#000000] mt-[8px] pl-10 pb-4">
              Owner/Agent/Manager
            </p>
          </div>
          <Divider className="mt-2" />
          <div className="mt-4">
            <ManageRemark style={{ border: '1px solid green' }} />
          </div>
        </Grid>
        <div className="mt-16">
          <Typography
            className="text-[10px] font-sans text-[#000000]  pl-10 pb-0"
            style={{ fontWeight: '400' }}
          >
            File Submit by : Rajat Kapoor 24 July, 2020 at 10:30 PM
          </Typography>

          <div className="flex  mb-12 mt-5 ">
            <Button
              className="rounded-full font-sans font-semibold w-56 h-10"
              style={{
                background: '#F66B6B',
                marginLeft: '34px',
                fontSize: '18px',
                borderRadius: '60px',
                color: '#fff'
              }}
            >
              <p className='font-sans'>Generate Report</p>
            </Button>

            <Button
              className="rounded-full font-sans font-semibold w-24"
              style={{
                background: '#F66B6B',
                fontSize: '18px',
                color: '#fff',
                marginLeft: '2%',
                borderRadius: '60px',
              }}
            >
              <p className='font-sans'>Next</p>
            </Button>
          </div>
        </div>

        {/* <div className="flex mt-6">
          <Button
            className="rounded-full "
            style={{
              background: '#F66B6B',
              marginLeft: '34px',
              height: '40px',
              width: '190px',
              borderRadius: '60px',
            }}
          >
            Preview
          </Button>
         
          <Button
            className="rounded-full "
            style={{
              background: '#F66B6B',
              marginLeft: '34px',
              height: '40px',
              width: '190px',
              borderRadius: '60px',
            }}
          >
            Submit & Preview
          </Button>
        </div> */}
      </div>
    </div>
  );
}

DetailsPage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  repos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  onSubmitForm: PropTypes.func,
  username: PropTypes.string,
  onChangeUsername: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  repos: makeSelectRepos(),
  username: makeSelectUsername(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: evt => dispatch(changeUsername(evt.target.value)),
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRepos());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(DetailsPage);
