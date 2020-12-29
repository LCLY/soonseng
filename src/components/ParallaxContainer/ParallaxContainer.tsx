import React from 'react';
import './ParallaxContainer.scss';

interface ParallaxContainerProps {
  bgImageUrl: string;
  colorSettings?: string;
  bgPosition?: string;
}

type Props = ParallaxContainerProps;

const ParallaxContainer: React.FC<Props> = ({
  bgImageUrl,
  children,
  colorSettings = 'radial-gradient(rgba(0,0,0,0.3) 60%, rgba(0, 0, 0, 1))',
  bgPosition = 'center center',
}) => {
  return (
    <div className="e-with-fixed-bg">
      <div className="bg-wrap">
        <div
          className="bg"
          style={{
            backgroundSize: 'cover',
            backgroundPosition: bgPosition,
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
