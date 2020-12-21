import React from 'react';
import featuredCar1 from '../../asset/featured-car-1.png';

interface IProps {
    image?: string;
    title: string;
    publishDate: string;
    shortDescription: string;
    link: string;
}

const Card: React.FC<IProps> = ({ title, publishDate, shortDescription, link, image = '' }) => {
    return (
        <div className="max-w-sm rounded-lg overflow-hidden shadow-item mt-5">
        {
          image !== '' ? <img className="w-full" src={featuredCar1} alt="Sunset in the mountains" /> : ''
        }
        <div className="px-6">
          <div className="font-extrabold text-xl mb-2 text-gray-card-title text-left mt-5">{title}</div>
          <p className="font-thin text-xs text-left mt-reduce-12 italic">{publishDate}</p>
          <p className="text-gray-very-light text-left mt-4 leading-tight">
            {shortDescription}
          </p>
        </div>
        <div className="px-6 mb-12 mt-2">
          <a href={link} className="text-sm font-semibold text-blue-main-text float-right">
            Read More
          </a>
        </div>
      </div>
    )
}

export default Card;
