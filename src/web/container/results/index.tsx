import React, { useState, useEffect } from 'react';
import _isEmpty from 'lodash/isEmpty';
import _filter from 'lodash/filter';
import _get from 'lodash/get';
import queryString, { ParsedQuery } from 'query-string';
import Loading from '../../component/loading';
import { searchCar } from '../../../utils/api';
import ResultItem from '../../component/result-item';
import FilterWidget from '../../component/filter-widget';
import FilterBar from '../../component/filter';
import { IHomeSearch } from '../../../widget/types/home-search-params';
import Pagination from '../../component/pagination';

const PER_PAGE: number = 12;

const onRequestNewFetch = (params: IHomeSearch, setSearchData: any, setLoading: any): void => {
  setLoading(true);
  searchCar(params).then((res: any) => {
    setSearchData(res.data);
    setLoading(false);
  });
};

export interface IFilter {
  leasemin?: number;
  leasemax?: number;
  leaseInterestRate?: number;
  leaseTradeIn?: boolean;
  cartradein?: string;
};

const filterWrapper = (results: any, filter: IFilter): any => {
  let finalResult: any = results;

  if (_isEmpty(filter.leasemin) === false) {
    finalResult = _filter(finalResult, result => result.pricing.carmonthlydefault >= _get(filter, 'leasemin', 0));
  };

  if (_isEmpty(filter.leasemax) === false) {
    finalResult = _filter(finalResult, result => result.pricing.carmonthlydefault <= _get(filter, 'leasemax', 99999));
  };

  if (_isEmpty(filter.cartradein) === false) {
    finalResult = _filter(finalResult, result => result.terms.cartradein === _get(filter, 'cartradein', ''));
  }

  return finalResult;
};

const withPagination = (results: any, currentPage: number): any => {
  const beginIndex: number = (currentPage - 1) * PER_PAGE;
  const endIndex: number = beginIndex + PER_PAGE;

  return results.slice(beginIndex, endIndex);
};

const onChangePage = (currentPage: number, setCurrentPage: React.Dispatch<React.SetStateAction<number>>, next?: boolean): void => {
  if (next === true) {
    setCurrentPage(currentPage + 1);
  } else {
    setCurrentPage(currentPage - 1);
  }
};

const Results: React.FC = () => {
  const [searchData, setSearchData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [filter, setFilter] = useState({} as IFilter);
  const [currentPage, setCurrentPage] = useState(1);

  const paredQuery: ParsedQuery = queryString.parse(window.location.search);

  useEffect(() => {
    if (_isEmpty(searchData) === true) {
      onRequestNewFetch(paredQuery as any as IHomeSearch, setSearchData, setLoading);
    }
  }, []);

  const filteredData: any = filterWrapper(searchData, filter);
  const renderData: any = withPagination(filteredData, currentPage);

  return (
    <div className="w-full min-h-container">
      <div className="w-full max-w-screen-lg mx-auto px-2 py-4 text-center">
        <div className="w-full text-blue-main-text font-bold uppercase text-5xl">CHOOSE YOUR CAR!</div>
        <div className="w-full text-gray-very-light text-xl font-thin">ALN helps you find the best lease deals from approved suppliers</div>
      </div>
      <div className="w-full h-blue-background bg-blue-main-text absolute z-background"></div>
      <div className="w-full flex max-w-screen-lg mx-auto px-2 pb-4 pt-12">
        <FilterWidget
          searchParams={paredQuery as any as IHomeSearch}
          onSubmit={(data: IHomeSearch) => onRequestNewFetch(data, setSearchData, setLoading)}
        />
      </div>
      <div className="w-full flex max-w-screen-lg mx-auto px-2 py-4">
        <FilterBar
          currentFilter={filter}
          onUpdate={(key: string, value: any) => setFilter({ ...filter, [key]: value })}
        />
      </div>
      <div className="w-full flex flex-wrap max-w-screen-lg mx-auto mb-12">
        {
          _isEmpty(renderData) === false &&
          renderData.map((item: any, index: number): JSX.Element => <ResultItem item={item} key={index} searchParams={paredQuery} />)
        }
        {
          filteredData.length > PER_PAGE &&
          <div className="w-full">
            <Pagination
              itemLength={filteredData.length}
              perPage={PER_PAGE}
              currentPage={currentPage}
              onNext={() => onChangePage(currentPage, setCurrentPage, true)}
              onPrevious={() => onChangePage(currentPage, setCurrentPage)}
              onSetPage={(page: number) => setCurrentPage(page)}
            />
          </div>
        }
      </div>
      <Loading show={isLoading} />
    </div>
  )
};

export default Results;
