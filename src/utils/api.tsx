import axios, { AxiosPromise } from 'axios';
import _random from 'lodash/random';
import _get from 'lodash/get';
import { getCache, cacheResquest } from './session-storage';
import { defaultSearchParams } from '../widget/widget-container';
import { getCarMakeList } from '../widget/data/search-data';
import { IDropdownItem } from '../web/component/dropdown/type';
import { IHomeSearch } from '../widget/types/home-search-params';
import { ISaleforceResponse } from './api-types';
import { saleForceObjectMapping } from './helper';

// const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://autolease-ninja-middleware.herokuapp.com/';
const BASE_URL = process.env.NODE_ENV === 'development' ? 'https://autolease-ninja-middleware.herokuapp.com' : 'https://autolease-ninja-middleware.herokuapp.com/';

const _getRequest = (endpoint: string, params: any, ignoreCache: boolean = false) => {
  const cacheData: any = getCache(endpoint, params);

  if (cacheData !== null && ignoreCache === false) {
    return new Promise(resolve => resolve(cacheData))
  };

  const apiCall: AxiosPromise = axios.get(endpoint, {
    baseURL: BASE_URL,
    params,
  });
  apiCall.then(res => cacheResquest(endpoint, params, res));

  return apiCall;
};

const saleforceSubmit = (body: any): AxiosPromise<ISaleforceResponse> => axios.post('submit', saleForceObjectMapping(body), {
  baseURL: BASE_URL
});

const searchCar = (params: any) => _getRequest('results', params);
const carDetails = (params: any) => _getRequest('details', params);
const relatedResults = (params: any) => _getRequest('related', params);
const getFeatureItems = (params: any) => _getRequest('feature-items', params);

const getCarsFromBranch = (carmake?: string, params: IHomeSearch = defaultSearchParams) => {
  if (typeof carmake !== 'undefined') {
    return _getRequest('results', { ...params, carmake });
  }

  const carMakes: IDropdownItem[] = getCarMakeList();
  const carMakeItem: IDropdownItem = _get(carMakes, _random(carMakes.length), carMakes[0]);

  return _getRequest('results', { ...params, carmake: carMakeItem.value });
};

export {
  searchCar,
  carDetails,
  getCarsFromBranch,
  saleforceSubmit,
  relatedResults,
  getFeatureItems
};
