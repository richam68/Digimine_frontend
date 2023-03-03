import React, { useState, useEffect, memo } from 'react';
import './style.css';
import Button from '@material-ui/core/Button';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { getAdminLocationsAction, validateOtpAction } from './actions';
import reducer from './reducer';
import saga from './saga';
// import userImage from './images/user.jpg';
import userImage from './images/addImage.png';
import { HOST, BASE_PATH, SCHEMES, URL } from '../config.json';

const key = 'loginReducer';

export function SuccessPage(props) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const history = useHistory();

  const [img, setImg] = useState();

  const awtToken = localStorage.getItem('awtToken');

  useEffect(() => {
    // axios.get({
    //   url:`${SCHEMES}://${BASE_PATH}${HOST}/download`,
    //   method:'GET',
    //   Authorization: `Bearer ${awtToken}`,
    //   responseType:'blob'
    // }).then((res)=>{
    //   console.log("image response ====",res)
    //   setImg(res.data);
    // })
  }, []);

  useEffect(() => {}, [props.userName]);
  // const [redirectToChooseLocationPage, setRedirectToChooseLocationPage] = useState(false);

  // if (redirectToChooseLocationPage) {
  //   return <Redirect to={{ pathname: '/location' }} />;
  // }
  const callGetLocationAction = () => {
    history.push('/location');
    // setRedirectToChooseLocationPage(true);
  };

  return (
    <div className="font-sans login_page  py-">
      <div className="container h-full min-h-full relative z-10">
        <div className="flex lg:justify-end justify-center flex-wrap h-full  min-h-full items-center">
          <div className="card bg-white shadow-lg rounded-3xl pt-10 pb-14 px-10 max-w-xl xl:w-1/2 w-full">
            <div className="userImage text-center">
              <img
                src={userImage}
                alt="UserImage"
                className="w-full mx-auto mb-4"
              />
            </div>

            <p
              className=" font-sans text-center font-semibold"
              style={{ fontSize: '16px', color: '#000' }}
            >
              {props.userName}
            </p>
            <h1 className="text-center font-bold font-sans text-3xl mt-14 text_red">
              Login Successful!
            </h1>
            <p
              className=" text-center font-sans font-medium mb-5 text_blue"
              style={{ fontSize: '18px' }}
            >
              You have successfully signed into <br />
              your account
            </p>
            <div className="form_box mt-8 w-full">
              <Button
                className="bg_red  mx-auto   font-sans login_btn  w-60 rounded-3xl my-5"
                onClick={() => callGetLocationAction()}
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="msg_box">
        <div className="container">
          <div className=" lg:mt-0   flex flex-wrap items-end mt-5 pt-5">
            <div className="md:w-1/2 w-full  quote_box md:text-4xl text-2xl font-bold md:mb-0 mb-4">
              <h3 className="text-white font-sans">Smart Platform for</h3>
              <h3 className="text_blue  font-sans">Smart People</h3>
            </div>
            <div className="copyright_text md:w-1/2 w-full md:text-center text-left text-xs font-sans text-white">
              © 2020 MineMagma. All Rights Reserved
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

SuccessPage.propTypes = {
  userName: PropTypes.string,
  // onValidateOtp: PropTypes.func,
};

const mapStateToProps = state => ({
  userName: state.loginReducer.userName,
});

export function mapDispatchToProps(dispatch) {
  return {
    onValidateOtp: data => dispatch(validateOtpAction(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(SuccessPage);
