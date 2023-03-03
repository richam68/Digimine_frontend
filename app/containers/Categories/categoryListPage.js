import {
  TextField,
  Box,
  Button,
  Card,
  CardContent,
  FormGroup,
  Typography,
} from '@material-ui/core';
import React, { useState, memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import MSelect from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import CloseIcon from '@material-ui/icons/Close';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
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
import AddSubCategory from './subCategories';

export default function CategoryListPage(props) {
  return (
    <div className="mt-8 ml-3 w-11/12 font-sans">
      <div className={props.classes.root}>
        <Accordion
          expanded={props.expanded === props.index}
          onChange={props.handleChange(props.index)}
          className=" font-sans "
          style={{ borderRadius: '30px' }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            className="flex"
          >
            <Typography
              className={props.classes.heading}
              style={{ display: 'inline-flex' }}
            >
              <button
                className="font-sans flex w-36 h-8 text-white rounded-full flex justify-center"
                style={{ background: '#132B6B' }}
              >
                <AddIcon
                  className="mt-1 "
                  onClick={() =>
                    props.handleOpenSubRuleDialog({
                      ruleId: props.list.id,
                      index: props.index,
                    })
                  }
                />
                <p className="mt-1 font-sans">Add Sub Rule</p>
              </button>

              <div className="flex ml-6 mt-1 font-sans">
                <div className="flex">
                  <p
                    className="w-20 font-sans"
                    style={{
                      color: '#132B6B',
                      fontSize: '16px',
                      fontWeight: '700',
                    }}
                  >
                    {' '}
                    {props.list.name}
                  </p>
                  <p
                    className="rounded-full h-6 m-1 px-1 text-white font-sans items-center "
                    style={{
                      background: '#F66B6B',
                      fontSize: '12px',
                      width: '28px',
                    }}
                  >
                    <p className="mx-2 my-1 font-sans">
                      {props.list.subRuleResponses.length}
                    </p>
                  </p>
                </div>
                <div className="ml-6 flex w-full ">
                  {props.list.subRuleResponses.length > 0 ? (
                    <ChevronLeftIcon style={{ color: '#36454F' }} />
                  ) : null}
                  {props.list.subRuleResponses.map((subrule, i) => (
                    <div>
                      <div
                        className="border-2 flex w-12 h-7 flex justify-center font-sans "
                        style={{
                          color: '#36454F',

                          borderRadius: '4px',
                        }}
                        onClick={() =>
                          props.getDetailOfSubRule(
                            props.list.id,
                            subrule.id,
                            props.index,
                          )
                        }
                      >
                        {subrule.name}
                      </div>
                    </div>
                  ))}
                  {props.list.subRuleResponses.length > 0 ? (
                    <ChevronRightIcon />
                  ) : null}
                </div>
              </div>
            </Typography>
          </AccordionSummary>

          {props.subRuleDetail ? (
            props.subRuleDetail.length > 0 ? (
            // props.subRuleDetail[0].ruleId === props.list.id ?

              <AccordionDetails>
                <Typography>
                  <div className="">
                    <p
                      className="font-sans h-9 px-4 py-1 flex justify-start -ml-4"
                      style={{ backgroundColor: '#F5F5F5', width: '248%' }}
                    >
                      {' '}
                      <Breadcrumbs
                        aria-label="breadcrumb"
                        style={{
                          color: '#132B6B',
                          fontWeight: '600',
                          fontSize: '14px',
                        }}
                        className="font-sans "
                      >
                        <Link
                          color="inherit"
                          href="/"
                          onClick={props.handleClick}
                          className="font-sans "
                        >
                          Section
                        </Link>
                        <Link
                          color="inherit"
                          href="/getting-started/installation/"
                          onClick={props.handleClick}
                          className="font-sans"
                        >
                          Rules
                        </Link>
                        <Link
                          color="inherit"
                          href="/getting-started/installation/"
                          onClick={props.handleClick}
                          className="font-sans"
                        >
                          Clause
                        </Link>
                        <Typography color="textPrimary" className="font-sans">
                          SubClause No.
                        </Typography>
                      </Breadcrumbs>
                      <p
                        className="w-10 h-6 px-1  ml-2 font-sans"
                        style={{
                          background: '#8EF4D2',
                          color: '#36454F',
                          borderRadius: '4px',
                        }}
                      >
                        {props.subRuleDetail[0].name}
                      </p>
                    </p>

                    <div className="m-4">
                      <div className="mt-7">
                        <p
                          className="font-sans"
                          style={{
                            color: ' #132B6B',
                            fontSize: '18px',
                            fontWeight: '600',
                          }}
                        >
                          Title of the Rules and Regulations
                        </p>
                        <p
                          className="font-sans"
                          style={{
                            fontSize: '14px',
                            color: '#000000',
                            fontWeight: '400',
                          }}
                        >
                          {props.subRuleDetail[0].subRuleTitle}
                        </p>
                      </div>
                      <hr />
                      <div className="mt-7 font-sans">
                        <p
                          className="font-sans"
                          style={{
                            color: ' #132B6B',
                            fontSize: '18px',
                            fontWeight: '600',
                          }}
                        >
                          Responsibility
                        </p>
                        <Breadcrumbs aria-label="breadcrumb">
                          <Link
                            color="inherit"
                            href="/"
                            onClick={props.handleClick}
                            className="font-sans"
                            style={{
                              fontSize: '14px',
                              color: '#000000',
                              fontWeight: '400',
                            }}
                          >
                            {props.subRuleDetail[0].responsibility}
                          </Link>
                        </Breadcrumbs>
                      </div>
                      <hr />
                      <div className="mt-7">
                        <p
                          className="font-sans"
                          style={{
                            color: ' #132B6B',
                            fontSize: '18px',
                            fontWeight: '600',
                          }}
                        >
                          Description
                        </p>
                        <p
                          className="font-sans"
                          style={{
                            fontSize: '14px',
                            color: '#000000',
                            fontWeight: '400',
                          }}
                        >
                          {props.subRuleDetail[0].description}
                        </p>
                      </div>
                      <hr />
                      <div className="mt-7">
                        <p
                          className="font-sans"
                          style={{
                            color: ' #132B6B',
                            fontSize: '18px',
                            fontWeight: '600',
                          }}
                        >
                          Revelant Circular
                        </p>
                        <p
                          className="font-sans"
                          style={{
                            fontSize: '14px',
                            color: '#000000',
                            fontWeight: '400',
                          }}
                        >
                          {props.subRuleDetail[0].circular}
                        </p>
                      </div>
                    </div>
                  </div>
                </Typography>
              </AccordionDetails>
            ) : null
          ) : null}
        </Accordion>
        <span style={{ color: 'red', fontSize: '1rem' }}>
          {props.list.errMsg ? props.list.errMsg : null}
        </span>
      </div>
      {/* <Dialog
                fullWidth={props.fullWidth}
                maxWidth={props.maxWidth}
                style={{
                  borderRadius: '50px',
                  marginLeft: '1%',
                  marginTop: '',
                }}
                className="w-full h-full "
                open={props.showSubCategory}
                onClose={props.handleCloseBtn}
              >
                <DialogContent
                  className="flex justify-start"
                >
                  <AddSubCategory
                    parentRule={props.list.id}
                    departmentList={props.departmentLisInCategory}
                    createSubRuleInCategory={props.createSubRuleInCategory}
                    handleCloseBtn={props.handleCloseBtn}
                  />
                </DialogContent>
              </Dialog> */}
      <AddSubCategory
        closeSubRuleDialog={props.closeSubRuleDialog}
        createSubRuleInCategory={props.createSubRuleInCategory}
        fullWidth={props.fullWidth}
        maxWidth={props.maxWidth}
        subRuleDialog={props.subRuleDialog}
        setDataInSubRule={props.setDataInSubRule}
        addSubRuleMsgErr={props.addSubRuleMsgErr}
        setFileInDialog={props.setFileInDialog}
      />
    </div>
  );
}
