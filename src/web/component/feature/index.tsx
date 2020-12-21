import React from 'react';
import _map from 'lodash/map';
import _get from 'lodash/get';
import _isFunction from 'lodash/isFunction';
import CarNote from '../../asset/car_note.svg';
import CarColor from '../../asset/car_color.svg';
import CarTag from '../../asset/tag.svg';
import CarEngine from '../../asset/engine.svg';
import CarHp from '../../asset/hp.svg';
import CarEngineType from '../../asset/engine_type.svg';
import CarMPG from '../../asset/mpg.svg';
import City from '../../asset/city.svg';
import HighWay from '../../asset/highway.svg';
import Weight from '../../asset/weight.svg';
import CarMSPR from '../../asset/off_market.svg';

interface IProps {
  item: any;
};

const listProperties: string[] = [
  'Car Notes',
  'Car Color',
  'Car Tags',
  'Car Engine Cylinders',
  'Horsepower (HP)',
  'Engine Type',
  'MPG (Avg)',
  'MPG (City)',
  'MPG (Hwy)',
  'Curb Weight',
  'Discount Off MSRP'
];

const listPropertyMapping = [
  true,
  true,
  true,
  true,
  (item: any) => _get(item.meta, 'carenginehp', ''),
  (item: any) => _get(item.meta, 'carenginetype', ''),
  (item: any) => _get(item.meta, 'carmspavg', ''),
  (item: any) => _get(item.meta, 'carmsrpcity', ''),
  (item: any) => _get(item.meta, 'carmsrphwy', ''),
  (item: any) => _get(item.meta, 'carcurbweight', ''),
  (item: any) => parseFloat(_get(item.meta, 'caroffmsrp', 0)).toFixed(2),
];

const featureIcons: string[] = [
  CarNote,
  CarColor,
  CarTag,
  CarEngine,
  CarHp,
  CarEngineType,
  CarMPG,
  City,
  HighWay,
  Weight,
  CarMSPR
];

const renderFeatureItems = (item: any, from: number, end: number) => {
  return _map(listProperties.slice(from, end), (property: string, index: number) => {
    const itemValueGenerator: any = listPropertyMapping[index + from];

    if (itemValueGenerator === true) {
      return renderRow(property, _get(item.meta, `${property.replace(/\s/g, '').toLowerCase()}`, ''), index)
    } else if (_isFunction(itemValueGenerator)) {
      return renderRow(property, itemValueGenerator(item), index);
    }
  })
};

const renderRow = (itemName: string, itemValue: string, index: number) => (
  <div className="w-full text-center my-2" key={`${itemName.replace(/\s/g, '').toLowerCase()}`}>
    <div className="flex-1 min-h-55px">
      <img className="mx-auto mb-2" src={_get(featureIcons, index, _get(featureIcons, 0))} alt={itemName} />
    </div>
    <div className={`flex-1 font-bold`}>{itemName}</div>
    <div className="flex-1">{itemValue || 'none'}</div>
  </div>
);

const Features: React.FC<IProps> = ({ item }) => {
  return (
    <div className="w-full ml-5 p-4">
      <div className="w-full text-blue-main-text font-bold text-lg">Features</div>
      <div className="w-full grid-cols-4 grid grid-flow-row text-sm text-gray-very-dark gap-4 mt-5">
        {/* <div className="w-1/2 inline-block pl-4">
          {renderFeatureItems(item, 0, listProperties.length / 2)}
        </div>
        <div className="w-1/2 inline-block pl-4">
          {renderFeatureItems(item, Math.floor(listProperties.length / 2), listProperties.length)}
        </div> */}
        {
          renderFeatureItems(item, 0, listProperties.length)
        }
        {/* <div className="flex-4">A</div>
        <div className="flex-4">A</div>
        <div className="flex-4">A</div>
        <div className="flex-4">A</div>
        <div className="flex-4">A</div>
        <div className="flex-4">A</div>
        <div className="flex-4">A</div>
        <div className="flex-4">A</div> */}
      </div>
    </div>
  )
};

export default Features;
