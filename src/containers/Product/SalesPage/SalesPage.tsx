import React, { useState } from 'react';
import './SalesPage.scss';
// component
import NavbarComponent from '../../../components/NavbarComponent/NavbarComponent';
import { Container } from 'react-bootstrap';
/**
 * Sales page that provide functionality for user to choose vehicle parts
 * @return {*}
 * @category Pages
 */
function SalesPage() {
  let vehicleLengthArray: number[] = [15, 17, 21, 25];

  /**
   * Getting index of clicked vehicle length card to know which one is selected,
   * set to null because initially nothing is being selected
   * @function setLengthIndex
   **/
  const [lengthIndex, setLengthIndex] = useState<number | null>(null);

  return (
    <div>
      <NavbarComponent />
      <Container>
        <div className="sales__outerdiv">
          <section className="sales__section sales__section-length">
            <div className="sales__section-header">Length</div>
            <div className="sales__section-desc">Choose the length of the vehicle body</div>
            <div className="sales__card-div">
              {vehicleLengthArray.map((vehicleLength, index) => {
                return (
                  <div
                    key={index}
                    className={`sales__card-length ${lengthIndex === index ? 'active' : ''}`}
                    onClick={() => setLengthIndex(index)}
                  >
                    {vehicleLength}ft
                  </div>
                );
              })}
            </div>
          </section>
          <section className="sales__section sales__section-body">
            <div className="sales__section-header">Body</div>
          </section>
          <section className="sales__section sales__section-brand">
            <div className="sales__section-header">Brand</div>
          </section>
        </div>
      </Container>
    </div>
  );
}

export default SalesPage;
