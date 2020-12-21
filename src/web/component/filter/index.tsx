import React, { useState } from 'react';
import { IFilter } from '../../container/results';

interface IProps {
  currentFilter: IFilter;
  onUpdate: any;
};

const FilterBar: React.FC<IProps> = ({ currentFilter, onUpdate }) => {
  const [showAdvancedFilter, setShowAdvance] = useState(false);

  return (
    <div className="w-full mx-auto">
      <div
        className="text-center">
        <span className="cursor-pointer text-white font-bold" onClick={() => setShowAdvance(!showAdvancedFilter)}>Advanced Filter<span className="ml-2 inline-block rounded-full border-2 boder-white text-xl w-expand-button h-expand-button leading-20px">{showAdvancedFilter ? '-' : '+'}</span></span>
      </div>
      {
        showAdvancedFilter &&
        <div className="w-full items-end text-sm text-white mx-auto text-center mt-3">
          <div className="inline-block w-1/3">
            <label className="flex">
              <span>Lease Payment</span>
              <div className="w-1/3 ml-2">
                <input
                  className="appearance-none placeholder-white border border-white rounded bg-blue-main-text w-full py-1 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                  type="number"
                  defaultValue={currentFilter.leasemin}
                  onChange={(event: any) => onUpdate('leasemin', event.target.value)}
                  placeholder="Min"
                />
              </div>
              <div className="w-1/3 ml-1">
                <input
                  className="appearance-none placeholder-white border border-white rounded bg-blue-main-text w-full py-1 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                  type="number"
                  defaultValue={currentFilter.leasemax}
                  onChange={(event: any) => onUpdate('leasemax', event.target.value)}
                  placeholder="Max"
                />
              </div>
            </label>
          </div>

          <div className="w-1/5 ml-1 inline-block">
            <label className="block w-full items-center cursor-pointer">
              <span className="text-md">Trade In</span>
              <input
                type="checkbox"
                className="form-radio ml-2 "
                onChange={() => onUpdate('cartradein', currentFilter.cartradein === 'true' ? 'false' : 'true')}
                checked={currentFilter.cartradein === 'true'}
              />
            </label>
          </div>
          <div className="w-1/4 ml-1 inline-block">
            <label className="flex">
              <span>Options</span>
              <input
                className="ml-2 placeholder-white appearance-none border border-white rounded bg-blue-main-text w-full py-1 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                defaultValue={''}
                onChange={(event: any) => console.log(event.target.value)}
                placeholder="Options"
              />
            </label>
          </div>
        </div>
      }
    </div>
  )
};

export default FilterBar;
