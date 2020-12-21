import React from 'react';
import carImage from '../../asset/carAds.png';

const OurDeals: React.FC = () => (
    <div className="max-w-screen-lg mx-auto flex mt-12">
      <div className="w-1/3 shadow-item mt-4 divide-y divide-gray-400 rounded-lg">
        <img className="w-auto" src={carImage} alt="Car" />
      </div>
      <div className="w-2/3 mt-4 pl-8 pr-12">
        <div className="text-blue-main-text text-4xl mt-reduce-15">
          <h5 className="font-light">AUTO LEASING IS STRESSFUL.</h5>
          <h5 className="font-bold mt-reduce-15">WE’RE HERE TO HELP!</h5>
        </div>
        <p className="mt-2 text-gray-very-light leading-tight">
          Picking out the right car and negotiating a great lease deal is
          stressful, time consuming, and outdated. According to a recent study
          by Cox Automotive, the average new car buyer or lessee spends over 14
          hours from start to finish. We’re here to change all of this, by
          enabling you to make an informed decision, with Ninja-like confidence!
        </p>
        <p className="mt-4 text-gray-very-light leading-tight">
          Our lease consultants (Lease Ninjas) will work with you to understand
          your needs, build a deal which fits your budget, and then secure that
          deal at a regional dealership. We use data aggregation, calculation
          tools and microeconomic analysis to negotiate the best price, every
          time. Our Lease Ninjas even schedule your visit with the dealer so you
          will never have to haggle or negotiate! All your paperwork is prepared
          and securely sent to you!
        </p>
        <p className="mt-4 text-gray-very-light leading-tight">
          The best news? All of this can be done in the comfort of your living
          room. You won’t have to spend hours on the phone or at a dealership,
          and never overpay! Some clients report spending less than 30 minutes
          at the dealership!
        </p>
        <p className="font-bold mt-4 text-blue-main-text leading-tight">
        Experience the only True sign and drive service with <br/>
         our Lease Negotiation Service! Inquire for Free  <br/>
          today!
        </p>
        <button className="bg-blue-main-text hover:bg-blue-dard text-white font-light py-2 px-4 mt-4 rounded w-300px">
          View our Deals
        </button>
      </div>
    </div>
);

export default OurDeals;
