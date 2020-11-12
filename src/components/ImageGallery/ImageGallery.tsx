import React from 'react';
import './ImageGallery.scss';
/*components*/
/*3rd party lib*/
import { Button } from 'antd';
import LazyLoad from 'react-lazyload';
import Gallery from 'react-grid-gallery';
import { CheckCircleOutlined } from '@ant-design/icons';

interface ImageGalleryProps {
  inEditMode: boolean;
  enableLightbox: boolean;
  selectAllChecked?: boolean;
  setSelectAllChecked?: React.Dispatch<React.SetStateAction<boolean>>;
  images: TImageArrayObj[];
  setImages: React.Dispatch<React.SetStateAction<TImageArrayObj[]>>;
}
export type TImageArrayObj = {
  src: string;
  thumbnail: string;
  thumbnailWidth: number;
  thumbnailHeight: number;
  isSelected: boolean;
  caption: string;
  tags: { value: string; title: string }[];
};

type Props = ImageGalleryProps;

const ImageGallery: React.FC<Props> = ({
  images,
  setImages,
  inEditMode,
  enableLightbox,
  selectAllChecked,
  setSelectAllChecked,
}) => {
  /* ================================================== */
  /*  state */
  /* ================================================== */

  /* ================================================== */
  /*  methods  */
  /* ================================================== */
  /**
   *
   * This function checks if all images are being selected
   * all are selected when the length of selected image array and
   * length of original array matches
   * in onSelectImage, if not all are selected, it will force setSelectAllChecked(false);
   * so everything is cleared and then user can click select all to select all again
   * @param {*} images
   * @return {*}
   */
  const allImagesSelected = (images: TImageArrayObj[]) => {
    var f = images.filter(function (img: TImageArrayObj) {
      return img.isSelected === true;
    });
    return f.length === images.length;
  };

  /**
   *
   * Copy the images array and then from there, extract that image
   * with index that was clicked, then assign isSelected attribute if doesnt exist
   * then update the array state setImages(temp_images) with the latest object
   * that has isSelected=true attributes
   * @param {number} index
   * @param {*} _image
   */
  const onSelectImage = (index: number, _image: any) => {
    var temp_images: TImageArrayObj[] = images.slice(); //copy the array, just like spread operator
    var img = temp_images[index];
    // if the image doesnt have isSelected property then add it on the fly
    if (img.hasOwnProperty('isSelected')) img.isSelected = !img.isSelected;
    else img.isSelected = true;

    // To clear all checks if not all are check, so user can later on select all at once
    if (setSelectAllChecked) {
      if (allImagesSelected(temp_images)) {
        setSelectAllChecked(true);
      } else {
        setSelectAllChecked(false);
      }
    }

    setImages(temp_images);
  };

  /**
   * Loop through the images array and check if isSelected is true then add into array
   * @return {*} the length of selected images
   */
  const getSelectedImagesLength = () => {
    var selected = [];
    for (var i = 0; i < images.length; i++) if (images[i].isSelected === true) selected.push(i);
    return selected.length;
  };

  /**
   * This function flips all the state of isSelected and then update the
   * array state
   */
  const onClickSelectAll = () => {
    if (setSelectAllChecked) {
      setSelectAllChecked(!selectAllChecked);
    }
    // copy the array
    var temp_images: TImageArrayObj[] = images.slice();
    if (selectAllChecked === true) {
      for (var i = 0; i < temp_images.length; i++) temp_images[i].isSelected = false;
    } else {
      for (var j = 0; j < temp_images.length; j++) temp_images[j].isSelected = true;
    }

    console.log('after: ', selectAllChecked);
    setImages(temp_images);
  };

  /* ================================================== */
  /* ================================================== */
  return (
    <>
      <div>
        <div className="imagegallery__div">
          {/* Only show select all and delete when user is in edit mode */}
          {inEditMode && (
            <div className="imagegallery__button-outerdiv">
              <Button className="imagegallery__button" type="primary" onClick={() => onClickSelectAll()}>
                <CheckCircleOutlined />
                Select All
              </Button>
              {/* Disable delete when user hasnt select anything */}
              <Button danger disabled={getSelectedImagesLength() === 0} type="default">
                Delete
              </Button>
            </div>
          )}
          <div
            style={{
              padding: '2px',
              color: '#666',
            }}
          >
            {inEditMode && <> Selected images: {getSelectedImagesLength().toString()}</>}
          </div>
          <LazyLoad placeholder={<div>Loading...</div>}>
            <Gallery
              tagStyle={{
                background: '#28292b9a',
                color: 'white',
                padding: '0.3rem 0.5rem',
                borderRadius: '0.2rem',
                bottom: '5rem',
                borderColor: 'white',
              }}
              images={images}
              onSelectImage={onSelectImage}
              enableImageSelection={inEditMode}
              enableLightbox={enableLightbox}
              showLightboxThumbnails={true}
            />
          </LazyLoad>
        </div>
      </div>
    </>
  );
};
export default ImageGallery;
