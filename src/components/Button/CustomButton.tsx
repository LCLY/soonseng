import React from 'react';
import './CustomButton.scss';
/* components */
/* 3rd party lib */
/* Util */
interface CustomButtonProps {
  children: any;
  onClick?: () => any;
}

type Props = CustomButtonProps;

const CustomButton: React.FC<Props> = ({ onClick, children }) => {
  /* ================================================== */
  /*  state */
  /* ================================================== */
  /* ================================================== */
  /*  method */
  /* ================================================== */
  /* ================================================== */
  /*  useEffect */
  /* ================================================== */

  /* ================================================== */
  /* ================================================== */
  return (
    <span
      className="custombutton__div"
      onClick={() => {
        if (onClick === undefined) return;
        onClick();
      }}
    >
      {children}
    </span>
  );
};

export default CustomButton;
