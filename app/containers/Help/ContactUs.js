import React, { useEffect, useState, memo } from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { withStyles } from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import {
  makeSelectRepos,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';
import CardActions from '@material-ui/core/CardActions';
import {
  Card,
  CardContent,
  FormGroup,
  Typography,
  Divider,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import HomeIcon from '@material-ui/icons/Home';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { makeStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';

const useStyles1 = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '36ch',
    },
  },
}));

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
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

export default function ContactUs() {
  const [value, setValue] = React.useState('female');

  const handleChange = event => {
    setValue(event.target.value);
  };

  const classes = useStyles();
  const classesText = useStyles1();
  const [expanded, setExpanded] = React.useState(false);

  const handleChangeAccordion = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className="content">
      <div className="mx-3 mt-2  w-[95%] h-full">
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
            Contact Us
          </Typography>
        </Breadcrumbs>
        <p
          style={{ color: '#F66B6B', fontSize: '11px' }}
          className=" font-sans ml-14"
        >
          Dashboard |{' '}
          <span className=" font-sans" style={{ color: '#151F63' }}>
            Contact Us{' '}
          </span>
        </p>
        <div className="mt-4 w-full">
          <Divider />
        </div>

        <div className="">
          <div className="mt-12 flex justify-center ">
            <p
              className="font-sans  "
              style={{
                color: '#F66B6B',
                fontWeight: '600',
                fontSize: '24px',
                lineHeight: '24px',
              }}
            >
              We're here to help and answer any question you might have. We look
              forward <br />
              <span
                className="font-sans ml-56   "
                style={{
                  color: '#F66B6B',
                  fontWeight: '600',
                  fontSize: '24px',
                  lineHeight: '24px',
                }}
              >
                {' '}
                to hearing from you.
              </span>
            </p>
          </div>

          <div className="flex mx-11 mt-14 w-full">
            <div className="w-1/2 ml-3">
              <input
                type="text"
                id="fname"
                name="fname"
                className="rounded-full h-[46px] w-3/5 border-2 px-4 font-sans"
                placeholder="First Name"
              />
            </div>
            <div className="w-1/2">
              <input
                type="text"
                id="fname"
                name="fname"
                className="rounded-full h-[46px] w-3/5 border-2 px-4 font-sans"
                placeholder="Last Name"
              />
            </div>
          </div>

          <div className="flex mx-11 mt-10 w-full">
            <div className="w-1/2 ml-3">
              <input
                type="text"
                id="fname"
                name="fname"
                className="rounded-full h-[46px] w-3/5 border-2 px-4 font-sans"
                placeholder="Employee ID"
              />
            </div>
            <div className="w-1/2">
              <input
                type="text"
                id="fname"
                name="fname"
                className="rounded-full h-[46px] w-3/5 border-2 px-4 font-sans"
                placeholder="Email"
              />
            </div>
          </div>

          <div className="ml-14 mt-10">
            <textarea
              id="review"
              name="review"
              rows="2"
              cols="90"
              className="px-4 py-3 w-10/12 h-[120px] border-2 rounded-3xl font-sans"
              style={{ color: '#66737E'}}
            >
              Comments
            </textarea>
          </div>

          <div className="flex justify-center mr-28 mt-8 mb-12">
            <button
              style={{ backgroundColor: '#F66B6B' }}
              className="font-sans w-48 h-[50px] rounded-full text-white font-semibold"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
