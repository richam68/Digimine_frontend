/*
 * Dashboard
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { withStyles } from '@material-ui/core/styles';
// import MoreVertIcon from '@material-ui/icons/MoreVert';
import MoreVert from '@material-ui/icons/MoreVert';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import {
  makeSelectRepos,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';
import {
  Card,
  CardContent,
  Divider,
  FormGroup,
  Typography,
} from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { loadRepos } from '../App/actions';
import { changeUsername } from './actions';
import { makeSelectUsername } from './selectors';
import reducer from './reducer';
import saga from './saga';
import icon1 from './images/card1.png';
import map from './images/map.png';
import graph from './images/graph.png';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import HomeIcon from '@material-ui/icons/Home';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import Link from '@material-ui/core/Link';
const key = 'dashboard';

function Dashboard({
  username,
  loading,
  error,
  repos,
  onSubmitForm,
  onChangeUsername,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    // When initial state username is not null, submit the form to load repos
    if (username && username.trim().length > 0) onSubmitForm();
  }, []);

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

  const reposListProps = {
    loading,
    error,
    repos,
  };

  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    checkedC: true,
  });

  const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <div className="maindash">
      <div className="mx-4 mt-3 w-[95%]">
        <Breadcrumbs
          aria-label="breadcrumb"
          className="font-sans font-bold text-lg"
          style={{ marginLeft: '0px', fontWeight: '600', fontSize: '30px' }}
        >
          <Typography
            sx={{ display: 'flex', alignItems: 'center' }}
            color="text.primary"
            className="font-sans font-bold text-lg"
            style={{
              marginLeft: '30px',
              fontWeight: '500',
              fontSize: '20px',
              color: '#132B6B',
            }}
          >
            <ClearAllIcon sx={{ mr: 0.8 }} fontSize="inherit" />
            Dashboard
          </Typography>
        </Breadcrumbs>
        <p
          style={{ color: '#F66B6B', fontSize: '11px' }}
          className=" font-sans ml-12"
        >
          Dashboard |{' '}
          <span className=" font-sans" style={{ color: '#151F63' }}>
            Dashboard{' '}
          </span>
        </p>
        <div className="mt-4 w-full">
          <Divider />
        </div>

        {/* <div className="-mt-4 flex justify-end">
          <div>
            <NotificationsNoneIcon />
          </div>
        </div> */}
        <div className="flex mt-7">
          <Card
            className="w-[45%] mr-6 ml-6 min-h-68 "
            style={{ borderRadius: '20px' }}
          >
            <CardContent className="flex">
              <img className="mt-3 h-[30%] w-[25%]" src={icon1} />
              <div className="ml-6">
                <Typography>Welcome, User</Typography>
                <div className="mt-6">
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </Typography>{' '}
                </div>
              </div>
            </CardContent>
            <div className="flex">
              <button
                style={{
                  backgroundColor: '#F66B6B',
                  color: 'white',
                  borderRadius: '50px',
                }}
                className="w-1/2 h-10 ml-8 mt-3 font-sans"
              >
                Click Me
              </button>
              <button
                style={{
                  backgroundColor: 'white',
                  border: '1px solid black',
                  color: 'black',
                  borderRadius: '50px',
                }}
                className="w-1/2 h-10 ml-8 mt-3 mr-8 font-sans"
              >
                Click Me
              </button>
            </div>
          </Card>
          <Card className="w-[36%] h-60" style={{ borderRadius: '20px' }} />
        </div>
        <div className="flex mt-3">
          <Card className="w-[39%] h-60 ml-6" style={{ borderRadius: '20px' }}>
            <img className="m-6" src={map} />
          </Card>
          <Card className="w-[50%] ml-6 h-60" style={{ borderRadius: '20px' }}>
            <img className="m-6" src={graph} />
          </Card>
        </div>
        <Card
          className="w-full h-[72px] mt-[41px]"
          style={{ borderRadius: '50px' }}
        >
          <CardContent>
            <div className="flex justify-between">
              <div className="rounded-full h-[36px] w-[36px] ml-3 bg-[#132B6B]">
                <p className="text-white px-2 py-2 font-sans">RK</p>
              </div>
              <div className="">
                <p className="text-[10px] font-sans font-normal text-[#66737E] ">
                  Department
                </p>
                <p className="text-[12px] font-sans font-bold text-[#132B6B] mt-[8px]">
                  Mining
                </p>
              </div>
              <div className="">
                <p className="text-[10px] font-sans font-normal text-[#66737E]">
                  Assign Person
                </p>
                <div className="flex">
                  <p className="text-[13px] font-sans font-bold text-[#132B6B] mt-[8px]">
                    Rajat Kapoor
                  </p>
                  <div className="flex justify-center w-20 bg-[#F66B6B] ml-1 mt-[10px] rounded-md h-4">
                    <p className="text-center text-[10px] mt-[2px] text-white font-sans">
                      #0123456789
                    </p>
                  </div>
                </div>
              </div>
              <div className="">
                <p className="text-[10px] font-sans font-normal text-[#66737E] ">
                  Reviewer
                </p>
                <p className="text-[13px] font-sans font-bold text-[#132B6B] mt-[8px]">
                  Abhinandan Banerjee
                </p>
              </div>
              <div className="">
                <p className="text-[10px] font-sans font-normal text-[#66737E] ">
                  Lead Reviewer
                </p>
                <p className="text-[13px] font-sans font-bold text-[#132B6B] mt-[8px]">
                  Rupesh Bansal
                </p>
              </div>
              <div className="">
                <p className="text-[10px] font-sans font-normal text-[#66737E] ">
                  Category
                </p>
                <p className="text-[13px] font-sans font-bold text-[#132B6B] mt-[8px]">
                  OTC
                </p>
              </div>
              <div className="flex">
                {/* <p className="text-[11px] font-sans font-semibold text-[#66737E] ">
                  Category
                </p> */}
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
                <div className="mt-2 ">
                              <MoreVert  />
                            </div>
              </div>
             
            </div>
          </CardContent>
        </Card>

        <Card
          className="w-full h-[72px] mt-[8px]"
          style={{ borderRadius: '50px' }}
        >
          <CardContent>
            <div className="flex justify-between">
              <div className="rounded-full h-[36px] w-[36px] ml-3 bg-[#132B6B]">
                <p className="text-white px-2 py-2 font-sans">RK</p>
              </div>
              <div className="">
                <p className="text-[10px] font-sans font-normal text-[#66737E] ">
                  Department
                </p>
                <p className="text-[12px] font-sans font-bold text-[#132B6B] mt-[8px]">
                  Mining
                </p>
              </div>
              <div className="">
                <p className="text-[10px] font-sans font-normal text-[#66737E]">
                  Assign Person
                </p>
                <div className="flex">
                  <p className="text-[13px] font-sans font-bold text-[#132B6B] mt-[8px]">
                    Rajat Kapoor
                  </p>
                  <div className="flex justify-center w-20 bg-[#F66B6B] ml-1 mt-[10px] rounded-md h-4">
                    <p className="text-center text-[10px] mt-[2px] text-white font-sans">
                      #0123456789
                    </p>
                  </div>
                </div>
              </div>
              <div className="">
                <p className="text-[10px] font-sans font-normal text-[#66737E] ">
                  Reviewer
                </p>
                <p className="text-[13px] font-sans font-bold text-[#132B6B] mt-[8px]">
                  Abhinandan Banerjee
                </p>
              </div>
              <div className="">
                <p className="text-[10px] font-sans font-normal text-[#66737E] ">
                  Lead Reviewer
                </p>
                <p className="text-[13px] font-sans font-bold text-[#132B6B] mt-[8px]">
                  Rupesh Bansal
                </p>
              </div>
              <div className="">
                <p className="text-[10px] font-sans font-normal text-[#66737E] ">
                  Category
                </p>
                <p className="text-[13px] font-sans font-bold text-[#132B6B] mt-[8px]">
                  OTC
                </p>
              </div>
              <div className="flex">
                {/* <p className="text-[11px] font-sans font-semibold text-[#66737E] ">
                  Category
                </p> */}
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
                <div className="mt-2 ">
                              <MoreVert  />
                            </div>
              </div>
             
            </div>
          </CardContent>
        </Card>

        <Card
          className="w-full h-[72px] mt-[8px]"
          style={{ borderRadius: '50px' }}
        >
          <CardContent>
            <div className="flex justify-between">
              <div className="rounded-full h-[36px] w-[36px] ml-3 bg-[#132B6B]">
                <p className="text-white px-2 py-2 font-sans">RK</p>
              </div>
              <div className="">
                <p className="text-[10px] font-sans font-normal text-[#66737E] ">
                  Department
                </p>
                <p className="text-[12px] font-sans font-bold text-[#132B6B] mt-[8px]">
                  Mining
                </p>
              </div>
              <div className="">
                <p className="text-[10px] font-sans font-normal text-[#66737E]">
                  Assign Person
                </p>
                <div className="flex">
                  <p className="text-[13px] font-sans font-bold text-[#132B6B] mt-[8px]">
                    Rajat Kapoor
                  </p>
                  <div className="flex justify-center w-20 bg-[#F66B6B] ml-1 mt-[8px] rounded-md h-4">
                    <p className="text-center text-[10px] mt-[2px] text-white font-sans">
                      #0123456789
                    </p>
                  </div>
                </div>
              </div>
              <div className="">
                <p className="text-[10px] font-sans font-normal text-[#66737E] ">
                  Reviewer
                </p>
                <p className="text-[13px] font-sans font-bold text-[#132B6B] mt-[8px]">
                  Abhinandan Banerjee
                </p>
              </div>
              <div className="">
                <p className="text-[10px] font-sans font-normal text-[#66737E] ">
                  Lead Reviewer
                </p>
                <p className="text-[13px] font-sans font-bold text-[#132B6B] mt-[8px]">
                  Rupesh Bansal
                </p>
              </div>
              <div className="">
                <p className="text-[10px] font-sans font-normal text-[#66737E] ">
                  Category
                </p>
                <p className="text-[13px] font-sans font-bold text-[#132B6B] mt-[8px]">
                  OTC
                </p>
              </div>
              <div className="flex">
                {/* <p className="text-[11px] font-sans font-semibold text-[#66737E] ">
                  Category
                </p> */}
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
                <div className="mt-2 ">
                              <MoreVert  />
                            </div>
              </div>
             
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}

Dashboard.propTypes = {
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
)(Dashboard);
