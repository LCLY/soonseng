import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import './ComparisonPage.scss';
/* components */
import Footer from 'src/components/Footer/Footer';
import NavbarComponent from 'src/components/NavbarComponent/NavbarComponent';
import ParallaxContainer from 'src/components/ParallaxContainer/ParallaxContainer';

/* 3rd party lib */
import { Button, Empty } from 'antd';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Location } from 'history';
import { v4 as uuidv4 } from 'uuid';
import html2canvas from 'html2canvas';
import { connect } from 'react-redux';
import { DownloadOutlined } from '@ant-design/icons';
// import NumberFormat from 'react-number-format';
import { RouteComponentProps, withRouter } from 'react-router-dom';
/* util */
import { RootState } from 'src';
import holy5truck from 'src/img/5trucks.jpg';
import { TLocalOrderObj } from 'src/store/types/sales';
import NumberFormat from 'react-number-format';

type TIncomingLocationState = {
  checkedConfigurations: string[];
};

interface ComparisonPageProps {}

type Props = ComparisonPageProps & StateProps & RouteComponentProps<{}, any, Location | any>;

const ComparisonPage: React.FC<Props> = ({ location, localOrdersArray }) => {
  /* ================================================== */
  /*  state */
  /* ================================================== */

  const { checkedConfigurations }: TIncomingLocationState = location.state;

  const divRef = useRef() as MutableRefObject<HTMLDivElement>;

  const [captureRef, setCaptureRef] = useState<{ current: HTMLElement } | null>(null);

  const [filteredLocalOrdersArray, setFilteredLocalOrdersArray] = useState<TLocalOrderObj[] | null>(null);

  /* ================================================== */
  /*  method */
  /* ================================================== */
  const captureHandler = () => {
    if (captureRef !== null) {
      html2canvas(captureRef.current, { scale: 1 }).then((_canvas) => {
        let pdf = new jsPDF('l', 'mm', 'a4');
        pdf.text('Specifications', 15, 20);
        autoTable(pdf, {
          theme: 'grid',
          html: '#my-table',
          margin: { top: 25 },
          alternateRowStyles: { fillColor: '#dfe2e9' },
          headStyles: { fillColor: '#830e0e', valign: 'middle' },
          bodyStyles: { overflow: 'linebreak', halign: 'center', valign: 'middle' },
          columnStyles: {
            // column 0
            0: {
              fillColor: 'white',
              font: 'helvetica',
              halign: 'left',
              valign: 'middle',
              cellWidth: 35,
              cellPadding: { left: 5 },
            },
            // column 1
            1: { fillColor: 'white', font: 'helvetica', cellWidth: 45 },
          },
          didParseCell(data) {
            // the index starts after header
            if (data.row.index === 0) {
              data.cell.styles.halign = 'center';
            }
            // "Brand" and "Model" and "Price"
            if (
              (data.row.index === 0 && data.column.index === 0) ||
              (data.row.index === 1 && data.column.index === 0) ||
              (data.row.index === 18 && data.column.index === 0)
            ) {
              data.cell.styles.halign = 'center';
              data.cell.styles.fontStyle = 'bold';
              data.cell.styles.cellPadding = 0;
            }
            // last row bold the text
            if (data.row.index === 18) {
              data.cell.styles.fontStyle = 'bold';
            }
            // The first row, second columns onward
            if (data.row.index === 0 && data.column.index !== 0) {
              data.cell.styles.fillColor = '#830e0e';
              data.cell.styles.textColor = 'white';
              data.cell.styles.fontStyle = 'bold';
              data.cell.styles.fontSize = 14;
            }

            // "Drive System" OR "ENGINE"
            if (
              (data.row.index === 5 && data.column.index === 0) ||
              (data.row.index === 9 && data.column.index === 0)
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
    if (localOrdersArray !== undefined) {
      setFilteredLocalOrdersArray(
        localOrdersArray.filter((_order, index) => checkedConfigurations.includes(index.toString())),
      );
    }
  }, [localOrdersArray, checkedConfigurations]);
  /* ================================================== */
  /* ================================================== */
  return (
    <>
      <NavbarComponent />
      <ParallaxContainer bgImageUrl={holy5truck}>
        <div className="comparison__section-outerdiv">
          <div className="comparison__button-div">
            <div className="comparison__button-title">SPECIFICATION</div>
            <Button type="primary" className="comparison__button" onClick={() => captureHandler()}>
              <DownloadOutlined />
              &nbsp;Download as PDF
            </Button>
          </div>
          <section className="comparison__section">
            <div className="comparison__section-innerdiv" ref={divRef}>
              {filteredLocalOrdersArray ? (
                <>
                  <table id="my-table" className="comparison__table">
                    {/* <thead> */}
                    {/* ROW 1 */}
                    {/* </thead> */}
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
                      {/* ROW 3 */}
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
                      {/* ROW 3 */}
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
                      {/* ROW 4 */}
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
                      {/* ROW 5 */}
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
                      {/* ROW 6 */}
                      <tr>
                        <th colSpan={2} className="comparison__table-header">
                          CAB STYLE
                        </th>
                        {filteredLocalOrdersArray.map((_order) => (
                          <td key={uuidv4()}>-</td>
                        ))}
                      </tr>
                      {/* ROW 7 */}
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
                      {/* ROW 8 */}
                      <tr>
                        <th rowSpan={6} className="comparison__table-header text-center">
                          ENGINE
                        </th>
                        <th className="comparison__table-header">MODEL</th>
                        {filteredLocalOrdersArray.map((_order) => (
                          <td key={uuidv4()}>-</td>
                        ))}
                      </tr>
                      {/* ROW 9 */}
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
                      {/* ROW 10 */}
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
                      {/* ROW 11 */}
                      <tr>
                        <th className="comparison__table-header">TYPE</th>
                        {filteredLocalOrdersArray.map((_order) => (
                          <td key={uuidv4()}>-</td>
                        ))}
                      </tr>
                      {/* ROW 12 */}
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
                      {/* ROW 13 */}
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
                      {/* ROW 14 */}
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
                      {/* ROW 15 */}
                      <tr>
                        <th colSpan={2} className="comparison__table-header">
                          SERVICE BRAKES
                        </th>
                        {filteredLocalOrdersArray.map((_order) => (
                          <td key={uuidv4()}>-</td>
                        ))}
                      </tr>
                      {/* ROW 16 */}
                      <tr>
                        <th colSpan={2} className="comparison__table-header">
                          REAR AXLE MODEL
                        </th>
                        {filteredLocalOrdersArray.map((_order) => (
                          <td key={uuidv4()}>-</td>
                        ))}
                      </tr>
                      <tr>
                        <th
                          colSpan={2}
                          className="comparison__table-header comparison__table-header--price comparison__table-header--model"
                        >
                          PRICE
                        </th>
                        {filteredLocalOrdersArray.map((order) => (
                          <td className="comparison__table-price" key={uuidv4()}>
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
