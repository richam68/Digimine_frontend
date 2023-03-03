import { TextField, Box, Button } from '@material-ui/core';
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
import { HOST, BASE_PATH, SCHEMES, URL } from '../config.json';

export default function AddSubCategories(props) {
  const [filename, setfilename] = useState('');
  const inputRef = React.useRef(null);

  const handleClick = event => {
    inputRef.current.click();
  };
  const handleFileChange = event => {
    const tempArray = [];
    const fileObj = event.target.files;
    if (!fileObj) {
      return;
    }
    console.log('fileObj is', fileObj);
    for (let i = 0; i < fileObj.length; i++) {
      console.log('fileObj name is', fileObj[i].name, fileObj[i]);
      props.setFileInDialog(fileObj[i]);
      tempArray.push(fileObj[i].name);
    }
    setfilename(tempArray.join());
  };

  return (
    <div>
      <Dialog
        fullWidth={props.fullWidth}
        maxWidth={props.maxWidth}
        style={{
          borderRadius: '50px',
          marginLeft: '1%',
          marginTop: '',
        }}
        {...props.subRuleDialog.props}
        className="w-full h-full "
        onClose={props.closeSubRuleDialog}
      >
        <DialogContent>
          <div className="ml-8 mt-2 w-full mb-12 px-2">
            <div className="flex w-full mt-6">
              <div className="w-11/12">
                <label
                  style={{
                    fontWeight: '500',
                    fontSize: '24px',
                    lineHeight: '1px',
                    color: ' #000000',
                    fontWeight: '700',
                  }}
                  className="font-sans font-normal font-black"
                >
                  Add Sub Rules
                </label>
              </div>

              <div className="-mt-2 ">
                <button className="" onClick={props.closeSubRuleDialog}>
                  {' '}
                  <CloseIcon style={{ color: 'red', fontWeight: '600px' }} />
                </button>
              </div>
            </div>

            <div className="mt-5">
              <div className="flex flex-col mt-10 font-sans ">
                <label
                  className="font-sans font-semibold"
                  style={{
                    color: '#66737E',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                  }}
                >
                  Title of the Rules/Regulations
                  <span style={{ color: 'red', fontSize: '1rem' }}>*</span>
                </label>

                <TextField
                  fullWidth
                  id="standard-basic"
                  // label="Standard"
                  variant="standard"
                  name="title"
                  value={props.subRuleDialog.data.title}
                  onChange={e => props.setDataInSubRule(e)}
                  className="font-sans "
                  style={{ marginTop: '3px', placeholder: '#66737E' }}
                />
              </div>

              <div className="flex flex-col mt-10 font-sans ">
                <label
                  className="font-sans font-semibold"
                  style={{
                    color: '#66737E',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                  }}
                >
                  Name of Sub Rule
                  <span style={{ color: 'red', fontSize: '1rem' }}>*</span>
                </label>
                <TextField
                  fullWidth
                  id="standard-basic"
                  // label="Standard"
                  variant="standard"
                  name="name"
                  value={props.subRuleDialog.data.name}
                  onChange={e => props.setDataInSubRule(e)}
                  className="font-sans "
                  style={{ marginTop: '3px', placeholder: '#66737E' }}
                />
              </div>

              <div className="flex flex-col mt-7 font-sans">
                <label
                  className="font-sans font-semibold"
                  style={{
                    color: '#66737E',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                  }}
                >
                  Responsibility
                  <span style={{ color: 'red', fontSize: '1rem' }}>*</span>
                </label>
                <TextField
                  fullWidth
                  id="standard-basic"
                  // label="Standard"
                  variant="standard"
                  name="responsibility"
                  onChange={e => props.setDataInSubRule(e)}
                  value={props.subRuleDialog.data.responsibility}
                  style={{ marginTop: '3px', placeholder: '#66737E' }}
                />
              </div>
              <div className="font-sans mt-7 flex flex-col">
                <label
                  className="font-sans font-semibold"
                  style={{
                    color: '#66737E',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                  }}
                  for="review"
                >
                  Description
                </label>

                <textarea
                  style={{ color: '#66737E', fontSize: '12px' }}
                  className="font-sans mt-3 border-2 border-gray-300 items-center"
                  id="review"
                  name="description"
                  value={props.subRuleDialog.data.description}
                  rows="4"
                  cols="50"
                  onChange={e => props.setDataInSubRule(e)}
                />
              </div>

              <div className="flex flex-col mt-7 font-sans">
                <label
                  className="font-sans font-semibold"
                  style={{
                    color: '#66737E',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                  }}
                >
                  Relevant Circulars
                </label>
                {/* <TextField fullWidth
                  id="standard-basic"
                  // label="Standard"
                  variant="standard"
                  name="filename"
                  //onChange={(e) => props.setDataInSubRule(e)}
                  value={filename}
                  className="font-sans"
                  style={{ marginTop: '3px', placeholder: '#66737E' }}
                /> */}
                {props.subRuleDialog.data.file.length > 0 ? (
                  props.subRuleDialog.data.file.map((file, f) => (
                    <div class="flex">
                      <span style={{ fontSize: '1rem' }} className="flex">
                        {file.name},{' '}
                      </span>
                    </div>
                  ))
                ) : (
                  <TextField
                    fullWidth
                    id="standard-basic"
                    // label="Standard"
                    variant="standard"
                    name="filename"
                    // onChange={(e) => props.setDataInSubRule(e)}
                    // value={filename}
                    className="font-sans"
                    style={{ marginTop: '3px', placeholder: '#66737E' }}
                  />
                )}

                <input
                  type="file"
                  name="file"
                  multiple
                  style={{ display: 'none' }}
                  ref={inputRef}
                  onChange={handleFileChange}
                />
              </div>

              <div className="font-sans mt-9">
                <p
                  className="font-sans font-semibold"
                  style={{
                    color: '#66737E',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                  }}
                >
                  Attachment Circulars
                  <button
                    className="font-sans mt-5 flex w-36 h-9 text-white rounded-full flex justify-center"
                    style={{ background: '#132B6B' }}
                    onClick={e => handleClick(e)}
                  >
                    <p className="mt-2 font-sans">Browse</p>
                  </button>
                </p>
              </div>
            </div>
            <br />
            <span
              style={{ color: 'red', fontSize: '1rem' }}
              className="mt-12 mb-2"
            >
              {props.addSubRuleMsgErr.length > 1
                ? props.addSubRuleMsgErr
                : null}
            </span>
            <div className="mt-12 mb-12 ">
              <Button
                className="bg_red  font-bold login_btn mt-7  w-56 h-12 rounded-full   "
                style={{ borderRadius: '50px' }}
                onClick={() =>
                  props.createSubRuleInCategory(props.subRuleDialog.data)
                }
              >
                <p
                  className="font-sans font-bold text-lg"
                  style={{ color: '#fff' }}
                >
                  Create Sub Rules
                </p>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
