/*
 * Categories
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useEffect, useState, memo } from 'react';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import Link from '@material-ui/core/Link';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import {
  makeSelectRepos,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';
import { Card } from '@material-ui/core';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import axios from 'axios';
import { loadRepos } from '../App/actions';
import { changeUsername } from './actions';
import { makeSelectUsername } from './selectors';
import reducer from './reducer';
import saga from './saga';
import photo from './image/profilepic.png';
import { getUserProfileDetail } from '../LoginPage/actions';

const key = 'categories';

export function Categories({
  username,
  loading,
  error,
  repos,
  onSubmitForm,
  onChangeUsername,
  userProfileData,
  getUserProfileDetail,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    // When initial state username is not null, submit the form to load repos
    if (username && username.trim().length > 0) onSubmitForm();
  }, []);

  useEffect(() => {
    getUserProfileDetail();
    const awtToken = localStorage.getItem('awtToken');
    axios({
      method: 'GET',
      url: 'http://13.232.217.210:15000/api/download',
      headers: {
        Authorization: `Bearer ${awtToken}`,
        'Content-Type': 'application/json',
      },
      responseType: 'blob',
    })
      .then(response => {
        console.log('here in useEffect profile1===', response);
        const blobURL = URL.createObjectURL(response.data);
        console.log('here in useEffect profile2===', blobURL);
        const reader = new FileReader();
        reader.readAsDataURL(response.data);
        reader.onloadend = function() {
          const base64String = reader.result;
          console.log('Base64 String - ', base64String);
          console.log(
            'Base64 String without Tags- ',
            base64String.substr(base64String.indexOf(', ') + 1),
          );
          setsrcBase64(base64String.substr(base64String.indexOf(', ') + 1));
        };
      })
      .catch(error => {
        console.error(error);
      });
  });

  const [srcBase64, setsrcBase64] = useState();
  // const reposListProps = {
  //   loading,
  //   error,
  //   repos,
  // };

  const [anchorEl, setAnchorEl] = useState(null);
  const [anchor, setAnchor] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseAdd = () => {
    setAnchor(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const openAdd = Boolean(anchor);
  const idAdd = openAdd ? 'simple-popover' : undefined;

  return (
    <div className="content ">
      <div className="w-full">
        <div className="ml-8 pt-1 ">
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
              Profile
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
              Dashboard /
            </Link>
            <Link
              color="textPrimary"
              href="/components/breadcrumbs/"
              onClick={handleClick}
              aria-current="page"
              className="font-sans"
            >
              profile
            </Link>
          </p>
          <br />
          <hr />
          <div className="flex justify-center mb-6">
            <Card
              className="mt-12  w-2/5 h-full flex justify-center "
              style={{
                boxShadow: '0px 4px 40px rgba(108, 108, 108, 0.3)',
                borderRadius: '25px',
              }}
            >
              <CardContent className="mt-6">
                <CardContent className="flex justify-center ">
                  <img
                    className="h-24"
                    src={srcBase64}
                    style={{ borderRadius: '50%' }}
                  />
                  <div
                    className=" absolute ml-20 mt-14 w-8 h-8  rounded-full"
                    style={{ background: '#F66B6B' }}
                  >
                    <PhotoCameraIcon
                      className="ml-1"
                      style={{ marginTop: '4px', color: '#fff' }}
                    />
                  </div>
                </CardContent>
                <CardContent className="">
                  <p className="flex justify-center text-[24px] font-sans font-bold">
                    {userProfileData.name}
                  </p>
                  <div className=" flex justify-center mt-3 ml-7 w-44  bg-[#F66B6B] rounded-md ">
                    <p
                      className="text-center text-sm text-white font-sans font-semibold"
                      style={{ fontSize: '12px' }}
                    >
                      Employee ID {userProfileData.employeeId}
                    </p>
                  </div>
                </CardContent>
                <p
                  className="text-[#66737E] flex justify-center mt-5 font-sans font-semibold"
                  style={{ fontSize: '12px' }}
                >
                  Phone
                </p>
                <p className="text-[#132B6B] m-1 flex justify-center font-sans text-md font-bold">
                  {userProfileData.mobileNumber}
                </p>
                <p
                  className="text-[#66737E] flex justify-center mt-4 font-sans font-semibold"
                  style={{ fontSize: '12px' }}
                >
                  Department
                </p>
                <p className="text-[#132B6B] m-1 flex justify-center font-sans text-md font-bold">
                  Mining
                </p>
                <p
                  className="text-[#66737E] flex justify-center mt-4 font-sans text-xs font-semibold"
                  style={{ fontSize: '12px' }}
                >
                  Email Address
                </p>
                <p className="text-[#132B6B] m-1 flex justify-center font-sans text-md font-bold mb-10">
                  {userProfileData.emailId}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

Categories.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  repos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  onSubmitForm: PropTypes.func,
  username: PropTypes.string,
  onChangeUsername: PropTypes.func,
};

// const mapStateToProps = createStructuredSelector({
//   repos: makeSelectRepos(),
//   username: makeSelectUsername(),
//   loading: makeSelectLoading(),
//   error: makeSelectError(),
// });

const mapStateToProps = state => ({
  userProfileData: state.loginReducer.userProfileData,
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: evt => dispatch(changeUsername(evt.target.value)),
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRepos());
    },
    getUserProfileDetail: () => dispatch(getUserProfileDetail()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Categories);
