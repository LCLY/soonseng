import React, { useEffect, useState } from 'react';
import './FullImageGalleryModal.scss';
/*components*/
import DragAndDrop from 'src/components/DragAndDrop/DragAndDrop';
import ImageGallery, { TGalleryImageArrayObj } from '../ImageGallery/ImageGallery';
/*3rd party lib*/
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import { Badge, Button, Form, Modal, Select } from 'antd';
import { DeleteOutlined, UploadOutlined, CaretLeftOutlined, CloseCircleFilled } from '@ant-design/icons';
/* Util */
import {
  UPLOAD_TO_MAKE,
  UPLOAD_TO_BRAND,
  UPLOAD_TO_BODY,
  UPLOAD_TO_BODY_MAKE,
  UPLOAD_TO_ACCESSORY,
  UPLOAD_TO_SERIES,
} from 'src/shared/constants';
import { AppActions } from 'src/store/types';
import * as actions from 'src/store/actions/index';
import { img_loading_link } from 'src/shared/links';
// import { UPLOAD_TO_MAKE } from 'src/shared/constants';
import { TReceivedImageObj } from 'src/store/types/dashboard';
import { handleKeyDown, onClearAllSelectedImages, onPopulateImagesArray } from 'src/shared/Utils';
import { RootState } from 'src';

const { Option } = Select;

interface FullImageGalleryModalProps {
  loading: boolean;
  visible: boolean;
  modelId: number;
  modelName:
    | typeof UPLOAD_TO_MAKE
    | typeof UPLOAD_TO_BRAND
    | typeof UPLOAD_TO_BODY
    | typeof UPLOAD_TO_BODY_MAKE
    | typeof UPLOAD_TO_ACCESSORY
    | typeof UPLOAD_TO_SERIES;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  /** To target what images we are doing  */
  indexKey: string;
  /** image array */
  imagesArray: TReceivedImageObj[] | null;
  /** api call to delete upload image by passing in array of ids */
  onDeleteUploadImage: (ids: number[]) => AppActions;
  /** for showing update modal when user clicks on upload image button */
  /** Whether to show the edit mode image gallery */
  // showEditImageGallery: boolean;
  // setShowEditImageGallery: React.Dispatch<React.SetStateAction<boolean>>;
  onClearAllSelectedImages: (
    selectAllChecked: boolean,
    setSelectAllChecked: React.Dispatch<React.SetStateAction<boolean>>,
    galleryImages: TGalleryImageArrayObj[],
    setGalleryImages: React.Dispatch<React.SetStateAction<TGalleryImageArrayObj[]>>,
  ) => void;
  imagesPreviewUrls: { url: string; name: string }[];
  setImagesPreviewUrls: React.Dispatch<React.SetStateAction<{ url: string; name: string }[]>>;
  uploadSelectedFiles: FileList | null | undefined;
  setUploadSelectedFiles: React.Dispatch<React.SetStateAction<FileList | null | undefined>>;
}

type Props = FullImageGalleryModalProps & DispatchProps & StateProps;

/**
 * The component that render the images edit mode with the image gallery but on a larger modal
 * @return {*}
 * @category Components
 */
