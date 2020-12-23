import React from 'react';
import './ParallaxContainer.scss';

interface ParallaxContainerProps {
  bgImageUrl: string;
  colorSettings?: string;
}

type Props = ParallaxContainerProps;

const ParallaxContainer: React.FC<Props> = ({
  bgImageUrl,
  children,
  colorSettings = 'radial-gradient(rgba(255, 255, 255, 0) 20%, rgba(0, 0, 0, 1))',
}) => {
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
        >
          <div className="bg-cover" style={{ backgroundImage: `${colorSettings}` }}></div>
        </div>
      </div>
      <div className="parallax__children-container">{children}</div>
    </div>
  );
};

export default ParallaxContainer;
