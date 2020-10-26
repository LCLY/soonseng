import React, { useState } from 'react';
import './CardComponent.scss';
// 3rd party lib
import Lightbox from 'react-image-lightbox';
import NumberFormat from 'react-number-format';
import { img_placeholder_link } from '../../shared/global';
interface CardComponentProps {
  title: string;
  desc: string;
  price: string;
  /** the image link for the card image  */
  img_link: string;
  /** array of image links string for lightbox*/
  images: string[];
  /** The original index of the mapped out component(s) */
  index: number;
  /**
   * The clicked/selected index of the body card. We are using "bodyIndex" to check if it matches with the original "index" of the card. If it is, we set the css class to active
   * ```javascript
   *  <div className={`card card__div ${bodyIndex === index ? 'active' : ''}`} onClick={() => setBodyIndex(bodyIndex)}>
   * ```
   * */

  bodyIndex: number | null;
  setBodyIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

type Props = CardComponentProps;
/**
 *
 * A customized card component where the image is on the left side
 * <br/>`Props`: {@link CardComponentProps}
 * @return {*}
 * @category Components
 */

const CardComponent: React.FC<Props> = ({ bodyIndex, index, title, desc, images, price, img_link, setBodyIndex }) => {
  const [isHover, setIsHover] = useState(false);
  // isOpen to
  const [isOpen, setIsOpen] = useState(false);
  // photoindex to keep track of which image it's showing right now
  const [photoIndex, setPhotoIndex] = useState(0);

  return (
    <>
      {isOpen && (
        <Lightbox
          // reactModalProps={{ appElement: 'div' }}
          mainSrc={images[photoIndex]}
          nextSrc={images[(photoIndex + 1) % images.length]}
          prevSrc={images[(photoIndex + images.length - 1) % images.length]}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() => setPhotoIndex((photoIndex + images.length - 1) % images.length)}
          onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % images.length)}
        />
      )}
      <div className="card__outerdiv">
        <div
          className={`card card__div ${bodyIndex === index ? 'active' : ''}`}
          style={{
            transform: bodyIndex === index ? 'translateY(0)' : isHover ? 'translateY(-0.3rem)' : 'translateY(0)',
            boxShadow:
              bodyIndex === index ? 'none' : isHover ? '0.1rem 0.5rem 1rem 0.1rem rgba(80, 75, 75, 0.233)' : 'none',
          }}
        >
          <div className="card__overlay" style={{ display: bodyIndex === index ? 'flex' : 'none' }}>
            <i className="fas fa-check-circle"></i>
          </div>
          <div className="row no-gutters card__row">
            <div
              className="col card__img"
              style={{
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundColor: 'rgb(197, 197, 191)',
                backgroundImage: `url(${img_link}), url(${img_placeholder_link})`,
              }}
              onClick={() => setIsOpen(true)}
            >
              <div className="card__img-button">
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
                }
              }}
            >
              <div className="card-block px-2" style={{ height: '100%' }}>
                <div className="card__text">
                  <div>
                    <h4 className="card-title card__title">{title}</h4>
                    <p className="card-text card__desc">
                      This cargo is suitable for moving livestocks and common boxes. It's great for moving immigrants as
                      well.
                    </p>
                  </div>
                  <section className="card__desc-bottom">
                    <div className="card__desc-dimension">
                      <span style={{ fontSize: '1.35rem' }}>Dimension:</span>&nbsp;
                      <span className="card__desc-dimension-number">{desc}</span>
                    </div>
                    <div className="card__price-div">
                      <div></div>
                      <p className="card-text card__price">
                        RM
                        <NumberFormat value={price} displayType={'text'} thousandSeparator={true} />
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
