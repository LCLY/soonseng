import React, { useState } from 'react';
import './CardComponent.scss';
// 3rd party lib
import { Tag } from 'antd';
import Lightbox from 'react-image-lightbox';
import NumberFormat from 'react-number-format';
// Util
import { img_not_available_link } from 'src/shared/global';
import { TReceivedBodyLengthObj } from 'src/store/types/dashboard';

interface CardComponentProps {
  /**
   * The clicked/selected index of the body card. We are using "bodyIndex" to check if it matches with the original "index" of the card. If it is, we set the css class to active
   * ```javascript
   *  <div className={`card card__div ${bodyIndex === index ? 'active' : ''}`} onClick={() => setBodyIndex(bodyIndex)}>
   * ```
   * */
  bodyIndex: number | null;
  setBodyIndex: React.Dispatch<React.SetStateAction<number | null>>;
  /** The original index of the mapped out component(s) */
  index: number;
  /** the whole body length object  */
  bodyLengthObj: TReceivedBodyLengthObj;
  /** The current step for the steps component  */
  currentStep: number;
  /** Setting the current step for the steps component  */
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  /** API call to get sales accessories with body_length_id  */
  onGetSalesBodyAccessories: (body_length_id: number) => void;
}

type Props = CardComponentProps;
/**
 *
 * A customized card component where the image is on the left side
 * <br/>`Props`: {@link CardComponentProps}
 * @return {*}
 * @category Components
 */

const CardComponent: React.FC<Props> = ({
  index,
  bodyIndex,
  bodyLengthObj,
  setBodyIndex,
  currentStep,
  setCurrentStep,
  onGetSalesBodyAccessories,
}) => {
  const [isHover, setIsHover] = useState(false);
  // isOpen to
  const [isOpen, setIsOpen] = useState(false);
  // photoindex to keep track of which image it's showing right now
  const [photoIndex, setPhotoIndex] = useState(0);

  const images = bodyLengthObj.images;

  let img_link = bodyLengthObj.images.length > 0 ? bodyLengthObj.images[0].url : img_not_available_link;

  return (
    <>
      {isOpen && (
        <Lightbox
          // reactModalProps={{ appElement: 'div' }}
          mainSrc={images[photoIndex].url}
          nextSrc={images[(photoIndex + 1) % images.length].url}
          prevSrc={images[(photoIndex + images.length - 1) % images.length].url}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() => setPhotoIndex((photoIndex + images.length - 1) % images.length)}
          onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % images.length)}
        />
      )}
      <div className="card__outerdiv">
        {/* make card float and show shadow when hover */}
        <div
          className={`card card__div ${bodyIndex === index ? 'active' : ''}`}
          style={{
            transform: bodyIndex === index ? 'translateY(0)' : isHover ? 'translateY(-0.3rem)' : 'translateY(0)',
            boxShadow:
              bodyIndex === index ? 'none' : isHover ? '0.1rem 0.5rem 1rem 0.1rem rgba(80, 75, 75, 0.233)' : 'none',
          }}
        >
          <div className="card__highlight" style={{ display: bodyIndex === index ? 'flex' : 'none' }}>
            <i className="fas fa-check-circle"></i>
          </div>
          <div className="row no-gutters card__row">
            <div className="card__img-parent" style={{ pointerEvents: images.length === 0 ? 'none' : 'auto' }}>
              {/* The image of the card */}
              <img className="card__img" alt={img_link} src={img_link} />
              <div className="card__img-button" onClick={() => setIsOpen(true)}>
                <i className="fas fa-images"></i>
              </div>
            </div>
            <div
              className="col card__right"
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
              onClick={() => {
                // if body index has a number
                if (typeof bodyIndex === 'number' && bodyIndex === index) {
                  // if the current index is the same as selected index
                  // reset the selection
                  setBodyIndex(null);
                } else {
                  setBodyIndex(index);
                  onGetSalesBodyAccessories(bodyLengthObj.id);
                  setCurrentStep(currentStep + 1);
                }
              }}
            >
              <div className="card-block px-2" style={{ height: '100%' }}>
                <div className="card__text">
                  <div>
                    {/* Card title */}
                    <h4 className="card-title card__title">{bodyLengthObj.body.title}</h4>
                    <p className="card-text card__desc">{bodyLengthObj.body.description}</p>
                  </div>
                  <section className="card__desc-bottom">
                    <div className="card__desc-dimension">
                      <div>
                        <span style={{ fontSize: '1.35rem' }}>Dimension:</span>&nbsp;
                      </div>
                      <div>
                        <span className="card__desc-dimension-number">
                          <div className="card__tag-outerdiv">
                            <div className="card__tag-div">
                              <Tag className="card__tag" color="red">
                                <div className="card__tag-title">Width</div>
                                <div className="card__tag-values">
                                  <div className="card__tag-colon">:</div> <div> {bodyLengthObj.width}</div>
                                </div>
                              </Tag>
                            </div>
                            <div className="card__tag-div">
                              <Tag className="card__tag" color="cyan">
                                <div className="card__tag-title">Height</div>
                                <div className="card__tag-values">
                                  <div className="card__tag-colon">:</div> <div> {bodyLengthObj.height}</div>
                                </div>
                              </Tag>
                            </div>
                            <div className="card__tag-div">
                              <Tag className="card__tag" color="blue">
                                <div className="card__tag-title">Depth</div>
                                <div className="card__tag-values">
                                  <div className="card__tag-colon">:</div> <div> {bodyLengthObj.depth}</div>
                                </div>
                              </Tag>
                            </div>
                          </div>
                        </span>
                      </div>
                    </div>
                    <div className="card__price-div">
                      <div></div>
                      <p className="card-text card__price">
                        RM
                        <NumberFormat value={bodyLengthObj.price} displayType={'text'} thousandSeparator={true} />
                      </p>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CardComponent;
