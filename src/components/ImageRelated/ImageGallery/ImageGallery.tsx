import React, { useEffect, useState } from 'react';
import './ImageGallery.scss';
/*components*/
/*3rd party lib*/
import Gallery from 'react-grid-gallery';
import { Button, Modal } from 'antd';
import { CheckCircleOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { RootState } from 'src';
import { connect } from 'react-redux';

interface ImageGalleryProps {
  loading?: boolean; //loading for button
  inEditMode: boolean;
  selectAllChecked?: boolean;
  setSelectAllChecked?: React.Dispatch<React.SetStateAction<boolean>>;
  galleryImages: TGalleryImageArrayObj[];
  setGalleryImages: React.Dispatch<React.SetStateAction<TGalleryImageArrayObj[]>>;
  customClassName: string; //to determine classname whether for edit or normal mode
  onDeleteUploadImage?: (ids: number[]) => void;
}
export type TGalleryImageArrayObj = {
  id: number;
  src: string;
  thumbnail: string;
  thumbnailWidth: number;
  thumbnailHeight: number;
  isSelected: boolean;
  caption: string;
  alt: string;
  tags: { value: string; title: string }[];
  nano: string; //the substitute image when ori image is still loading
};

type Props = ImageGalleryProps & StateProps;

const ImageGallery: React.FC<Props> = ({
  loading,
  inEditMode,
  galleryImages,
  successMessage,
  setGalleryImages,
  customClassName,
  selectAllChecked,
  setSelectAllChecked,
  onDeleteUploadImage,
}) => {
  /* ================================================== */
  /*  useState  */
  /* ================================================== */
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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
  const allImagesSelected = (images: TGalleryImageArrayObj[]) => {
    var f = images.filter(function (img: TGalleryImageArrayObj) {
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
  const onSelectImage = (index: number) => {
    var temp_images: TGalleryImageArrayObj[] = galleryImages.slice(); //copy the array, just like spread operator
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

    setGalleryImages(temp_images);
  };

  /**
   * Loop through the images array and check if isSelected is true then add into array
   * @return {*} the length of selected images
   */
  const getSelectedImagesLength = () => {
    var selected = [];
    for (var i = 0; i < galleryImages.length; i++) if (galleryImages[i].isSelected === true) selected.push(i);
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
    var temp_images: TGalleryImageArrayObj[] = galleryImages.slice();
    if (selectAllChecked === true) {
      for (var i = 0; i < temp_images.length; i++) temp_images[i].isSelected = false;
    } else {
      for (var j = 0; j < temp_images.length; j++) temp_images[j].isSelected = true;
    }

    setGalleryImages(temp_images);
  };

  /**
   * Helper function to filter out selected objects and
   * pass to backend api calls
   */

  const confirmDeleteUploadImage = () => {
    // filter out the selected images
    let filteredSelectedImages = galleryImages.filter((imgObj) => {
      return imgObj.isSelected === true;
    });

    // extract the ids out from the filtered selected images
    let idsArray: number[] = [];
    filteredSelectedImages.forEach((imgObj) => {
      idsArray.push(imgObj.id);
    });

    if (idsArray.length > 0 && onDeleteUploadImage) {
      // pass in an array ids of the images that has value isSelected = true
      onDeleteUploadImage(idsArray);
    }
  };

  /* ================================================== */
  /* useEffect */
  /* ================================================== */
  useEffect(() => {
    if (successMessage && successMessage.toLowerCase() === 'Delete successful'.toLowerCase()) {
      setShowDeleteModal(false);
    }
  }, [successMessage]);

  /* ================================================== */
  /* ================================================== */
  return (
    <>
      {/* Delete Modal */}
      <Modal
        title={
          <>
            <ExclamationCircleOutlined className="imagegallery__modal-icon" />
            {getSelectedImagesLength() > 1 ? 'Delete Images' : 'Delete Image'}
          </>
        }
        confirmLoading={loading}
        visible={showDeleteModal}
        okText="Yes, Delete"
        onOk={() => confirmDeleteUploadImage()}
        onCancel={() => setShowDeleteModal(false)}
      >
        Are you sure you want to delete {getSelectedImagesLength() > 1 ? 'these images?' : 'this image?'}
      </Modal>
      <div>
        <div className="imagegallery__div">
          {/* Only show select all and delete when user is in edit mode */}
          {inEditMode && (
            <div className="imagegallery__button-outerdiv">
              <Button className="imagegallery__button" type="primary" onClick={() => onClickSelectAll()}>
                <CheckCircleOutlined />
                {selectAllChecked ? 'Unselect All' : 'Select All'}
              </Button>
              {/* Disable delete when user hasnt select anything */}
              <Button
                danger
                disabled={getSelectedImagesLength() === 0}
                type="default"
                onClick={() => setShowDeleteModal(true)}
              >
                <DeleteOutlined /> Delete
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

          <div className={customClassName}>
            {inEditMode ? (
              /* when in edit mode, user can open lightbox */
              <Gallery
                margin={5}
                tagStyle={{
                  background: '#28292b9a',
                  color: 'white',
                  padding: '0.3rem 0.5rem',
                  borderRadius: '0.2rem',
                  bottom: '5rem',
                  borderColor: 'white',
                }}
                images={galleryImages}
                onClickThumbnail={onSelectImage}
                onSelectImage={onSelectImage}
                enableImageSelection={true} //allow user to select image and check the checkbox
                enableLightbox={false} //hide lightbox
                showLightboxThumbnails={true}
              />
            ) : (
              <>
                Click on one of the images below to view at full size
                {/*  when NOT in edit mode, user cannot open lightbox  */}
                <Gallery
                  margin={5}
                  tagStyle={{
                    background: '#28292b9a',
                    color: 'white',
                    padding: '0.3rem 0.5rem',
                    borderRadius: '0.2rem',
                    bottom: '5rem',
                    borderColor: 'white',
                  }}
                  images={galleryImages}
                  enableImageSelection={false} //prevent user from being able to select image
                  enableLightbox={true}
                  showLightboxThumbnails={true}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

interface StateProps {
  successMessage?: string | null;
}
const mapStateToProps = (state: RootState): StateProps => {
  return { successMessage: state.dashboard.successMessage };
};

export default connect(mapStateToProps, null)(ImageGallery);
