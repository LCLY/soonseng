import React from 'react';
import './PreviewUploadImage.scss';
/*components*/
/*3rd party lib*/
import { v4 as uuidv4 } from 'uuid';
import { Badge, Form, Select } from 'antd';
import { CloseCircleFilled } from '@ant-design/icons';
/* Util */
import { img_loading } from 'src/shared/global';

const { Option } = Select;
interface PreviewUploadImageProps {
  /**
   *  The SetStateAction to manipulate files that are ready to be uploaded to
   *  backend through API calls
   * @type {(React.Dispatch<React.SetStateAction<FileList | null | undefined>>)}
   * @memberof PreviewUploadImageProps
   */
  setUploadSelectedFiles: React.Dispatch<React.SetStateAction<FileList | null | undefined>>;

  /**
   * String array of Urls that are supposed to be shown
   * as preview images before user uploads, user can delete images from this
   * array before they upload
   * @type {string[]}
   * @memberof PreviewUploadImageProps
   */
  imagesPreviewUrls: string[];
  setImagesPreviewUrls: React.Dispatch<React.SetStateAction<string[]>>;
}

type Props = PreviewUploadImageProps;

const PreviewUploadImage: React.FC<Props> = ({ setUploadSelectedFiles, imagesPreviewUrls, setImagesPreviewUrls }) => {
  /* ================================================== */
  /*  methods  */
  /* ================================================== */
  /**
   * Trigger this function when user clicks on the upload button
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const fileSelectedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUploadSelectedFiles(event.target.files);

    //check if files exist
    if (event.target.files) {
      // if files exist, store them in an array and into the state of imagePreviewUrls
      // convert the FileList object to array first and then iterate it
      let filesTempArray: string[] = [];
      // convert the files into string of localhost url
      Array.from(event.target.files).forEach((file) => filesTempArray.push(URL.createObjectURL(file)));
      setImagesPreviewUrls(filesTempArray);
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
      return unwantedUrl !== stillWantedUrl;
    });

    setImagesPreviewUrls(filteredArray);
  };

  return (
    <>
      <div className="make__preview-btn-div">
        <input
          type="file"
          id="imageFiles"
          hidden
          multiple
          accept="image/png, image/jpeg, image/jpg" //only accept image files
          onChange={fileSelectedHandler}
        />
        <label htmlFor="imageFiles" className="ant-btn ant-btn-default profile__picture-button">
          Select image(s) from device
        </label>
      </div>
      {/* Only shows when images are selected */}
      {imagesPreviewUrls.length !== 0 && (
        <div className="make__preview-outerdiv">
          <div className="make__preview-title-div">
            <div className="make__preview-title">Image(s) Preview</div>
            {/* ------- Select Image Tag -------*/}
            <Form.Item
              label="Tag"
              name="imageTag"
              rules={[{ required: true, message: 'Select a Tag!' }]}
              style={{ marginBottom: '0' }}
            >
              {/* only render if brandsArray is not null */}
              <Select placeholder="Select a tag">
                <Option style={{ textTransform: 'capitalize' }} value="Body Plan">
                  Body Plan
                </Option>
                <Option style={{ textTransform: 'capitalize' }} value="Catalog">
                  Catalog
                </Option>
                <Option style={{ textTransform: 'capitalize' }} value="Customer Photo">
                  Customer Photo
                </Option>
              </Select>
            </Form.Item>
          </div>
          <div className="make__preview">
            {imagesPreviewUrls.map((imagePreviewUrl, index) => {
              return (
                <div key={index} className="make__preview-innerdiv">
                  <Badge
                    className="make__preview-closeicon-div"
                    count={
                      <CloseCircleFilled
                        className="make__preview-closeicon"
                        onClick={() => deleteUrlFromPreviewUrlsArray(imagePreviewUrl)}
                      />
                    }
                  >
                    <div
                      className="make__preview-item"
                      key={uuidv4()}
                      style={{
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        backgroundColor: 'rgb(197, 197, 191)',
                        backgroundImage: `url(${imagePreviewUrl}), url(${img_loading})`,
                      }}
                    ></div>
                  </Badge>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};
export default PreviewUploadImage;
