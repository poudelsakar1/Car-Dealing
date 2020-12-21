import React from 'react';
import LogoMain from '../../asset/logo-main.png';
import { Link } from 'react-router-dom';

const AppBar: React.FC = () => {
  return (
    <div className="w-full h-60px">
      <div className="max-w-screen-lg mx-auto relative">
        <div className="w-1/3 inline-block cursor-pointer">
          <Link to="/">
            <img className="h-43px w-auto mt-9px" src={LogoMain} alt="logo" />
          </Link>
        </div>
        <div className="w-2/3 inline-block text-right text-gray-very-dark absolute top-18px">
          <Link to="/">
            <div className="inline-block hover:font-medium cursor-pointer">Home</div>
          </Link>
          <div className="inline-block ml-5 hover:font-medium cursor-pointer">About</div>
          {/* <div className="inline-block ml-5 hover:font-medium cursor-pointer">Blog</div> */}
          <div className="inline-block ml-5 hover:font-medium cursor-pointer">Contact</div>
        </div>
      </div>
    </div>
  );
};

export default AppBar;
