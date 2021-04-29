import React, { useEffect, useState } from 'react';
import './QuotationPage.scss';
/* components */
import Footer from 'src/components/Footer/Footer';
import Ripple from 'src/components/Loading/LoadingIcons/Ripple/Ripple';
import NavbarComponent from 'src/components/NavbarComponent/NavbarComponent';
import QuotationComponent from 'src/containers/QuotationPage/QuotationComponent';
import ParallaxContainer from 'src/components/ParallaxContainer/ParallaxContainer';
/* 3rd party lib */
import axios from 'axios';
import moment from 'moment';
import gsap from 'gsap';
import { jsPDF } from 'jspdf';
// import { v4 as uuidv4 } from 'uuid';
import html2canvas from 'html2canvas';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import NumberFormat from 'react-number-format';
import { Menu, Dropdown, Modal, Button, Form, Input, message } from 'antd';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { DownloadOutlined, CaretDownOutlined } from '@ant-design/icons';
/* Util */
import { RootState } from 'src';
import holy5truck from 'src/img/5trucks.jpg';
// import warranty from 'src/img/quotation3.jpg';
import * as actions from 'src/store/actions/index';
import { ROUTE_NOT_FOUND } from 'src/shared/routes';
import { TReceivedBrandObj } from 'src/store/types/dashboard';
import { useWindowDimensions } from 'src/shared/HandleWindowResize';
import { TLocalOrderObj } from 'src/store/types/sales';
import { TUserAccess } from 'src/store/types/auth';
import { convertPriceToFloat, handleKeyDown } from 'src/shared/Utils';
import HiddenQuotationComponent from './HiddenQuotationComponent';

// function useOutsideAlerter(wrapperRef: any, innerWrapperRef: any, setInEditPriceMode: any) {
//   useEffect(() => {
//     /**
//      * Hide pop up if clicked on outside of element
//      */
//     function handleClickOutside(event: any) {
//       if (
//         wrapperRef.current &&
//         innerWrapperRef &&
//         !innerWrapperRef.current.contains(event.target) &&
//         !wrapperRef.current.contains(event.target)
//       ) {
//         setInEditPriceMode(false);
//       }
//     }

//     // Bind the event listener
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       // Unbind the event listener on clean up
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [wrapperRef, innerWrapperRef, setInEditPriceMode]);
// }

// export const processingFeesDict = {
//   fee_admin: {
//     id: 'fee_admin',
//     title: 'Admin fees, handling charges, weighing',
//     price: 500,
//   },
//   fee_sticker: {
//     id: 'fee_sticker',
//     title: 'Signwriting & luminous sticker',
//     price: 250,
//   },
//   fee_inspection: {
//     id: 'fee_inspection',
//     title: 'Weighing / Inspection Fee (Puspakom)',
//     price: 650,
//   },
//   fee_jpj: {
//     id: 'fee_jpj',
//     title: 'JPJ Booking Number',
//     price: 325,
//   },
//   fee_hqs: {
//     id: 'fee_hqs',
//     title: 'HQS Final Inspection',
//     price: 200,
//   },
// };

// export type TProcessingFeesDict = typeof processingFeesDict;

interface MatchParams {
  order_id: string;
}

interface QuotationPageProps {}

type Props = QuotationPageProps & StateProps & DispatchProps & RouteComponentProps<MatchParams, any, any>;

