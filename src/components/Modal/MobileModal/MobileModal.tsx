import React, { useEffect, useState } from 'react';
import './MobileModal.scss';
/* components */
import Backdrop from 'src/components/Backdrop/Backdrop';
/* 3rd party lib */
import gsap from 'gsap';
/* Util */
interface MobileModalProps {
  show: boolean;
  title: string;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

type Props = MobileModalProps;

const MobileModal: React.FC<Props> = ({ show, setShow, title, children }) => {
  /* ================================================== */
  /*  state */
  /* ================================================== */
  const [startAnimation, setStartAnimation] = useState(false);
  /* ================================================== */
  /*  method */
  /* ================================================== */
  /* ================================================== */
  /*  useEffect */
  /* ================================================== */
  useEffect(() => {
    if (show) {
      setStartAnimation(true);
    }
  }, [show]);

  useEffect(() => {
    if (startAnimation) {
      gsap.fromTo('.mobilemodal__div', { width: 0, height: 0 }, { width: '90vw', height: '90vh' });
    } else {
      gsap.to('.mobilemodal__div', { opacity: 0, duration: 0.2, delay: 0.1 }); //wait 1 second
      gsap.fromTo(
        '.mobilemodal__div',
        { width: '90vw', height: '90vh', overflow: 'hidden' },
        { width: 0, height: 0, onComplete: () => setShow(false) },
      );
    }
  }, [startAnimation, setShow]);

  /* ================================================== */
  /* ================================================== */
  return (
    <>
      {show && (
        <>
          <Backdrop
            show={show}
            backdropZIndex={1000}
            clicked={() => {
              setStartAnimation(false);
            }}
          />
          <div className="mobilemodal__div">
            <div className="mobilemodal__title">
              <div>{title}</div>
              <div className="mobilemodal__icon" onClick={() => setStartAnimation(false)}>
                <i className="fas fa-times-circle"></i>
              </div>
            </div>
            hello???
            <div>{children}</div>
          </div>
        </>
      )}
    </>
  );
};

export default MobileModal;
