import React from 'react';
import carImage from '../../asset/oto.svg';
import './style.scss';

const TopPannel: React.FC = () => (
    <div className="max-w-screen-lg mx-auto relative">
      <div className="flex callout top-left h-235px">
        <div className="sm:w-2/3 lg:w-1/2">
          <div className="mt-12 text-blue-main-text sm:text-4xl md:text-5xl uppercase">
            <h5>Do the Dreaming,</h5>
            <h5 className="font-black mt-reduce-15 sm: mt-0">
              We Do The Leasing!
            </h5>
          </div>
          <h5 className="text-gray-very-light mt-reduce-15 sm:text-lg sm:text-3xl md:text-4xl font-thin">
            Find the right lease deal
          </h5>
        </div>
        <div className="sm:w-1/3 lg:w-1/2">
          <img
            className="w-auto sm:h-64 lg:ml-28 md:h-72"
            src={carImage}
            alt="Car"
          />
        </div>
      </div>
    </div>
  );

export default TopPannel;
