import React from 'react';
import LogoMain from '../../asset/logo-main.png';
import { Link } from 'react-router-dom';

const FooterCTA: React.FC = () => {
  return (
    <div className="w-full h-422px">
      <div className="w-full h-288px bg-gray-light pt-8">
        <div className="max-w-screen-lg mx-auto relative text-gray-very-light">
          <div className="w-2/3 inline-block cursor-pointer">
            <Link to="/">
              <img className="h-43px w-auto mt-9px" src={LogoMain} alt="logo" />
            </Link>
            <div className="mt-2">Auto Leasing is Stressful. <br />We’re Here To Help!</div>
          </div>
          <div className="w-1/3 inline-flex text-right absolute top-18px">
            <div className="w-1/2 inline-block text-left">
              <div className="mb-5">Menu</div>
              <div className="hover:font-medium cursor-pointer">Home</div>
              <div className="hover:font-medium cursor-pointer">Testimonials</div>
              <div className="hover:font-medium cursor-pointer">About</div>
              {/* <div className="hover:font-medium cursor-pointer">Blog</div> */}
              <div className="hover:font-medium cursor-pointer">Contact Us</div>
            </div>
            <div className="w-1/2 inline-block text-left">
              <div className="mb-5">Contact</div>
              <div>Patricia C. Amedee 4401 Waldeck Street Grapevine Nashville, TX 76051</div>
              <br />
              <div>info@autoleaseninja.com<br/>+101 0000 888</div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-screen-lg mx-auto text-center pt-12">{new Date().getFullYear()} Copyright Autolease Ninjas</div>
    </div>
  );
};

export default FooterCTA;