const FullImageGalleryModal: React.FC<Props> = ({
  loading,
  modelId,
  visible,
  setVisible,
  modelName,
  imagesArray,
  onUploadImage,
  successMessage,
  onDeleteUploadImage,
  imagesPreviewUrls,
  uploadSelectedFiles,
  setUploadSelectedFiles,
  setImagesPreviewUrls,
}) => {
  const [galleryImages, setGalleryImages] = useState<TGalleryImageArrayObj[]>([]);
  const [showEditImageGallery, setShowEditImageGallery] = useState(false);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [inUploadMode, setInUploadMode] = useState(false);
  const [uploadForm] = Form.useForm();
  const [dragging, setDragging] = useState(false);
  /* ==================================== */
  // method
  /* ==================================== */
  const handleFilesDrop = (files: FileList) => {
    fileSelectedHandler(files);
  };

  const fileSelectedHandler = (files: FileList | null) => {
    setUploadSelectedFiles(files);

    //check if files exist
    if (files) {
      // if files exist, store them in an array and into the state of imagePreviewUrls
      // convert the FileList object to array first and then iterate it
      let filesTempArray: { url: string; name: string }[] = [];
      // convert the files into string of localhost url
      Array.from(files).forEach((file) => {
        filesTempArray.push({ url: URL.createObjectURL(file), name: file.name });
      });
      setImagesPreviewUrls([...imagesPreviewUrls, ...filesTempArray]);
    }
  };

  /**
   * A helper function that takes in url link and compare it with an array
   * of urls and only keep the urls that are not equal to the one we are comparing to
   * by using filter method. Meaning, in other words keeping the rest except
   * the one we want to delete to create the effect of deleting
   * @param {string} imagePreviewUrl
   * @category Helper function
   */
  const deleteUrlFromPreviewUrlsArray = (unwantedUrl: string) => {
    var filteredArray = [...imagesPreviewUrls].filter((stillWantedUrl) => {
      return unwantedUrl !== stillWantedUrl.url;
    });

    setImagesPreviewUrls(filteredArray);
  };

  const onUploadFinish = (values: { imageTag: string }) => {
    if (uploadSelectedFiles !== undefined && uploadSelectedFiles !== null) {
      onUploadImage(modelName, modelId, values.imageTag, uploadSelectedFiles);
    }
  };
  /* ==================================== */
  // useEffect
  /* ==================================== */
  useEffect(() => {
    if (imagesArray) {
      if (imagesArray.length > 0) {
        setInUploadMode(false);
        onPopulateImagesArray(imagesArray, setGalleryImages);
      } else {
        setInUploadMode(true);
      }
    }
  }, [imagesArray]);

  useEffect(() => {
    if (successMessage) {
      //  if success, swap the upload mode back to gallery
      setInUploadMode(false);
      setImagesPreviewUrls([]);
      setUploadSelectedFiles(null);
      setShowEditImageGallery(false);
    }
  }, [successMessage, setUploadSelectedFiles, setImagesPreviewUrls]);

  // console.log('preview urls', imagesPreviewUrls);
  // console.log('selected files', uploadSelectedFiles);

  return (
    <>
      <Modal
        title="Edit Images"
        visible={visible}
        okText="Upload"
        onOk={uploadForm.submit}
        okButtonProps={{ disabled: !inUploadMode || uploadSelectedFiles === null }}
        onCancel={() => {
          // clear everything
          setVisible(false);
          uploadForm.resetFields();
          setImagesPreviewUrls([]);
          setInUploadMode(false);
          setUploadSelectedFiles(null);
          setShowEditImageGallery(false);
        }}
        width={1000}
        confirmLoading={loading}
      >
        {imagesArray && (
          <>
            <section className="fullimagegallerymodal__section-outerdiv">
              {/* ============================================= */}
              {/* UPLOAD MODE */}
              {/* ============================================= */}
              {inUploadMode || imagesArray.length === 0 ? (
                <section className="fullimagegallerymodal__section-upload">
                  {imagesArray.length > 0 && (
                    <div className="fullimagegallerymodal__div-top">
                      <Button
                        className="blue-default-btn"
                        onClick={() => {
                          // open the edit modal
                          setInUploadMode(false);
                        }}
                      >
                        <CaretLeftOutlined /> Back
                      </Button>
                    </div>
                  )}
                  <input
                    type="file"
                    id="imageFiles"
                    hidden
                    multiple
                    disabled={imagesPreviewUrls.length > 0}
                    accept="image/png, image/jpeg, image/jpg" //only accept image files
                    onChange={(event) => fileSelectedHandler(event.target.files)}
                  />
                  <div>
                    {imagesPreviewUrls.length > 0 && (
                      <div className="fullimagegallerymodal__preview-top">
                        Upload Preview
                        <div>
                          <Form
                            form={uploadForm}
                            onKeyDown={(e) => {
                              handleKeyDown(e, uploadForm);
                            }}
                            onFinish={(values) => {
                              onUploadFinish(values);
                            }}
                          >
                            <Form.Item
                              label="Tag"
                              name="imageTag"
                              rules={[{ required: true, message: 'Select a Tag!' }]}
                              style={{ marginBottom: '0' }}
                            >
                              {/* only render if brandsArray is not null */}
                              <Select className="fullimagegallerymodal__preview-select" placeholder="Select a tag">
                                <Option style={{ textTransform: 'capitalize' }} value="Body Plan">
                                  Body Plan
                                </Option>
                                <Option style={{ textTransform: 'capitalize' }} value="Catalog">
                                  Catalog
                                </Option>
                                <Option style={{ textTransform: 'capitalize' }} value="Customer Photo">
                                  Customer Photo
                                </Option>
                                <Option style={{ textTransform: 'capitalize' }} value="Brand Top Left">
                                  Brand Top Left
                                </Option>
                                <Option style={{ textTransform: 'capitalize' }} value="Brand Top Right">
                                  Brand Top Right
                                </Option>
                                <Option style={{ textTransform: 'capitalize' }} value="Warranty">
                                  Warranty
                                </Option>
                              </Select>
                            </Form.Item>
                          </Form>
                        </div>
                      </div>
                    )}

                    <DragAndDrop dragging={dragging} setDragging={setDragging} handleFilesDrop={handleFilesDrop}>
                      {imagesPreviewUrls.length > 0 ? (
                        <div className="fullimagegallerymodal__preview-div">
                          {imagesPreviewUrls.map((imagePreviewUrl, index) => {
                            return (
                              <div key={index} className="make__preview-innerdiv">
                                <Badge
                                  className="make__preview-closeicon-div"
                                  count={
                                    <CloseCircleFilled
                                      style={{ zIndex: 1000 }}
                                      className="make__preview-closeicon"
                                      onClick={() => deleteUrlFromPreviewUrlsArray(imagePreviewUrl.url)}
                                    />
                                  }
                                >
                                  <div className="fullimagegallerymodal__image-outerdiv">
                                    <div
                                      className="make__preview-item"
                                      key={uuidv4()}
                                      style={{
                                        backgroundSize: 'cover',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'center',
                                        backgroundColor: 'rgb(197, 197, 191)',
                                        backgroundImage: `url(${imagePreviewUrl.url}), url(${img_loading_link})`,
                                      }}
                                    ></div>
                                    <div className="fullimagegallerymodal__image-name">{imagePreviewUrl.name}</div>
                                  </div>
                                </Badge>
                              </div>
                            );
                          })}
                          <div>
                            <input
                              type="file"
                              id="moreImageFiles"
                              hidden
                              multiple
                              accept="image/png, image/jpeg, image/jpg" //only accept image files
                              onChange={(event) => fileSelectedHandler(event.target.files)}
                            />
                            <label
                              htmlFor="moreImageFiles"
                              className="fullimagegallerymodal__preview-item fullimagegallerymodal__preview-add"
                            >
                              <div className="fullimagegallerymodal__preview-add-div">
                                <i className="fas fa-plus-circle fullimagegallerymodal__preview-add-icon"></i>
                                <div className="fullimagegallerymodal__preview-add-text">Upload</div>
                              </div>
                            </label>
                          </div>
                        </div>
                      ) : (
                        <label htmlFor="imageFiles" className={`fullimagegallerymodal__section-draganddrop`}>
                          <div
                            className={`fullimagegallerymodal__upload-div ${
                              // disable hover when something is already selected and when file is being dragged on top
                              // if not will have overlapped effect
                              imagesPreviewUrls.length === 0 && !dragging
                                ? 'fullimagegallerymodal__upload-div--hover'
                                : ''
                            }`}
                          >
                            <div className="fullimagegallerymodal__upload-icon">
                              <i className="fas fa-file-upload"></i>
                            </div>
                            <div className="fullimagegallerymodal__upload-text">Click or drop image here to upload</div>
                          </div>
                        </label>
                      )}
                    </DragAndDrop>
                  </div>
                </section>
              ) : (
                <>
                  {/* ============================================= */}
                  {/* GALLERY MODE */}
                  {/* ============================================= */}
                  <section className="fullimagegallerymodal__section-gallery">
                    <div className="fullimagegallerymodal__images-header-div">
                      <div className="flex-align-center">
                        Total Number of Images:&nbsp;
                        <span className="fullimagegallerymodal__results">{imagesArray.length}</span>
                      </div>
                      <div>
                        <Button
                          onClick={() => {
                            // this is to set boolean for specific row to be true
                            // adding tableName to make it unique to each table
                            // e.g. "make"+"1"
                            // in this case e.g. make1: true or false
                            // so only row of make id 1 will be becoming edit mode
                            setShowEditImageGallery(!showEditImageGallery);
                            // this function is passed to imageGallery
                            //  it will simply uncheck everything
                            onClearAllSelectedImages(
                              selectAllChecked,
                              setSelectAllChecked,
                              galleryImages,
                              setGalleryImages,
                            );
                          }}
                        >
                          {/* if screen is showing image gallery, then it should cancel button, edit button otherwise  */}
                          {showEditImageGallery ? (
                            <span>Cancel Delete</span>
                          ) : (
                            <span>
                              Delete Image(s)&nbsp; <DeleteOutlined />
                            </span>
                          )}
                        </Button>

                        {/* only show add images button when NOT in edit mode */}
                        {!showEditImageGallery && (
                          <Button
                            style={{ marginLeft: '1rem' }}
                            className="blue-default-btn"
                            onClick={() => {
                              // open the edit modal
                              setInUploadMode(true);
                            }}
                          >
                            Upload Image(s) <UploadOutlined />
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* only show image gallery when user clicks view all */}
                    {showEditImageGallery ? (
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
                  </section>
                </>
              )}
            </section>
          </>
        )}
      </Modal>
    </>
  );
};

interface StateProps {
  successMessage?: string | null;
}

const mapStateToProps = (state: RootState): StateProps => {
  return {
    successMessage: state.dashboard.successMessage,
  };
};

interface DispatchProps {
  onUploadImage: typeof actions.uploadImage;
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => {
  return {
    onUploadImage: (model, model_id, imageTag, imageFiles) =>
      dispatch(actions.uploadImage(model, model_id, imageTag, imageFiles)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FullImageGalleryModal);
