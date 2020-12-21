import React from 'react';
import _isEmpty from 'lodash/isEmpty';
import ResultItem from '../result-item';
import { defaultSearchParams } from '../../../widget/widget-container';
import SmallSpinner from '../loading/small-spinner';

interface IProps {
  items: any;
};

const TopDeals: React.FC<IProps> = ({ items }) => {
  return (
    <>
      <p className="font-bold text-white mt-6 sm:text-4xl md:text-5xl">
        TOP DEALS
        </p>
      <p className="text-white mt-reduce-10">
        We have picked out the best available monthly price deals
        </p>
      <div className="w-full flex max-w-screen-lg ml-2 mt-80px">
        {_isEmpty(items) === false ?
          items.map(
            (item: any, index: number): JSX.Element => (
              <ResultItem item={item} key={index} searchParams={{ ...defaultSearchParams, carmake: item.meta.carmake, carmodel: item.meta.carmodel }} isLandingItem={true} />
            )
          ) : <div className="h-300px text-center w-full pt-10"><SmallSpinner /></div>}
      </div>
    </>
  );
};
export default TopDeals;
