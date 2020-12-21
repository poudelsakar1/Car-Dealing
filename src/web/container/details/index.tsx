import React, { useState, useEffect } from 'react';
import _isEmpty from 'lodash/isEmpty';
import _random from 'lodash/random';
import _omit from 'lodash/omit';
import _get from 'lodash/get';
import _compact from 'lodash/compact';
import queryString from 'query-string';
import Loading from '../../component/loading';
import { carDetails, getCarsFromBranch, saleforceSubmit, relatedResults } from '../../../utils/api';
import Features from '../../component/feature';
import SubmissionForm from '../../component/submission-form';
import Modal from '../../component/modal';
import { IHomeSearch } from '../../../widget/types/home-search-params';
import ResultItem from '../../component/result-item';
import { getRandomCarMakes } from '../../../utils/helper';
import SmallSpinner from '../../component/loading/small-spinner';
import Alert from '../../component/alert';

export interface IFormData {
  FirstName: string;
  LastName: string;
  Phone: string;
  Email: string;
};

const onRequestNewFetch = (params: IHomeSearch, setSearchData: any, setLoading: any, vehicle?: any): void => {
  if (window.history.pushState) {
    const newurl: string = window.location.protocol + "//" + window.location.host + `/details?${queryString.stringify(params)}`;
    window.history.pushState({ path: newurl }, '', newurl);
  }

  if (typeof vehicle !== 'undefined') {
    setSearchData(vehicle);
  } else {
    setLoading(true);
    carDetails(params).then((res: any) => {
      setSearchData(res.data[0]);
      setLoading(false);
    })
  }
};

const onUpdateField = (formData: IFormData, setFormData: React.Dispatch<React.SetStateAction<IFormData>>, key: string, value: string): void => {
  setFormData({ ...formData, [key]: value });
};

