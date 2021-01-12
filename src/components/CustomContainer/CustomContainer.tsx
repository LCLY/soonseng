import React from 'react';
import './CustomContainer.scss';

interface CustomContainerProps {}

type Props = CustomContainerProps;

const CustomContainer: React.FC<Props> = ({ children }) => {
  return <div className="customcontainer__div">{children}</div>;
};
export default CustomContainer;
