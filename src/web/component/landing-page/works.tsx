import React from 'react';
import heart from '../../asset/heart.svg';
import graphic from '../../asset/graphic.svg';
import partnership from '../../asset/partnership-handshake.svg';
import miniCar from '../../asset/oto-mini.svg';

const Works: React.FC = () => (
  <div className="max-w-screen-lg mx-auto text-center">
    <div className="mt-48">
      <h5 className="font-bold text-blue-main-text text-4xl">
        HOW ALL WORKS
      </h5>
      <p className="text-gray-very-light">
        Our Mission: Make auto leasing as easy & painless as possible and save
        customers
        <br></br>
        thousands of dollars in the process
      </p>
    </div>
    <div className="flex text-center mt-10 text-gray-very-light">
      <div className="flex-4 max-w-240px mx-2 mt-4">
        <img className="w-auto h-92px mx-auto" src={heart} alt="Hear" />

        <h3 className="font-extrabold mt-16 h-60px text-gray-very-light">
          CUSTOMER CENTRIC
          <br /> APPROACH
        </h3>

        <p className="mt-5">
          We have picked out the best
          <br />
          available monthly price deals
        </p>
      </div>

      <div className="flex-4 max-w-240px mx-2 mt-4">
        <img className="w-auto h-92px mx-auto" src={graphic} alt="Graphic" />

        <h3 className="font-extrabold mt-16 h-60px text-gray-very-light">DATA DRIVEN</h3>

        <p className="mt-5">
          We have picked out the best
          <br />
          available monthly price deals
        </p>
      </div>

      <div className="flex-4 max-w-240px mx-2 mt-4">
        <img
          className="w-auto h-92px mx-auto"
          src={partnership}
          alt="Partner"
        />

        <h3 className="font-extrabold mt-16 h-60px text-gray-very-light uppercase">Fast & convenient</h3>

        <p className="mt-5">
          We have picked out the best
          <br />
          available monthly price deals
        </p>
      </div>

      <div className="flex-4 max-w-240px mx-2 mt-4">
        <img className="w-auto h-80px mx-auto" src={miniCar} alt="Mini car" />

        <h3 className="font-extrabold mt-16 h-72px text-gray-very-light">
          DRIVE OF THE LOT
          <br /> HAPPY
        </h3>

        <p className="mt-5 mb-0">
          We have picked out the best
          <br />
          available monthly price deals
        </p>
      </div>
    </div>
  </div>
);

export default Works;
