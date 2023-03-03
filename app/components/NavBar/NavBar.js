import React, { useState, memo } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import './NavBar.css';
import { IconContext } from 'react-icons';
import Button from '@material-ui/core/Button';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import nav from './Image/navTop.png';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import { getUserLogout } from './action';
import navImage from './Image/dashboard.svg';
import logo from '../../images/logo.svg';
import { SidebarData } from './SidebarData';
import Badge from '@material-ui/core/Badge';
import reducer from './reducer';
import saga from './saga';
import { setOtpAction } from '../../containers/LoginPage/actions';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import {Card, CardContent, CardActions } from '@material-ui/core';



const key = 'navReducer';
const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

export function NavBar({ setNavBar, getUserLogout, setOtpAction, signOut }) {
  const history = useHistory();

  const showAllNotifications = () => {
    const path = `/notification`;
    history.push(path);
    setAnchorEl(null);
  }

  const routeChange = () => {
    const path = `/myprofile`;
    history.push(path);
  };

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const [anchorEl, setAnchorEl] = useState(null);
  const userLogout = () => {
    console.log('Logging out');
    signOut();
    const path = `/`;
    history.push(path);
    setNavBar(false);
    // setOtpAction(false);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <>
      <IconContext.Provider value={{ color: '#F66B6B' }}>
        <div>
          <div className="header">
            <div className="  w-full font-sans">
              {/* <Link to="#" className='menu-bars'> */}
              {/* <p onClick={showSidebar} >
                    </p> */}
              {/* <img src={logo} style={{ width: '180px', height: '60px' }} />
                    </Link> */}
            </div>
            <div className="flex w-full justify-end mr-6 mb-6 fixed -mt-6 navbar pr-10 pt-10">
              <Badge badgeContent={4} color="primary" onClick={handleClick} className='pointer'>
                <NotificationsNoneIcon color="action"  />
              </Badge>
            </div>
          </div>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            style={{
              borderRadius: '15px',
              overflow: 'auto',
              // background: '#FFFFFF',
              // boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.15)'
            }}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            className="  h-full"
          >
            <div className="p-2 m-2 font-sans ">
              <div className="flex justify-between">
                <p
                  style={{
                    color: ' #000000',
                    fontWeight: '700',
                    fontSize: '16px',
                  }}
                  className="font-sans"
                >
                  Notification List
                </p>
                <p
                  className="font-sans ml-12 pointer"
                  style={{
                    color: '#F66B6B',
                    fontWeight: '400',
                    fontSize: '15px',
                  }}
                >
                  Mark All as Read
                </p>
              </div>

              <div className="mt-2  w-full">
                <Card
                  className=" mr-6 rounded-full h-[76px]"
                  style={{
                    borderRadius: '30px',
                    background: '#FAF9F9',
                    border: '1px solid #EAEAEA',
                  }}
                >
                  <CardContent className="justify-center ">
                    <p className="flex-col  ">
                      <p
                        className="font-sans mb-2"
                        style={{
                          color: '#000000',
                          fontWeight: '600',
                          fontSize: '14px',
                        }}
                      >
                        Lorem Ipsum dolar
                        <span
                          className="font-sans"
                          style={{
                            color: '#000000',
                            fontWeight: '500',
                            fontSize: '14px',
                          }}
                        >
                          commented on your post
                        </span>
                      </p>
                      <p
                        className="font-sans"
                        style={{
                          color: '#93A1AC',
                          fontWeight: '500',
                          fontSize: '13px',
                          lineHeight: '14px',
                        }}
                      >
                        4 hours ago
                      </p>
                    </p>
                  </CardContent>
                  <CardActions />
                </Card>
              </div>

              <div className="mt-1  w-full">
                <Card
                  className=" mr-6 rounded-full h-[76px]"
                  style={{
                    borderRadius: '30px',
                    background: '#FAF9F9',
                    border: '1px solid #EAEAEA',
                  }}
                >
                  <CardContent className="justify-center ">
                    <p className="flex-col  ">
                      <p
                        className="font-sans mb-2"
                        style={{
                          color: '#000000',
                          fontWeight: '600',
                          fontSize: '14px',
                        }}
                      >
                        Lorem Ipsum dolar
                        <span
                          className="font-sans"
                          style={{
                            color: '#000000',
                            fontWeight: '500',
                            fontSize: '14px',
                          }}
                        >
                          commented on your post
                        </span>
                      </p>
                      <p
                        className="font-sans mt-2"
                        style={{
                          color: '#93A1AC',
                          fontWeight: '500',
                          fontSize: '13px',
                          lineHeight: '14px',
                        }}
                      >
                        4 hours ago
                      </p>
                    </p>
                  </CardContent>
                  <CardActions />
                </Card>
              </div>

              <div className="w-full font-sans mt-2 ">
                <button
                  style={{ backgroundColor: '#F66B6B' }}
                  className="font-sans w-full h-[40px] rounded-full text-white font-semibold"
                  onClick={showAllNotifications}
                >
                  See all
                </button>
              </div>
            </div>
          </Popover>

          <nav style={{}} className={sidebar ? 'nav-menu active' : 'nav-menu'}>
            {/* <div className='nav-menu-items '>
                        <Link to="#" >
                            <img src={logo} style={{ width: '180px', height: '60px' }} />
                        </Link>
                    </div> */}

            <ul className="nav-menu-items font-sans ">
              <li className="navbar-toggle font-sans mb-5 mt-8">
                <Link to="#" className="menu-bars   font-sans">
                  <div className="-mt-3 -ml-6 mb-2">
                    <img src={nav} />
                  </div>
                  <img
                    src={logo}
                    style={{
                      width: '160px',
                      height: '50px',
                      marginLeft: '-3px',
                    }}
                  />
                </Link>
              </li>

              {SidebarData.map((item, index) => (
                <li key={index} className={item.cName}>
                  <Link className="font-sans" to={item.path}>
                    {item.icons}
                    <span className="font-sans">{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* <div className='mt-12  flex justify-end' style={{float: "right"}}>
        <div>
          <NotificationsNoneIcon />
          </div></div> */}

            <div
              className=" font-sans fixed "
              style={{
                // top: '425px',
                height: '150px',
                width: '210px',
                // right: '13px',

                bottom: '0',
                left: '0',
              }}
            >
              <img src={navImage} />

              <div
                className=" absolute -mt-40 bg-white rounded-full w-36  h-12 font-sans "
                style={{
                  marginLeft: '10px',
                  alignSelf: 'center',
                  alignContent: 'center',
                  justifyItems: 'center',
                }}
              >
                <div className="flex mb-1">
                  <div
                    className=" mt-3 h-[30px] w-[40px] ml-3 bg-[#132B6B]"
                    style={{ borderRadius: '40px' }}
                    onClick={routeChange}
                  >
                    <p className="text-white px-2 py-1 font-sans">RK</p>
                  </div>
                  <Button
                    className=" font-sans "
                    style={{
                      color: '#000000',
                      // alignContent: 'center',
                      // justifyItems: 'center',
                      fontWeight: '700',
                      fontSize: '11px'
                    }}
                    onClick={routeChange}
                  >
                    <p
                      className="font-sans font-normal -ml-4 py-2 dashboard_btn  "
                      style={{ color: '#000000',   fontWeight: '700',
                      fontSize: '11px'}}
                    >
                      My Profile
                    </p>
                  </Button>
                </div>
                <div className="-mt-12 rounded-full h-[45px] w-[49px] ml-40 bg-[#fff]  pointer ">
                  <PowerSettingsNewIcon
                    className="mt-2 ml-3 "
                    style={{color: '#F66B6B'}}
                    onClick={() => userLogout()}
                  />
                </div>
                <div className=" font-sans px-1 ">
                  <p
                    className="font-sans font-normal text-sm   mt-1"
                    style={{ color: '#fff' }}
                  >
                    © minemagma 2020.
                    <br />
                    <span
                      className="font-sans  "
                      style={{ color: '#fff', fontSize: '12px', fontWeight: '300' }}
                    >
                      {' '}
                      All Rights Reserved
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </IconContext.Provider>
    </>
  );
}

NavBar.propTypes = {
  // otp: PropTypes.string,
  getUserLogout: PropTypes.func,
};

const mapStateToProps = state => ({
  // otp: state.loginReducer.otp
});

export function mapDispatchToProps(dispatch) {
  return {
    getUserLogout: () => dispatch(getUserLogout()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(NavBar);
