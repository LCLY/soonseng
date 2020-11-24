import React, { useEffect, useState } from 'react';
import './LightboxComponent.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { TReceivedImageObj } from 'src/store/types/dashboard';

interface LightboxComponentProps {
  images: TReceivedImageObj[];
  photoIndex: number;
  setPhotoIndex: React.Dispatch<React.SetStateAction<number>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
type Props = LightboxComponentProps;

const LightboxComponent: React.FC<Props> = ({ images, photoIndex, isOpen, setPhotoIndex, setIsOpen }) => {
  const [imageUrlsArray, setImageUrlsArray] = useState<string[]>([]);

  // convert image objects array to image array with only urls
  useEffect(() => {
    let tempArray: string[] = [];
    images.forEach((imageObj) => {
      tempArray.push(imageObj.url);
    });
    // initialize the image urls array state with only the image urls
    setImageUrlsArray(tempArray);
  }, [images, setImageUrlsArray]);

  return (
    <>
      {isOpen && (
        <Lightbox
          mainSrc={imageUrlsArray[photoIndex]}
          nextSrc={imageUrlsArray[(photoIndex + 1) % imageUrlsArray.length]}
          prevSrc={imageUrlsArray[(photoIndex + imageUrlsArray.length - 1) % imageUrlsArray.length]}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() => setPhotoIndex((photoIndex + imageUrlsArray.length - 1) % imageUrlsArray.length)}
          onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % imageUrlsArray.length)}
        />
      )}
    </>
  );
};
export default LightboxComponent;
