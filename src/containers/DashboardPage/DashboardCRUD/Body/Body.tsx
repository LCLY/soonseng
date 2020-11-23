import React, { useEffect, useState, ReactText } from 'react';
import './Body.scss';
/*components*/
import Loading from 'src/components/Loading/Loading';
import HeaderTitle from 'src/components/HeaderTitle/HeaderTitle';
import NavbarComponent from 'src/components/NavbarComponent/NavbarComponent';
import CustomContainer from 'src/components/CustomContainer/CustomContainer';
import LayoutComponent from 'src/components/LayoutComponent/LayoutComponent';
import TableImageViewer from 'src/components/ImageRelated/TableImageViewer/TableImageViewer';
import PreviewUploadImage from 'src/components/ImageRelated/PreviewUploadImage/PreviewUploadImage';
import { TGalleryImageArrayObj } from 'src/components/ImageRelated/ImageGallery/ImageGallery';
/*3rd party lib*/
import {
  Button,
  // Empty,
  Carousel,
  Form,
  Card,
  Input,
  Layout,
  Modal,
  Select,
  Table,
  Tag,
  Tooltip,
  notification,
  Checkbox,
} from 'antd';
import LazyLoad from 'react-lazyload';
import { PlusCircleTwoTone, MinusCircleTwoTone } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';
import { FormInstance } from 'antd/lib/form/hooks/useForm';
/* Util */
import {
  TCreateBodyLengthData,
  TReceivedAccessoryObj,
  TReceivedBodyAccessoryObj,
  TReceivedBodyLengthObj,
  TReceivedBodyObj,
  TReceivedImageObj,
  TReceivedLengthObj,
  TUpdateBodyLengthData,
} from 'src/store/types/dashboard';
import { TMapStateToProps } from 'src/store/types';
import * as actions from 'src/store/actions/index';
// import { useWindowDimensions } from 'src/shared/HandleWindowResize';
import { img_not_available_link, img_loading_link } from 'src/shared/global';
import { convertHeader, getColumnSearchProps, setFilterReference } from 'src/shared/Utils';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';

const { Option } = Select;
const { TextArea } = Input;

interface BodyProps {}

type TBodyTableState = {
  key?: string;
  index?: number;
  bodyId: number; //for update
  bodyTitle: string;
  bodyDescription: string;
  available?: boolean;
  bodyImages: TReceivedImageObj[];
};
type TLengthTableState = {
  key?: string;
  index?: number;
  lengthId: number; //for update
  lengthTitle: string;
  lengthDescription: CheckboxValueType[] | string;
  available?: boolean;
};
type TBodyLengthTableState = {
  key?: string;
  index?: number;
  bodyLengthId: number; //for update
  bodyLengthLengthId: number;
  bodyLengthLengthTitle: string;
  bodyLengthBodyId: number;
  bodyLengthBodyTitle: string;
  bodyLengthWidth: string;
  bodyLengthHeight: string;
  bodyLengthDepth: string;
  bodyLengthPrice: string;
  bodyLengthBodyAccessory: TReceivedBodyAccessoryObj[] | null;
  bodyLengthBodyAccessoryArrayLength: number;
  available?: boolean;
  bodyLengthImages: TReceivedImageObj[];
};

type TCreateBodyLengthForm = {
  bodyLengthLengthId: number; // length id
  bodyLengthBodyId: number; // body id
  bodyLengthWidth: { feet: string; inch: string };
  bodyLengthHeight: { feet: string; inch: string };
  bodyLengthDepth: { feet: string; inch: string };
  bodyLengthPrice: number;
  imageTag: string;
};
type TUpdateBodyLengthForm = {
  bodyLengthId: number;
  bodyLengthLengthId: number; // length id
  bodyLengthBodyId: number; // body id
  bodyLengthWidth: { feet: string; inch: string };
  bodyLengthHeight: { feet: string; inch: string };
  bodyLengthDepth: { feet: string; inch: string };
  bodyLengthPrice: number;
  imageTag: string;
};

type TCreateBodyAccessoryForm = {
  bodyAccessoryTitle: string; //according to teckhong, probably dont want the title
  bodyAccessoryDescription: string;
  bodyLengthId: number; //body_length_id
  accessoryId: number; //accessory_id
  bodyAccessoryPrice: number;
  imageTag: string;
};
type TUpdateBodyAccessoryForm = {
  bodyAccessoryId: number; // body_accessory id
  bodyAccessoryTitle: string; //according to teckhong, probably dont want the title
  bodyAccessoryDescription: string;
  bodyLengthId: number; //body_length_id
  accessoryId: number; //accessory_id
  bodyAccessoryPrice: number;
  imageTag: string;
};

type TShowModal = {
  body: boolean;
  length: boolean;
  body_length: boolean; //if got image add current Body length id as well
  body_accessory: boolean; //if got image add current Body length id as well
};

type Props = BodyProps & StateProps & DispatchProps;

