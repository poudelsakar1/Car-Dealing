import React from 'react';
import _isEmtpy from 'lodash/isEmpty';
import { Link } from 'react-router-dom';
import { currencyFormat, getCarLogo } from '../../../utils/helper';
import queryString from 'query-string';

interface IProps {
  item: any;
  searchParams: any;
  onClickView?: () => void;
  isLandingItem?: boolean;
};

const generateURL = (id: string, searchParams: any): string => (
  `/details?${queryString.stringify({ ...searchParams, a: id })}`
);

const ResultItem: React.FC<IProps> = ({ item, searchParams, onClickView, isLandingItem = false }) => {
  const { terms, pricing, meta } = item;
  const { carmsrp, carsellingprice, carmonthlydefault } = pricing;
  const { carmonthdefault } = terms;

  return (
    <div className={(isLandingItem === true ? "flex-1 h-235px" : "flex-4 max-w-240px h-300px") + " mx-2 text-center shadow-item h-40 mt-4 divide-y divide-gray-400 bg-white rounded-lg"}>
      <div className={(isLandingItem === true ? "h-50percent" :"h-65percent") + " w-full p-4 relative"}>
        {
          _isEmtpy(item.meta.carimg) === false &&
          <div className="mx-auto">
            <img className={isLandingItem === true ? "mt-reduce-80" : ""} src={item.meta.carimg} alt={item.carid} />
          </div>
        }
        <div className="flex absolute bottom-2">
          <div className="w-43px h-43px pt-2">
            <img src={getCarLogo(item.meta.carmake)} alt={item.meta.carmake} />
          </div>
          <div className="text-sm text-left ml-2 pr-4 w-4/5">
            <div className="text-gray-very-light capitalize font-medium">{meta.carmake.toLowerCase()}</div>
            <div className="text-black text-xs">{meta.cartrim}</div>
          </div>
        </div>

        {/* <div className="absolute bottom-2 truncate w-full left-0 px-4 text-sm">{meta.carmake} {meta.carmodel} - {meta.cartrim}</div> */}
      </div>
      <div className="p-3 pt-2 text-sm">
        <div className="w-full inline-block">
          <span className="float-left font-medium text-gray-600">MSRP</span><span className="float-right line-through font-bold">{currencyFormat(carmsrp)}</span>
        </div>
        <div className="w-full inline-block">
          <span className="float-left font-medium text-gray-600">Monthly Price</span><span className="float-right font-bold">{currencyFormat(carmonthlydefault ? carmonthlydefault : carsellingprice / carmonthdefault)}</span>
        </div>
        {
          onClickView ?
            <button
              className="w-full bg-blue-main-text hover:bg-blue-800 hover:no-underline text-white font-bold py-1 px-4 rounded block"
              onClick={() => onClickView()}>
              View lease deals
            </button> :
            <Link to={generateURL(item.carid, searchParams)} className="bg-blue-main-text hover:bg-blue-800 hover:no-underline text-white font-bold py-1 px-4 rounded block">
              View lease deals
          </Link>
        }
      </div>

    </div >
  )
};

export default ResultItem;
