import React, { useEffect, useState } from 'react';
import './ChargesFees.scss';
/*Components*/
import Loading from 'src/components/Loading/Loading';
import NavbarComponent from 'src/components/NavbarComponent/NavbarComponent';
import HeaderTitle from 'src/components/HeaderTitle/HeaderTitle';
import LayoutComponent from 'src/components/LayoutComponent/LayoutComponent';
import CustomContainer from 'src/components/CustomContainer/CustomContainer';
import FeesModal from 'src/components/Modal/Fees/FeesModal';
/*3rd party lib*/
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import { Button, Form, Layout, notification, Table } from 'antd';
/*Util*/
import { RootState } from 'src';
import * as actions from 'src/store/actions/index';
import { TReceivedChargesFeesObj } from 'src/store/types/dashboard';
import { convertHeader, convertPriceToFloat, getColumnSearchProps, setFilterReference } from 'src/shared/Utils';

type TFeesTableState = {
  key: string;
  feesId: number;
  feesTitle: string;
  feesPrice: string;
  available: boolean;
};

type TDeleteModalContent = {
  fees: { feesId: number; feesTitle: string };
};

interface ChargesFeesProps {}

type Props = ChargesFeesProps & StateProps & DispatchProps;

const ChargesFees: React.FC<Props> = ({
  loading,
  errorMessage,
  successMessage,
  chargesFeesArray,
  onGetChargesFees,
  onUpdateChargesFees,
  onCreateChargesFees,
  onDeleteChargesfees,
  onClearDashboardState,
}) => {
  /* ================================================== */
  /*  state */
  /* ================================================== */

  const [showCreateModal, setShowCreateModal] = useState<{ [key: string]: boolean }>({ fees: false });
  const [showUpdateModal, setShowUpdateModal] = useState<{ [key: string]: boolean }>({ fees: false });
  const [showDeleteModal, setShowDeleteModal] = useState<{ [key: string]: boolean }>({ fees: false });
  const [deleteModalContent, setDeleteModalContent] = useState<TDeleteModalContent>({
    fees: { feesId: -1, feesTitle: '' },
  });
  // ref for forms
  const [createFeesForm] = Form.useForm();
  const [updateFeesForm] = Form.useForm();

  // Table states
  const [feesTableState, setFeesTableState] = useState<TFeesTableState[]>([]);

  let feesSearchInput = null; //this is for filter on antd table

  const [filterData, setFilterData] = useState({ searchText: '', searchedColumn: '' });
  setFilterReference(filterData, setFilterData);

  // store table header definition in state

  /* ChargesFees column initialization */
  const [feesColumns, setFeesColumns] = useState([
    {
      key: 'feesTitle',
      title: 'Title',
      className: 'body__table-header--title',
      dataIndex: 'feesTitle',
      width: '20rem',
      ellipsis: true,
      sorter: (a: TFeesTableState, b: TFeesTableState) => a.feesTitle.localeCompare(b.feesTitle),
      ...getColumnSearchProps(feesSearchInput, 'feesTitle', 'Title'),
    },
    {
      key: 'feesPrice',
      title: 'Price',
      className: 'body__table-header--title',
      dataIndex: 'feesPrice',
      width: '15rem',
      ellipsis: true,
      sorter: (a: TFeesTableState, b: TFeesTableState) => a.feesPrice.localeCompare(b.feesPrice),
      ...getColumnSearchProps(feesSearchInput, 'feesPrice', 'Price'),
    },
    {
      key: 'bodyAction',
      title: 'Action',
      dataIndex: 'action',
      // fixed: 'right',
      width: '17rem',
      render: (_text: any, record: TFeesTableState) => {
        return (
          <>
            <Button
              type="link"
              className="make__brand-btn--edit"
              onClick={() => {
                // populate the accessory modal
                updateFeesForm.setFieldsValue({
                  feesId: record.feesId,
                  feesTitle: record.feesTitle,
                  feesPrice: convertPriceToFloat(record.feesPrice),
                });
                // show modal
                setShowUpdateModal({ ...showUpdateModal, fees: true });
              }}
            >
              Edit
            </Button>
            <Button
              type="link"
              danger
              onClick={() => {
                // delete modal
                setShowDeleteModal({ ...showDeleteModal, fees: true });
                setDeleteModalContent({
                  ...deleteModalContent,
                  fees: { feesId: record.feesId, feesTitle: record.feesTitle },
                });
              }}
            >
              Delete
            </Button>
          </>
        );
      },
    },
  ]);

  /* ================================================== */
  /*  method */
  /* ================================================== */

  const onCreateFeesFinish = (values: { feesTitle: string; feesPrice: string }) => {
    onCreateChargesFees(values.feesTitle, convertPriceToFloat(values.feesPrice));
  };
  const onUpdateFeesFinish = (values: { feesTitle: string; feesPrice: string; feesId: number }) => {
    onUpdateChargesFees(values.feesId, values.feesTitle, convertPriceToFloat(values.feesPrice));
  };
  const onDeleteFinish = () => {
    onDeleteChargesfees(deleteModalContent.fees.feesId);
  };

  /* ================================================== */
  /*  useEffect */
  /* ================================================== */
  useEffect(() => {
    onGetChargesFees();
  }, [onGetChargesFees]);

  /* ----------------------------------------------------- */
  // initialize/populate the state of data array for charges fees
  /* ----------------------------------------------------- */
  useEffect(() => {
    let tempArray: TFeesTableState[] = [];
    /** A function that stores desired keys and values into a tempArray */
    const storeValue = (fees: TReceivedChargesFeesObj) => {
      let feesPrice =
        fees.price === undefined || fees.price === null || fees.price === 0
          ? '-'
          : 'RM ' +
            fees.price.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            });

      // only render when available value is true
      if (fees.available) {
        tempArray.push({
          key: uuidv4(),
          feesId: fees.id,
          feesTitle: fees.title,
          feesPrice: feesPrice,
          available: fees.available,
        });
      }
    };

    if (chargesFeesArray) {
      // Execute function "storeValue" for every array index
      chargesFeesArray.map(storeValue);
    }
    // update the state with tempArray
    setFeesTableState(tempArray);
  }, [chargesFeesArray]);

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
      createFeesForm.resetFields();

      // close all the modals if successful
      setShowCreateModal({
        ...showCreateModal,
        fees: false,
      });
      setShowUpdateModal({
        ...showUpdateModal,
        fees: false,
      });
      setShowDeleteModal({
        ...showDeleteModal,
        fees: false,
      });
    }
  }, [createFeesForm, onClearDashboardState, showDeleteModal, showUpdateModal, showCreateModal, successMessage]);

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
      {/* Modal*/}
      <FeesModal
        crud={'create'}
        title={'Create Standard Charges and Fees'}
        visible={showCreateModal.fees}
        indexKey={'fees'}
        antdForm={createFeesForm}
        loading={loading !== undefined && loading}
        showModal={showCreateModal}
        onFinish={onCreateFeesFinish}
        setShowModal={setShowCreateModal}
      />
      <FeesModal
        crud={'update'}
        title={'Update Standard Fees and Charges'}
        visible={showUpdateModal.fees}
        indexKey={'fees'}
        antdForm={updateFeesForm}
        loading={loading !== undefined && loading}
        showModal={showUpdateModal}
        onFinish={onUpdateFeesFinish}
        setShowModal={setShowUpdateModal}
      />
      <FeesModal
        crud={'delete'}
        title={'Delete Standard Fees and Charges'}
        visible={showDeleteModal.fees}
        indexKey={'fees'}
        loading={loading !== undefined && loading}
        showModal={showDeleteModal}
        onDelete={onDeleteFinish}
        setShowModal={setShowDeleteModal}
        feesTitle={deleteModalContent.fees.feesTitle}
      />
      <Layout>
        <NavbarComponent activePage="dashboard" />
        <LayoutComponent activeKey="accessory">
          <CustomContainer>
            <div className="make__tab-outerdiv">
              <section>
                <HeaderTitle>Standard Charges and Fees</HeaderTitle>
                <>
                  {chargesFeesArray ? (
                    <section className="make__section">
                      <div className="make__header-div ">
                        <div className="make__header-title">Fees</div>
                        <Button
                          type="primary"
                          className="make__brand-btn"
                          onClick={() => setShowCreateModal({ ...showCreateModal, fees: true })}
                        >
                          Create New Fees
                        </Button>
                      </div>

                      {/* -------------------- */}
                      {/*     Make Table      */}
                      {/* -------------------- */}
                      <Table
                        bordered
                        className="make__table"
                        scroll={{ x: '89rem', y: 600 }}
                        // components={components}
                        dataSource={feesTableState}
                        columns={convertHeader(feesColumns, setFeesColumns)}
                        // pagination={false}
                      />
                    </section>
                  ) : (
                    <div className="padding_t-5">
                      <Loading />
                    </div>
                  )}
                </>
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
  errorMessage?: string | null;
  successMessage?: string | null;
  chargesFeesArray?: TReceivedChargesFeesObj[] | null;
}
const mapStateToProps = (state: RootState): StateProps | void => {
  return {
    loading: state.dashboard.loading,
    errorMessage: state.dashboard.errorMessage,
    successMessage: state.dashboard.successMessage,
    chargesFeesArray: state.dashboard.chargesFeesArray,
  };
};

interface DispatchProps {
  onGetChargesFees: typeof actions.getChargesFees;
  onUpdateChargesFees: typeof actions.updateChargesFees;
  onCreateChargesFees: typeof actions.createChargesFees;
  onDeleteChargesfees: typeof actions.deleteChargesFees;
  onClearDashboardState: typeof actions.clearDashboardState;
}
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => {
  return {
    onGetChargesFees: () => dispatch(actions.getChargesFees()),
    onClearDashboardState: () => dispatch(actions.clearDashboardState()),
    onCreateChargesFees: (title, price) => dispatch(actions.createChargesFees(title, price)),
    onUpdateChargesFees: (fee_id, title, price) => dispatch(actions.updateChargesFees(fee_id, title, price)),
    onDeleteChargesfees: (fee_id) => dispatch(actions.deleteChargesFees(fee_id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ChargesFees);
