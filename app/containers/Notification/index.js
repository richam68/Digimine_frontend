/*
 * Help
 *
 * This is the first thing users see of our App, at the '/' route
 */

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
import { Card, CardContent, FormGroup, Typography, Divider } from '@material-ui/core';
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

import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';

const useStyles = makeStyles((theme) => ({
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



export default function Notification() {

  const [value, setValue] = React.useState('female');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChangeAccordion = (panel) => (event, isExpanded) => {
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
            Notification
          </Typography>
        </Breadcrumbs>
        <p
          style={{ color: '#F66B6B', fontSize: '11px' }}
          className=" font-sans ml-14"
        >
          Dashboard |{' '}
          <span className=" font-sans" style={{ color: '#151F63' }}>
            List{' '}
          </span>
        </p>
        <div className="mt-4 w-full">
          <Divider />
        </div>

      <div className='mt-7 ml-4 flex'>
      <FormControl component="fieldset" >
      
      <RadioGroup   aria-label="gender" name="gender1" value={value} onChange={handleChange}>
        <FormControlLabel
        className='font-sans flex'
       
         value="selectAll" control={<Radio />} />
      
      </RadioGroup>
    </FormControl>
    <p className='mt-3 -ml-3 font-sans'   style={{color: '#36454F', fontSize: '13px', fontWeight: '600'}} >Select All</p>
      </div>


              <div className='mt-5 ml-2'>
                <Card
                  className="w-full rounded-full h-[76px]"
                  style={{ borderRadius: '30px',background: '#FAF9F9',border: "1px solid #EAEAEA" }}
                >
                  <CardContent className="justify-center">
                  <div className=' flex '>
                  <FormControl component="fieldset">
      
      <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
        <FormControlLabel value="selectAll" control={<Radio />}  />
       
      </RadioGroup>
    </FormControl>

    <p className='flex-col  '>
    <p className='font-sans mb-2' style={{color: '#132B6B', fontWeight: '700', fontSize: '15px'}}>Lorem Ipsum</p>
      <p className='font-sans' style={{color: '#7C8C96', fontWeight: '400', fontSize: '13px'}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
    </p>
                  </div>
                  </CardContent>
                  <CardActions />
                </Card>
              </div>

              <div className='mt-5 ml-2'>
                <Card
                  className="w-full rounded-full h-[76px]"
                  style={{ borderRadius: '30px',background: '#FAF9F9',border: "1px solid #EAEAEA" }}
                >
                  <CardContent className="justify-center">
                  <div className=' flex '>
                  <FormControl component="fieldset">
      
      <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
        <FormControlLabel value="selectAll" control={<Radio />}  />
       
      </RadioGroup>
    </FormControl>

    <p className='flex-col  '>
    <p className='font-sans mb-2' style={{color: '#132B6B', fontWeight: '700', fontSize: '15px'}}>Lorem Ipsum</p>
      <p className='font-sans' style={{color: '#7C8C96', fontWeight: '400', fontSize: '13px'}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
    </p>
                  </div>
                  </CardContent>
                  <CardActions />
                </Card>
              </div>

    
      </div>
    </div>
  );
}

