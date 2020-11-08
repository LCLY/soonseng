import React from 'react';
import { Resizable } from 'react-resizable';
import { Input, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
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

/* For Unit testing */
export const findByTestAttribute = (component: any, attribute: string) => {
  const wrapper = component.find(`[data-test='${attribute}']`);
  return wrapper;
};

/* For AntD table resizable column */
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
      let makeDetailsRecordArray: { title: string; dataIndex: string }[] = [
        {
          title: 'Length',
          dataIndex: 'length',
        },
        {
          title: 'Wheelbase',
          dataIndex: 'makeWheelbaseTitle',
        },
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
          title: 'Price',
          dataIndex: 'price',
        },
      ];
      highlightRender = (
        <>
          <div style={{ whiteSpace: 'initial', width: '30rem' }}>
            {makeDetailsRecordArray.map((detail, index) => {
              return (
                <div className="flex" key={index}>
                  <div className="make__details-left">
                    {/* if its gvw, all uppercase, for others only capitalize the first letter */}
                    <span className="make__details-category">{detail.title}</span>
                  </div>
                  :
                  <div className="make__details-right">
                    {record[detail.dataIndex] && filterData ? (
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
