import React, { useState, useEffect } from 'react';
import logoIcon from './images/logo.svg';
import backgroundImage from './images/splashScreen.png';
import logo from './images/logoSplash.png';
import Login from './LoginPage';
import './style.css';


export default function SplashScreen() {
  const [showView, setShowView] = useState();
  const [a, setA] = useState(true);
  useEffect(() => {
    setTimeout(splash, 3000);
  }, []);
  const splash = () => {
    setA(false);
  };

  return a ? (
    <div>
      <div className=" fixed bg-white w-full h-screen relative">
      <img 
      className="  w-full h-screen bg_img object-cover"
       src={backgroundImage} />
        <div className="pt-5 ">
          <div>
          <img className=" lg:ml-14" src={logo} />
          </div>
        </div>
        <div>
        <div className="container z-10">
        <div className="flex justify-start flex-wrap h-full  min-h-full items-center"
        style={{paddingLeft: '300px'}}
        >
          <div className="card mt-12 bg-white splash_box shadow-lg rounded-3xl  py-7 px-10 max-w-md md:w-3/5 w-4/5">
          <div className="msg_box  flex flex-wrap pt-5">
          <div className="w-full lg:-mt-5 ml-4 item-center quote_box md:text-3xl text-xl font-bold">
            <h3 className="text_blue font-sans">Smart Platform for</h3>
            <h3 className="text_red  font-sans">Smart People</h3>
          </div>
          </div>
          </div>
          </div>
          </div>
         
          
        </div>
      </div>
    </div>
  ) : (
    <Login />
  );
}