const QuotationPage: React.FC<Props> = ({ match, localOrdersDict, accessObj, onSetLocalOrdersDict }) => {
  /* ================================================== */
  /*  state */
  /* ================================================== */

  const [discountForm] = Form.useForm();
  const { width } = useWindowDimensions();
  const [mounted, setMounted] = useState(false);
  const [currentBrandObj, setCurrentBrandObj] = useState<TReceivedBrandObj | null>(null);
  // const [updateRoadtaxForm] = Form.useForm();
  const [companyNameForm] = Form.useForm();
  // const [newRoadTax, setNewRoadTax] = useState(0);
  // const [showRoadtaxModal, setShowRoadtaxModal] = useState(false);
  const [captureRef, setCaptureRef] = useState<{ current: HTMLElement } | null>(null);
  const [showOptions, setShowOptions] = useState(false);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [inEditPriceMode, setInEditPriceMode] = useState(false);
  const [showDiscountModal, setShowDiscountModal] = useState(false);

  const [editChanges, setEditChanges] = useState<TLocalOrderObj | null>(null);

  // const wrapperRef = useRef(null);
  // const innerWrapperRef = useRef(null);
  // useOutsideAlerter(wrapperRef, innerWrapperRef, setInEditPriceMode);

  /* ================================================== */
  /*  method */
  /* ================================================== */
  const captureHandler = (values: { companyName: string }) => {
    if (captureRef !== null) {
      html2canvas(captureRef.current, {
        allowTaint: false,
        useCORS: true,
        logging: true,
      }).then((_canvas) => {
        let pdf = new jsPDF('p', 'px', 'a4');
        let pWidth = pdf.internal.pageSize.width; // 595.28 is the width of a4
        let srcWidth = captureRef.current.scrollWidth;

        let margin = 18; // narrow margin - 1.27 cm (36);
        let scale = (pWidth - margin * 2) / srcWidth;

        pdf.html(captureRef.current, {
          x: margin,
          y: 0,
          html2canvas: {
            scale: scale,
          },
          callback: function () {
            let documentName = `${values.companyName} QUOTATION (${moment().format('DD-MM-YYYY')})`;
            documentName = documentName.toUpperCase();
            pdf.save(`${documentName}.pdf`);
            setShowCustomerModal(false);
            setDownloading(false);
            companyNameForm.resetFields();
          },
        });
      });
    }
  };

  /* ================================================== */
  /*  component */
  /* ================================================== */
  const CustomerModal = (
    <Modal
      title="Add Customer/Company Name"
      visible={showCustomerModal}
      okText="Download"
      onOk={() => companyNameForm.submit()}
      confirmLoading={downloading}
      onCancel={() => setShowCustomerModal(false)}
    >
      <Form
        onSubmitCapture={() => setDownloading(true)}
        form={companyNameForm}
        onFinish={(values) => captureHandler(values)}
      >
        <Form.Item name="companyName">
          <Input autoFocus placeholder="Type Customer/Company Name here" />
        </Form.Item>
      </Form>
    </Modal>
  );

  let discountModal = (
    <Modal
      title="Add Discount"
      visible={showDiscountModal}
      onCancel={() => {
        setShowDiscountModal(false);
      }}
      onOk={() => discountForm.submit()}
    >
      <Form
        form={discountForm}
        onKeyDown={(e) => {
          handleKeyDown(e, discountForm);
        }}
        onFinish={(values: { discount: number }) => {
          // by changing discount to null, it will hide the discount
          let tempLocalOrders = { ...localOrdersDict };
          tempLocalOrders[match.params.order_id].discount = convertPriceToFloat(values.discount.toString());
          onSetLocalOrdersDict(tempLocalOrders);
          setShowDiscountModal(false);
        }}
      >
        <Form.Item
          className="make__form-item"
          label="Discount"
          name="discount"
          rules={[{ required: true, message: 'Input discount here!' }]}
        >
          <NumberFormat
            placeholder="Type discount here"
            className="ant-input"
            thousandSeparator={true}
            prefix={'RM '}
          />
        </Form.Item>
      </Form>
    </Modal>
  );

  const QuotationMenu = () => (
    <Menu className="catalog__menu">
      <Menu.Item
        className="catalog__menu-item"
        onClick={() => {
          setShowCustomerModal(true);
          setShowOptions(false);
        }}
      >
        <DownloadOutlined style={{ margin: 0 }} />
        &nbsp;&nbsp;Download as PDF
      </Menu.Item>
      <Menu.Item className="catalog__menu-item" onClick={() => setInEditPriceMode(true)}>
        <i className="fas fa-tags" style={{ margin: 0 }}></i>
        &nbsp;&nbsp;Edit Price
      </Menu.Item>
      {/* only show add discount button when discount is not null */}
      {localOrdersDict !== undefined && !localOrdersDict[match.params.order_id].discount ? (
        <Menu.Item className="catalog__menu-item" onClick={() => setShowDiscountModal(true)}>
          <i className="fas fa-percent" style={{ margin: 0 }}></i>
          &nbsp;&nbsp;Add Discount
          {discountModal}
        </Menu.Item>
      ) : (
        <Menu.Item
          className="catalog__menu-item"
          onClick={() => {
            // by changing discount to null, it will hide the discount
            let tempLocalOrders = { ...localOrdersDict };
            tempLocalOrders[match.params.order_id].discount = null;
            onSetLocalOrdersDict(tempLocalOrders);
          }}
        >
          <i className="fas fa-eraser" style={{ margin: 0 }}></i>
          &nbsp;&nbsp;Remove Discount
        </Menu.Item>
      )}
      {/* <Menu.Item className="catalog__menu-item" onClick={() => setShowRoadtaxModal(true)}>
        <i className="fas fa-edit" />
        &nbsp;&nbsp;Edit Road Tax 
      </Menu.Item>*/}
    </Menu>
  );

  /* ================================================== */
  /*  useEffect */
  /* ================================================== */
  useEffect(() => {
    if (localOrdersDict === undefined) return;
    let selectedOrder = localOrdersDict[match.params.order_id];

    axios
      .get(`${process.env.REACT_APP_API}/head/brands/${selectedOrder.bodyMakeObj?.make_wheelbase.make.brand.id}`)
      .then((res) => {
        setCurrentBrandObj(res.data.brand);
      })
      .catch((err) => console.log(err));
  }, [match.params.order_id, localOrdersDict]);

  useEffect(() => {
    if (localOrdersDict === undefined) return;

    if (!mounted) {
      setEditChanges(localOrdersDict[match.params.order_id]); //make a copy of the selected order one time only
      setMounted(true);
    }
  }, [mounted, localOrdersDict, match.params.order_id]);

  useEffect(() => {
    gsap.set('.quotation__edit-top', { y: '-100%', duration: 0.5 });
  }, []);

  useEffect(() => {
    if (inEditPriceMode) {
      gsap.to('.quotation__edit-top', { y: 0, duration: 0.5 });
    } else {
      gsap.to('.quotation__edit-top', { y: '-100%', duration: 0.5 });
    }
  }, [inEditPriceMode]);

  /* ================================================== */
  /* ================================================== */
  if (localOrdersDict === undefined) {
    return null;
  }
  // quotaton Order can be undefined because of the wrong order id being passed into the filter
  // redirect to page not found

  if (localOrdersDict[match.params.order_id] === undefined) {
    window.location.href = ROUTE_NOT_FOUND;
  }

  /* ================================================== */
  /* ================================================== */
  return (
    <>
      {/* Modal */}
      {CustomerModal}

      <div>
        <NavbarComponent />
        <div className="quotation__edit-top">
          <div className="quotation__edit-top-title">
            <i className="fas fa-edit" /> Editing Price
          </div>
          <div>
            <Button
              className="quotation__edit-top-btn"
              onClick={() => {
                // resets the current changes
                console.log('RESET!!!!!!!!!!!!!!!!!!!!!!!!', localOrdersDict[match.params.order_id]);
                setEditChanges(localOrdersDict[match.params.order_id]);
                setInEditPriceMode(false);
              }}
            >
              <i className="fas fa-ban"></i>&nbsp;Cancel
            </Button>
            <Button
              className="quotation__edit-top-btn quotation__edit-top-btn--save"
              type="primary"
              onClick={() => {
                if (editChanges === null) return;
                let tempLocalOrder = { ...localOrdersDict };
                tempLocalOrder[match.params.order_id] = editChanges;
                // replace the original data with the new changes
                onSetLocalOrdersDict(tempLocalOrder);
                setInEditPriceMode(false);
                message.success('Changes Saved', 1);
              }}
            >
              <i className="far fa-save"></i>&nbsp;Save
            </Button>
          </div>
        </div>
        <ParallaxContainer bgImageUrl={holy5truck}>
          {/* <Container> */}
          <div className="quotation__section-outerdiv">
            <div className="quotation__button-div">
              <Dropdown
                visible={showOptions}
                overlay={<QuotationMenu />}
                onVisibleChange={(e) => setShowOptions(e)}
                trigger={['click']}
              >
                <div className="quotation__button">
                  More Options <CaretDownOutlined />
                </div>
              </Dropdown>
            </div>

            {currentBrandObj ? (
              <>
                <QuotationComponent
                  accessObj={accessObj}
                  tempEditChanges={editChanges}
                  currentBrandObj={currentBrandObj}
                  onSetEditChanges={setEditChanges}
                  inEditPriceMode={inEditPriceMode}
                  setInEditPriceMode={setInEditPriceMode}
                  localOrdersDict={localOrdersDict}
                  quotationOrder={localOrdersDict[match.params.order_id]}
                />
                {/* only render hidden quotation when not in edit price mode 
              if not then the ref wont be able to detect inside or outside div properly*/}
                <HiddenQuotationComponent
                  width={width}
                  accessObj={accessObj}
                  currentBrandObj={currentBrandObj}
                  setCaptureRef={setCaptureRef}
                  quotationOrder={localOrdersDict[match.params.order_id]}
                />
              </>
            ) : (
              <div className="quotation__loader-div">
                <Ripple />
              </div>
            )}
          </div>
          {/* </Container> */}
        </ParallaxContainer>
        <Footer />
      </div>
    </>
  );
};

interface StateProps {
  accessObj?: TUserAccess;
  localOrdersDict?: { [key: string]: TLocalOrderObj };
}

const mapStateToProps = (state: RootState): StateProps | void => {
  return { accessObj: state.auth.accessObj, localOrdersDict: state.sales.localOrdersDict };
};

interface DispatchProps {
  onSetLocalOrdersDict: typeof actions.setLocalOrdersDict;
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => {
  return {
    onSetLocalOrdersDict: (localOrdersDict) => dispatch(actions.setLocalOrdersDict(localOrdersDict)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(QuotationPage));
