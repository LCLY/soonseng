import React from 'react';
import './ParallaxContainer.scss';

interface ParallaxContainerProps {
  bgImageUrl: string;
  colorSettings?: string;
  bgPosition?: string;
  overlayColor?: string;
}

type Props = ParallaxContainerProps;

const ParallaxContainer: React.FC<Props> = ({
  bgImageUrl,
  children,
  overlayColor = 'none',
  bgPosition = 'center center',
  colorSettings = 'radial-gradient(rgba(0,0,0,0.3) 60%, rgba(0, 0, 0, 1))',
}) => {
  return (
    <div className="e-with-fixed-bg">
      <div className="parallax__overlay" style={{ background: overlayColor }} />
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
