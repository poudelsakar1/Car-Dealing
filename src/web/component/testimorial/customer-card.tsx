import React from 'react';

interface IProps {
  img: any;
  text: string;
}

const CustomerCard: React.FC<IProps> = ({ img, text }) => {
  return (
    <div className="w-customer-card h-customer-card shadow-item bg-white rounded-lg mt-16">
      <div className="rounded-full relative"><img className="absolute" style={{ top: '-50px', left: '33%' }}src={img} alt="" /></div>
      <div className="pt-32 px-10 text-gray-very-light text-sm">
        {text}
      </div>
    </div>
  )
};

export default CustomerCard;
