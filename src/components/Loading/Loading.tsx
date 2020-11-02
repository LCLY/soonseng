import React from 'react';
import './Loading.scss';
/*3rd party lib*/
import Spinner from './LoadingIcons/Spinner/Spinner';

interface LoadingProps {}

type Props = LoadingProps;

const Loading: React.FC<Props> = () => {
  return (
    <div className="spinner__outerdiv">
      <div style={{ textAlign: 'center' }}>
        <div>
          <Spinner />
        </div>
        <div className="spinner__text">Loading...</div>
      </div>
    </div>
  );
};
export default Loading;
