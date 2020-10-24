import React from 'react';
import './CardComponent.scss';
// 3rd party lib
import NumberFormat from 'react-number-format';

interface CardComponentProps {
  title: string;
  desc: string;
  price: string;
  img_link: string;
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

const CardComponent: React.FC<Props> = ({ bodyIndex, index, title, desc, price, img_link, setBodyIndex }) => {
  return (
    <div className="card__outerdiv">
      <div className="card__overlay" style={{ display: bodyIndex === index ? 'flex' : 'none' }}>
        <i className="fas fa-check-circle"></i>
      </div>
      <div className={`card card__div ${bodyIndex === index ? 'active' : ''}`} onClick={() => setBodyIndex(index)}>
        <div className="row no-gutters card__row">
          <div
            className="col card__img"
            style={{
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundImage: `url(${img_link})`,
              backgroundColor: 'rgb(197, 197, 191)',
              backgroundPosition: 'center',
            }}
          ></div>
          <div className="col card__right">
            <div className="card-block px-2" style={{ height: '100%' }}>
              <div className="card__text">
                <h4 className="card-title card__title">{title}</h4>
                <p className="card-text card__desc">
                  This cargo is suitable for moving livestocks and common boxes. It's great for moving immigrants as
                  well.
                </p>
                <div className="card__desc-dimension">
                  <span style={{ fontSize: '1.35rem' }}>Dimension:</span>&nbsp;
                  <span className="card__desc-dimension-number">{desc}</span>
                </div>
                <div className="card__price-div">
                  <p className="card-text card__price">
                    RM
                    <NumberFormat value={price} displayType={'text'} thousandSeparator={true} />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CardComponent;
