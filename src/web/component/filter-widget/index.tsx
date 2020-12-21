import React, { useState } from 'react';
import _isEqual from 'lodash/isEqual';
import { IHomeSearch } from '../../../widget/types/home-search-params';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import { onSearchParamsUpdate } from '../../../widget/widget-container';
import Dropdown from '../dropdown';
import { getCarMakeList, getCarModels } from '../../../widget/data/search-data';

interface IProps {
  searchParams: IHomeSearch;
  onSubmit: any;
};

const FilterWidget: React.FC<IProps> = ({ searchParams, onSubmit }) => {
  const [searchParamsState, setSearchParamState] = useState(searchParams);
  // console.log(searchParams);
  // const newSearchParams: IHomeSearch = {
  //   ...searchParams,
  //   leasemonths: +searchParams.leasemonths === 12 ? 60 : 12
  // }

  // console.log(searchParamsState);
  const enableResetButton: boolean = _isEqual(searchParams, searchParamsState) === false;

  return (
    <div className="w-full mx-auto">
      <div className="w-full flex items-end">
        <div className="w-1/3">
          <input
            className="appearance-none rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            pattern="^(?(^00000(|-0000))|(\d{5}(|-\d{4})))$"
            value={searchParamsState.leaseregion}
            onChange={(event: any) => onSearchParamsUpdate(searchParamsState, event.target.value, 'leaseregion', setSearchParamState)}
            placeholder="Enter your zip code" />
        </div>
        <div className="w-1/5 ml-1">
          <Dropdown
            options={getCarMakeList()}
            onSelected={(value: string) => {
              onSearchParamsUpdate(searchParamsState, value, 'carmake', setSearchParamState);
              onSearchParamsUpdate({ ...searchParamsState, carmake: value }, getCarModels(value)[0].value, 'carmodel', setSearchParamState);
            }}
            placeholder="Make"
            selectedItem={searchParamsState.carmake}
            className="focus:outline-none"
          />
        </div>

        <div className="w-1/6 ml-1">
          <Dropdown
            options={getCarModels(searchParamsState.carmake || '')}
            onSelected={(value: string) => onSearchParamsUpdate(searchParamsState, value, 'carmodel', setSearchParamState)}
            placeholder="Models"
            selectedItem={searchParamsState.carmodel}
            className="focus:outline-none"
          />
        </div>

        <div className="w-1/4 ml-1">
          <Dropdown
            options={[]}
            onSelected={(value: string) => onSearchParamsUpdate(searchParamsState, value, 'cartrim', setSearchParamState)}
            placeholder="Trim"
            selectedItem={''}
            className="focus:outline-none"
          />
        </div>

        <Link className="w-1/4 ml-1" to={`/results?${queryString.stringify(searchParamsState)}`}><button className="w-full bg-blue-dark hover:bg-blue-700 hover:no-underline text-white text-sm font-bold py-3 px-4 block" onClick={() => onSubmit(searchParamsState)}>Search</button></Link>
      </div>
      <div className="w-full flex items-end mt-2">
        <div className="w-1/5">
          <Dropdown
            options={[
              {
                name: '7500',
                value: '7500'
              },
              {
                name: '10000',
                value: '10000'
              },
              {
                name: '12000',
                value: '12000'
              },
              {
                name: '15000',
                value: '15000'
              }
            ]}
            onSelected={(value: string) => onSearchParamsUpdate(searchParamsState, value, 'leasemiles', setSearchParamState)}
            placeholder="Mileage"
            selectedItem={searchParamsState.leasemiles.toString()}
            className="focus:outline-none"
          />
        </div>
        <div className="w-1/5 ml-1">
          <Dropdown
            options={[
              {
                name: '24 months',
                value: '24'
              },
              {
                name: '36 months',
                value: '36'
              },
              {
                name: '39 months',
                value: '39'
              }]}
            onSelected={(value: string) => onSearchParamsUpdate(searchParamsState, value, 'leasemonths', setSearchParamState)}
            placeholder="Term"
            selectedItem={searchParamsState.leasemonths.toString()}
            className="focus:outline-none"
          />
        </div>
        <div className="w-1/4 ml-1">
          <input
            className="appearance-none rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            value={searchParamsState.leasemaxpayment}
            onChange={(event: any) => onSearchParamsUpdate(searchParamsState, event.target.value, 'leasemaxpayment', setSearchParamState)}
            placeholder="Max Payment"
          />
        </div>
        <div className="w-1/3 ml-1">
          <input
            className="appearance-none rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            value={searchParamsState.leasemaxcredit}
            onChange={(event: any) => onSearchParamsUpdate(searchParamsState, event.target.value, 'leasemaxcredit', setSearchParamState)}
            placeholder="Credit Score"
          />
        </div>
        <button
          className="w-1/4 ml-1 bg-gray-very-dark hover:bg-gray-700 hover:no-underline text-white text-sm font-bold py-3 px-4 block"
          onClick={() => setSearchParamState(searchParams)}><span className="transform rotate-45 inline-block">&#8635;</span>&nbsp;Reset</button>
      </div>
    </div>
  )
};

export default FilterWidget;
