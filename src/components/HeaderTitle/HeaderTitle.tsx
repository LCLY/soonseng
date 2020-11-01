import React from 'react';
import './HeaderTitle.scss';

interface HeaderTitleProps {}

type Props = HeaderTitleProps;

const HeaderTitle: React.FC<Props> = ({ children }) => {
  return (
    <div className="header__outerdiv">
      <div>
        <h1>{children}</h1>
      </div>
    </div>
  );
};

export default HeaderTitle;
