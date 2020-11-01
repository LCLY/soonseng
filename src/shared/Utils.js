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
export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

/* For Unit testing */
export const findByTestAttribute = (component, attribute) => {
  const wrapper = component.find(`[data-test='${attribute}']`);
  return wrapper;
};

/* For AntD table resizable column */
// https://ant.design/components/table/#header
export const ResizableTitle = (props) => {
  console.log('called resizable');
  const { onResize, width, minWidth, ...restProps } = props;

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

/* var to store data */
let filterData = null;
let setFilterData = null;
let searchInput = null;
let columnsDefineHeader = null;
let setColumnsDefineHeader = null;

export const components = {
  header: {
    cell: ResizableTitle,
  },
};

/* Component just have to call this and then the antd table will be resizable and filterable */
export const setAntdResizableState = (
  _filterData,
  _setFilterData,
  _searchInput,
  _columnsDefineHeader,
  _setColumnsDefineHeader,
) => {
  filterData = _filterData;
  searchInput = _searchInput;
  setFilterData = _setFilterData;
  columnsDefineHeader = _columnsDefineHeader;
  setColumnsDefineHeader = _setColumnsDefineHeader;
};

/* modified the search functions to take in two more params */
/* filterData and setFilterData to update the states */
export const handleSearch = (selectedKeys, confirm, dataIndex) => {
  confirm();
  /* Check if data is not null then proceed to setData */
  if (filterData) {
    setFilterData({
      ...filterData,
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  }
};

export const handleReset = (clearFilters) => {
  clearFilters();
  if (filterData) {
    setFilterData({
      ...filterData,
      searchText: '',
    });
  }
};

export const getColumnSearchProps = (dataIndex, title) => ({
  filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
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
  filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? 'white' : undefined }} />,
  onFilter: (value, record) =>
    record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : '',
  onFilterDropdownVisibleChange: (visible) => {
    if (visible) {
      setTimeout(() => searchInput && searchInput.select(), 100);
    }
  },
  render: (text) =>
    filterData && filterData.searchedColumn === dataIndex ? (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[filterData.searchText]}
        autoEscape
        textToHighlight={text ? text.toString() : ''}
      />
    ) : (
      text
    ),
});

const handleResize = (index) => (e, { size }) => {
  if (columnsDefineHeader) {
    const nextColumns = [...columnsDefineHeader];
    nextColumns[index] = {
      ...nextColumns[index],
      width: size.width,
    };

    setColumnsDefineHeader(nextColumns);
  }
};

// Change header to resizable
export const convertHeader = () => {
  console.log('convert header');
  if (columnsDefineHeader) {
    return columnsDefineHeader.map((col, index) => ({
      ...col,
      onHeaderCell: (column) => ({
        width: column.width,
        minWidth: column.minWidth,
        onResize: handleResize(index),
      }),
    }));
  }
};
