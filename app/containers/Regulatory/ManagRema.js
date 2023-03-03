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

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Divider from '@material-ui/core/Divider';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import {
  Button,
  Card,
  CardContent,
  FormGroup,
  Typography,
} from '@material-ui/core';

import { makeStyles, styled, alpha } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
// import { makeStyles } from '@material-ui/core/styles';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import { green } from '@material-ui/core/colors';
import map from './image/map.png';
import photo from './image/profilepic.png';
import Users from './Users';
import saga from './saga';
import reducer from './reducer';
import { makeSelectUsername } from './selectors';
import { changeUsername } from './actions';
import { loadRepos } from '../App/actions';

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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

function MangRemark({}) {
  useEffect(() => {
    // When initial state username is not null, submit the form to load repos
  }, []);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const label = { inputProps: { 'aria-label': 'Switch demo' } };

  return (
    <div>
      <div className=" mt-8   w-[100%] ">
        <div className="flex  mt-2 mb-6">
          <Typography
            className="text-[18px] w-full font-sans font-bold  text-[#132B6B] pl-9"
            style={{ fontWeight: '500' }}
          >
            Management Remarks
          </Typography>
          <div className="flex  w-full mr-7">
            <Typography
              className="text-[18px] w-full font-sans font-bold  text-[#132B6B] flex justify-end  "
              // style={{ paddingLeft: '46rem' }}
              style={{ fontWeight: '500' }}
            >
              Status Of The Conformity
              {/* <Switch className="" style={{ textAlign: 'center' }} /> */}
              <GreenSwitch {...label} defaultChecked />
            </Typography>
          </div>
        </div>
        <Grid
          className="ml-10 w-11/12"
          style={{ border: '2px solid #EAEAEA', borderRadius: '10px' }}
        >
          <div className="flex ml-2 mt-4 mb-4">
            <Card
              className=" ml-1"
              style={{ width: '100px', height: '120px' }}
            />
            <Card
              className="ml-11"
              style={{ width: '100px', height: '120px' }}
            />
            <Card
              className="ml-11"
              style={{ width: '100px', height: '120px' }}
            />
            <Card
              className="ml-11"
              style={{ width: '100px', height: '120px' }}
            />
            <Card
              className="ml-11"
              style={{ width: '100px', height: '120px' }}
            />
            <Card
              className="ml-11"
              style={{ width: '100px', height: '120px' }}
            />
            <Card
              className="ml-11"
              style={{ width: '100px', height: '120px' }}
            />
          </div>

          <Divider />
          <div className="flex mt-4 mb-4">
            <Card
              className=" ml-11"
              style={{ width: '100px', height: '120px' }}
            >
              <Button className="mt-4 ml-2 pl-2 pt-4">View</Button>
            </Card>
            <Card
              className="ml-11"
              style={{ width: '100px', height: '120px' }}
            />
            <Card
              className="ml-11"
              style={{ width: '100px', height: '120px' }}
            />
            <Card
              className="ml-11"
              style={{ width: '100px', height: '120px' }}
            />
            <Card
              className="ml-11"
              style={{ width: '100px', height: '120px' }}
            />
            <Card
              className="ml-11"
              style={{ width: '100px', height: '120px' }}
            />
            <Card
              className="ml-11"
              style={{ width: '100px', height: '120px' }}
            />
          </div>
        </Grid>

        <div className="flex justify-between mt-8 mr-12 ">
          <Typography
            className="text-[18px] font-sans  text-[#132B6B] pl-9"
            style={{ fontWeight: '600' }}
          >
            Level of Non-conformity
          </Typography>
          <Typography
            className=" text-[14px] font-sans  text-[#132B6B] "
            style={{ fontWeight: '400' }}
          >
            Major
          </Typography>
        </div>
        <div className="mt-16">
          <Typography
            className="text-[18px] font-sans text-[#132B6B] pl-10  "
            style={{ fontWeight: '500' }}
          >
            Remarks
          </Typography>
          <p
            className=" text-[14px] font-sans text-[#000000] mt-[12px] pl-10  pb-4"
            style={{ lineHeight: '24px', fontWeight: '400' }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            tincidunt velit vel nisl eleifend suscipit. Pellentesque nisl
            sapien, commodo vitae mollis quis, auctor vitae massa.In enim sem,
            aliquet vel elementum ornare, venenatis eget turpis. Cras egestas
            sodales fermentum.
          </p>

          <p
            className=" pl-10 text-[11px] font-sans"
            style={{
              color: '#9FA1A1',
              fontWeight: '600',
              lineHeight: '14.3px',
              textTransform: 'capitalize',
            }}
          >
            Oct 24, 2019
          </p>
        </div>

        <div
          className="mt-14 ml-10 w-11/12 h-72 rounded-lg mb-10 font-sans"
          style={{ backgroundColor: '#F7F8FA' }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="on"
            indicatorColor="primary"
            textColor="primary"
            aria-label="scrollable force tabs example"
            className="font-sans "
          >
            <Tab
              className="font-sans "
              style={{
                color: '#132B6B',
                fontWeight: '600',
                fontFamily: 'sans-serif',
              }}
              label="Reviewer Feedback"
              {...a11yProps(0)}
            />
            <Tab
              className="font-sans"
              style={{ color: '#132B6B', fontWeight: '600' }}
              label="Lead Reviewer Feedback"
              {...a11yProps(1)}
            />
          </Tabs>

          <Card
            className=" ml-9 mr-9 mb-6"
            style={{ backgroundColor: '#F7F8FA' }}
          >
            <TabPanel value={value} index={0} className="ml-2 mt-6">
              <div className="mt-8">
                <Typography className="text-[18px] font-sans font-bold text-[#132B6B]  ">
                  Reviewer Remarks
                </Typography>
                <p
                  className="text-[14px] font-sans text-[#000000] mt-[8px] pb-4"
                  style={{ lineHeight: '24px', fontWeight: '400' }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  tincidunt velit vel nisl eleifend suscipit. Pellentesque nisl
                  sapien, commodo vitae mollis quis, auctor vitae massa.In enim
                  sem, aliquet vel elementum ornare, venenatis eget turpis. Cras
                  egestas sodales fermentum.
                </p>

                <p
                  className="text-[11px] font-sans"
                  style={{
                    color: '#9FA1A1',
                    fontWeight: '600',
                    lineHeight: '14.3px',
                    textTransform: 'capitalize',
                  }}
                >
                  Oct 24, 2019
                </p>
              </div>
            </TabPanel>
            <TabPanel value={value} index={1} className="ml-10">
              <div className="mt-8">
                <Typography className="text-[18px] font-sans font-bold text-[#132B6B]  pl-4">
                  Reviewer
                </Typography>
                <p className="text-[14px] font-sans font-normal text-[#000000] mt-[8px] pl-4 pb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  tincidunt velit vel nisl eleifend suscipit. Pellentesque nisl
                  sapien, commodo vitae mollis quis, auctor vitae massa.In enim
                  sem, aliquet vel elementum ornare, venenatis eget turpis. Cras
                  egestas sodales fermentum.
                </p>

                <p className="  font-sans">Oct 24, 2019</p>
              </div>
            </TabPanel>
          </Card>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  repos: makeSelectRepos(),
  username: makeSelectUsername(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {};
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(MangRemark);
