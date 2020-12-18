import React from 'react';
import './ParallaxContainer.scss';

interface ParallaxContainerProps {
  bgImageUrl: string;
}

type Props = ParallaxContainerProps;

const ParallaxContainer: React.FC<Props> = ({ bgImageUrl, children }) => {
  return (
    <div className="e-with-fixed-bg">
      <div className="bg-wrap">
        <div
          className="bg"
          style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundImage: `url(${bgImageUrl})`,
          }}
        ></div>
      </div>
      {children}
    </div>
  );
};

export default ParallaxContainer;
