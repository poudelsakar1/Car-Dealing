import React from 'react';
import Slider, { Settings } from 'react-slick';
import './style.scss';
import CustomerCard from './customer-card';
import Img1 from '../../asset/customer-1.png';
import Img2 from '../../asset/customer-2.png';
import Img3 from '../../asset/customer-3.png';
import Arrow from './arrow';

const sliderSetting: Settings = {
  // dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 1,
  centerPadding: '60px',
  // centerMode: true,
  variableWidth: true,
  nextArrow: <Arrow />,
  prevArrow: <Arrow isBack />
};

const Testimorial: React.FC = () => {
  return (
    <div className="w-full h-680px bg-gray-light overflow-x-hidden">
      <div className="max-w-screen-lg mx-auto py-16 flex pl-8 pr-12">
        <div className="w-1/3">
          <div className="font-bold text-blue-main-text text-4xl">
            OUR<br />CUSTOMERS<br />LOVE WHAT<br />WE DO
          </div>
          <div className="text-gray-very-light mt-3">
            Over 10,000 happy customers every year, work with Auto Lease Ninjas
          </div>
        </div>
        <div className="w-full pl-10">
          <Slider {...sliderSetting}>
            <div className="mr-10">
              <CustomerCard img={Img1} text="AutoLeaseNinjas is great and standup broker to work with. He worked tirelessly to get me the best deal  possible on one of the remaining 20197405 in the NY tri state area. I even initially had a trade in which he worked hard to get as much possible for. I would highly recommend using them." />
            </div>
            <div className="mr-10">
              <CustomerCard img={Img2} text="AutoLeaseNinjas is great and standup broker to work with. He worked tirelessly to get me the best deal  possible on one of the remaining 20197405 in the NY tri state area. I even initially had a trade in which he worked hard to get as much possible for. I would highly recommend using them." />
            </div>
            <div>
              <CustomerCard img={Img3} text="AutoLeaseNinjas is great and standup broker to work with. He worked tirelessly to get me the best deal  possible on one of the remaining 20197405 in the NY tri state area. I even initially had a trade in which he worked hard to get as much possible for. I would highly recommend using them." />
            </div>
          </Slider>
        </div>
      </div>
    </div>
  )
};

export default Testimorial;
