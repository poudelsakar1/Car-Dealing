import React, { useState, useEffect } from 'react';
import _isEmpty from 'lodash/isEmpty';
import Widget from '../../component/widget';
import MockDataTopDeals from '../../component/landing-page/mock-data-top-deals';
import MockDataNews from '../../component/landing-page/mock-data-news';
import TopDeals from '../../component/landing-page/top-deals';
import TopPannel from '../../component/landing-page/top-pannel';
import Works from '../../component/landing-page/works';
import OurDeals from '../../component/landing-page/our-deals';
import News from '../../component/landing-page/news';
import Testimorial from '../../component/testimorial';
import { defaultSearchParams } from '../../../widget/widget-container';
import { getFeatureItems } from '../../../utils/api';

const Home: React.FC = () => {
  const [featureItems, setFeatureItem] = useState([]);

  useEffect(() => {
    if (_isEmpty(featureItems) === true) {
      getFeatureItems(defaultSearchParams).then((res: any) => setFeatureItem(res.data));
    };
  }, []);

  return (
    <div className="w-full bg-gray-100 min-h-container">
      <TopPannel />
      <div className="w-full mx-auto bg-blue-main-text h-400px mb-150px">
        <div className="max-w-screen-lg mx-auto py-12">
          <Widget />
          <TopDeals items={featureItems} />
        </div>
      </div>
      <div className="mb-10">
        <Works />
      </div>
      <Testimorial />
      <OurDeals />
      <News newsData={MockDataNews} />
    </div>
  )
};

export default Home;
