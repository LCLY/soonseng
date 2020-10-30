import React from 'react';
import './OverlaySpinner.scss';
/*components*/
/*3rd party lib*/
import { Spinner } from 'react-bootstrap';

interface OverlaySpinnerProps {}

type Props = OverlaySpinnerProps;

const OverlaySpinner: React.FC<Props> = () => {
  return (
    <>
      <div className="overlayspinner__backdrop">
        <div className="overlayspinner__spinner-parent">
          <div className="overlayspinner__spinner-div">
            <Spinner className="overlayspinner__spinner" animation="border" variant="light" />
          </div>
        </div>
      </div>
    </>
  );
};
export default OverlaySpinner;
