import React from 'react';
import './Spinner.scss';
/*components*/
/*3rd party lib*/

interface SpinnerProps {}

type Props = SpinnerProps;

const Spinner: React.FC<Props> = () => {
  return (
    <>
      <div className="spinner__loader">Loading...</div>
    </>
  );
};
export default Spinner;
