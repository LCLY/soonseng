import React from 'react';
/* components */
/* 3rd party lib */
import { v4 as uuidv4 } from 'uuid';
import { Breadcrumb, Button, Card, Divider } from 'antd';
/* Util */
import { AppActions } from 'src/store/types';
import { TLocalOrderObj } from 'src/store/types/sales';

interface TyreSectionProps {
  loading?: boolean;
  totalSteps: number;
  currentStep: number; //for steps component
  onGetSalesLengths: (tire: number) => AppActions;
  currentTyre: number | null; //current picked tire count
  setCurrentTyre: React.Dispatch<React.SetStateAction<number | null>>; //the setstateaction of currentTyre
  currentOrderObj: TLocalOrderObj; //to keep track of the current order
  setCurrentOrderObj: React.Dispatch<React.SetStateAction<TLocalOrderObj>>;
}

type Props = TyreSectionProps;

const TyreSection: React.FC<Props> = ({
  loading,
  totalSteps,
  currentStep,
  currentTyre,
  setCurrentTyre,
  currentOrderObj,
  setCurrentOrderObj,
  onGetSalesLengths,
}) => {
  /* ================================================== */
  /*  state */
  /* ================================================== */
  let tyreCountArray = [4, 6];

  return (
    <>
      <section className="sales__section">
        <div className="sales__breadcrumb-outerdiv">
          <Breadcrumb separator=">" className="sales__breadcrumb">
            <Breadcrumb.Item>
              <span className="sales__breadcrumb-text">Tyre Count</span>
              {currentTyre && <span className="sales__breadcrumb-highlight">({currentTyre})</span>}
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <Divider className="sales__section-header-divider" orientation="left">
          <div className="sales__section-header">Tyre </div>
        </Divider>
        <section className="sales__section-innerdiv">
          {/* Description on the left */}
          <div className="sales__section-left">
            <img
              className="sales__section-img"
              src="https://image.freepik.com/free-photo/large-truck-wheels-semi-truck-road-freight-cargo-shipment_36860-908.jpg"
              alt="tire count"
            />
            {currentTyre ? (
              <Card className="sales__selectarea-card" size="small" title="Selected tyre count">
                <div className="sales__selectarea-card-row">
                  <div className="sales__selectarea-card-row-left">Tyre count</div>
                  <div>{currentTyre} tires</div>
                </div>
              </Card>
            ) : (
              <Card className="sales__selectarea-card" size="small" title="Selected tyre count">
                <div className="sales__selectarea-card-row">
                  <div className="sales__selectarea-card-row-left">None</div>
                </div>
              </Card>
            )}
          </div>

          {/* Selections on the right */}
          <div className="sales__section-right">
            <div className="sales__selectarea-desc">
              Let's start this exciting adventure off with selection of tires count.
              <br />
              The length of the truck is decided on the number of the tires it has.
            </div>
            <div className="sales__selectarea-innerdiv">
              <div className="sales__selectarea-selecttext">Select the tyre count for the cargo body</div>
              <div className="sales__selectarea-div">
                <>
                  {/* <div className="sales__selectarea-button"> */}
                  {tyreCountArray.map((tyre) => {
                    return (
                      <div
                        key={uuidv4()}
                        className={`sales__selectarea-button ${currentTyre === tyre ? 'active' : ''}`}
                        onClick={() => {
                          if (currentTyre === tyre) {
                            // reset the selection
                            setCurrentTyre(null);
                            setCurrentOrderObj({ ...currentOrderObj, tireCount: -1 });
                          } else {
                            setCurrentTyre(tyre);
                            setCurrentOrderObj({ ...currentOrderObj, tireCount: tyre });
                          }
                        }}
                      >
                        {tyre}
                      </div>
                    );
                  })}
                  {/* </div> */}
                </>
              </div>
            </div>
            <div className="sales__length-btn-div">
              {currentStep < totalSteps - 1 && (
                <Button
                  type="primary"
                  onClick={() => {
                    // Then call the body lengths API
                    if (currentTyre === null) return;
                    if (currentTyre) {
                      onGetSalesLengths(currentTyre);
                    }
                  }}
                  className="sales__length-btn"
                  loading={loading}
                  disabled={currentTyre === null ? true : false}
                >
                  Next
                </Button>
              )}
            </div>
          </div>
        </section>
      </section>
    </>
  );
};
export default TyreSection;