const Body: React.FC<Props> = ({
  // miscellaneous
  loading,
  errorMessage,
  successMessage,
  // body
  bodiesArray,
  onGetBodies,
  onUpdateBody,
  onCreateBody,
  // length
  lengthsArray,
  onGetLengths,
  onUpdateLength,
  onCreateLength,
  // body length
  bodyLengthsArray,
  onGetBodyLengths,
  onCreateBodyLength,
  onUpdateBodyLength,
  // body accessory
  bodyAccessoriesArray,
  // onGetBodyAccessories,
  onCreateBodyAccessory,
  onUpdateBodyAccessory,
  // accessory
  accessoriesArray,
  onGetAccessories,
  // delete upload iamges
  onDeleteUploadImage,
  // clear states
  onClearDashboardState,
}) => {
  /* ================================================== */
  /*  state */
  /* ================================================== */
  // ref for forms
  /* body */
  const [createBodyForm] = Form.useForm();
  const [updateBodyForm] = Form.useForm();
  /* length */
  const [createLengthForm] = Form.useForm();
  const [updateLengthForm] = Form.useForm();
  /* bodyLength */
  const [createBodyLengthForm] = Form.useForm();
  const [updateBodyLengthForm] = Form.useForm();
  /* bodyAccessories */
  const [createBodyAccessoryForm] = Form.useForm();
  const [updateBodyAccessoryForm] = Form.useForm();

  // const { width } = useWindowDimensions();

  // Table states
  const [bodyTableState, setBodyTableState] = useState<TBodyTableState[]>([]);
  const [lengthTableState, setLengthTableState] = useState<TLengthTableState[]>([]);
  const [bodyLengthTableState, setBodyLengthTableState] = useState<TBodyLengthTableState[]>([]);

  let bodySearchInput = null; //this is for filter on antd table
  let lengthSearchInput = null; //this is for filter on antd table
  let bodyLengthSearchInput = null; //this is for filter on antd table
  const [filterData, setFilterData] = useState({ searchText: '', searchedColumn: '' });
  setFilterReference(filterData, setFilterData);

  /* ------------------------ */
  /*   Image related states   */
  /* ------------------------ */
  // Upload states
  const [uploadSelectedFiles, setUploadSelectedFiles] = useState<FileList | null | undefined>(null);
  // state to store temporary images before user uploads
  const [imagesPreviewUrls, setImagesPreviewUrls] = useState<string[]>([]); //this is for preview image purposes only

  // edit image gallery

  /**
   * This state will be storing makeId as the key
   * The boolean is to determine whether to show each individual image gallery
   * e.g. make1: false
   */
  const [showEditImageGallery, setShowEditImageGallery] = useState<{ [key: string]: boolean }>({});

  // To handle one row only expand at a time
  const [expandedRowKeys, setExpandedRowKeys] = useState<ReactText[]>([]);
  // this is to determine if all of the images are selected
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  // For populating images
  const [galleryImages, setGalleryImages] = useState<TGalleryImageArrayObj[]>([]);
  /* ------------------------ */
  // Modal states
  /* ------------------------ */
  const [showCreateModal, setShowCreateModal] = useState<TShowModal>({
    body: false,
    length: false,
    body_length: false,
    body_accessory: false,
  });
  const [showUpdateModal, setShowUpdateModal] = useState<TShowModal>({
    body: false,
    length: false,
    body_length: false,
    body_accessory: false,
  });

  // store table header definition in state
  /**
   * containing objects of arrays
   * body[], length[], bodyLength[]
   **/

  /* Body column initialization */
  const [bodyColumns, setBodyColumns] = useState([
    {
      key: 'bodyIndex',
      title: 'No.',
      dataIndex: 'index',
      ellipsis: true,
      width: '7rem',
      align: 'center',
      sorter: (a: TBodyTableState, b: TBodyTableState) =>
        a.index !== undefined && b.index !== undefined && a.index - b.index,
    },
    {
      key: 'bodyTitle',
      title: 'Title',
      dataIndex: 'bodyTitle',
      width: '15rem',
      className: 'body__table-header--title',
      ellipsis: true,
      sorter: (a: TBodyTableState, b: TBodyTableState) => a.bodyTitle.localeCompare(b.bodyTitle),
      ...getColumnSearchProps(bodySearchInput, 'bodyTitle', 'Title'),
    },
    {
      key: 'bodyDescription',
      title: 'Description',
      dataIndex: 'bodyDescription',
      ellipsis: true,
      width: 'auto',
      sorter: (a: TBodyTableState, b: TBodyTableState) => a.bodyDescription.localeCompare(b.bodyDescription),

      ...getColumnSearchProps(bodySearchInput, 'bodyDescription', 'Description'),
    },
    {
      key: 'bodyAction',
      title: 'Action',
      dataIndex: 'action',
      // fixed: 'right',
      width: '17rem',
      render: (_text: any, record: TBodyTableState) => {
        return (
          <>
            <div>
              <Button
                type="link"
                className="make__brand-btn--edit"
                onClick={() => {
                  onPopulateEditBodyModal(record);
                  // show modal
                  setShowUpdateModal({ ...showUpdateModal, body: true });
                }}
              >
                Edit
              </Button>
              <Button disabled type="link" danger>
                Delete
              </Button>
            </div>
            <div>
              <Button
                type="default"
                onClick={() => {
                  setShowCreateModal({ ...showCreateModal, body_accessory: true });
                  //  set the body length id
                  // createBodyAccessoryForm.setFieldsValue({ bodyLengthId: record.bodyLengthId });
                }}
              >
                Create Accessory
              </Button>
            </div>
          </>
        );
      },
    },
  ]);
  /* Length column initialization */
  const [lengthColumns, setLengthColumns] = useState([
    {
      key: 'lengthIndex',
      title: 'No.',
      dataIndex: 'index',
      ellipsis: true,
      width: '7rem',
      align: 'center',
      sorter: (a: TLengthTableState, b: TLengthTableState) =>
        a.index !== undefined && b.index !== undefined && a.index - b.index,
    },
    {
      key: 'lengthTitle',
      title: 'Title',
      dataIndex: 'lengthTitle',
      width: '15rem',
      ellipsis: true,
      sorter: (a: TLengthTableState, b: TLengthTableState) => a.lengthTitle.localeCompare(b.lengthTitle),
      ...getColumnSearchProps(lengthSearchInput, 'lengthTitle', 'Title'),
    },
    {
      key: 'lengthDescription',
      title: 'Categories',
      dataIndex: 'lengthDescription',
      ellipsis: true,
      width: 'auto',
      render: (_text: any, record: TLengthTableState) => (
        <>
          {typeof record.lengthDescription === 'string'
            ? record.lengthDescription
            : record.lengthDescription.map((category) => {
                /** check categories and assign respective tag colors  */
                const setRespectiveColors = (category: CheckboxValueType) => {
                  let color = '';
                  switch (category) {
                    case 'LCV':
                      color = 'orange';
                      break;
                    case 'MCV':
                      color = 'green';
                      break;
                    case 'HCV':
                      color = 'cyan';
                      break;
                    default:
                      color = 'magenta';
                  }
                  return color;
                };
                return (
                  <>
                    {category !== '' && (
                      <Tag key={uuidv4()} color={setRespectiveColors(category)}>
                        {category}
                      </Tag>
                    )}
                  </>
                );
              })}
        </>
      ),
    },
    {
      key: 'lengthAction',
      title: 'Action',
      dataIndex: 'action',
      // fixed: 'right',
      width: '17rem',
      render: (_text: any, record: TLengthTableState) => {
        return (
          <>
            <Button
              type="link"
              className="make__brand-btn--edit"
              onClick={() => {
                // show modal
                setShowUpdateModal({ ...showUpdateModal, length: true });

                updateLengthForm.setFieldsValue({
                  lengthId: record.lengthId,
                  lengthTitle: record.lengthTitle.replace('ft', ''),
                  lengthDescription: record.lengthDescription === '-' ? '' : record.lengthDescription,
                });
              }}
            >
              Edit
            </Button>
            <Button disabled type="link" danger>
              Delete
            </Button>
          </>
        );
      },
    },
  ]);

  /* Body Length column initialization */
  const [bodyLengthColumns, setBodyLengthColumns] = useState([
    {
      key: 'bodyLengthIndex',
      title: 'No.',
      dataIndex: 'index',
      ellipsis: true,
      width: '7rem',
      align: 'center',
      sorter: (a: TBodyLengthTableState, b: TBodyLengthTableState) =>
        a.index !== undefined && b.index !== undefined && a.index - b.index,
    },
    {
      key: 'bodyLengthBodyTitle',
      title: 'Body',
      dataIndex: 'bodyLengthBodyTitle',
      className: 'body__table-header--title',
      ellipsis: true,
      width: '15rem',
      sorter: (a: TBodyLengthTableState, b: TBodyLengthTableState) =>
        a.bodyLengthBodyTitle.localeCompare(b.bodyLengthBodyTitle),
      ...getColumnSearchProps(bodyLengthSearchInput, 'bodyLengthBodyTitle', 'Body'),
    },
    {
      key: 'bodyLengthLengthTitle',
      title: 'Length',
      dataIndex: 'bodyLengthLengthTitle',
      className: 'body__table-header--title',
      ellipsis: true,
      width: '15rem',
      sorter: (a: TBodyLengthTableState, b: TBodyLengthTableState) =>
        a.bodyLengthLengthTitle.localeCompare(b.bodyLengthLengthTitle),
      ...getColumnSearchProps(bodyLengthSearchInput, 'bodyLengthLengthTitle', 'Body'),
    },
    {
      key: 'bodyLengthDimension',
      title: 'Dimension',
      dataIndex: 'bodyLengthDimension',
      ellipsis: true,
      width: 'auto',
      render: (_text: any, record: TBodyLengthTableState) => {
        return (
          <>
            <div className="body__tag-outerdiv">
              <div className="body__tag-div">
                <Tag className="body__tag" color="red">
                  <div className="body__tag-title">Width</div>
                  <div className="body__tag-values">
                    <div className="body__tag-colon">:</div> <div>{record.bodyLengthWidth}</div>
                  </div>
                </Tag>
              </div>
              <div className="body__tag-div">
                <Tag className="body__tag" color="cyan">
                  <div className="body__tag-title">Height</div>
                  <div className="body__tag-values">
                    <div className="body__tag-colon">:</div> <div>{record.bodyLengthHeight}</div>
                  </div>
                </Tag>
              </div>
              <div className="body__tag-div">
                <Tag className="body__tag" color="blue">
                  <div className="body__tag-title">Depth</div>
                  <div className="body__tag-values">
                    <div className="body__tag-colon">:</div> <div>{record.bodyLengthDepth}</div>
                  </div>
                </Tag>
              </div>
            </div>
          </>
        );
      },
    },
    {
      key: 'bodyLengthPrice',
      title: 'Price',
      dataIndex: 'bodyLengthPrice',
      ellipsis: true,
      width: 'auto',
      sorter: (a: TBodyLengthTableState, b: TBodyLengthTableState) =>
        a.bodyLengthPrice.localeCompare(b.bodyLengthPrice),
      ...getColumnSearchProps(bodyLengthSearchInput, 'bodyLengthPrice', 'Price'),
    },
    {
      key: 'bodyLengthAction',
      title: 'Action',
      dataIndex: 'action',
      // fixed: 'right',
      width: '17rem',
      render: (_text: any, record: TBodyLengthTableState) => {
        return (
          <>
            <div>
              <Button
                type="link"
                className="make__brand-btn--edit"
                onClick={() => {
                  // populate bodylength modal
                  onPopulateEditBodyLengthModal(record);
                  // show modal
                  setShowUpdateModal({ ...showUpdateModal, body_length: true });
                }}
              >
                Edit
              </Button>
              <Button disabled type="link" danger>
                Delete
              </Button>
            </div>
            <div>
              <Button
                type="default"
                onClick={() => {
                  setShowCreateModal({ ...showCreateModal, body_accessory: true });
                  //  set the body length id
                  createBodyAccessoryForm.setFieldsValue({ bodyLengthId: record.bodyLengthId });
                }}
              >
                Create Accessory
              </Button>
            </div>
          </>
        );
      },
    },
  ]);

  /* ================================================== */
  /*  methods  */
  /* ================================================== */

  /**
   * helper function for checking inch undefined
   * @param {string} feet
   * @param {string} inch
   * @return {*} feet + ' or feet + ' + inch ''
   */
  const formatFeetInch = (feet: string, inch: string) => {
    if (inch === undefined || inch === '') {
      return feet + "'";
    }
    return feet + "' " + inch + "''";
  };

  /**
   * For user to be able to press enter and submit the form
   * @param {React.KeyboardEvent<HTMLFormElement>} e
   * @param {FormInstance<any>} form form instance created at initialization using useForm
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>, formRef: FormInstance<any>) => {
    if (e.key === 'Enter') {
      formRef.submit();
    }
  };

  /**
   * helper function to clear all selected images in image gallery when user call it
   * @category Helper function
   */
  const onClearAllSelectedImages = () => {
    setSelectAllChecked(false);

    var temp_images: any = galleryImages.slice();
    if (selectAllChecked) {
      for (var j = 0; j < temp_images.length; j++) temp_images[j].isSelected = false;
    }
    setGalleryImages(temp_images);
  };

  /**
   *
   * helper function to only show 1 expanded row
   * @param {*} expanded
   * @param {*} record
   * @category Helper function
   */
  const onTableRowExpand = (expanded: boolean, record: TBodyTableState | TBodyLengthTableState) => {
    var keys = [];
    let key = record.key;
    if (!expanded && key) {
      keys.push(key.toString()); // I have set my record.id as row key. Check the documentation for more details.
    }

    setExpandedRowKeys(keys);
  };

  /**
   *
   * This function takes in images array from make object and then populate the current state
   * of setImage
   * @param {TReceivedImageObj[]} recordImagesArray
   * @category Helper function
   */
  const onPopulateImagesArray = (recordImagesArray: TReceivedImageObj[]) => {
    let tempArray: TGalleryImageArrayObj[] = [];

    // Populate the array state with every image and later pass to Image Gallery
    const storeValue = (image: TReceivedImageObj) => {
      let imageObject = {
        id: image.id,
        src: image.url,
        thumbnail: image.url,
        thumbnailWidth: 320,
        thumbnailHeight: 212,
        alt: image.filename,
        nano: 'https://miro.medium.com/max/882/1*9EBHIOzhE1XfMYoKz1JcsQ.gif', //spinner gif
        isSelected: false,
        tags: [{ value: image.tag ? image.tag : ' - ', title: image.tag ? image.tag : ' - ' }],
        caption: image.filename,
      };

      tempArray.push(imageObject);
    };
    recordImagesArray.map(storeValue);

    setGalleryImages(tempArray);
  };

  /**
   *
   * Helper function to render expand icons for different tables
   * @param {boolean} expanded
   * @param {(TBodyTableState|TBodyLengthTableState)} record
   * @return {*}
   */
  const onExpandIcon = (expanded: boolean, record: TBodyTableState | TBodyLengthTableState) => {
    let expandImageGalleryButton = null;
    let tooltipIconsText = { plusIcon: '', minusIcon: '' };

    if ('bodyImages' in record && 'bodyId' in record) {
      expandImageGalleryButton = (
        <PlusCircleTwoTone
          style={{
            opacity: record.bodyImages.length === 0 ? 0.3 : 1,
            pointerEvents: record.bodyImages.length === 0 ? 'none' : 'auto',
          }}
          onClick={() => {
            // this allow only 1 row to expand at a time
            onTableRowExpand(expanded, record);
            // this closes all the edit image gallery when user expand other row
            // clearing out all the booleans
            setShowEditImageGallery({});
            // this function is passed to imageGallery
            //  it will simply uncheck everything
            onClearAllSelectedImages();
            // populate image array state and pass to ImageGallery component
            onPopulateImagesArray(record.bodyImages);
          }}
        />
      );
      // when showing plus, text should be click to show, vice versa
      tooltipIconsText.plusIcon = 'Click to show images';
      tooltipIconsText.minusIcon = 'Click to hide images';
    } else if ('bodyLengthImages' in record && 'bodyLengthId' in record) {
      expandImageGalleryButton = (
        // Prevent user from clicking if both arrays lengths are 0
        <PlusCircleTwoTone
          style={{
            opacity: record.bodyLengthImages.length === 0 && record.bodyLengthBodyAccessoryArrayLength === 0 ? 0.3 : 1,
            pointerEvents:
              record.bodyLengthImages.length === 0 && record.bodyLengthBodyAccessoryArrayLength === 0 ? 'none' : 'auto',
          }}
          onClick={() => {
            // this allow only 1 row to expand at a time
            onTableRowExpand(expanded, record);
            // this closes all the edit image gallery when user expand other row
            // clearing out all the booleans
            setShowEditImageGallery({});
            // this function is passed to imageGallery
            //  it will simply uncheck everything
            onClearAllSelectedImages();
            // populate image array state and pass to ImageGallery component
            onPopulateImagesArray(record.bodyLengthImages);
          }}
        />
      );
      // when showing plus, text should be click to show, vice versa
      tooltipIconsText.plusIcon = 'Click to show images and attachable accessories';
      tooltipIconsText.minusIcon = 'Click to hide images and attachable accessories';
    }

    return (
      <>
        {expanded ? (
          <Tooltip trigger={['hover', 'click']} title={tooltipIconsText.minusIcon}>
            <MinusCircleTwoTone
              onClick={() => {
                onTableRowExpand(expanded, record);
                // this function is passed to imageGallery
                //  it will simply uncheck everything
                onClearAllSelectedImages();
              }}
            />
          </Tooltip>
        ) : (
          <Tooltip trigger={['hover', 'click']} title={tooltipIconsText.plusIcon}>
            {expandImageGalleryButton}
          </Tooltip>
        )}
      </>
    );
  };

  const onExpandedRowRender = (record: TBodyTableState | TBodyLengthTableState) => {
    let tableName: string = '';
    let tableSpecificId: number = -1;
    let recordImageArray: TReceivedImageObj[] = [];

    if ('bodyImages' in record && 'bodyId' in record) {
      recordImageArray = record.bodyImages;
      tableSpecificId = record.bodyId;
      tableName = 'body';
    } else if ('bodyLengthImages' in record && 'bodyLengthId' in record) {
      recordImageArray = record.bodyLengthImages;
      tableSpecificId = record.bodyLengthId;
      tableName = 'body_length';
    }

    return (
      <>
        <TableImageViewer
          record={record}
          loading={loading}
          tableName={tableName}
          galleryImages={galleryImages}
          showUpdateModal={showUpdateModal}
          tableSpecificId={tableSpecificId}
          setGalleryImages={setGalleryImages}
          recordImageArray={recordImageArray}
          selectAllChecked={selectAllChecked}
          setSelectAllChecked={setSelectAllChecked}
          onDeleteUploadImage={onDeleteUploadImage}
          setShowUpdateModal={setShowUpdateModal}
          setExpandedRowKeys={setExpandedRowKeys}
          showEditImageGallery={showEditImageGallery}
          setShowEditImageGallery={setShowEditImageGallery}
          onClearAllSelectedImages={onClearAllSelectedImages}
          onPopulateEditModal={(record) => {
            if ('bodyImages' in record && 'bodyId' in record) {
              onPopulateEditBodyModal(record);
            } else if ('bodyLengthImages' in record && 'bodyLengthId' in record) {
              onPopulateEditBodyLengthModal(record);
            }
          }}
        />
      </>
    );
  };

  /* helper functions to populate forms */
  /**
   * This function takes in the record of the current row of the table
   * and then reformat the important information and pass into the current modal / form
   * @param {TBodyTableState} record
   */
  const onPopulateEditBodyModal = (record: TBodyTableState) => {
    // update the form value using the 'name' attribute as target/key
    // if bodyDescription is '-' then change to empty string, else the real string
    // remember to set this form on the Form component
    updateBodyForm.setFieldsValue({
      bodyId: record.bodyId,
      bodyTitle: record.bodyTitle,
      bodyDescription: record.bodyDescription === '-' ? '' : record.bodyDescription,
    });
  };

  /**
   * This function takes in the record of the current row of the table
   * and then reformat the important information and pass into the current modal / form
   * @param {TBodyLengthTableState} record
   */
  const onPopulateEditBodyLengthModal = (record: TBodyLengthTableState) => {
    /**
     *  Inner helper function to return feet only or feet with inch
     * @param {string} extractedValue Value after width/height/depth is extracted
     * @return {*} return object of feet and inch
     */
    const checkInchExist = (extractedValue: string) => {
      let extractedFeet = '';
      let extractedInch = '';

      // needa check if inch is undefined, only have feet in the string
      let onlyInchUndefined = extractedValue.split("'")[0] !== undefined && extractedValue.split("'")[1] === undefined;

      // needa check if inch is undefined, only have feet in the string
      if (onlyInchUndefined) {
        extractedFeet = extractedValue.split("'")[0]; //get the first index
      } else {
        extractedFeet = extractedValue.split("'")[0]; //get the first index
        extractedInch = extractedValue.split("'")[1].toString().trim(); //second index and remove empty space infront of the inch
      }

      return { feet: extractedFeet, inch: extractedInch };
    };

    let formattedPrice = record.bodyLengthPrice.replace('RM', ''); //remove unit

    // update the form value using the 'name' attribute as target/key
    updateBodyLengthForm.setFieldsValue({
      bodyLengthId: record.bodyLengthId,
      bodyLengthBodyId: record.bodyLengthBodyId, // body id
      bodyLengthLengthId: record.bodyLengthLengthId, // length id
      bodyLengthWidth: {
        feet: checkInchExist(record.bodyLengthWidth).feet,
        inch: checkInchExist(record.bodyLengthWidth).inch,
      },
      bodyLengthHeight: {
        feet: checkInchExist(record.bodyLengthHeight).feet,
        inch: checkInchExist(record.bodyLengthHeight).inch,
      },
      bodyLengthDepth: {
        feet: checkInchExist(record.bodyLengthDepth).feet,
        inch: checkInchExist(record.bodyLengthDepth).inch,
      },
      bodyLengthPrice: formattedPrice,
    });
  };

  /* Forms onFinish methods */
  /* --------- BODY ---------- */
  // the keys "values" are from the form's 'name' attribute
  const onCreateBodyFinish = (values: { bodyTitle: string; bodyDescription: string; imageTag: string }) => {
    if (uploadSelectedFiles && uploadSelectedFiles.length > 0) {
      // if there are files being selected to be uploaded
      // then send the tag and image files to the api call
      onCreateBody(values.bodyTitle, values.bodyDescription, values.imageTag, uploadSelectedFiles);
    } else {
      onCreateBody(values.bodyTitle, values.bodyDescription, null, null);
    }
  };
  const onUpdateBodyFinish = (values: {
    bodyId: number;
    bodyTitle: string;
    bodyDescription: string;
    imageTag: string;
  }) => {
    if (uploadSelectedFiles && uploadSelectedFiles.length > 0) {
      // if there are files being selected to be uploaded
      // then send the tag and image files to the api call
      onUpdateBody(values.bodyId, values.bodyTitle, values.bodyDescription, values.imageTag, uploadSelectedFiles);
    } else {
      onUpdateBody(values.bodyId, values.bodyTitle, values.bodyDescription, null, null);
    }
  };

  /**
   *
   * Concat categories into strings
   * @param {CheckboxValueType[]} checkboxValuesArray
   * @return {string} e.g. "LCV,MCV,HCV"
   */
  const concatCategories = (checkboxValuesArray: CheckboxValueType[]) => {
    let concatCategories = '';
    checkboxValuesArray.forEach((category) => (concatCategories += `${category},`));
    return concatCategories;
  };

  /**
   *
   * Convert a plain string into an array of strings
   * @param {string} categoriesString
   * @return {string[]} ["LCV","HCV","MCV"]
   */
  const convertCategoriesToCheckboxValuesType = (categoriesString: string) => {
    return categoriesString.split(',');
  };

  /* --------- LENGTH ---------- */
  const onCreateLengthFinish = (values: { lengthTitle: string; lengthDescription: CheckboxValueType[] }) => {
    if (!loading) {
      onCreateLength(values.lengthTitle, concatCategories(values.lengthDescription));
    }
  };

  const onUpdateLengthFinish = (values: {
    lengthId: number;
    lengthDescription: CheckboxValueType[];
    lengthTitle: string;
  }) => {
    if (!loading) {
      onUpdateLength(values.lengthId, values.lengthTitle, concatCategories(values.lengthDescription));
    }
  };

  /* --------- BODY LENGTH ---------- */
  const onCreateBodyLengthFinish = (values: TCreateBodyLengthForm) => {
    // if inch has no input then only display feet
    let concatWidth = formatFeetInch(values.bodyLengthWidth.feet, values.bodyLengthWidth.inch);
    let concatHeight = formatFeetInch(values.bodyLengthHeight.feet, values.bodyLengthHeight.inch);
    let concatDepth = formatFeetInch(values.bodyLengthDepth.feet, values.bodyLengthDepth.inch);

    // if inch has no input then only display length
    let createBodyLengthData: TCreateBodyLengthData = {
      body_id: values.bodyLengthBodyId,
      length_id: values.bodyLengthLengthId,
      width: concatWidth,
      height: concatHeight,
      depth: concatDepth,
      price: values.bodyLengthPrice,
    };

    if (uploadSelectedFiles && uploadSelectedFiles.length > 0) {
      // if there are files being selected to be uploaded
      // then send the tag and image files to the api call
      onCreateBodyLength(createBodyLengthData, values.imageTag, uploadSelectedFiles);
    } else {
      onCreateBodyLength(createBodyLengthData, null, null);
    }
  };

  const onUpdateBodyLengthFinish = (values: TUpdateBodyLengthForm) => {
    // if inch has no input then only display feet
    let concatWidth = formatFeetInch(values.bodyLengthWidth.feet, values.bodyLengthWidth.inch);
    let concatHeight = formatFeetInch(values.bodyLengthHeight.feet, values.bodyLengthHeight.inch);
    let concatDepth = formatFeetInch(values.bodyLengthDepth.feet, values.bodyLengthDepth.inch);

    let updateBodyLengthData: TUpdateBodyLengthData = {
      body_length_id: values.bodyLengthId,
      body_id: values.bodyLengthBodyId,
      length_id: values.bodyLengthLengthId,
      width: concatWidth,
      height: concatHeight,
      depth: concatDepth,
      price: values.bodyLengthPrice,
    };

    if (uploadSelectedFiles && uploadSelectedFiles.length > 0) {
      // if there are files being selected to be uploaded
      // then send the tag and image files to the api call
      onUpdateBodyLength(updateBodyLengthData, values.imageTag, uploadSelectedFiles);
    } else {
      onUpdateBodyLength(updateBodyLengthData, null, null);
    }
  };

  /* --------- BODY ACCESSORY ---------- */
  const onCreateBodyAccessoryFinish = (values: TCreateBodyAccessoryForm) => {
    let createBodyAccessoryData = {
      body_length_id: values.bodyLengthId,
      accessory_id: values.accessoryId,
      price: values.bodyAccessoryPrice,
      description: values.bodyAccessoryDescription,
    };
    if (uploadSelectedFiles && uploadSelectedFiles.length > 0) {
      // if there are files being selected to be uploaded
      // then send the tag and image files to the api call
      onCreateBodyAccessory(createBodyAccessoryData, values.imageTag, uploadSelectedFiles);
    } else {
      onCreateBodyAccessory(createBodyAccessoryData, null, null);
    }
  };
  const onUpdateBodyAccessoryFinish = (values: TUpdateBodyAccessoryForm) => {
    let updateBodyAccessoryData = {
      body_accessory_id: values.bodyAccessoryId,
      body_length_id: values.bodyLengthId,
      accessory_id: values.accessoryId,
      price: values.bodyAccessoryPrice,
      description: values.bodyAccessoryDescription,
    };
    if (uploadSelectedFiles && uploadSelectedFiles.length > 0) {
      // if there are files being selected to be uploaded
      // then send the tag and image files to the api call
      onUpdateBodyAccessory(updateBodyAccessoryData, values.imageTag, uploadSelectedFiles);
    } else {
      onUpdateBodyAccessory(updateBodyAccessoryData, null, null);
    }
  };

  /* ================================================== */
  /*  Components  */
  /* ================================================== */

  /* ---------------------------- */
  // Body
  /* ---------------------------- */
  /* Create Body Form Items */
  let createBodyFormItems = (
    <>
      <Form.Item
        className="make__form-item"
        label="Title"
        name="bodyTitle"
        rules={[{ required: true, message: 'Input title here!' }]}
      >
        <Input placeholder="Type title here" />
      </Form.Item>
      <Form.Item
        className="make__form-item"
        label="Description"
        name="bodyDescription"
        rules={[{ required: false, message: 'Input description here!' }]}
      >
        <TextArea rows={3} placeholder="Type description here" />
      </Form.Item>
      <PreviewUploadImage
        setUploadSelectedFiles={setUploadSelectedFiles}
        imagesPreviewUrls={imagesPreviewUrls}
        setImagesPreviewUrls={setImagesPreviewUrls}
      />
    </>
  );

  /* Create Body Form */
  let createBodyFormComponent = (
    <>
      <Form
        form={createBodyForm}
        name="createBody"
        onKeyDown={(e) => handleKeyDown(e, createBodyForm)}
        onFinish={onCreateBodyFinish}
      >
        {createBodyFormItems}
      </Form>
    </>
  );

  /* Create Body Modal */
  let createBodyModal = (
    <Modal
      centered
      title="Create Body"
      visible={showCreateModal.body}
      onOk={createBodyForm.submit}
      confirmLoading={loading}
      onCancel={() => {
        createBodyForm.resetFields();
        setShowCreateModal({ ...showCreateModal, body: false }); //close modal on cancel
        setImagesPreviewUrls([]); //clear the image preview when oncancel
      }}
    >
      {/* the content within the modal */}
      {createBodyFormComponent}
    </Modal>
  );

  /* -------------------------------------- */
  /* Edit Body Form */
  let updateBodyFormComponent = (
    <>
      <Form
        form={updateBodyForm}
        name="editBody"
        onKeyDown={(e) => handleKeyDown(e, updateBodyForm)}
        onFinish={onUpdateBodyFinish}
      >
        {/* reusing the form items from create body and add body id for update */}
        {createBodyFormItems}
        {/* Getting the brand id */}
        <Form.Item
          className="make__form-item"
          label="id"
          name="bodyId"
          hidden
          rules={[{ required: true, message: 'Get body id!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </>
  );

  /* Edit Body Modal */
  let updateBodyModal = (
    <Modal
      centered
      title="Edit Body"
      visible={showUpdateModal.body}
      onOk={updateBodyForm.submit}
      confirmLoading={loading}
      onCancel={() => {
        // close edit body modal
        setShowUpdateModal({
          ...showUpdateModal,
          body: false,
        });
        setImagesPreviewUrls([]); //clear the image preview when oncancel
      }}
    >
      {/* the content within the modal */}
      {updateBodyFormComponent}
    </Modal>
  );

  /* ---------------------------- */
  // Length
  /* ---------------------------- */

  const lengthCategoryOptions = ['LCV', 'MCV', 'HCV'];

  /* Length Form Items*/
  let lengthFormItems = (
    <>
      <Form.Item
        className="make__form-item margin_r-1"
        label="Title"
        name={'lengthTitle'}
        rules={[{ required: true, message: 'Input ft here!' }]}
      >
        {/* ft */}
        <Input type="number" min={0} addonAfter={'ft'} placeholder="Type ft here" />
      </Form.Item>

      <Form.Item
        className="make__form-item"
        label="Categories"
        name="lengthDescription"
        rules={[{ required: true, message: 'Choose a category!' }]}
      >
        <Checkbox.Group options={lengthCategoryOptions} style={{ paddingLeft: '2rem' }} />
      </Form.Item>
    </>
  );

  /* Create Length Form*/
  let createLengthFormComponent = (
    <>
      <Form
        form={createLengthForm}
        name="createLength"
        onKeyDown={(e) => handleKeyDown(e, createLengthForm)}
        onFinish={onCreateLengthFinish}
      >
        {/* reuse form items */}
        {lengthFormItems}
      </Form>
    </>
  );

  /* Create Length Modal */
  let createLengthModal = (
    <Modal
      centered
      title="Create Length"
      visible={showCreateModal.length}
      onOk={createLengthForm.submit}
      confirmLoading={loading}
      onCancel={() => {
        createLengthForm.resetFields();
        setShowCreateModal({ ...showCreateModal, length: false }); //close modal on cancel
      }}
    >
      {/* the content within the modal */}
      {createLengthFormComponent}
    </Modal>
  );

  /* ----------------------------------------- */
  /* Edit Length Form */
  let updateLengthFormComponent = (
    <>
      <Form
        form={updateLengthForm}
        name="editLength"
        onKeyDown={(e) => handleKeyDown(e, updateLengthForm)}
        onFinish={onUpdateLengthFinish}
      >
        {/* reuse form items */}
        {lengthFormItems}

        {/* Getting the length id */}
        <Form.Item
          className="make__form-item"
          label="id"
          name="lengthId"
          hidden
          rules={[{ required: true, message: 'Get length id!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </>
  );

  /* Edit Length Modal */
  let updateLengthModal = (
    <Modal
      centered
      title="Edit Length"
      visible={showUpdateModal.length}
      onOk={updateLengthForm.submit}
      confirmLoading={loading}
      onCancel={() => {
        // close edit body modal
        setShowUpdateModal({
          ...showUpdateModal,
          length: false,
        });
      }}
    >
      {/* the content within the modal */}
      {updateLengthFormComponent}
    </Modal>
  );

  /* ---------------------------- */
  // Body Length
  /* ---------------------------- */
  /* Body Length Form Items*/
  let bodyLengthFormItems = (
    <>
      {/* ------- Length - value is brand id but display is brand name -------*/}
      <Form.Item
        className="make__form-item"
        label="Length"
        name="bodyLengthLengthId"
        style={{ marginBottom: '0.8rem' }}
        rules={[{ required: true, message: 'Select a Length!' }]}
      >
        {/* only render if lengthsArray is not null */}
        <Select
          showSearch
          placeholder="Select a length"
          optionFilterProp="children"
          filterOption={(input, option) => option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          {lengthsArray &&
            lengthsArray.map((length) => {
              return (
                <Option style={{ textTransform: 'capitalize' }} key={uuidv4()} value={length.id}>
                  {length.title}
                </Option>
              );
            })}
        </Select>
      </Form.Item>
      {/* ------- Body - value is brand id but display is brand name -------*/}
      <Form.Item
        className="make__form-item"
        label="Body"
        name="bodyLengthBodyId"
        rules={[{ required: true, message: 'Select a Body!' }]}
      >
        {/* only render if bodiesArray is not null */}
        <Select
          showSearch
          placeholder="Select a Body"
          optionFilterProp="children"
          className="body__select-updatebodylength"
          filterOption={(input, option) => option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          {bodiesArray &&
            bodiesArray.map((body) => {
              return (
                <Option style={{ textTransform: 'capitalize' }} key={uuidv4()} value={body.id}>
                  {body.title} {body.description ? ' (' + body.description + ')' : ''}
                </Option>
              );
            })}
        </Select>
      </Form.Item>
      <div style={{ marginBottom: '1rem' }}>Dimensions - W x H x D</div>
      {/* Body Length Width */}
      <div className="flex">
        <Form.Item
          className="make__form-item body__item margin_r-1"
          label="Width"
          name={['bodyLengthWidth', 'feet']}
          rules={[{ required: true, message: 'Input ft here!' }]}
          style={{ width: '62%' }}
        >
          {/* width - ft */}
          <Input type="number" min={0} addonAfter={"'"} placeholder="Type ft' here" />
        </Form.Item>

        <Form.Item
          className="make__form-item--make body__item make__form-item--inch"
          name={['bodyLengthWidth', 'inch']}
          rules={[{ required: false, message: 'Input inch here!' }]}
          style={{ width: '38%' }}
        >
          {/* height - inch */}
          <Input type="number" min={0} max={12} addonAfter={"''"} placeholder="Type inch'' here" />
        </Form.Item>
      </div>
      {/* Body Length Height */}
      <div className="flex">
        <Form.Item
          className="make__form-item body__item margin_r-1"
          label="Height"
          name={['bodyLengthHeight', 'feet']}
          rules={[{ required: true, message: 'Input ft here!' }]}
          style={{ width: '62%' }}
        >
          {/* height - ft */}
          <Input type="number" min={0} addonAfter={"'"} placeholder="Type ft' here" />
        </Form.Item>

        <Form.Item
          className="make__form-item--make body__item make__form-item--inch"
          name={['bodyLengthHeight', 'inch']}
          rules={[{ required: false, message: 'Input inch here!' }]}
          style={{ width: '38%' }}
        >
          {/* height - inch */}
          <Input type="number" min={0} max={12} addonAfter={"''"} placeholder="Type inch'' here" />
        </Form.Item>
      </div>
      {/* Body Length Depth */}
      <div className="flex">
        <Form.Item
          className="make__form-item margin_r-1"
          label="Depth"
          name={['bodyLengthDepth', 'feet']}
          rules={[{ required: true, message: 'Input ft here!' }]}
          style={{ width: '62%' }}
        >
          {/* height - ft */}
          <Input type="number" min={0} addonAfter={"'"} placeholder="Type ft' here" />
        </Form.Item>

        <Form.Item
          className="make__form-item--make make__form-item--inch"
          name={['bodyLengthDepth', 'inch']}
          rules={[{ required: false, message: 'Input inch here!' }]}
          style={{ width: '38%' }}
        >
          {/* height - inch */}
          <Input type="number" min={0} max={12} addonAfter={"''"} placeholder="Type inch'' here" />
        </Form.Item>
      </div>
      <Form.Item
        className="make__form-item"
        label="Price"
        name="bodyLengthPrice"
        rules={[{ required: true, message: 'Input price here!' }]}
      >
        <Input type="number" min={0} addonBefore="RM" placeholder="Type price here" />
      </Form.Item>
      <PreviewUploadImage
        setUploadSelectedFiles={setUploadSelectedFiles}
        imagesPreviewUrls={imagesPreviewUrls}
        setImagesPreviewUrls={setImagesPreviewUrls}
      />
    </>
  );

  /* Create Body Length Form */
  let createBodyLengthFormComponent = (
    <>
      <Form
        form={createBodyLengthForm}
        name="createBodyLength"
        onKeyDown={(e) => handleKeyDown(e, createBodyLengthForm)}
        onFinish={onCreateBodyLengthFinish}
      >
        {/* reuse the component */}
        {bodyLengthFormItems}
      </Form>
    </>
  );

  /* Create Body Length Modal */
  let createBodyLengthModal = (
    <Modal
      centered
      title="Create Body Price"
      visible={showCreateModal.body_length}
      onOk={createBodyLengthForm.submit}
      confirmLoading={loading}
      onCancel={() => {
        createBodyLengthForm.resetFields();
        setShowCreateModal({ ...showCreateModal, body_length: false }); //close modal on cancel
        setImagesPreviewUrls([]); //clear the image preview when oncancel
      }}
    >
      {/* the content within the modal */}
      {createBodyLengthFormComponent}
    </Modal>
  );

  /* ----------------------------------------- */
  /* Edit/Update Body Length Form */
  let updateBodyLengthFormComponent = (
    <>
      <Form
        form={updateBodyLengthForm}
        name="createBodyLength"
        onKeyDown={(e) => handleKeyDown(e, updateBodyLengthForm)}
        onFinish={onUpdateBodyLengthFinish}
      >
        {/* reuse form items */}
        {bodyLengthFormItems}
        {/* Getting the BODY LENGTH ID */}
        <Form.Item
          className="make__form-item"
          label="id"
          name="bodyLengthId"
          hidden
          rules={[{ required: true, message: 'Get body length id!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </>
  );

  /* Edit Body Length Modal */
  let updateBodyLengthModal = (
    <Modal
      centered
      title="Edit Body Price"
      visible={showUpdateModal.body_length}
      onOk={updateBodyLengthForm.submit}
      confirmLoading={loading}
      onCancel={() => {
        // close edit body modal
        setShowUpdateModal({
          ...showUpdateModal,
          body_length: false,
        });
        setImagesPreviewUrls([]); //clear the image preview when oncancel
      }}
    >
      {/* the content within the modal */}
      {updateBodyLengthFormComponent}
    </Modal>
  );

  /* ---------------------------- */
  // Body Accessory
  /* ---------------------------- */
  /* Body Accessory Form Items */
  let bodyAccessoryFormItems = (
    <>
      {/* ------- Select Accessory - value is accessory id but display is accessory title -------*/}
      <Form.Item
        className="make__form-item "
        label="Accessory"
        name="accessoryId"
        rules={[{ required: true, message: 'Select an Accessory!' }]}
      >
        {/* only render if accessoriesArray is not null */}
        {accessoriesArray && (
          <Select placeholder="Select an Accessory">
            {accessoriesArray.map((accessory) => {
              return (
                <Option key={uuidv4()} value={accessory.id}>
                  {accessory.title} {accessory.description ? ' - ' + accessory.description : ''}
                </Option>
              );
            })}
          </Select>
        )}
      </Form.Item>

      {/* Accessory price */}
      <Form.Item
        className="make__form-item"
        label="Price"
        name="bodyAccessoryPrice"
        rules={[{ required: true, message: 'Input price here!' }]}
      >
        <Input type="number" min={0} addonBefore="RM" placeholder="Type price here" />
      </Form.Item>

      {/* Body accessory description */}
      <Form.Item
        className="make__form-item"
        label="Description"
        name="bodyAccessoryDescription"
        rules={[{ required: false, message: 'Input description here!' }]}
      >
        <TextArea rows={3} />
      </Form.Item>

      <Form.Item
        hidden
        label="bodyLengthId"
        name="bodyLengthId"
        rules={[{ required: true, message: 'Input body length id!' }]}
      >
        <Input />
      </Form.Item>
    </>
  );

  /* Create Body Accessory Form */
  let createBodyAccessoryFormComponent = (
    <>
      <Form
        form={createBodyAccessoryForm}
        name="createBodyAccessory"
        onKeyDown={(e) => handleKeyDown(e, createBodyAccessoryForm)}
        onFinish={onCreateBodyAccessoryFinish}
      >
        {bodyAccessoryFormItems}
      </Form>
    </>
  );

  /* Create Body Accessory Modal */
  let createBodyAccessoryModal = (
    <Modal
      centered
      title="Create Accessory"
      visible={showCreateModal.body_accessory}
      onOk={createBodyAccessoryForm.submit}
      confirmLoading={loading}
      onCancel={() => {
        createBodyAccessoryForm.resetFields();
        setShowCreateModal({ ...showCreateModal, body_accessory: false }); //close modal on cancel
        setImagesPreviewUrls([]); //clear the image preview when oncancel
      }}
    >
      {/* the content within the modal */}
      {createBodyAccessoryFormComponent}
    </Modal>
  );

  /* -------------------------------------------- */
  /* Update Body Accessory Form */
  let updateBodyAccessoryFormComponent = (
    <>
      <Form
        form={updateBodyAccessoryForm}
        name="updateBodyAccessory"
        onKeyDown={(e) => handleKeyDown(e, updateBodyAccessoryForm)}
        onFinish={onUpdateBodyAccessoryFinish}
      >
        {bodyAccessoryFormItems}

        {/* Getting the BODY ACCESSORY ID */}
        <Form.Item
          className="make__form-item"
          label="id"
          name="bodyAccessoryId"
          hidden
          rules={[{ required: true, message: 'Get body accessory id!' }]}
        >
          <Input />
        </Form.Item>
        <PreviewUploadImage
          setUploadSelectedFiles={setUploadSelectedFiles}
          imagesPreviewUrls={imagesPreviewUrls}
          setImagesPreviewUrls={setImagesPreviewUrls}
        />
      </Form>
    </>
  );

  /* Update Body Accessory Modal */
  let updateBodyAccessoryModal = (
    <Modal
      centered
      title="Edit Body Accessory"
      visible={showUpdateModal.body_accessory}
      onOk={updateBodyAccessoryForm.submit}
      confirmLoading={loading}
      onCancel={() => {
        setShowUpdateModal({ ...showUpdateModal, body_accessory: false }); //close modal on cancel
        setImagesPreviewUrls([]); //clear the image preview when oncancel
      }}
    >
      {/* the content within the modal */}
      {updateBodyAccessoryFormComponent}
    </Modal>
  );

  /* =================================== */
  /* Body accessory expanded component*/
  /* =================================== */
  const renderBodyAccessoryCardsComponent = (record: TBodyLengthTableState) => {
    return (
      <>
        {record.bodyLengthBodyAccessoryArrayLength > 0 && (
          //  only show this when length of body accesosry array is greater than 0
          <>
            <div>
              Attachable accessories for&nbsp;
              <span style={{ textTransform: 'capitalize' }}>{record.bodyLengthBodyTitle}</span>:&nbsp;
              <span className="body__expand-available">{record.bodyLengthBodyAccessoryArrayLength} available</span>
            </div>
            <hr />
          </>
        )}
        <div className="body__expand-outerdiv">
          {record.bodyLengthBodyAccessory && (
            <>
              {/* if no accessory then show empty */}
              {record.bodyLengthBodyAccessoryArrayLength === 0
                ? // <div className="body__expand-empty">
                  //   <Empty />
                  // </div>
                  null
                : record.bodyLengthBodyAccessory.map((bodyAccessory) => {
                    if (bodyAccessory.available) {
                      return (
                        <Card
                          key={uuidv4()}
                          className="body__expand-card"
                          title={
                            <div className="body__expand-card-title-div">
                              <span className="body__expand-card-title">{bodyAccessory.accessory.title}</span>
                              <Tag color="geekblue" style={{ marginRight: 0 }}>
                                RM{bodyAccessory.accessory.price}
                              </Tag>
                            </div>
                          }
                          size="small"
                          style={{ width: 'auto' }}
                          headStyle={{ background: '#FFF2E8' }}
                        >
                          {bodyAccessory.images ? (
                            <>
                              <Carousel autoplay>
                                {/* render all images if array more than 0 else render 'image not available' image */}
                                {bodyAccessory.images.length > 0 ? (
                                  bodyAccessory.images.map((image) => {
                                    return (
                                      <React.Fragment key={uuidv4()}>
                                        <LazyLoad
                                          placeholder={
                                            <img
                                              className="body__expand-card-img"
                                              alt="loading"
                                              src={img_loading_link}
                                            />
                                          }
                                        >
                                          <img
                                            className="body__expand-card-img"
                                            key={image.id}
                                            alt={image.filename}
                                            src={image.url}
                                          />
                                        </LazyLoad>
                                      </React.Fragment>
                                    );
                                  })
                                ) : (
                                  <img className="body__expand-card-img" alt="test" src={img_not_available_link} />
                                )}
                              </Carousel>
                            </>
                          ) : (
                            <img className="body__expand-card-img" alt="test" src={img_not_available_link} />
                          )}
                          <div className="body__expand-card-body">
                            <div className="body__expand-card-description">
                              <div className="body__expand-card-description-left">
                                <span className="body__expand-card-category">Description</span>:&nbsp;
                              </div>
                              {bodyAccessory.body_length.body.description ? (
                                <div className="body__expand-card-description-right">
                                  {bodyAccessory.body_length.body.description}
                                </div>
                              ) : (
                                <div className="body__expand-card-description-right">-</div>
                              )}
                            </div>
                            <section className="body__expand-card-btn-section">
                              <hr style={{ margin: 0 }} />
                              <div className="body__expand-card-btn-div">
                                <div>
                                  <Button
                                    className="body__expand-card-btn-edit"
                                    style={{ padding: 0 }}
                                    type="link"
                                    onClick={() => {
                                      // show the update modal
                                      setShowUpdateModal({ ...showUpdateModal, body_accessory: true });
                                      // fill in the updateBodyAccessoryform
                                      updateBodyAccessoryForm.setFieldsValue({
                                        bodyAccessoryId: bodyAccessory.id, //the id for update
                                        accessoryId: bodyAccessory.accessory.id,
                                        bodyAccessoryPrice: bodyAccessory.accessory.price,
                                        bodyAccessoryDescription: bodyAccessory.body_length.body.description,
                                        bodyLengthId: bodyAccessory.body_length.id,
                                      });
                                    }}
                                  >
                                    Edit
                                  </Button>
                                  <Button disabled type="link" danger style={{ padding: 0 }}>
                                    Delete
                                  </Button>
                                </div>
                              </div>
                            </section>
                          </div>
                        </Card>
                      );
                    }
                    return <></>;
                  })}
            </>
          )}
        </div>
      </>
    );
  };

  /* ================================================== */
  /*  useEffect  */
  /* ================================================== */
  //  Calling get APIs
  useEffect(() => {
    onGetBodies();
  }, [onGetBodies]);

  useEffect(() => {
    onGetLengths();
  }, [onGetLengths]);

  useEffect(() => {
    onGetLengths();
  }, [onGetLengths]);

  useEffect(() => {
    if (!accessoriesArray) {
      // only call if accessoriesArray is null
      onGetAccessories();
    }
  }, [accessoriesArray, onGetAccessories]);

  useEffect(() => {
    onGetBodyLengths();
  }, [onGetBodyLengths]);

  /* ----------------------------------------------------- */
  // initialize/populate the state of data array for BODY
  /* ----------------------------------------------------- */
  useEffect(() => {
    let tempArray: TBodyTableState[] = [];
    /** A function that stores desired keys and values into a tempArray */
    const storeValue = (body: TReceivedBodyObj, index: number) => {
      let descriptionIsNullOrEmpty = body.description === null || body.description === '';
      // only render when available value is true
      if (body.available) {
        tempArray.push({
          key: uuidv4(),
          index: index + 1,
          bodyId: body.id,
          bodyTitle: body.title,
          bodyDescription: descriptionIsNullOrEmpty ? '-' : body.description,
          available: body.available,
          bodyImages: body.images,
        });
      }
    };

    if (bodiesArray) {
      // Execute function "storeValue" for every array index
      bodiesArray.map(storeValue);
    }
    // update the state with tempArray
    setBodyTableState(tempArray);
  }, [bodiesArray]);

  /* ----------------------------------------------------- */
  // initialize/populate the state of data array for LENGTH
  /* ----------------------------------------------------- */

  useEffect(() => {
    let tempArray: TLengthTableState[] = [];
    /** A function that stores desired keys and values into a tempArray */
    const storeValue = (length: TReceivedLengthObj, index: number) => {
      let descriptionIsNullOrEmpty = length.description === null || length.description === '';
      let formattedLength = '';
      let lengthHasFtInString = length.title.includes('ft');
      if (!lengthHasFtInString) {
        // then add ft to the string behind
        formattedLength = length.title + 'ft';
      } else {
        formattedLength = length.title;
      }

      if (length.available) {
        // only render when available value is true
        tempArray.push({
          key: uuidv4(),
          index: index + 1,
          lengthId: length.id,
          lengthTitle: formattedLength,
          lengthDescription: descriptionIsNullOrEmpty ? '-' : convertCategoriesToCheckboxValuesType(length.description),
          available: length.available,
        });
      }
    };

    if (lengthsArray) {
      // Execute function "storeValue" for every array index
      lengthsArray.map(storeValue);
    }
    // update the state with tempArray
    setLengthTableState(tempArray);
  }, [lengthsArray]);

  /* ------------------------------------------------------------ */
  // initialize/populate the state of data array for BODY LENGTH
  /* ------------------------------------------------------------ */

  useEffect(() => {
    let tempArray: TBodyLengthTableState[] = [];
    /** A function that stores desired keys and values into a tempArray */
    const storeValue = (bodyLength: TReceivedBodyLengthObj, index: number) => {
      // only render when available value is true
      let concatPrice = `RM${bodyLength.price}`;
      let formattedLength = '';
      if (!bodyLength.length.title.includes("'")) {
        formattedLength = bodyLength.length.title + "'";
      } else {
        formattedLength = bodyLength.length.title;
      }

      if (bodyLength.available && bodyLengthsArray) {
        tempArray.push({
          key: uuidv4(),
          index: index + 1,
          bodyLengthId: bodyLength.id,
          bodyLengthLengthId: bodyLength.length.id,
          bodyLengthBodyId: bodyLength.body.id,
          bodyLengthLengthTitle: formattedLength,
          bodyLengthBodyTitle: bodyLength.body.title,
          bodyLengthWidth: bodyLength.width,
          bodyLengthHeight: bodyLength.height,
          bodyLengthDepth: bodyLength.depth,
          bodyLengthPrice: concatPrice,
          bodyLengthBodyAccessory: bodyLength.body_accessories, //pass the bodyaccessory array
          bodyLengthBodyAccessoryArrayLength: bodyLength.body_accessories.length, //pass in the bodyaccessory array length for rowSpan
          available: bodyLength.available,
          bodyLengthImages: bodyLength.images,
        });
      }
    };

    if (bodyLengthsArray) {
      // Execute function "storeValue" for every array index
      bodyLengthsArray.map(storeValue);
    }
    // update the state with tempArray
    setBodyLengthTableState(tempArray);
  }, [bodyAccessoriesArray, bodyLengthsArray]);

  /* -------------------- */
  // success notification
  /* -------------------- */
  useEffect(() => {
    if (successMessage) {
      // show success notification
      notification['success']({
        message: 'Success',
        description: successMessage,
      });
      // clear the successMessage object, set to null
      onClearDashboardState();
      // clear the form inputs using the form reference
      createBodyForm.resetFields();
      createLengthForm.resetFields();
      createBodyLengthForm.resetFields();
      createBodyAccessoryForm.resetFields();

      // close all the modals if successful
      setShowCreateModal({ ...showCreateModal, body: false, length: false, body_length: false, body_accessory: false });
      setShowUpdateModal({ ...showUpdateModal, body: false, length: false, body_length: false, body_accessory: false });
    }
  }, [
    successMessage,
    showUpdateModal,
    showCreateModal,
    createBodyForm,
    createLengthForm,
    createBodyLengthForm,
    createBodyAccessoryForm,
    onClearDashboardState,
    setShowUpdateModal,
    setShowCreateModal,
  ]);

  /* ------------------ */
  // error notification
  /* ------------------ */
  useEffect(() => {
    if (errorMessage) {
      notification['error']({
        message: 'Failed',
        duration: 2.5,
        description: errorMessage,
      });
    }
  }, [errorMessage, onClearDashboardState]);

  /* ================================================== */
  /* ================================================== */
  return (
    <>
      {/* ================== */}
      {/*       Modals       */}
      {/* ================== */}
      {createBodyModal}
      {updateBodyModal}
      {createLengthModal}
      {updateLengthModal}
      {createBodyLengthModal}
      {updateBodyLengthModal}
      {createBodyAccessoryModal}
      {updateBodyAccessoryModal}

      <Layout>
        <NavbarComponent activePage="dashboard" />
        <LayoutComponent activeKey="body">
          <CustomContainer>
            <div className="body__tab-outerdiv">
              <section>
                <HeaderTitle>Body</HeaderTitle>
                {bodiesArray && lengthsArray && bodyLengthsArray ? (
                  <>
                    {/* ===================================== */}
                    {/*             Length Section            */}
                    {/* ===================================== */}
                    <section className="make__section">
                      <div className="make__header-div ">
                        <div className="make__header-title">Lengths</div>
                        <Button
                          type="primary"
                          className="make__brand-btn"
                          onClick={() => setShowCreateModal({ ...showCreateModal, length: true })}
                        >
                          Create New Length
                        </Button>
                      </div>
                      {/* ------------------ */}
                      {/*    Length Table     */}
                      {/* ------------------ */}
                      <Table
                        bordered
                        className="body__table"
                        scroll={{ x: '89rem', y: 400 }}
                        dataSource={lengthTableState}
                        columns={convertHeader(lengthColumns, setLengthColumns)}
                        pagination={false}
                      />
                    </section>
                    {/* ===================================== */}
                    {/*              Body Section             */}
                    {/* ===================================== */}
                    <section className="make__section">
                      <div className="make__header-div ">
                        <div className="make__header-title">Bodies</div>
                        <Button
                          type="primary"
                          className="make__brand-btn"
                          onClick={() => setShowCreateModal({ ...showCreateModal, body: true })}
                        >
                          Create New Body
                        </Button>
                      </div>
                      {/* ------------------ */}
                      {/*    Body Table     */}
                      {/* ------------------ */}
                      <Table
                        bordered
                        className="body__table"
                        scroll={{ x: '89rem', y: 400 }}
                        dataSource={bodyTableState}
                        expandedRowKeys={expandedRowKeys} // this allow only 1 row to expand at a time
                        onExpand={onTableRowExpand} //this allow only 1 row to expand at a time
                        expandable={{
                          expandIcon: ({ expanded, record }) => onExpandIcon(expanded, record),
                          expandedRowRender: (record: TBodyTableState) => onExpandedRowRender(record),
                        }}
                        columns={convertHeader(bodyColumns, setBodyColumns)}
                        pagination={false}
                      />
                    </section>

                    {/* ===================================== */}
                    {/*         Body Length Section           */}
                    {/* ===================================== */}
                    <section className="make__section">
                      <div className="make__header-div ">
                        <div className="make__header-title">Body Price (With Dimension)</div>
                        <Button
                          type="primary"
                          className="make__brand-btn"
                          onClick={() => setShowCreateModal({ ...showCreateModal, body_length: true })}
                        >
                          Create Body Price
                        </Button>
                      </div>
                      {/* ----------------------- */}
                      {/*    Body Length Table    */}
                      {/* ----------------------- */}
                      <Table
                        bordered
                        className="body__table"
                        scroll={{ x: '89rem', y: 600 }}
                        dataSource={bodyLengthTableState}
                        expandedRowKeys={expandedRowKeys}
                        onExpand={onTableRowExpand}
                        expandable={{
                          expandIcon: ({ expanded, record }) => onExpandIcon(expanded, record),
                          expandedRowRender: (record: TBodyLengthTableState) => {
                            let bodyAccessoryCards = renderBodyAccessoryCardsComponent(record);
                            let imageGalleryComponent = onExpandedRowRender(record);
                            return (
                              <>
                                <div style={{ marginBottom: record.bodyLengthImages.length > 0 ? '2rem' : 'none' }}>
                                  {bodyAccessoryCards}
                                </div>
                                {imageGalleryComponent}
                              </>
                            );
                          },
                        }}
                        columns={convertHeader(bodyLengthColumns, setBodyLengthColumns)}
                        pagination={false}
                      />
                    </section>
                  </>
                ) : (
                  <div className="padding_t-5">
                    <Loading />
                  </div>
                )}
              </section>
            </div>
          </CustomContainer>
        </LayoutComponent>
      </Layout>
    </>
  );
};
interface StateProps {
  loading?: boolean;
  imagesUploaded?: boolean;
  errorMessage?: string | null;
  successMessage?: string | null;
  bodiesArray?: TReceivedBodyObj[] | null;
  lengthsArray?: TReceivedLengthObj[] | null;
  accessoriesArray?: TReceivedAccessoryObj[] | null;
  bodyLengthsArray?: TReceivedBodyLengthObj[] | null;
  bodyAccessoriesArray?: TReceivedBodyAccessoryObj[] | null;
}
const mapStateToProps = (state: TMapStateToProps): StateProps | void => {
  if ('dashboard' in state) {
    return {
      loading: state.dashboard.loading,
      bodiesArray: state.dashboard.bodiesArray,
      lengthsArray: state.dashboard.lengthsArray,
      errorMessage: state.dashboard.errorMessage,
      imagesUploaded: state.dashboard.imagesUploaded,
      successMessage: state.dashboard.successMessage,
      accessoriesArray: state.dashboard.accessoriesArray,
      bodyLengthsArray: state.dashboard.bodyLengthsArray,
      bodyAccessoriesArray: state.dashboard.bodyAccessoriesArray,
    };
  }
};
interface DispatchProps {
  // Body
  onGetBodies: typeof actions.getBodies;
  onCreateBody: typeof actions.createBody;
  onUpdateBody: typeof actions.updateBody;
  // Length
  onGetLengths: typeof actions.getLengths;
  onCreateLength: typeof actions.createLength;
  onUpdateLength: typeof actions.updateLength;
  // Body Length
  onGetBodyLengths: typeof actions.getBodyLengths;
  onCreateBodyLength: typeof actions.createBodyLength;
  onUpdateBodyLength: typeof actions.updateBodyLength;
  // Body Accessory
  onGetBodyAccessories: typeof actions.getBodyAccessories;
  onCreateBodyAccessory: typeof actions.createBodyAccessory;
  onUpdateBodyAccessory: typeof actions.updateBodyAccessory;
  // Accessory
  onGetAccessories: typeof actions.getAccessories;
  // Images
  onDeleteUploadImage: typeof actions.deleteUploadImage;
  // Miscellaneous
  onClearDashboardState: typeof actions.clearDashboardState;
}
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => {
  return {
    // Body
    onGetBodies: () => dispatch(actions.getBodies()),
    onCreateBody: (title, description, imageTag, imageFiles) =>
      dispatch(actions.createBody(title, description, imageTag, imageFiles)),
    onUpdateBody: (id, title, description, imageTag, imageFiles) =>
      dispatch(actions.updateBody(id, title, description, imageTag, imageFiles)),
    // Length
    onGetLengths: () => dispatch(actions.getLengths()),
    onCreateLength: (title, description) => dispatch(actions.createLength(title, description)),
    onUpdateLength: (id, title, description) => dispatch(actions.updateLength(id, title, description)),
    // Body Length
    onGetBodyLengths: () => dispatch(actions.getBodyLengths()),
    onCreateBodyLength: (createBodyLengthData, imageTag, imageFiles) =>
      dispatch(actions.createBodyLength(createBodyLengthData, imageTag, imageFiles)),
    onUpdateBodyLength: (updateBodyLengthData, imageTag, imageFiles) =>
      dispatch(actions.updateBodyLength(updateBodyLengthData, imageTag, imageFiles)),
    // Body Accessory
    onGetBodyAccessories: (body_id) => dispatch(actions.getBodyAccessories(body_id)),
    onCreateBodyAccessory: (createBodyAccessoryData, imageTag, imageFiles) =>
      dispatch(actions.createBodyAccessory(createBodyAccessoryData, imageTag, imageFiles)),
    onUpdateBodyAccessory: (updateBodyAccessoryData, imageTag, imageFiles) =>
      dispatch(actions.updateBodyAccessory(updateBodyAccessoryData, imageTag, imageFiles)),
    // Accessory
    onGetAccessories: () => dispatch(actions.getAccessories()),
    // Image
    onDeleteUploadImage: (ids) => dispatch(actions.deleteUploadImage(ids)),
    // Miscellaneous
    onClearDashboardState: () => dispatch(actions.clearDashboardState()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Body);
