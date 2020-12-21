import React from 'react';
import './style.scss';

interface IProps {
    show: boolean;
}

const FullScreenLoading: React.FC<IProps> = ({ show }: IProps) => {
    if (show === true) {
        return <div className="loading"></div>
    }

    return null;
};

export default FullScreenLoading;
