import React from 'react';
import './LoadingSpinner.scss';
/*3rd party lib*/
import { Spin } from 'antd';

interface LoadingSpinnerProps {}

type Props = LoadingSpinnerProps;

const LoadingSpinner: React.FC<Props> = () => {
  return (
    <div className="spinner__outerdiv">
      <div style={{ textAlign: 'center' }}>
        <div>
          <Spin size="large" />
        </div>
        <div className="spinner__text">Loading...</div>
      </div>
    </div>
  );
};
export default LoadingSpinner;
