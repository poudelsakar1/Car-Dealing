import React, { useState } from 'react';
import { includes as _includes, remove as _remove } from 'lodash';
import InputRange, { Range, InputRangeClassNames } from 'react-input-range';
import defaultClassNames from 'react-input-range/src/js/input-range/default-class-names';
import { currencyFormat } from '../../../utils/helper';
import Dropdown from '../dropdown';
import { IHomeSearch } from '../../../widget/types/home-search-params';
import { onSearchParamsUpdate } from '../../../widget/widget-container';
import 'react-input-range/lib/css/index.css';

interface IProps {
  item: any;
  onSubmit: any;
  searchParams: IHomeSearch;
  onPropertyUpdated: any;
};

const SubmissionForm: React.FC<IProps> = ({ item, onSubmit, searchParams, onPropertyUpdated }) => {
  const [searchParamsState, setSearchParamState] = useState(searchParams);
  const [selectedInsentive, setSelectedInsentives] = useState(searchParams.carincentive ? searchParams.carincentive.split(',') : []);
  const { terms, pricing, options } = item;
  const { carmsrp, carsellingprice, carmonthlydefault, cardasdefault, carmoneydown } = pricing;
  const { carmonthdefault } = terms;
  const [currentMoneyDown, setCurrentMoneyDown] = useState(parseInt(carmoneydown));

  const getCarInsentiveValue = (value: string) => {
    if (_includes(selectedInsentive, value) === true) {
      return _remove([...selectedInsentive], (item: string) => item !== value);
    }

    return selectedInsentive.concat([value]);
  };

  const onValueChanged = (value: string, key: string): void => {
    let updatevalue: string = value;

    if (key === 'carincentive') {
      const newSelectedInsentives: string[] = getCarInsentiveValue(value);
      updatevalue = newSelectedInsentives.join(',');
      setSelectedInsentives(newSelectedInsentives);
    }

    onSearchParamsUpdate(searchParamsState, updatevalue, key, setSearchParamState);
    onPropertyUpdated({ ...searchParamsState, [key]: updatevalue });
  };

  const classNames: InputRangeClassNames = {
    ...defaultClassNames,
    maxLabel: 'hidden',
    minLabel: 'hidden',
    activeTrack: `${defaultClassNames.activeTrack} bg-blue-500`,
    slider: `${defaultClassNames.slider} bg-blue-500`,
  };

  return (
    <div className="w-full shadow-lg rounded p-5 bg-white">
      <div className="divide-y divide-gray-400">
        <div>
          <div className="w-full inline-block">
            <span className="float-left font-medium text-gray-600">MSRP</span><span className="float-right line-through font-bold text-xl">{currencyFormat(carmsrp)}</span>
          </div>
          <div className="w-full inline-block">
            <span className="float-left font-medium text-gray-600">Monthly Price</span><span className="float-right font-bold text-xl">{currencyFormat(carmonthlydefault ? carmonthlydefault : carsellingprice / carmonthdefault)}</span>
          </div>
        </div>
        <div className="mt-2">
          <div className="w-full inline-block mt-4">
            <span className="float-left font-medium text-gray-600">Due At Signing</span><span className="float-right font-bold text-xl">{currencyFormat(cardasdefault)}</span>
          </div>
          <div className="w-full flex mt-1 mb-3">
            <div className="font-medium text-gray-600">Money Down</div>
            <div className="flex-1 ml-3 mt-2">
              <InputRange
                formatLabel={(currentValue) => currencyFormat(currentValue)}
                maxValue={10000}
                minValue={0}
                step={100}
                value={currentMoneyDown}
                classNames={classNames}
                onChange={(value: number | Range): void => setCurrentMoneyDown(value)}
                onChangeComplete={(value: number | Range): void => onValueChanged(value.toString(), 'leasemoney')}
              />
            </div>
          </div>
        </div>

      </div>
      <div className="mt-3">
        <div className="text-center text-2xl text-blue-600 font-bold">Create Your Dream Deal</div>
        {
          options.caroptions &&
          <div className="mt-4">
            <Dropdown options={
              options.caroptions
            }
              placeholder="Car options"
              onSelected={() => console.log('selected')}
              showTitle
              className="border border-gray-600 focus:outline-none focus:border-gray-500"
            />
          </div>
        }

        <div className="mt-4">
          <Dropdown options={
            options.monthoptions.split(',').map((option: string) => (
              {
                value: option,
                name: `${option} months`
              }
            ))
          }
            placeholder="Months"
            onSelected={(value: string) => onValueChanged(value, 'leasemonths')}
            showTitle
            selectedItem={searchParamsState.leasemonths.toString()}
            className="border border-gray-600 focus:outline-none focus:border-gray-500"
          />
        </div>
        <div className="mt-4">
          <Dropdown options={
            options.milesoptions.split(',').map((option: string) => (
              {
                value: option,
                name: `${option}`
              }
            ))
          }
            placeholder="MPY (Miles Per Year)"
            onSelected={(value: string) => onValueChanged(value, 'leasemiles')}
            showTitle
            selectedItem={searchParamsState.leasemiles.toString()}
            className="border border-gray-600 focus:outline-none focus:border-gray-500"
          />
        </div>
        <div className="mt-4">
          <Dropdown options={
            options.carcolors.split(',').map((option: string) => (
              {
                value: option,
                name: `${option}`
              }
            ))
          }
            placeholder="Color"
            onSelected={() => console.log('selected')}
            showTitle
            selectedItem={options.carcolors[0]}
            className="border border-gray-600 focus:outline-none focus:border-gray-500"
          />
        </div>
        <div className="mt-4">
          <span className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Optional Incentives</span>
          <div className="mt-2">
            {
              options.carincentives.map((item: any, index: number) => {
                return (
                  <label key={index} className="block w-full items-center cursor-pointer">
                    <input type="checkbox" className="form-checkbox" name="accountType" value={item.ID} onChange={(event: any) => {
                      onValueChanged(event.target.value, 'carincentive');
                    }}
                      checked={_includes(selectedInsentive, item.ID.toString())}
                    />
                    <span className="ml-2 text-md">{`${item.name} (${item.discount})`}</span>
                  </label>
                )
              })
            }
          </div>
        </div>
        <button
          onClick={() => onSubmit()}
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5">
          Get Started
        </button>
      </div>
    </div>
  )
};

export default SubmissionForm;
