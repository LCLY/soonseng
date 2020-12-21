import React from 'react';
/* 3rd party lib */
import { v4 as uuidv4 } from 'uuid';
import { Breadcrumb, Button, Card, Divider, Empty, Skeleton } from 'antd';
/* Util */
import { AppActions } from 'src/store/types';
import { TLocalOrderObj, TReceivedSalesLengthCategoryObj, TReceivedSalesLengthObj } from 'src/store/types/sales';

interface LengthSectionProps {
  loading?: boolean;
  totalSteps: number;
  currentStep: number; //for steps component
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  currentTyre: number | null; //current picked tire count
  setCurrentTyre: React.Dispatch<React.SetStateAction<number | null>>; //the setstateaction of currentTyre
  currentLength: TReceivedSalesLengthObj | null;
  setCurrentLength: React.Dispatch<React.SetStateAction<TReceivedSalesLengthObj | null>>;
  currentOrderObj: TLocalOrderObj; //to keep track of the current order
  setCurrentOrderObj: React.Dispatch<React.SetStateAction<TLocalOrderObj>>;
  onGetSalesBodies: (length_id: number, tire: number) => AppActions;
  lengthsCategoriesArray?: TReceivedSalesLengthCategoryObj[] | null;
}

type Props = LengthSectionProps;

const LengthSection: React.FC<Props> = ({
  loading,
  totalSteps,
  currentTyre,
  currentStep,
  setCurrentStep,
  currentLength,
  setCurrentLength,
  currentOrderObj,
  setCurrentOrderObj,
  onGetSalesBodies,
  lengthsCategoriesArray,
}) => {
  return (
    <>
      <section className="sales__section">
        <div className="sales__breadcrumb-outerdiv">
          <Breadcrumb separator=">" className="sales__breadcrumb">
            <Breadcrumb.Item>
              <span className="sales__breadcrumb-text">Tyre Count</span>
              {currentTyre && <span className="sales__breadcrumb-highlight">({currentTyre})</span>}
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <span className="sales__breadcrumb-text">Length</span>
              {currentLength && <span className="sales__breadcrumb-highlight">({currentLength?.title}ft)</span>}
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <Divider className="sales__section-header-divider" orientation="left">
          <div className="sales__section-header">Length </div>
        </Divider>

        <section className="sales__section-innerdiv">
          {/* Description on the left */}
          <div className="sales__section-left">
            <img
              className="sales__section-img"
              src="https://i.pinimg.com/originals/49/e4/e1/49e4e11ce6571189fceff40836ebdac9.jpg"
              alt="length of body"
            />
            {currentLength ? (
              <div className="sales__selectarea-card-outerdiv">
                <div className="sales__selectarea-card-outerdiv-customheader">Selected tyre count</div>
                <Card className="sales__selectarea-card" size="small" title="Selected body length">
                  <div className="sales__selectarea-card-row">
                    <div className="sales__selectarea-card-row-left">Body Length</div>
                    <div>{currentLength.title} (ft)</div>
                  </div>
                </Card>
              </div>
            ) : (
              <div className="sales__selectarea-card-outerdiv">
                <div className="sales__selectarea-card-outerdiv-customheader">Selected tyre count</div>
                <Card className="sales__selectarea-card" size="small" title="Selected body length">
                  <div className="sales__selectarea-card-row">
                    <div className="sales__selectarea-card-row-left">None</div>
                  </div>
                </Card>
              </div>
            )}
          </div>

          {/* Selections on the right */}
          <div className="sales__section-right">
            <div className="sales__selectarea-desc">
              Decide on the length of your cargo body, the length of the cargo body is measured from this side to that
              side.
              <div className="margin_t-1 margin_b-1">There are three main categories:</div>
              <div>
                <span>LCV</span> - Low Commercial Vehicle
              </div>
              <div>
                <span>MCV</span> - Medium Commercial Vehicle
              </div>
              <div>
                <span>HCV</span> - High Commercial Vehicle
              </div>
            </div>

            <div className="sales__selectarea-innerdiv">
              <div className="sales__selectarea-selecttext">Select the length of the cargo body (ft)</div>
              {lengthsCategoriesArray ? (
                <>
                  {lengthsCategoriesArray.length > 0 ? (
                    <>
                      {lengthsCategoriesArray.map((category) => {
                        return (
                          <React.Fragment key={uuidv4()}>
                            {/* Only render the non empty object */}
                            {Object.keys(category).length !== 0 && (
                              <div>
                                <div>
                                  <Divider orientation="left" className="sales__selectarea-categorydivider">
                                    <div className="sales__selectarea-category"> {category.title}</div>
                                  </Divider>
                                </div>
                                <div className="sales__selectarea-div">
                                  {category.lengths.map((lengthObj) => {
                                    return (
                                      <div
                                        key={uuidv4()}
                                        className={`sales__selectarea-button ${
                                          currentLength?.id === lengthObj.id ? 'active' : ''
                                        }`}
                                        onClick={() => {
                                          //  if currentLength has an id
                                          if (currentLength?.id === lengthObj.id) {
                                            // reset the selection
                                            setCurrentLength(null);
                                            setCurrentOrderObj({
                                              ...currentOrderObj,
                                              lengthObj: null,
                                            });
                                          } else {
                                            setCurrentLength(lengthObj);
                                            setCurrentOrderObj({
                                              ...currentOrderObj,
                                              lengthObj: lengthObj,
                                            });
                                          }
                                        }}
                                      >
                                        {lengthObj.title}
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                          </React.Fragment>
                        );
                      })}
                    </>
                  ) : (
                    <Empty />
                  )}
                </>
              ) : (
                <>
                  <div className="sales__selectarea-button margin_t-4 margin_b-2">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <Skeleton.Button className="sales__skeleton" key={num + uuidv4()} active={true} size="large" />
                    ))}
                  </div>
                  <div className="sales__selectarea-button">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <Skeleton.Button className="sales__skeleton" key={num + uuidv4()} active={true} size="large" />
                    ))}
                  </div>
                </>
              )}
            </div>
            <div className="sales__btn-div">
              <Button
                loading={false}
                className="sales__btn sales__btn--back margin_r-1"
                onClick={() => {
                  setCurrentStep(currentStep - 1);
                  setCurrentLength(null);
                }}
              >
                Back
              </Button>
              {currentStep < totalSteps - 1 && (
                <Button
                  type="primary"
                  onClick={() => {
                    // Then call the body lengths API
                    if (currentLength === null || currentTyre === null) return;
                    if (currentLength.id && currentTyre) {
                      onGetSalesBodies(currentLength.id, currentTyre);
                    }
                  }}
                  className="sales__btn"
                  loading={loading}
                  disabled={currentLength === null ? true : false}
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
export default LengthSection;
