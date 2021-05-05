import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import './ComparisonPage.scss';
/* components */
import Footer from 'src/components/Footer/Footer';
import NavbarComponent from 'src/components/NavbarComponent/NavbarComponent';
import ParallaxContainer from 'src/components/ParallaxContainer/ParallaxContainer';

/* 3rd party lib */
import { jsPDF } from 'jspdf';
import { Location } from 'history';
import { Button, Empty } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import queryString from 'query-string';
import html2canvas from 'html2canvas';
import { connect } from 'react-redux';
import autoTable from 'jspdf-autotable';
import NumberFormat from 'react-number-format';
import { DownloadOutlined } from '@ant-design/icons';
import { RouteComponentProps, withRouter } from 'react-router-dom';
/* util */
import { RootState } from 'src';
import holy5truck from 'src/img/5trucks.jpg';
import { TLocalOrderObj, TReceivedDimensionAccessoryObj } from 'src/store/types/sales';
import { TReceivedAccessoryObj } from 'src/store/types/dashboard';

interface ComparisonPageProps {}

type Props = ComparisonPageProps & StateProps & RouteComponentProps<{}, any, Location | any>;

const ComparisonPage: React.FC<Props> = ({ location, localOrdersArray }) => {
  /* ================================================== */
  /*  state */
  /* ================================================== */

  const divRef = useRef() as MutableRefObject<HTMLDivElement>;
  const titleRef = useRef() as MutableRefObject<HTMLDivElement>;

  const [captureRef, setCaptureRef] = useState<{ current: HTMLElement } | null>(null);

  const [filteredLocalOrdersArray, setFilteredLocalOrdersArray] = useState<TLocalOrderObj[] | null>(null);

  type miscellaneousType = {
    title: string;
    price: number;
  };
  let processingFeesArray = [
    {
      title: 'Admin fees, handling charges, weighing',
      price: 500,
    },
    {
      title: 'Signwriting & luminous sticker',
      price: 250,
    },
    {
      title: 'Weighing / Inspection Fee (Puspakom)',
      price: 650,
    },
    {
      title: 'JPJ Booking Number',
      price: 325,
    },
    {
      title: 'HQS Final Inspection',
      price: 200,
    },
  ];

  /* ================================================== */
  /*  method */
  /* ================================================== */
  const captureHandler = () => {
    if (captureRef !== null) {
      let pdf = new jsPDF('l', 'mm', 'a4');

      // draw rectangle
      pdf.setDrawColor(0);
      pdf.setFillColor(131, 14, 14);
      pdf.rect(14, 4, 45, 8, 'F');

      // render text
      pdf.setFontSize(11);
      pdf.setFont('helvetica');
      pdf.setTextColor(255, 255, 255);

      pdf.text('SPECIFICATION', 21.5, 9.5);

      html2canvas(captureRef.current).then((_canvas) => {
        autoTable(pdf, {
          startY: 18,
          theme: 'grid',
          html: '#my-table',
          alternateRowStyles: { fillColor: '#dfe2e9' },
          headStyles: { fillColor: '#830e0e', valign: 'middle' },
          bodyStyles: { overflow: 'linebreak', halign: 'center', valign: 'middle', fontSize: 8 },
          columnStyles: {
            // column 0
            0: {
              fillColor: 'white',
              font: 'helvetica',
              halign: 'left',
              valign: 'middle',
              cellWidth: 25,
              cellPadding: { left: 5 },
            },
            // column 1
            1: { fillColor: 'white', font: 'helvetica', cellWidth: 35 },
          },
          didParseCell(data) {
            // the index starts after header
            if (data.row.index === 0) {
              data.cell.styles.halign = 'center';
            }
            // "Brand" and "Model" and "Total Price"
            if (
              (data.row.index === 0 && data.column.index === 0) ||
              (data.row.index === 1 && data.column.index === 0)
            ) {
              data.cell.styles.halign = 'center';
              data.cell.styles.cellPadding = 0;
            }

            // LAST row 1st column
            if (data.row.index === 22 && data.column.index === 0) {
              data.cell.styles.cellPadding = 2;
              data.cell.styles.halign = 'center';
            }
            // LAST row, the rest of the columns
            if (data.row.index === 22 && data.column.index !== 0) {
              data.cell.styles.fontStyle = 'bold';
              data.cell.styles.fontSize = 9;
              data.cell.styles.textColor = '#830e0e';
            }

            // The first row, second columns onward
            if (data.row.index === 0 && data.column.index !== 0) {
              data.cell.styles.fillColor = '#830e0e';
              data.cell.styles.textColor = 'white';
              data.cell.styles.fontStyle = 'bold';
              data.cell.styles.fontSize = 10;
            }

            // "Drive System" OR "ENGINE"
            if (
              (data.row.index === 6 && data.column.index === 0) ||
              (data.row.index === 10 && data.column.index === 0)
            ) {
              data.cell.styles.halign = 'center';
              data.cell.styles.cellPadding = 0;
            }

            // odd number
            if (data.row.index >= 1) {
              if (data.row.index % 2 !== 0 && data.column.index > 1) {
                data.cell.styles.fillColor = '#dfe2e9';
              } else {
                data.cell.styles.fillColor = 'white';
              }
            }
          },
        });

        pdf.save('comparison.pdf');
      });
    }
  };

  /* ================================================== */
  /*  useEffect */
  /* ================================================== */
  useEffect(() => {
    if (divRef) {
      setCaptureRef(divRef);
    }
  }, [divRef]);

  useEffect(() => {
    // this query string is from the url route on top of the browser
    // basically there will be up to 4 orders, each has a variable storing the id
    // e.g. /comparison?order1=blablabla&order2=blablabla
    const orderIdsFromUrl = queryString.parse(location.search);

    if (localOrdersArray !== undefined) {
      setFilteredLocalOrdersArray(
        localOrdersArray.filter((order) => Object.values(orderIdsFromUrl).includes(order.id)),
      );
    }
  }, [location.search, localOrdersArray]);

  /* ================================================== */
  /* ================================================== */
  return (
    <>
      <NavbarComponent />
      <ParallaxContainer bgImageUrl={holy5truck}>
        <div className="comparison__section-outerdiv">
          <div className="comparison__button-div">
            <div className="comparison__button-title" ref={titleRef}>
              SPECIFICATIONS
            </div>
            <Button type="primary" className="comparison__button" onClick={() => captureHandler()}>
              <DownloadOutlined />
              &nbsp;Download<span className="comparison__button-mobile">&nbsp;as PDF</span>
            </Button>
          </div>
          <section className="comparison__section">
            <div className="comparison__section-innerdiv" ref={divRef}>
              {filteredLocalOrdersArray ? (
                <>
                  <table id="my-table" className="comparison__table">
                    {/* ROW 1 */}
                    <tbody>
                      <tr>
                        <th colSpan={2} className="comparison__table-header comparison__table-header--model">
                          BRAND
                        </th>
                        {filteredLocalOrdersArray.map((order) => (
                          <td className="text-center comparison__table-brand" key={uuidv4()}>
                            {order.bodyMakeObj?.make_wheelbase.make.brand.title}
                          </td>
                        ))}
                      </tr>
                      {/* ROW 2 */}
                      <tr>
                        <th colSpan={2} className="comparison__table-header comparison__table-header--model">
                          MODEL
                        </th>
                        {filteredLocalOrdersArray.map((order) => (
                          <td className="text-center" key={uuidv4()}>
                            {order.bodyMakeObj?.make_wheelbase.make.title}
                          </td>
                        ))}
                      </tr>
                      {/* ROW 3 */}
                      <tr>
                        <th colSpan={2} className="comparison__table-header">
                          Length (ft)
                        </th>
                        {filteredLocalOrdersArray.map((order) => (
                          <td key={uuidv4()}>
                            {order.bodyMakeObj?.length.title && order.bodyMakeObj?.length.title !== ''
                              ? order.bodyMakeObj?.length.title
                              : '-'}
                          </td>
                        ))}
                      </tr>
                      {/* ROW 4 */}
                      <tr>
                        <th colSpan={2} className="comparison__table-header">
                          Body
                        </th>
                        {filteredLocalOrdersArray.map((order) => (
                          <td key={uuidv4()}>
                            {order.bodyMakeObj?.body.title && order.bodyMakeObj?.body.title !== ''
                              ? order.bodyMakeObj?.body.title
                              : '-'}
                          </td>
                        ))}
                      </tr>

                      {/* ROW 5 */}
                      <tr>
                        <th colSpan={2} className="comparison__table-header">
                          Body Dimension
                        </th>
                        {filteredLocalOrdersArray.map((order) => (
                          <td key={uuidv4()}>
                            {order.bodyMakeObj?.width !== '' &&
                              order.bodyMakeObj?.width !== '\' "' &&
                              order.bodyMakeObj?.width !== null && (
                                <>
                                  Width:&nbsp;
                                  {order.bodyMakeObj?.width}
                                  <br />
                                </>
                              )}

                            {order.bodyMakeObj?.depth !== '' &&
                              order.bodyMakeObj?.depth !== '\' "' &&
                              order.bodyMakeObj?.depth !== null && (
                                <>
                                  Depth:&nbsp;
                                  {order.bodyMakeObj?.depth}
                                </>
                              )}

                            {order.bodyMakeObj?.height !== '' &&
                              order.bodyMakeObj?.height !== '\' "' &&
                              order.bodyMakeObj?.height !== null && (
                                <>
                                  <br />
                                  <>
                                    Depth:&nbsp;
                                    {order.bodyMakeObj?.height}
                                  </>
                                </>
                              )}
                          </td>
                        ))}
                      </tr>
                      {/* ROW 6 */}
                      <tr>
                        <th colSpan={2} className="comparison__table-header">
                          GVW (Kg)
                        </th>
                        {filteredLocalOrdersArray.map((order) => (
                          <td key={uuidv4()}>
                            {order.bodyMakeObj?.make_wheelbase.make.gvw &&
                            order.bodyMakeObj?.make_wheelbase.make.gvw !== ''
                              ? order.bodyMakeObj?.make_wheelbase.make.gvw
                              : '-'}
                          </td>
                        ))}
                      </tr>
                      {/* ROW 7 */}
                      <tr>
                        <th rowSpan={2} className="comparison__table-header text-center">
                          DRIVE SYSTEM
                        </th>
                        <th className="comparison__table-header">CONFIGURATION</th>
                        {filteredLocalOrdersArray.map((order) => (
                          <td key={uuidv4()}>
                            {order.bodyMakeObj?.make_wheelbase.make.config &&
                            order.bodyMakeObj?.make_wheelbase.make.config !== ''
                              ? order.bodyMakeObj?.make_wheelbase.make.config
                              : '-'}
                          </td>
                        ))}
                      </tr>
                      {/* ROW 8 */}
                      <tr>
                        <th className="comparison__table-header">NO. OF WHEEL</th>
                        {filteredLocalOrdersArray.map((order) => (
                          <td key={uuidv4()}>
                            {order.bodyMakeObj?.make_wheelbase.make.tire &&
                            order.bodyMakeObj?.make_wheelbase.make.tire !== ''
                              ? `${order.bodyMakeObj?.make_wheelbase.make.tire} Wheeler`
                              : '-'}
                          </td>
                        ))}
                      </tr>
                      {/* ROW 9 */}
                      <tr>
                        <th colSpan={2} className="comparison__table-header">
                          CAB STYLE
                        </th>
                        {filteredLocalOrdersArray.map((_order) => (
                          <td key={uuidv4()}>-</td>
                        ))}
                      </tr>
                      {/* ROW 10 */}
                      <tr>
                        <th colSpan={2} className="comparison__table-header">
                          STANDARD WHEELBASE (mm)
                        </th>
                        {filteredLocalOrdersArray.map((order) => (
                          <td key={uuidv4()}>
                            {order.bodyMakeObj?.make_wheelbase.wheelbase.title &&
                            order.bodyMakeObj?.make_wheelbase.wheelbase.title !== ''
                              ? `${order.bodyMakeObj?.make_wheelbase.wheelbase.title}`
                              : '-'}
                          </td>
                        ))}
                      </tr>
                      {/* ROW 11 */}
                      <tr>
                        <th rowSpan={6} className="comparison__table-header text-center">
                          ENGINE
                        </th>
                        <th className="comparison__table-header">MODEL</th>
                        {filteredLocalOrdersArray.map((_order) => (
                          <td key={uuidv4()}>-</td>
                        ))}
                      </tr>
                      {/* ROW 12 */}
                      <tr>
                        <th className="comparison__table-header">DISPLACEMENT (cc)</th>
                        {filteredLocalOrdersArray.map((order) => (
                          <td key={uuidv4()}>
                            {order.bodyMakeObj?.make_wheelbase.make.engine_cap &&
                            order.bodyMakeObj?.make_wheelbase.make.engine_cap !== ''
                              ? `${order.bodyMakeObj?.make_wheelbase.make.engine_cap}`
                              : '-'}
                          </td>
                        ))}
                      </tr>
                      {/* ROW 13 */}
                      <tr>
                        <th className="comparison__table-header">EMISSION</th>
                        {filteredLocalOrdersArray.map((order) => (
                          <td key={uuidv4()}>
                            {order.bodyMakeObj?.make_wheelbase.make.emission &&
                            order.bodyMakeObj?.make_wheelbase.make.emission !== ''
                              ? `${order.bodyMakeObj?.make_wheelbase.make.emission}`
                              : '-'}
                          </td>
                        ))}
                      </tr>
                      {/* ROW 14 */}
                      <tr>
                        <th className="comparison__table-header">TYPE</th>
                        {filteredLocalOrdersArray.map((_order) => (
                          <td key={uuidv4()}>-</td>
                        ))}
                      </tr>
                      {/* ROW 15 */}
                      <tr>
                        <th className="comparison__table-header">MAX OUTPUT (PS)</th>
                        {filteredLocalOrdersArray.map((order) => (
                          <td key={uuidv4()}>
                            {order.bodyMakeObj?.make_wheelbase.make.horsepower &&
                            order.bodyMakeObj?.make_wheelbase.make.horsepower !== ''
                              ? `${order.bodyMakeObj?.make_wheelbase.make.horsepower}`
                              : '-'}
                          </td>
                        ))}
                      </tr>
                      {/* ROW 16 */}
                      <tr>
                        <th className="comparison__table-header">MAX TORQUE (Nm)</th>
                        {filteredLocalOrdersArray.map((order) => (
                          <td key={uuidv4()}>
                            {order.bodyMakeObj?.make_wheelbase.make.torque &&
                            order.bodyMakeObj?.make_wheelbase.make.torque !== ''
                              ? `${order.bodyMakeObj?.make_wheelbase.make.torque}`
                              : '-'}
                          </td>
                        ))}
                      </tr>
                      {/* ROW 17 */}
                      <tr>
                        <th colSpan={2} className="comparison__table-header">
                          TRANSMISSION / MODEL
                        </th>
                        {filteredLocalOrdersArray.map((order) => (
                          <td key={uuidv4()}>
                            {order.bodyMakeObj?.make_wheelbase.make.transmission &&
                            order.bodyMakeObj?.make_wheelbase.make.transmission !== ''
                              ? `${order.bodyMakeObj?.make_wheelbase.make.transmission}`
                              : '-'}
                          </td>
                        ))}
                      </tr>
                      {/* ROW 18 */}
                      <tr>
                        <th colSpan={2} className="comparison__table-header">
                          SERVICE BRAKES
                        </th>
                        {filteredLocalOrdersArray.map((_order) => (
                          <td key={uuidv4()}>-</td>
                        ))}
                      </tr>
                      {/* ROW 19 */}
                      <tr>
                        <th colSpan={2} className="comparison__table-header">
                          REAR AXLE MODEL
                        </th>
                        {filteredLocalOrdersArray.map((_order) => (
                          <td key={uuidv4()}>-</td>
                        ))}
                      </tr>
                      {/* ROW 20 */}
                      <tr>
                        <th colSpan={2} className="comparison__table-header">
                          ACCESSORIES
                        </th>
                        {filteredLocalOrdersArray.map((order) => (
                          <td key={uuidv4()}>
                            {order.bodyRelatedAccessoriesArray.length +
                              order.generalAccessoriesArray.length +
                              order.dimensionRelatedAccessoriesArray.length}
                            &nbsp;selected
                          </td>
                        ))}
                      </tr>
                      {/* ROW 21 */}
                      <tr>
                        <th colSpan={2} className="comparison__table-header">
                          MODEL PRICE
                        </th>
                        {filteredLocalOrdersArray.map((order) => (
                          <td key={uuidv4()}>
                            {order.bodyMakeObj?.make_wheelbase.make.price &&
                            order.bodyMakeObj?.make_wheelbase.make.price !== 0 ? (
                              <span>
                                RM&nbsp;
                                <NumberFormat
                                  value={order.bodyMakeObj?.make_wheelbase.make.price}
                                  displayType={'text'}
                                  thousandSeparator={true}
                                />
                              </span>
                            ) : (
                              '-'
                            )}
                          </td>
                        ))}
                      </tr>
                      {/* ROW 22 */}
                      <tr>
                        <th colSpan={2} className="comparison__table-header">
                          BODY PRICE
                        </th>
                        {filteredLocalOrdersArray.map((order) => (
                          <td key={uuidv4()}>
                            {order.bodyMakeObj?.price && order.bodyMakeObj?.price !== 0 ? (
                              <span>
                                RM&nbsp;
                                <NumberFormat
                                  value={order.bodyMakeObj?.price}
                                  displayType={'text'}
                                  thousandSeparator={true}
                                />
                              </span>
                            ) : (
                              '-'
                            )}
                          </td>
                        ))}
                      </tr>
                      {/* ROW 23 */}
                      <tr>
                        <th
                          colSpan={2}
                          className="comparison__table-header comparison__table-header--price comparison__table-header--model"
                        >
                          TOTAL PRICE <br />
                          <span className="comparison__table-insurance">
                            (With Road Tax, Admin Processing Fees
                            <br />
                            and Insurance)
                          </span>
                        </th>
                        {filteredLocalOrdersArray.map((order) => {
                          let totalAccessoriesPrice = 0;
                          // get total of general accessories
                          let generalAccessoriesTotalPrice = order.generalAccessoriesArray.reduce(
                            (currentTotal: number, accessoryObj: TReceivedAccessoryObj) => {
                              return currentTotal + accessoryObj.price;
                            },
                            0,
                          );

                          // get total of body related accessories
                          let bodyRelatedAccessoriesTotalPrice = order.bodyRelatedAccessoriesArray.reduce(
                            (currentTotal: number, accessoryObj: TReceivedAccessoryObj) => {
                              return currentTotal + accessoryObj.price;
                            },
                            0,
                          );
                          // get total of dimension related accessories
                          let dimensionRelatedAccessoriesTotalPrice = order.dimensionRelatedAccessoriesArray.reduce(
                            (currentTotal: number, dimensionAccessoryObj: TReceivedDimensionAccessoryObj) => {
                              return currentTotal + dimensionAccessoryObj.price;
                            },
                            0,
                          );

                          totalAccessoriesPrice =
                            generalAccessoriesTotalPrice +
                            bodyRelatedAccessoriesTotalPrice +
                            dimensionRelatedAccessoriesTotalPrice;

                          let processingFees = processingFeesArray.reduce(
                            (currentTotal: number, processingFeeObj: miscellaneousType) => {
                              return currentTotal + processingFeeObj.price;
                            },
                            0,
                          );

                          let modelSubtotalPrice = 0;
                          if (order.bodyMakeObj && order.bodyMakeObj) {
                            modelSubtotalPrice =
                              order.bodyMakeObj.make_wheelbase.make.price +
                              order.bodyMakeObj.price +
                              totalAccessoriesPrice +
                              processingFees;
                          }

                          let tempModelSubtotalPrice = modelSubtotalPrice;
                          tempModelSubtotalPrice = (tempModelSubtotalPrice * 95) / 100;
                          let roundedModelSubtotalPrice = -Math.round(-tempModelSubtotalPrice / 1000) * 1000;
                          roundedModelSubtotalPrice = (roundedModelSubtotalPrice - 1000) * 0.0325 + 441.8;
                          roundedModelSubtotalPrice = roundedModelSubtotalPrice * 1.06 + 235;

                          let insuranceArray = [
                            {
                              title: 'Road tax (1year)',
                              price: 1015,
                            },
                            {
                              title: 'JPJ Registration & E Hak Milik ',
                              price: 110,
                            },
                            {
                              title: 'INSURANCE PREMIUM (windscreen included)',
                              price: roundedModelSubtotalPrice,
                            },
                          ];

                          /* ======================== */
                          // Insurance subtotal price
                          /* ====================== */
                          let insuranceSubtotalPrice = insuranceArray.reduce(
                            (currentTotal: number, insuranceObj: { title: string; price: number }) => {
                              return currentTotal + insuranceObj.price;
                            },
                            0,
                          );

                          let grandTotalPrice = modelSubtotalPrice + insuranceSubtotalPrice;

                          return (
                            <td className="comparison__table-price" key={uuidv4()}>
                              {grandTotalPrice !== 0 ? (
                                <span>
                                  RM&nbsp;
                                  <NumberFormat
                                    value={grandTotalPrice.toFixed(2)}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                  />
                                </span>
                              ) : (
                                '-'
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    </tbody>
                  </table>
                </>
              ) : (
                <Empty />
              )}
            </div>
          </section>
        </div>
      </ParallaxContainer>
      <Footer />
    </>
  );
};

interface StateProps {
  localOrdersArray?: TLocalOrderObj[];
}
const mapStateToProps = (state: RootState): StateProps | void => {
  return {
    localOrdersArray: state.sales.localOrdersArray,
  };
};

export default connect(mapStateToProps, null)(withRouter(ComparisonPage));
