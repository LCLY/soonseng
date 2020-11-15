import React from 'react';
import './TableImageViewer.scss';
/*components*/
import ImageGallery, { TGalleryImageArrayObj } from '../ImageGallery/ImageGallery';
/*3rd party lib*/
import { Button } from 'antd';
import { DeleteOutlined, UploadOutlined, CloseCircleOutlined } from '@ant-design/icons';
/* Util */
import { SalesActionTypes, TReceivedImageObj } from 'src/store/types/sales';

interface TableImageViewerProps {
  /** record from each model's table */
  record: any;
  loading: boolean | undefined;
  tableName: string;
  tableSpecificId: number;
  /** image array from every model's table record   */
  recordImageArray: TReceivedImageObj[];
  /** Images array to populate the image gallery */
  galleryImages: TGalleryImageArrayObj[];
  setGalleryImages: React.Dispatch<React.SetStateAction<TGalleryImageArrayObj[]>>;
  selectAllChecked: boolean;
  setSelectAllChecked: React.Dispatch<React.SetStateAction<boolean>>;
  /** api call to delete upload image by passing in array of ids */
  onDeleteUploadImage: (ids: number[]) => SalesActionTypes;
  onClearAllSelectedImages: () => void;
  /** to populate any edit/update modal when user clicks on upload image button */
  onPopulateEditModal: (record: any) => void;
  /** for showing update modal when user clicks on upload image button */
  showUpdateModal: { [key: string]: boolean };
  setShowUpdateModal: React.Dispatch<React.SetStateAction<any>>;
  /** To keep track of which keys are being expanded  */
  setExpandedRowKeys: React.Dispatch<React.SetStateAction<React.ReactText[]>>;
  /** Whether to show the edit mode image gallery */
  showEditImageGallery: { [key: string]: boolean };
  setShowEditImageGallery: React.Dispatch<
    React.SetStateAction<{
      [key: string]: boolean;
    }>
  >;
}

type Props = TableImageViewerProps;

/**
 * The component that render the images edit mode with the image gallery
 * @return {*}
 * @category Components
 */
const TableImageViewer: React.FC<Props> = ({
  record,
  loading,
  tableName,
  galleryImages,
  setGalleryImages,
  showUpdateModal,
  tableSpecificId,
  selectAllChecked,
  recordImageArray,
  setSelectAllChecked,
  onDeleteUploadImage,
  onPopulateEditModal,
  setExpandedRowKeys,
  setShowUpdateModal,
  showEditImageGallery,
  onClearAllSelectedImages,
  setShowEditImageGallery,
}) => {
  return (
    <>
      {recordImageArray.length > 0 && (
        <>
          <div className="tableviewer__images-header-div">
            <div className="flex-align-center">
              Images:&nbsp;
              <span className="tableviewer__results">{recordImageArray.length} result(s)</span>
            </div>
            <div>
              <Button
                onClick={() => {
                  // this is to set boolean for specific row to be true
                  // adding tableName to make it unique to each table
                  // e.g. "make"+"1"
                  // in this case e.g. make1: true or false
                  // so only row of make id 1 will be becoming edit mode
                  setShowEditImageGallery({
                    ...showEditImageGallery,
                    [tableName + tableSpecificId]: !showEditImageGallery[tableName + tableSpecificId],
                  });
                  // this function is passed to imageGallery
                  //  it will simply uncheck everything
                  onClearAllSelectedImages();
                }}
              >
                {/* if screen is showing image gallery, then it should cancel button, edit button otherwise  */}
                {showEditImageGallery[tableName + tableSpecificId] ? (
                  <span>Cancel</span>
                ) : (
                  <span>
                    Delete Image(s)&nbsp; <DeleteOutlined />
                  </span>
                )}
              </Button>

              {/* only show add images button when NOT in edit mode */}
              {!showEditImageGallery[tableName + tableSpecificId] && (
                <Button
                  style={{ marginLeft: '1rem' }}
                  className="blue-default-btn"
                  onClick={() => {
                    // populate every edit modal
                    onPopulateEditModal(record);
                    // open the edit modal
                    setShowUpdateModal({ ...showUpdateModal, [tableName]: true });
                  }}
                >
                  Add Image(s) <UploadOutlined />
                </Button>
              )}

              {/* Close button */}
              <Button
                type="link"
                danger
                style={{ paddingRight: 0 }}
                onClick={() => {
                  //empty the keys so nothing will be expanded
                  setExpandedRowKeys([]);
                  // this function is passed to imageGallery
                  //  it will simply uncheck everything
                  onClearAllSelectedImages();
                }}
              >
                Close
                <CloseCircleOutlined />
              </Button>
            </div>
          </div>

          {/* only show image gallery when user clicks view all */}
          {showEditImageGallery[tableName + tableSpecificId] ? (
            // In edit mode, disabled light box
            <ImageGallery
              loading={loading}
              inEditMode={true}
              galleryImages={galleryImages}
              setGalleryImages={setGalleryImages}
              selectAllChecked={selectAllChecked}
              onDeleteUploadImage={onDeleteUploadImage}
              setSelectAllChecked={setSelectAllChecked}
              customClassName="gallery__outerdiv--edit"
            />
          ) : (
            // In normal mode, enable light box
            <ImageGallery
              inEditMode={false}
              galleryImages={galleryImages}
              setGalleryImages={setGalleryImages}
              customClassName="gallery__outerdiv--normal"
            />
          )}
        </>
      )}
    </>
  );
};
export default TableImageViewer;
