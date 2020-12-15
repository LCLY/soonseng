import React from 'react';
import { Resizable } from 'react-resizable';
import { Input, Button, Space, Collapse } from 'antd';
import { FormInstance } from 'antd/lib/form/hooks/useForm';
import { SearchOutlined, InfoCircleOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { TGalleryImageArrayObj } from 'src/components/ImageRelated/ImageGallery/ImageGallery';
import { TReceivedImageObj } from 'src/store/types/dashboard';
import { AppActions } from 'src/store/types/index';
import { AxiosError, AxiosResponse } from 'axios';
import { put /*, delay */ /* call */ } from 'redux-saga/effects';

const { Panel } = Collapse;

// Containing all utilities functions
// for reducers
/**
 * This utility function updates the old state with the latest state in reducers
 * @param {object} oldObject initialState/previous state in reducer
 * @param {object} updatedProperties latest state either from sagas or actions
 * @return Latest state to frontend via mapStateToProps
 * @category Utilities
 */
export const updateObject = (oldObject: object, updatedProperties: object) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

/* ========================================== */
/* For Unit testing */
/* ========================================== */
export const findByTestAttribute = (component: any, attribute: string) => {
  const wrapper = component.find(`[data-test='${attribute}']`);
  return wrapper;
};

/* ========================================== */
/**
 * Setting token into the header config for axios
 * If user is not authenticated, the bearer token will become Bearer null
 * @param {AppActions} action
 * @return {*}
 */
/* ========================================== */
export const setAxiosHeaderToken = (action: AppActions) => {
  let config = {};
  if ('auth_token' in action) {
    config = {
      headers: {
        Authorization: 'Bearer ' + action.auth_token,
      },
    };
  }
  return config;
};

/* ========================================== */
// generator function for sagas
/* ========================================== */

/* ========================================== */
/**
 * Pass error messages to reducer
 * @export
 * @param {AxiosError} error
 * @param {(errorMessage: string) => AppActions} failedAction
 * @param {string} errorMessage
 */
/* ========================================== */
export function* setPromiseError(
  error: AxiosError,
  failedAction: (errorMessage: string) => AppActions,
  errorMessage: string,
) {
  if (error.response) {
    /*
     * The request was made and the server responded with a
     * status code that falls out of the range of 2xx
     */
    console.log('error response data:', error.response.data);
    console.log('error response status:', error.response.status);
    // console.log('error response error:', error.response.errors);

    yield put(failedAction(errorMessage));
  } else if (error.request) {
    /*
     * The request was made but no response was received, `error.request`
     * is an instance of XMLHttpRequest in the browser and an instance
     * of http.ClientRequest in Node.js
     */
    console.log('error response request:', error.request);
  } else {
    // Something happened in setting up the request and triggered an Error
    alert('Error:' + error.message);
  }
}

/**
 * Generator function for determining whether upload action should be called
 * @param {string} modelName
 * @param {AppActions} action
 * @param {AxiosResponse<any>} response
 * @param {boolean} imageIsUploaded
 * @param {unknown} responseData
 * @param {(responseData: unknown, successMessage: string) => AppActions} succeedAction
 * @param {(modelName: string, model_id: number, imageTag: string, imageFiles: FileList) => AppActions} uploadAction
 */
export function* succeedActionWithImageUpload(
  modelName: string,
  response: AxiosResponse<any>,
  imageIsUploaded: boolean,
  uploadAction: (modelName: string, model_id: number, imageTag: string, imageFiles: FileList) => AppActions,
  responseData: unknown,
  succeedAction: (responseData: any, successMessage: string) => AppActions,
  image: { imageTag: string | null; imageFiles: FileList | null },
) {
  // Upload Image to model
  //  check if they are null or not
  if (image.imageTag && image.imageFiles) {
    // retrieve the updated individual make id on success and then call Upload Image action
    yield put(uploadAction(modelName, response.data.updated.id, image.imageTag, image.imageFiles));

    if (imageIsUploaded) {
      //wait until upload image succeed then only declare create brand succeed
      yield put(succeedAction(responseData, response.data.success));
      //reset imageIsUploaded boolean
      imageIsUploaded = false;
    }
  } else {
    // if user is not uploading files, then straight give success
    // receive new response data
    yield put(succeedAction(responseData, response.data.success));
  }
}

/* =================================================================== */
/**
 * For converting thousand separators back into numbers e.g. RM15,000.50 => 15000.5
 * @param {string} priceWithComma
 * @return {*}
 */
/* =================================================================== */
export const unformatPriceString = (priceWithComma: string) => {
  let reversedEngineeredPrice = parseFloat(priceWithComma.replace(/[^0-9-.]/g, ''));
  return reversedEngineeredPrice;
};

/* =========================================================== */
/**
 * Take in price string with commas e.g. RM 15,000.50
 * convert it to float 15000.5
 * @param {string} price
 * @return {float} float
 */
/* =========================================================== */
export const convertPriceToFloat = (price: string) => {
  if (price === undefined || price === null) return 0;

  if (typeof price === 'string') {
    let extractedPrice = '';
    extractedPrice = price.replace('RM', '');
    extractedPrice = unformatPriceString(extractedPrice).toString();
    return parseFloat(extractedPrice);
  }
  return 0;
};

/* =========================================================== */
/**
 *  Helper function to return string with only numbers in it
 * @param {string} value some strings
 * @return {string} return string with only numbers in it
 */
/* =========================================================== */
export const onlyNumberString = (value: string) => {
  return value.replace(/\D/g, '');
};

/* =========================================================== */
/**
 *  Inner helper function to return feet only or feet with inch
 * @param {string} extractedValue Value after width/height/depth is extracted
 * @return {*} return object of feet and inch
 */
/* =========================================================== */
export const checkInchExist = (extractedValue: string) => {
  let extractedFeet = '';
  let extractedInch = '';

  if (extractedValue === null || extractedValue === undefined) return { feet: '', inch: '' };
  // needa check if inch is undefined, only have feet in the string
  let onlyInchUndefined = extractedValue.split("'")[0] !== undefined && extractedValue.split("'")[1] === undefined;

  // needa check if inch is undefined, only have feet in the string
  if (onlyInchUndefined) {
    extractedFeet = extractedValue.split("'")[0]; //get the first index
  } else {
    extractedFeet = extractedValue.split("'")[0]; //get the first index
    extractedInch = onlyNumberString(extractedValue.split("'")[1].toString()); //second index and remove empty space infront of the inch
  }

  return { feet: extractedFeet, inch: extractedInch };
};

/* =========================================================== */
/**
 * helper function for checking inch undefined
 * @param {string} feet
 * @param {string} inch
 * @return {*} [feet '] if inch is undefined or [feet ' inch '' ] if inch exist
 * @category Helper function
 */
/* =========================================================== */
export const formatFeetInch = (feet: string, inch: string) => {
  // if both have no input, return empty string
  if (feet === undefined && inch === undefined) {
    return '';
  }
  // if only inch doesnt have any input return only feet
  if (feet !== undefined && inch === undefined) {
    return feet + "' ";
  }

  return feet + "' " + inch + '"';
};

/* =========================================================== */
/**
 * For user to be able to press enter and submit the form
 * @param {React.KeyboardEvent<HTMLFormElement>} e
 * @param {FormInstance<any>} form form instance created at initialization using useForm
 */
/* =========================================================== */
export const handleFormKeyDown = (e: React.KeyboardEvent<HTMLFormElement>, formRef: FormInstance<any>) => {
  if (e.key === 'Enter') {
    formRef.submit();
  }
};

/* =========================================================== */
/**
 * helper function to clear all selected images in image gallery when user calls it
 * @param {boolean} selectAllChecked
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setSelectAllChecked
 * @param {TGalleryImageArrayObj[]} galleryImages
 * @param {React.Dispatch<React.SetStateAction<TGalleryImageArrayObj[]>>} setGalleryImages
 * @category Helper function
 * /
======================================================= */
export const onClearAllSelectedImages = (
  selectAllChecked: boolean,
  setSelectAllChecked: React.Dispatch<React.SetStateAction<boolean>>,
  galleryImages: TGalleryImageArrayObj[],
  setGalleryImages: React.Dispatch<React.SetStateAction<TGalleryImageArrayObj[]>>,
) => {
  setSelectAllChecked(false);

  var temp_images: any = galleryImages.slice();
  if (selectAllChecked) {
    for (var j = 0; j < temp_images.length; j++) temp_images[j].isSelected = false;
  }
  setGalleryImages(temp_images);
};

/* =========================================================== */
/**
 *
 * helper function to only show 1 expanded row
 * @param {boolean} expanded
 * @param {table} record
 * @param {React.Dispatch<React.SetStateAction<React.ReactText[]>>} setExpandedRowKeys
 * @category Helper function
 */
/* =========================================================== */
export const onTableRowExpand = (
  expanded: boolean,
  record: any,
  setExpandedRowKeys: React.Dispatch<React.SetStateAction<React.ReactText[]>>,
) => {
  var keys = [];
  let key = record.key;
  if (!expanded && key) {
    keys.push(key.toString()); // I have set my record.id as row key. Check the documentation for more details.
  }

  setExpandedRowKeys(keys);
};

/* =========================================================== */
/**
 *
 * This function takes in images array from make object and then populate the current state
 * of setImage
 * @param {TReceivedImageObj[]} recordImagesArray
 * @param {React.Dispatch<React.SetStateAction<TGalleryImageArrayObj[]>>} setGalleryImages
 * @category Helper function
 */
/* =========================================================== */
export const onPopulateImagesArray = (
  recordImagesArray: TReceivedImageObj[],
  setGalleryImages: React.Dispatch<React.SetStateAction<TGalleryImageArrayObj[]>>,
) => {
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

/* =========================================================== */
/**
 * Create header config that contains token
 * @param {AppActions} action
 * @return {*}
 */
/* =========================================================== */
export const configAuthToken = (action: AppActions) => {
  let config = {};
  if ('auth_token' in action) {
    config = {
      headers: {
        Authorization: 'Bearer ' + action.auth_token,
      },
    };
  }
  return config;
};

/* =========================================================== */
/**
 * This util function is gonna take in a huge array and break it
 * into smaller chunks of array
 * the size will determine the length of the smaller arrays
 * @param {any[]} bigArray Huge array
 * @param {number} size size to be splitted into
 * @return {any[]} array of smaller arrays
 */
/* =========================================================== */
export const splitArray = (bigArray: any[], size: number) => {
  let tempArray = [];

  for (var i = 0; i < bigArray.length; i += size) {
    tempArray.push(bigArray.slice(i, i + size));
  }
  return tempArray;
};

/* ============================================================================= */
/* ============================================================================= */
/* ============================================================================= */

/* ============================================================================== */
/* For AntD table resizable column */
/* ============================================================================== */
// https://ant.design/components/table/#header

interface ResizableTitleProps {
  onResize: () => void;
  width: number;
  minWidth: number;
}

type Props = ResizableTitleProps;
export const ResizableTitle: React.FC<Props> = ({ onResize, width, minWidth, ...restProps }) => {
  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable
      width={width}
      height={0}
      handle={
        <span
          className="react-resizable-handle"
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
      }
      onResize={onResize}
      minConstraints={[minWidth, 0]} //set constraint to width when resizing
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th {...restProps} />
    </Resizable>
  );
};

export const components = {
  header: {
    cell: ResizableTitle,
  },
};

type TFilterData = {
  searchText: string;
  searchedColumn: string;
};

let filterData: TFilterData | null = null;
let setFilterData: React.Dispatch<React.SetStateAction<TFilterData>> | null = null;
export const setFilterReference = (_filterData: any, _setFilterData: any) => {
  filterData = _filterData;
  setFilterData = _setFilterData;
};

/* modified the search functions to take in two more params */
/* filterData and setFilterData to update the states */
const handleSearch = (selectedKeys: string[], confirm: () => void, dataIndex: string) => {
  confirm();
  if (filterData && setFilterData) {
    setFilterData({
      ...filterData,
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  }
};

export const handleReset = (clearFilters: () => void) => {
  clearFilters();
  if (filterData && setFilterData) {
    setFilterData({
      ...filterData,
      searchText: '',
    });
  }
};

export const getColumnSearchProps = (searchInput: any, dataIndex: string, title: string) => ({
  filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
    <div style={{ padding: 8 }}>
      <Input
        ref={(node) => {
          searchInput = node;
        }}
        placeholder={`Search ${title}`}
        value={selectedKeys[0]}
        onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
        onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
        style={{ width: 188, marginBottom: 8, display: 'block' }}
      />
      <Space>
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90 }}
        >
          Search
        </Button>
        <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </Space>
    </div>
  ),
  filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? 'white' : undefined }} />,
  onFilter: (value: any, record: any) =>
    record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : '',
  onFilterDropdownVisibleChange: (visible: boolean) => {
    if (visible) {
      setTimeout(() => searchInput && searchInput.select(), 100);
    }
  },
  render: (text: any, record: any) => {
    let highlightRender: React.ReactElement | null = null;
    if ('makeDetails' in record && dataIndex === 'makeDetails') {
      let makeDetailsRecord: { title: string; dataIndex: string }[] = [
        {
          title: 'Length',
          dataIndex: 'makeLength',
        },
        // {
        //   title: 'Wheelbase',
        //   dataIndex: 'makeWheelbaseTitle',
        // },
      ];

      let makeDetailsRecordExpandable: { title: string; dataIndex: string }[] = [
        {
          title: 'Engine Cap',
          dataIndex: 'engine_cap',
        },
        {
          title: 'Horsepower',
          dataIndex: 'horsepower',
        },

        {
          title: 'Transmission',
          dataIndex: 'transmission',
        },
        {
          title: 'GVW',
          dataIndex: 'gvw',
        },

        {
          title: 'Year',
          dataIndex: 'year',
        },
        {
          title: 'Abs',
          dataIndex: 'makeAbs',
        },
        {
          title: 'Torque',
          dataIndex: 'makeTorque',
        },
        {
          title: 'Tire',
          dataIndex: 'makeTire',
        },
        {
          title: 'Config',
          dataIndex: 'makeConfig',
        },
        {
          title: 'Emission',
          dataIndex: 'makeEmission',
        },
        {
          title: 'Price',
          dataIndex: 'price',
        },
      ];
      highlightRender = (
        <>
          <div>
            {makeDetailsRecord.map((detail, index) => {
              return (
                <div className="flex" key={index}>
                  <div className="make__details-left">
                    {/* if its gvw, all uppercase, for others only capitalize the first letter */}
                    <span className="make__details-category">{detail.title}</span>
                  </div>
                  :
                  <div className="make__details-right">
                    {record[detail.dataIndex] && record[detail.dataIndex] !== '' && filterData ? (
                      <Highlighter
                        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                        searchWords={[filterData.searchText]}
                        autoEscape
                        textToHighlight={record[detail.dataIndex].toString()}
                      />
                    ) : (
                      '-'
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <Collapse ghost className="make__details-collapse">
            <Panel
              style={{ padding: 0 }}
              showArrow={false}
              className="make__details-panel"
              header={
                <>
                  <InfoCircleOutlined /> Click here to view more info
                </>
              }
              key="model"
            >
              <div className="">
                <div style={{ whiteSpace: 'initial' }}>
                  {makeDetailsRecordExpandable
                    .slice(0, makeDetailsRecordExpandable.length / 2 + 1)
                    .map((detail, index) => {
                      return (
                        <div className="flex" key={index}>
                          <div className="make__details-left">
                            {/* if its gvw, all uppercase, for others only capitalize the first letter */}
                            <span className="make__details-category">{detail.title}</span>
                          </div>
                          :
                          <div className="make__details-right">
                            {record[detail.dataIndex] && record[detail.dataIndex] !== '' && filterData ? (
                              <Highlighter
                                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                                searchWords={[filterData.searchText]}
                                autoEscape
                                textToHighlight={record[detail.dataIndex].toString()}
                              />
                            ) : (
                              '-'
                            )}
                          </div>
                        </div>
                      );
                    })}
                </div>
                <div style={{ whiteSpace: 'initial' }}>
                  {makeDetailsRecordExpandable
                    .slice(makeDetailsRecordExpandable.length / 2 + 1)
                    .map((detail, index) => {
                      return (
                        <div className="flex" key={index}>
                          <div className="make__details-left">
                            {/* if its gvw, all uppercase, for others only capitalize the first letter */}
                            <span className="make__details-category">{detail.title}</span>
                          </div>
                          :
                          <div className="make__details-right">
                            {record[detail.dataIndex] && record[detail.dataIndex] !== '' && filterData ? (
                              <Highlighter
                                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                                searchWords={[filterData.searchText]}
                                autoEscape
                                textToHighlight={record[detail.dataIndex].toString()}
                              />
                            ) : (
                              '-'
                            )}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </Panel>
          </Collapse>
        </>
      );
    } else {
      highlightRender = (
        <>
          {filterData && filterData.searchedColumn === dataIndex ? (
            <Highlighter
              highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
              searchWords={[filterData.searchText]}
              autoEscape
              textToHighlight={text ? text.toString() : ''}
            />
          ) : (
            text
          )}
        </>
      );
    }

    return highlightRender;
  },
});

// const handleResize = (columnsDefineHeader: any, setColumnsDefineHeader: any, index: number) => (
//   _e: object,
//   { size }: any,
// ) => {
//   if (columnsDefineHeader && setColumnsDefineHeader) {
//     const nextColumns = [...columnsDefineHeader];
//     nextColumns[index] = {
//       ...nextColumns[index],
//       width: size.width,
//     };

//     setColumnsDefineHeader(nextColumns);
//   }
// };

// Change header to resizable, filter/searchable
export const convertHeader = (
  columnsDefineHeader: any,
  _setColumnsDefineHeader: React.Dispatch<React.SetStateAction<any>>,
) => {
  if (columnsDefineHeader) {
    return columnsDefineHeader.map((col: any, _index: number) => ({
      ...col,
      onHeaderCell: (column: any) => ({
        width: column.width,
        minwidth: column.minWidth,
        // onResize: handleResize(columnsDefineHeader, setColumnsDefineHeader, index),
      }),
    }));
  }
};
