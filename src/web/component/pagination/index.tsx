import React from 'react';
import _range from 'lodash/range';
import _map from 'lodash/map';
import _uniqWith from 'lodash/uniqWith';
import _isEqual from 'lodash/isEqual';

const CORNER_PAGES: number = 3;

interface IProps {
  perPage: number;
  itemLength: number;
  currentPage: number;
  onNext: () => void;
  onPrevious: () => void;
  onSetPage: (page: number) => void;
};

const renderPageNumber = (itemLength: number, perPage: number, currentPage: number, onSetPage: (page: number) => void): JSX.Element[] => {
  const totalPage: number = Math.ceil(itemLength / perPage);

  return _uniqWith(_map(_range(1, totalPage + 1), (item: number) => {
    if (item <= CORNER_PAGES || totalPage - item < CORNER_PAGES) {
      return (
        <button type="button"
          onClick={() => onSetPage(item)}
          className={`-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150 ${item === currentPage ? 'font-bold' : ''}`}>
          {item}
        </button>
      )
    }

    return (
      <span className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700">
        ...
      </span>
    )
  }), _isEqual);
};

const Pagination: React.FC<IProps> = ({ perPage, itemLength, currentPage, onNext, onPrevious, onSetPage }) => {
  const firstItemOnPage: number = (currentPage - 1) * perPage;
  const lastItemOnPage: number = firstItemOnPage + perPage;

  return (
    <div className="bg-white px-2 py-3 flex items-center justify-between border-t border-gray-200">
      {/* <div className="flex-1 flex justify-between sm:hidden">
        <span onClick={() => onPrevious()} className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150">
          Previous
        </span>
        <span onClick={() => onNext()} className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150">
          Next
        </span>
      </div> */}
      <div className="flex-1 flex items-center justify-between">
        <div>
          <p className="text-sm leading-5 text-gray-700">
            Showing
            <span className="font-medium mx-1">{firstItemOnPage + 1}
            </span>
            to
            <span className="font-medium mx-1">{lastItemOnPage > itemLength ? itemLength : lastItemOnPage}
            </span>
            of
            <span className="font-medium mx-1">{itemLength}
            </span>
            results
          </p>
        </div>
        <div>
          <nav className="relative z-0 inline-flex shadow-sm">
            <button
              disabled={firstItemOnPage === 0}
              onClick={() => onPrevious()}
              type="button"
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
              aria-label="Previous">
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            {
              renderPageNumber(itemLength, perPage, currentPage, onSetPage)
            }
            <button
              disabled={lastItemOnPage >= itemLength}
              onClick={() => onNext()}
              type="button"
              className="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
              aria-label="Next">
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </div>
  )
};

export default Pagination;
