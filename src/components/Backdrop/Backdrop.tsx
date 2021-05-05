// import React
import React from 'react';
// import SCSS
import './Backdrop.scss';
interface BackDropProps {
  show: boolean;
  backdropZIndex?: number;
  clicked: () => void;
}
type Props = BackDropProps;
const Backdrop: React.FC<Props> = ({ show, backdropZIndex, clicked }) => {
  return show ? <div className="Backdrop" style={{ zIndex: backdropZIndex }} onClick={clicked}></div> : null;
};

export default Backdrop;