const Details: React.FC = () => {
  const [searchData, setSearchData] = useState({} as any);
  const [relatedVehicles, setRelatedVehicles] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({} as IFormData);
  const [showAlert, setShowAlert] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);
  const paredQuery: IHomeSearch = queryString.parse(window.location.search) as any as IHomeSearch;
  const onShowAlert = () => {
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  console.log('aaaa', { ...formData, ...paredQuery, ...searchData });

  const onSubmit = () => {
    setLoading(true);
    saleforceSubmit({ ...formData, ...paredQuery, ...searchData }).then(res => {
      setLoading(false);
      setShowModal(false);
      onShowAlert();
    }).catch((e) => {
      setLoading(false);
    })

  };

  useEffect(() => {
    if (_isEmpty(searchData) === true) {
      onRequestNewFetch(paredQuery, setSearchData, setLoading);
    };

    if (_isEmpty(relatedVehicles) === true) {
      // const carMakesList: string[] = ['BMW'].concat(getRandomCarMakes(6));

      // Promise.all(carMakesList.map((carmake: string) => getCarsFromBranch(carmake, paredQuery)))
      //   .then(allRes => {
      //     const finalData: any[] = allRes.map((res: any) => _get(res.data, _random(res.data.length)));
      //     setRelatedVehicles(_compact(finalData) as any);
      //   });
      relatedResults(_omit(paredQuery, 'a')).then((res: any) => {
        setRelatedVehicles(res.data);
      })
    }
  }, []);

  const { meta }: any = searchData;
  const carName: string = _isEmpty(meta) === true ? '' : `${meta.caryear} ${meta.carmake} ${meta.carmodel}`;

  if (_isEmpty(searchData) === false) {
    return (
      <div className="w-full min-h-container z-background bg-gray-light">
        <Alert show={showAlert} />
        <div className="w-full bg-white">
          <div className="w-full max-w-screen-lg mx-auto px-2 py-4">
            <div className="w-full text-blue-main-text font-bold uppercase text-5xl">{carName}</div>
            <div className="w-full text-blue-main-text text-xl uppercase">{meta.cartrim}</div>
            <div className="absolute right-7 w-3/5 top-car-image-top z-10 max-w-3xl">
              <img src={meta.carimg} alt={meta.cartrim} />
            </div>
          </div>
        </div>
        <div className="w-full h-228px bg-blue-main-text absolute z-0"></div>
        {/* <div className="w-full h-228px bg-gray-light absolute z-background top-228px"></div> */}
        <div className="w-full flex flex-wrap max-w-screen-lg mx-auto pt-12 mb-12 ">
          <div className="w-1/3 z-10">
            <SubmissionForm
              item={searchData}
              onSubmit={() => setShowModal(true)}
              onPropertyUpdated={(value: IHomeSearch) => onRequestNewFetch({ ...value, a: searchData.carid, carmake: searchData.meta.carmake, carmodel: searchData.meta.carmodel }, setSearchData, setLoading)}
              searchParams={{ ...paredQuery, a: searchData.carid, carmake: searchData.meta.carmake, carmodel: searchData.meta.carmodel } as any as IHomeSearch}
            />
            <Modal
              show={showModal}
              onToggle={() => setShowModal(!showModal)}
              title="Submit data"
              onFormSubmit={() => onSubmit()}
              disableSubmit={_isEmpty(_get(formData, 'FirstName')) === false &&
                _isEmpty(_get(formData, 'LastName')) === false &&
                _isEmpty(_get(formData, 'Phone')) === false &&
                _isEmpty(_get(formData, 'Email')) === false}
            >
              <div>
                <div className="w-full">
                  <input
                    placeholder="First Name"
                    onChange={(event: any) => onUpdateField(formData, setFormData, 'FirstName', event.target.value)}
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    type="text" />
                </div>
                <div className="w-full mt-2">
                  <input
                    placeholder="Last Name"
                    onChange={(event: any) => onUpdateField(formData, setFormData, 'LastName', event.target.value)}
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    type="text" />
                </div>
                <div className="w-full mt-2">
                  <input
                    placeholder="Phone"
                    onChange={(event: any) => onUpdateField(formData, setFormData, 'Phone', event.target.value)}
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    type="text" />
                </div>
                <div className="w-full mt-2">
                  <input
                    placeholder="Email"
                    onChange={(event: any) => onUpdateField(formData, setFormData, 'Email', event.target.value)}
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    type="email" />
                </div>
              </div>
            </Modal>
          </div>
          <div className="w-2/3 mt-228px">
            {/* <div
              onClick={() => setShowFeatures(!showFeatures)}
              className="pl-4 ml-5 text-blue-main-text font-bold text-lg cursor-pointer hover:text-blue-800"
            >{`${showFeatures === true ? 'Hide' : 'See'} Package Options`}</div>
            <div className={`transition-opacity duration-500 ${showFeatures === true ? 'opacity-1' : 'opacity-0 pointer-events-none'}`}>
              <Features item={searchData} />
            </div> */}
            <Features item={searchData} />
          </div>
        </div>
        <div className="w-full bg-white mb-5">
          <div className="w-full max-w-screen-lg mx-auto px-2 py-4">
            <div className="w-full text-blue-main-text font-bold text-center uppercase text-3xl">People who viewed {carName}<br /> Also considered</div>
            <div className="flex items-center justify-center">
              {
                _isEmpty(relatedVehicles) === false ?
                  relatedVehicles.map((vehicle: any, index: number) => index < 4 && (
                    <ResultItem key={vehicle.carid} item={vehicle} searchParams={paredQuery} onClickView={() => onRequestNewFetch({ ...paredQuery, a: vehicle.carid, carmake: vehicle.meta.carmake, carmodel: vehicle.meta.carmodel } as any as IHomeSearch, setSearchData, setLoading, vehicle)} />
                  )) :
                  <div className="h-300px"><SmallSpinner /></div>
              }
            </div>
          </div>
        </div>

        <Loading show={isLoading} />
      </div>
    )
  }

  return <Loading show />

};

export default Details;
