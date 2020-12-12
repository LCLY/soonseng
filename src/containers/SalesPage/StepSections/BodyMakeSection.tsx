import React, { useState } from 'react';
/*components*/
import LightboxComponent from 'src/components/ImageRelated/LightboxComponent/LightboxComponent';

/*3rd party lib*/
import { v4 as uuidv4 } from 'uuid';
import NumberFormat from 'react-number-format';
import { Breadcrumb, Button, Card, Divider, Tag } from 'antd';
import { LazyLoadImage } from 'react-lazy-load-image-component';
/* Util */
import { AppActions } from 'src/store/types';
import { TUserAccess } from 'src/store/types/auth';
import { TReceivedBodyObj, TReceivedBodyMakeObj } from 'src/store/types/dashboard';
import { img_loading_link, img_not_available_link } from 'src/shared/global';
import { TLocalOrderObj, TReceivedSalesLengthObj, TReceivedSalesBodyMakeObj } from 'src/store/types/sales';

interface BodyMakeSectionProps {
  loading?: boolean;
  totalSteps: number;
  accessObj?: TUserAccess;
  currentStep: number; //for steps component
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  currentTyre: number | null; //current picked tire count
  currentLength: TReceivedSalesLengthObj | null;
  currentBody: TReceivedBodyObj | null;
  bodyMakesArray?: TReceivedSalesBodyMakeObj[] | null;
  currentBodyMake: TReceivedBodyMakeObj | null;
  setCurrentBodyMake: React.Dispatch<React.SetStateAction<TReceivedBodyMakeObj | null>>;
  currentOrderObj: TLocalOrderObj; //to keep track of the current order
  setCurrentOrderObj: React.Dispatch<React.SetStateAction<TLocalOrderObj>>;
  onGetSalesAccessories: (body_make_id: number) => AppActions;
}

type Props = BodyMakeSectionProps;

const BodyMakeSection: React.FC<Props> = ({
  loading,
  totalSteps,
  accessObj,
  currentStep,
  setCurrentStep,
  currentTyre,
  currentLength,
  currentBody,
  bodyMakesArray,
  currentBodyMake,
  setCurrentBodyMake,
  currentOrderObj,
  setCurrentOrderObj,
  onGetSalesAccessories,
}) => {
  /* ================================================== */
  /*  state */
  /* ================================================== */
  // For lightbox
  const [bodyMakePhotoIndex, setBodyMakePhotoIndex] = useState(0);
  const [bodyMakeLightboxOpen, setBodyMakeLightboxOpen] = useState(false);

  if (accessObj === undefined) {
    return null;
  }
  return (
    <>
      <section className="sales__section sales__section-body">
        <div className="sales__breadcrumb-outerdiv">
          <Breadcrumb separator=">" className="sales__breadcrumb">
            <Breadcrumb.Item>
              <span className="sales__breadcrumb-text">Tyre Count</span>
              <span className="sales__breadcrumb-highlight">({currentTyre})</span>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <span className="sales__breadcrumb-text">Length</span>
              <span className="sales__breadcrumb-highlight">({currentLength?.title}ft)</span>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <span className="sales__breadcrumb-text">Body</span>
              {currentBody && <span className="sales__breadcrumb-highlight">({currentBody?.title})</span>}
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <span className="sales__breadcrumb-text">Option</span>
              {currentBodyMake && (
                <span className="sales__breadcrumb-highlight">{`(${currentBodyMake?.make.brand.title} ${currentBodyMake?.make.title} ${currentBodyMake?.make.series})`}</span>
              )}{' '}
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <Divider className="sales__section-header-divider" orientation="left">
          <div className="sales__section-header">Option</div>
        </Divider>

        <section className="sales__section-innerdiv">
          {/* Description on the left */}
          <div className="sales__section-left">
            {currentBodyMake ? (
              <>
                {/* if there is no image then show image not available */}
                {currentBodyMake.make.images.length > 0 ? (
                  <>
                    <div className="sales__lightbox-parent" onClick={() => setBodyMakeLightboxOpen(true)}>
                      {/* Clickable image to show lightbox */}
                      <LazyLoadImage
                        className="sales__section-img"
                        src={currentBodyMake.make.images[0].url}
                        alt={currentBodyMake.make.images[0].filename}
                        placeholderSrc={img_loading_link}
                      />
                      <LightboxComponent
                        images={currentBodyMake?.make.images}
                        photoIndex={bodyMakePhotoIndex}
                        isOpen={bodyMakeLightboxOpen}
                        setPhotoIndex={setBodyMakePhotoIndex}
                        setIsOpen={setBodyMakeLightboxOpen}
                      />
                      <div className="sales__lightbox-icon">
                        <i className="fas fa-expand"></i>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <img className="sales__section-img" src={img_not_available_link} alt="no result" />
                    <div className="sales__section-img-unavailabletext"> No image is provided for this model</div>
                  </>
                )}
              </>
            ) : (
              <div className="sales__section-preview">
                <div className="sales__section-preview-innerdiv">
                  <div className="sales__section-img--illustratoricon-div">
                    <img
                      alt="make"
                      className="sales__section-img sales__section-img--accessories"
                      src="data:image/svg+xml;base64,PHN2ZyBpZD0iQ2FwYV8xIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA1MTIgNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHdpZHRoPSI1MTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGc+PGc+PGc+PGc+PHBhdGggZD0ibTExMi40NzcgMjk5LjA1OGgtOTMuNzMxYy0xMC4zNTMgMC0xOC43NDYtOC4zOTMtMTguNzQ2LTE4Ljc0N3YtOTMuNzMxYzAtMTAuMzUzIDguMzkzLTE4Ljc0NiAxOC43NDYtMTguNzQ2aDkzLjczMWMxMC4zNTMgMCAxOC43NDYgOC4zOTMgMTguNzQ2IDE4Ljc0NnY5My43MzFjMCAxMC4zNTQtOC4zOTMgMTguNzQ3LTE4Ljc0NiAxOC43NDd6IiBmaWxsPSIjZmZlMDdkIi8+PC9nPjxnPjxwYXRoIGQ9Im0xMTQuMDUzIDE2Ny44NzRjLjE5OCAyLjYwMy4yOTkgNS4yMzQuMjk5IDcuODg4IDAgNTYuNjg0LTQ1Ljk1MSAxMDIuNjM1LTEwMi42MzUgMTAyLjYzNS0zLjk2MyAwLTcuODcxLS4yMzItMTEuNzE2LS42N3YyLjU0NGMwIDEwLjM1MyA4LjM5MyAxOC43NDYgMTguNzQ2IDE4Ljc0Nmg5My43MzFjMTAuMzUzIDAgMTguNzQ2LTguMzkzIDE4Ljc0Ni0xOC43NDZ2LTkzLjczMWMtLjAwMS05LjgyLTcuNTU3LTE3Ljg2NC0xNy4xNzEtMTguNjY2eiIgZmlsbD0iI2ZmZDA2NCIvPjwvZz48L2c+PC9nPjxwYXRoIGQ9Im04My40MDQgMjI4LjUxOWMyLjQ5LTMuNjQ0IDMuOTUtOC4wNDUgMy45NS0xMi43ODIgMC0xMi41MjItMTAuMTg3LTIyLjcwOS0yMi43MDktMjIuNzA5aC0xOS4wNTdjLTQuMjA0IDAtNy42MTEgMy40MDgtNy42MTEgNy42MTF2NjUuNjExYzAgMi4wMjUuODA3IDMuOTY2IDIuMjQxIDUuMzk0IDEuNDI3IDEuNDIxIDMuMzU4IDIuMjE4IDUuMzcxIDIuMjE4aC4wMzRjLjAwMiAwIDE3LjUyNC0uMDc4IDIyLjM1My0uMDc4IDEzLjkzNiAwIDI1LjI3My0xMS4zMzcgMjUuMjczLTI1LjI3Mi0uMDAyLTguMTI3LTMuODY0LTE1LjM2Ny05Ljg0NS0xOS45OTN6bS0xOC43NTgtMjAuMjY3YzQuMTI4IDAgNy40ODYgMy4zNTggNy40ODYgNy40ODZzLTMuMzU4IDcuNDg2LTcuNDg2IDcuNDg2Yy0xLjQxMSAwLTExLjQ0Ny4wMTgtMTEuNDQ3LjAxOHYtMTQuOTl6bTMuMzI4IDUwLjMxYy0yLjcxIDAtOS40MDIuMDI0LTE0Ljc3NS4wNDZ2LTIwLjEyN2MxLjQ3My0uMDA2IDE0Ljc3NS0uMDE3IDE0Ljc3NS0uMDE3IDUuNTQxIDAgMTAuMDUgNC41MDggMTAuMDUgMTAuMDQ5IDAgNS41NDItNC41MDkgMTAuMDQ5LTEwLjA1IDEwLjA0OXoiIGZpbGw9IiNlY2Y0ZmYiLz48Zz48Zz48cGF0aCBkPSJtMTEyLjQ3NyAxMzUuMDI5aC05My43MzFjLTEwLjM1MyAwLTE4Ljc0Ni04LjM5My0xOC43NDYtMTguNzQ2di05My43MzFjMC0xMC4zNTMgOC4zOTMtMTguNzQ2IDE4Ljc0Ni0xOC43NDZoOTMuNzMxYzEwLjM1MyAwIDE4Ljc0NiA4LjM5MyAxOC43NDYgMTguNzQ2djkzLjczMWMwIDEwLjM1My04LjM5MyAxOC43NDYtMTguNzQ2IDE4Ljc0NnoiIGZpbGw9IiNkZjc1YTUiLz48cGF0aCBkPSJtMTE0LjA1MyAzLjgwNmMuMTk4IDIuNjAzLjI5OSA1LjIzNC4yOTkgNy44ODggMCA1Ni42ODQtNDUuOTUxIDEwMi42MzUtMTAyLjYzNSAxMDIuNjM1LTMuOTYzIDAtNy44NzEtLjIzMi0xMS43MTYtLjY3djIuNTQ0YzAgMTAuMzUzIDguMzkzIDE4Ljc0NiAxOC43NDYgMTguNzQ2aDkzLjczMWMxMC4zNTMgMCAxOC43NDYtOC4zOTMgMTguNzQ2LTE4Ljc0NnYtOTMuNzMxYy0uMDAxLTkuODIxLTcuNTU3LTE3Ljg2NC0xNy4xNzEtMTguNjY2eiIgZmlsbD0iI2RkNTc5MCIvPjwvZz48L2c+PGc+PGc+PGc+PHBhdGggZD0ibTM5Ny40NzcgMTM1LjAyOWgtOTMuNzMxYy0xMC4zNTMgMC0xOC43NDYtOC4zOTMtMTguNzQ2LTE4Ljc0NnYtOTMuNzMxYzAtMTAuMzUzIDguMzkzLTE4Ljc0NiAxOC43NDYtMTguNzQ2aDkzLjczMWMxMC4zNTMgMCAxOC43NDYgOC4zOTMgMTguNzQ2IDE4Ljc0NnY5My43MzFjMCAxMC4zNTMtOC4zOTMgMTguNzQ2LTE4Ljc0NiAxOC43NDZ6IiBmaWxsPSIjYjNlNTlmIi8+PHBhdGggZD0ibTM5OS4wNTMgMy44ODVjLjE5OCAyLjYwMy4yOTkgNS4yMzQuMjk5IDcuODg4IDAgNTYuNjg0LTQ1Ljk1MSAxMDIuNjM1LTEwMi42MzUgMTAyLjYzNS0zLjk2MyAwLTcuODcxLS4yMzItMTEuNzE2LS42N3YyLjU0NGMwIDEwLjM1MyA4LjM5MyAxOC43NDYgMTguNzQ2IDE4Ljc0Nmg5My43MzFjMTAuMzUzIDAgMTguNzQ2LTguMzkzIDE4Ljc0Ni0xOC43NDZ2LTkzLjczYy0uMDAxLTkuODIxLTcuNTU3LTE3Ljg2NC0xNy4xNzEtMTguNjY3eiIgZmlsbD0iIzk1ZDZhNCIvPjwvZz48L2c+PGc+PGc+PHBhdGggZD0ibTM5Ny40NzcgMjk5LjA1OGgtOTMuNzMxYy0xMC4zNTMgMC0xOC43NDYtOC4zOTMtMTguNzQ2LTE4Ljc0NnYtOTMuNzMxYzAtMTAuMzUzIDguMzkzLTE4Ljc0NiAxOC43NDYtMTguNzQ2aDkzLjczMWMxMC4zNTMgMCAxOC43NDYgOC4zOTMgMTguNzQ2IDE4Ljc0NnY5My43MzFjMCAxMC4zNTMtOC4zOTMgMTguNzQ2LTE4Ljc0NiAxOC43NDZ6IiBmaWxsPSIjOTBkOGY5Ii8+PHBhdGggZD0ibTM5OS4wNTMgMTY3LjkxNGMuMTk4IDIuNjAzLjI5OSA1LjIzNC4yOTkgNy44ODggMCA1Ni42ODQtNDUuOTUxIDEwMi42MzUtMTAyLjYzNSAxMDIuNjM1LTMuOTYzIDAtNy44NzEtLjIzMy0xMS43MTYtLjY3djIuNTQ0YzAgMTAuMzUzIDguMzkzIDE4Ljc0NiAxOC43NDYgMTguNzQ2aDkzLjczMWMxMC4zNTMgMCAxOC43NDYtOC4zOTMgMTguNzQ2LTE4Ljc0NnYtOTMuNzMxYy0uMDAxLTkuODIxLTcuNTU3LTE3Ljg2NC0xNy4xNzEtMTguNjY2eiIgZmlsbD0iIzc1Y2VmOSIvPjwvZz48L2c+PC9nPjxwYXRoIGQ9Im05OC42MzMgOTkuNTM2LTI0LjQxMy02NC42OTFjLS4wMjYtLjA2OS0uMDUzLS4xMzgtLjA4MS0uMjA3LTEuNDA5LTMuNDI1LTQuNzExLTUuNjM4LTguNDE1LTUuNjM4LS4wMDMgMC0uMDA2IDAtLjAwOSAwLTMuNzA3LjAwMy03LjAwOSAyLjIyMy04LjQxMiA1LjY1NC0uMDI0LjA1Ny0uMDQ3LjExNC0uMDY4LjE3MmwtMjQuNjM3IDY0LjY4OGMtMS40OTcgMy45MjkuNDc2IDguMzI2IDQuNDAzIDkuODIyIDMuOTI4IDEuNDk1IDguMzI2LS40NzUgOS44MjMtNC40MDRsNC4yNjktMTEuMjA4aDI5LjA3N2w0LjIyMiAxMS4xODZjMS4xNSAzLjA0OCA0LjA0NyA0LjkyNyA3LjEyMiA0LjkyNi44OTMgMCAxLjgwMi0uMTU4IDIuNjg3LS40OTIgMy45MzItMS40ODQgNS45MTctNS44NzYgNC40MzItOS44MDh6bS00MS43NDMtMjEuMDM1IDguODA3LTIzLjEyNCA4LjcyNyAyMy4xMjR6IiBmaWxsPSIjZWNmNGZmIi8+PGcgZmlsbD0iIzRhODBhYSI+PHBhdGggZD0ibTIxOS4zODkgNDQuMjIzaC01NS4zNmMtNC4yMDQgMC03LjYxMS0zLjQwOC03LjYxMS03LjYxMXMzLjQwNy03LjYxMiA3LjYxMS03LjYxMmg1NS4zNmM0LjIwNCAwIDcuNjExIDMuNDA4IDcuNjExIDcuNjExcy0zLjQwNyA3LjYxMi03LjYxMSA3LjYxMnoiLz48cGF0aCBkPSJtMTk4Ljg4NSA3Ny4wMjloLTM0Ljg1NmMtNC4yMDQgMC03LjYxMS0zLjQwOC03LjYxMS03LjYxMXMzLjQwNy03LjYxMSA3LjYxMS03LjYxMWgzNC44NTZjNC4yMDQgMCA3LjYxMSAzLjQwOCA3LjYxMSA3LjYxMXMtMy40MDcgNy42MTEtNy42MTEgNy42MTF6Ii8+PHBhdGggZD0ibTE5OC44ODUgMTA5LjgzNGgtMzQuODU2Yy00LjIwNCAwLTcuNjExLTMuNDA4LTcuNjExLTcuNjExczMuNDA3LTcuNjExIDcuNjExLTcuNjExaDM0Ljg1NmM0LjIwNCAwIDcuNjExIDMuNDA4IDcuNjExIDcuNjExcy0zLjQwNyA3LjYxMS03LjYxMSA3LjYxMXoiLz48cGF0aCBkPSJtMjE5LjM4OSAyMDguMjUyaC01NS4zNmMtNC4yMDQgMC03LjYxMS0zLjQwOC03LjYxMS03LjYxMSAwLTQuMjA0IDMuNDA3LTcuNjExIDcuNjExLTcuNjExaDU1LjM2YzQuMjA0IDAgNy42MTEgMy40MDggNy42MTEgNy42MTFzLTMuNDA3IDcuNjExLTcuNjExIDcuNjExeiIvPjxwYXRoIGQ9Im0xOTguODg1IDI0MS4wNTdoLTM0Ljg1NmMtNC4yMDQgMC03LjYxMS0zLjQwOC03LjYxMS03LjYxMSAwLTQuMjA0IDMuNDA3LTcuNjExIDcuNjExLTcuNjExaDM0Ljg1NmM0LjIwNCAwIDcuNjExIDMuNDA4IDcuNjExIDcuNjExLjAwMSA0LjIwNC0zLjQwNyA3LjYxMS03LjYxMSA3LjYxMXoiLz48cGF0aCBkPSJtMTk4Ljg4NSAyNzMuODYzaC0zNC44NTZjLTQuMjA0IDAtNy42MTEtMy40MDgtNy42MTEtNy42MTFzMy40MDctNy42MTIgNy42MTEtNy42MTJoMzQuODU2YzQuMjA0IDAgNy42MTEgMy40MDggNy42MTEgNy42MTJzLTMuNDA3IDcuNjExLTcuNjExIDcuNjExeiIvPjwvZz48Zz48Zz48cGF0aCBkPSJtMzU2LjY4MSAxMDkuODM0Yy0yMi4yODYgMC00MC40MTctMTguMTMxLTQwLjQxNy00MC40MTdzMTguMTMtNDAuNDE3IDQwLjQxNy00MC40MTdjOC4wOTggMCAxNS45MTQgMi4zODkgMjIuNjAzIDYuOTA3IDMuNDg0IDIuMzUzIDQuMzk5IDcuMDg1IDIuMDQ3IDEwLjU2OC0yLjM1NCAzLjQ4NC03LjA4NSA0LjM5OS0xMC41NjggMi4wNDctNC4xNjMtMi44MTItOS4wMzItNC4yOTgtMTQuMDgxLTQuMjk4LTEzLjg5MiAwLTI1LjE5NCAxMS4zMDItMjUuMTk0IDI1LjE5NHMxMS4zMDIgMjUuMTk0IDI1LjE5NCAyNS4xOTRjNS4xNzEgMCA5LjUyNS0xLjU0MyAxMi45NDMtNC41ODYuNjY2LS41OTMgMS4zMDEtMS4yNSAxLjg5MS0xLjk1MyAyLjctMy4yMjIgNy41MDEtMy42NDQgMTAuNzIzLS45NDRzMy42NDUgNy41MDEuOTQ0IDEwLjcyM2MtMS4wNjIgMS4yNjgtMi4yMTggMi40Ni0zLjQzMyAzLjU0My02LjIwMyA1LjUyLTE0LjE3OSA4LjQzOS0yMy4wNjkgOC40Mzl6IiBmaWxsPSIjZWNmNGZmIi8+PC9nPjwvZz48Zz48Zz48cGF0aCBkPSJtMzI4LjIwNSAyNzMuODYzYy0yLjAwOSAwLTMuOTM3LS43OTQtNS4zNjItMi4yMS0xLjQzMy0xLjQyMi0yLjI0My0zLjM1Ni0yLjI1LTUuMzc1IDAgMC0uMDg1LTIzLjc4NS0uMDg1LTMyLjkwNSAwLTcuNDgxLS4wNDgtMzIuNzE5LS4wNDgtMzIuNzE5LS4wMDQtMi4wMjEuNzk3LTMuOTYxIDIuMjI0LTUuMzkxIDEuNDI4LTEuNDMxIDMuMzY3LTIuMjM0IDUuMzg4LTIuMjM0aDE4LjU4M2MyMC40IDAgMzQuMTA3IDE2LjI0MiAzNC4xMDcgNDAuNDE3IDAgMjIuOTk2LTE0LjA1OSAzOS45MzMtMzMuNDMxIDQwLjI3Mi01LjI4OS4wOTItMTguNTM1LjE0My0xOS4wOTcuMTQ1LS4wMSAwLS4wMTkgMC0uMDI5IDB6bTcuNDkzLTY1LjYxMWMuMDE0IDguMDcuMDM0IDIwLjI5My4wMzQgMjUuMTIyIDAgNS43ODIuMDM1IDE3LjQ2OC4wNTkgMjUuMjI4IDQuMDQzLS4wMjQgOC42OTYtLjA2IDExLjI3NS0uMTA1IDEyLjc2MS0uMjIzIDE4LjQ3NC0xMi43NDMgMTguNDc0LTI1LjA1MSAwLTEyLjE4LTQuOTYtMjUuMTk0LTE4Ljg4NC0yNS4xOTR6IiBmaWxsPSIjZWNmNGZmIi8+PC9nPjwvZz48cGF0aCBkPSJtNTA0LjM4OCA0NC4yMjNoLTU1LjM2Yy00LjIwNCAwLTcuNjEyLTMuNDA4LTcuNjEyLTcuNjExczMuNDA5LTcuNjEyIDcuNjEzLTcuNjEyaDU1LjM2YzQuMjA0IDAgNy42MTIgMy40MDggNy42MTIgNy42MTFzLTMuNDA4IDcuNjEyLTcuNjEzIDcuNjEyeiIgZmlsbD0iIzRhODBhYSIvPjxwYXRoIGQ9Im00ODMuODg1IDc3LjAyOWgtMzQuODU2Yy00LjIwNCAwLTcuNjEyLTMuNDA4LTcuNjEyLTcuNjExczMuNDA3LTcuNjExIDcuNjEyLTcuNjExaDM0Ljg1NmM0LjIwNCAwIDcuNjExIDMuNDA4IDcuNjExIDcuNjExcy0zLjQwNyA3LjYxMS03LjYxMSA3LjYxMXoiIGZpbGw9IiM0YTgwYWEiLz48cGF0aCBkPSJtNDgzLjg4NSAxMDkuODM0aC0zNC44NTZjLTQuMjA0IDAtNy42MTItMy40MDgtNy42MTItNy42MTFzMy40MDctNy42MTEgNy42MTItNy42MTFoMzQuODU2YzQuMjA0IDAgNy42MTEgMy40MDggNy42MTEgNy42MTFzLTMuNDA3IDcuNjExLTcuNjExIDcuNjExeiIgZmlsbD0iIzRhODBhYSIvPjxwYXRoIGQ9Im01MDQuMzg4IDIwOC4yNTJoLTU1LjM2Yy00LjIwNCAwLTcuNjEyLTMuNDA4LTcuNjEyLTcuNjExIDAtNC4yMDQgMy40MDctNy42MTEgNy42MTItNy42MTFoNTUuMzZjNC4yMDQgMCA3LjYxMiAzLjQwOCA3LjYxMiA3LjYxMXMtMy40MDcgNy42MTEtNy42MTIgNy42MTF6IiBmaWxsPSIjNGE4MGFhIi8+PHBhdGggZD0ibTQ4My44ODUgMjQxLjA1N2gtMzQuODU2Yy00LjIwNCAwLTcuNjEyLTMuNDA4LTcuNjEyLTcuNjExIDAtNC4yMDQgMy40MDctNy42MTEgNy42MTItNy42MTFoMzQuODU2YzQuMjA0IDAgNy42MTEgMy40MDggNy42MTEgNy42MTEuMDAxIDQuMjA0LTMuNDA3IDcuNjExLTcuNjExIDcuNjExeiIgZmlsbD0iIzRhODBhYSIvPjxwYXRoIGQ9Im00ODMuODg1IDI3My44NjNoLTM0Ljg1NmMtNC4yMDQgMC03LjYxMi0zLjQwOC03LjYxMi03LjYxMXMzLjQwNy03LjYxMiA3LjYxMi03LjYxMmgzNC44NTZjNC4yMDQgMCA3LjYxMSAzLjQwOCA3LjYxMSA3LjYxMnMtMy40MDcgNy42MTEtNy42MTEgNy42MTF6IiBmaWxsPSIjNGE4MGFhIi8+PGc+PHBhdGggZD0ibTg0Ljg3MyA0OTguNjg2IDEwLjQzOSA3LjU3NGMxLjczMyAxLjI1NyAzLjgxOSAxLjkzNCA1Ljk2IDEuOTM0aDE3My41NjhjNC4xIDAgNy4wMjgtMy45NjkgNS44MTgtNy44ODdsLTguMjcxLTI2Ljc3MWMtLjI0NS0uNzkzLS4zOTItMS42MTMtLjQzNy0yLjQ0MWwtMS45NjYtMzUuOTE4Yy0uMTgzLTMuMzQ4LS43NzYtNi42NjEtMS43NjYtOS44NjVsLTMxLjk1NC0xMDMuNDNjLTMuMjgyLTEwLjYyMi0xNC4zMzctMTcuMTE3LTI1LjA2OS0xNC4yMTUtMTEuMjY3IDMuMDQ3LTE3LjY3MiAxNC43OTQtMTQuMjU2IDI1Ljg1bC02LjIxLTIwLjFjLTMuMjgyLTEwLjYyMi0xNC4zMzctMTcuMTE3LTI1LjA2OS0xNC4yMTUtMTEuMjY3IDMuMDQ3LTE3LjY3MiAxNC43OTQtMTQuMjU2IDI1Ljg1bC01LjkwNy0xOS4xMmMtMy4yODItMTAuNjIyLTE0LjMzNy0xNy4xMTgtMjUuMDY5LTE0LjIxNS0xMS4yNjcgMy4wNDctMTcuNjcyIDE0Ljc5NC0xNC4yNTYgMjUuODVsLTIwLjQzMi02Ni4xMzdjLTMuMjgyLTEwLjYyMi0xNC4zMzctMTcuMTE4LTI1LjA2OS0xNC4yMTUtMTEuMjY3IDMuMDQ3LTE3LjY3MiAxNC43OTQtMTQuMjU2IDI1Ljg1bDM2LjMxMyAxMTcuNTRjLTMuNDE2LTExLjA1Ni0xNS4zMy0xNy4xNDQtMjYuMzUzLTEzLjMwNC0xMC40OTkgMy42NTctMTUuOTY0IDE1LjI1Ni0xMi42ODIgMjUuODc4bDI2LjA4MSA4NC40MmMyLjYxOSA4LjQ3OCA3LjkxNyAxNS44NzcgMTUuMDk5IDIxLjA4N3oiIGZpbGw9IiNmZmRkY2UiLz48cGF0aCBkPSJtMTYwLjM1IDUwOC4xOTRoMTE0LjQ5YzQuMSAwIDcuMDI4LTMuOTY5IDUuODE4LTcuODg3bC04LjI3MS0yNi43NzFjLS4yNDUtLjc5My0uMzkyLTEuNjEzLS40MzctMi40NDFsLTEuOTY2LTM1LjkyYy0uMTgzLTMuMzQ3LS43NzYtNi42Ni0xLjc2Ni05Ljg2MmwtMjAuNTM2LTY2LjQ3M2MtNy45MzEgNDQuMzk1LTI5LjQ0NiAxMDcuNjk0LTg3LjMzMiAxNDkuMzU0eiIgZmlsbD0iI2ZmY2JiZSIvPjwvZz48ZyBmaWxsPSIjZmZjYmJlIj48cGF0aCBkPSJtNjUuMjA2IDIzNi41NTIgNDQuNDg1IDE0My45OWMxLjAxIDMuMjY4IDQuMDIgNS4zNjcgNy4yNzEgNS4zNjcuNzQzIDAgMS41LS4xMSAyLjI0OS0uMzQxIDQuMDE3LTEuMjQxIDYuMjY3LTUuNTAzIDUuMDI2LTkuNTE5bC0zOC41MjUtMTI0LjY5OGMtMi44NDUtOS4wNzktMTEuMzc0LTE1LjEwNC0yMC41MDYtMTQuNzk5eiIvPjxwYXRoIGQ9Im0xMjQuOTYzIDI5MS4wNTMgMjMuOTA4IDc3LjM4NGMxLjAxIDMuMjY4IDQuMDIgNS4zNjcgNy4yNzEgNS4zNjcuNzQzIDAgMS41MDEtLjExIDIuMjQ5LS4zNDEgNC4wMTctMS4yNDEgNi4yNjctNS41MDMgNS4wMjYtOS41MTlsLTE3Ljk0OS01OC4wOTZjLTIuODQ2LTkuMDc3LTExLjM3NS0xNS4xLTIwLjUwNS0xNC43OTV6Ii8+PHBhdGggZD0ibTE3MC4xOTUgMjk4LjUzOSAxNy44NTUgNTcuNzk0YzEuMDEgMy4yNjggNC4wMiA1LjM2NyA3LjI3MSA1LjM2Ny43NDMgMCAxLjUwMS0uMTEgMi4yNDktLjM0MSA0LjAxNy0xLjI0MSA2LjI2Ny01LjUwMyA1LjAyNi05LjUxOWwtMTEuODk3LTM4LjUwOGMtMi44NDYtOS4wNzYtMTEuMzc0LTE1LjA5OC0yMC41MDQtMTQuNzkzeiIvPjxwYXRoIGQ9Im0yMTUuNzY2IDMwNy4wMDQgMTEuNzQgMzcuOTk5YzEuMDEgMy4yNjggNC4wMiA1LjM2NyA3LjI3MSA1LjM2Ny43NDMgMCAxLjUtLjExIDIuMjQ5LS4zNDEgMy44MjQtMS4xODEgNi4wNC01LjEwMiA1LjE3My04Ljk0MWwtNS45MzQtMTkuMjA2Yy0yLjgxNi05LjExMi0xMS4zNTMtMTUuMTY3LTIwLjQ5OS0xNC44Nzh6Ii8+PHBhdGggZD0ibTgyLjUyNCAzODAuMDQ1Yy0yLjk4Mi04Ljc1LTExLjMzNi0xNC4yMTktMjAuMjE0LTEzLjg1NWwxOS42NSA2My42MDQtNC42MTkgOC43NWMtMS45NjMgMy43MTgtLjU0MSA4LjMyMiAzLjE3NiAxMC4yODUgMS4xMzQuNTk5IDIuMzQ5Ljg4MiAzLjU0Ny44ODIgMi43MzIgMCA1LjM3NC0xLjQ3NSA2LjczOC00LjA1OWw2LjA5Mi0xMS41MzljLjk0My0xLjc4NSAxLjEzNy0zLjg3Mi41NDEtNS44MDF6Ii8+PC9nPjwvZz48L3N2Zz4="
                    />
                  </div>
                  <div className="sales__section-img--accessories-text">Brand/Model</div>
                </div>
              </div>
            )}
            {currentBodyMake ? (
              <Card className="sales__selectarea-card" size="small" title="Selected model">
                <div className="flex">
                  <section className="sales__selectarea-card-column">
                    <div className="sales__selectarea-card-row">
                      <div className="sales__selectarea-card-row-left--make">Model</div>
                      <div className="sales__selectarea-card-row-right--make">{currentBodyMake.make.title}</div>
                    </div>
                    <div className="sales__selectarea-card-row">
                      <div className="sales__selectarea-card-row-left--make">Series</div>
                      <div className="sales__selectarea-card-row-right--make">
                        {currentBodyMake.make.series === null || currentBodyMake.make.series === ''
                          ? '-'
                          : currentBodyMake.make.series}
                      </div>
                    </div>
                    <div className="sales__selectarea-card-row">
                      <div className="sales__selectarea-card-row-left--make">Length</div>
                      <div className="sales__selectarea-card-row-right--make">
                        {currentBodyMake.make.length !== null || currentBodyMake.make.length !== 0
                          ? currentBodyMake.make.length
                          : '-'}
                        mm
                      </div>
                    </div>
                    <div className="sales__selectarea-card-row">
                      <div className="sales__selectarea-card-row-left--make">Config</div>
                      <div className="sales__selectarea-card-row-right--make">
                        {currentBodyMake.make.config ? currentBodyMake.make.config : '-'}
                      </div>
                    </div>
                    <div className="sales__selectarea-card-row">
                      <div className="sales__selectarea-card-row-left--make">Torque</div>
                      <div className="sales__selectarea-card-row-right--make">
                        {currentBodyMake.make.torque ? currentBodyMake.make.torque : '-'}
                      </div>
                    </div>
                    <div className="sales__selectarea-card-row">
                      <div className="sales__selectarea-card-row-left--make">Horsepower</div>
                      <div className="sales__selectarea-card-row-right--make">
                        {currentBodyMake.make.horsepower ? `${currentBodyMake.make.horsepower}PC` : '-'}
                      </div>
                    </div>
                    <div className="sales__selectarea-card-row">
                      <div className="sales__selectarea-card-row-left--make">Emission</div>
                      <div className="sales__selectarea-card-row-right--make">
                        {currentBodyMake.make.emission ? currentBodyMake.make.emission : '-'}
                      </div>
                    </div>
                  </section>
                  <section className="sales__selectarea-card-column">
                    <div className="sales__selectarea-card-row">
                      <div className="sales__selectarea-card-row-left--make">Tyre Count</div>
                      <div className="sales__selectarea-card-row-right--make">{currentBodyMake.make.tire}</div>
                    </div>
                    <div className="sales__selectarea-card-row">
                      <div className="sales__selectarea-card-row-left--make">Wheelbase</div>
                      <div className="sales__selectarea-card-row-right--make">
                        {currentBodyMake.make.wheelbase.title ? `${currentBodyMake.make.wheelbase.title}mm` : '-'}
                      </div>
                    </div>
                    <div className="sales__selectarea-card-row">
                      <div className="sales__selectarea-card-row-left--make">Transmission</div>
                      <div className="sales__selectarea-card-row-right--make">
                        {currentBodyMake.make.transmission ? currentBodyMake.make.transmission : '-'}
                      </div>
                    </div>
                    <div className="sales__selectarea-card-row">
                      <div className="sales__selectarea-card-row-left--make">Engine Capacity</div>
                      <div className="sales__selectarea-card-row-right--make">
                        {currentBodyMake.make.engine_cap ? `${currentBodyMake.make.engine_cap}CC` : '-'}
                      </div>
                    </div>
                    <div className="sales__selectarea-card-row">
                      <div className="sales__selectarea-card-row-left--make">Year</div>
                      <div className="sales__selectarea-card-row-right--make">
                        {currentBodyMake.make.year ? currentBodyMake.make.year : '-'}
                      </div>
                    </div>
                    <div className="sales__selectarea-card-row">
                      <div className="sales__selectarea-card-row-left--make">GVW</div>
                      <div className="sales__selectarea-card-row-right--make">
                        {currentBodyMake.make.gvw ? `${currentBodyMake.make.gvw}kg` : '-'}
                      </div>
                    </div>
                  </section>
                </div>
                {accessObj.showPriceSalesPage && (
                  <div className="sales__selectarea-card-row" style={{ marginTop: '0.5rem' }}>
                    <div className="sales__selectarea-card-row-left">Model Price</div>

                    <div className="sales__selectarea-card-row-right sales__selectarea-card-price--model">
                      {currentBodyMake?.price === 0 || currentBodyMake?.price === null ? (
                        '-'
                      ) : (
                        <>
                          RM
                          <NumberFormat
                            value={currentBodyMake?.make.price}
                            displayType={'text'}
                            thousandSeparator={true}
                          />
                        </>
                      )}
                    </div>
                  </div>
                )}
                <div className="sales__selectarea-card-row" style={{ marginTop: '0.5rem' }}>
                  <div className="sales__selectarea-card-row-left">Dimension</div>
                  <div className="sales__selectarea-card-row-right">
                    {currentBodyMake?.width !== null &&
                      currentBodyMake?.width !== '' &&
                      currentBodyMake?.width !== null && (
                        <Tag className="flex" color="red">
                          <div className="sales__selectarea-card-dimension">Width:&nbsp;</div>
                          <div className="sales__selectarea-card-dimension">{currentBodyMake?.width}</div>
                        </Tag>
                      )}

                    {currentBodyMake?.depth !== null &&
                      currentBodyMake?.depth !== '' &&
                      currentBodyMake?.depth !== null && (
                        <Tag className="flex" color="orange">
                          <div className="sales__selectarea-card-dimension">Depth:&nbsp;</div>
                          <div className="sales__selectarea-card-dimension">{currentBodyMake?.depth}</div>
                        </Tag>
                      )}

                    {currentBodyMake?.height !== null &&
                      currentBodyMake?.height !== '' &&
                      currentBodyMake?.height !== null && (
                        <Tag className="flex" color="volcano">
                          <div className="sales__selectarea-card-dimension">Height:&nbsp;</div>
                          <div className="sales__selectarea-card-dimension">{currentBodyMake?.height}</div>
                        </Tag>
                      )}
                  </div>
                </div>
                {accessObj.showPriceSalesPage && (
                  <div className="sales__selectarea-card-row">
                    <div className="sales__selectarea-card-row-left">Body Price</div>

                    <div className="sales__selectarea-card-row-right sales__selectarea-card-price">
                      {currentBodyMake?.price === 0 || currentBodyMake?.price === null ? (
                        '-'
                      ) : (
                        <>
                          RM
                          <NumberFormat value={currentBodyMake?.price} displayType={'text'} thousandSeparator={true} />
                        </>
                      )}
                    </div>
                  </div>
                )}
              </Card>
            ) : (
              <Card className="sales__selectarea-card" size="small" title="Selected model">
                <div className="sales__selectarea-card-row">
                  <div className="sales__selectarea-card-row-left">None</div>
                </div>
              </Card>
            )}
          </div>

          {/* Selections on the right */}
          <div className="sales__section-right">
            <div className="sales__selectarea-desc">
              This page is to choose your preferred whip.
              <br />
              Choose your trusted or preferred brand, HINO is cool.
            </div>
            <div className="sales__selectarea-innerdiv">
              <div className="sales__selectarea-selecttext">Select the model of your vehicle</div>
              <>
                {bodyMakesArray && (
                  <>
                    {bodyMakesArray.map((bodyMake) => {
                      return (
                        <div className="sales__selectarea--brand" key={uuidv4()}>
                          <div>
                            <Divider
                              orientation="left"
                              className="sales__selectarea-categorydivider sales__selectarea-categorydivider--brand"
                            >
                              {/* The title of the brand */}
                              {bodyMake.brand.title}
                            </Divider>
                          </div>
                          {/* Groups of different series  */}
                          {bodyMake.series &&
                            bodyMake.series.map((series) => {
                              return (
                                <React.Fragment key={uuidv4()}>
                                  <div className="sales__selectarea-seriestitle">{series.title}</div>

                                  <div className="sales__selectarea-div sales__selectarea-div--twocolumn">
                                    {/* loop the makes array */}
                                    {series.body_makes.map((body_make) => {
                                      return (
                                        <div
                                          key={uuidv4()}
                                          className={`sales__selectarea-button                                            
                                         ${currentBodyMake?.make.id === body_make.make.id ? 'active' : ''}`}
                                          onClick={() => {
                                            //  if currentBodyMake contains an id
                                            if (currentBodyMake?.make.id === body_make.make.id) {
                                              // reset the selection
                                              setCurrentBodyMake(null); //set content to null
                                              setCurrentOrderObj({
                                                ...currentOrderObj,
                                                bodyMakeObj: null,
                                              });
                                            } else {
                                              setCurrentBodyMake(body_make); //select the content of the preview card
                                              setCurrentOrderObj({
                                                ...currentOrderObj,
                                                bodyMakeObj: body_make,
                                              });
                                            }
                                          }}
                                        >
                                          <div>{body_make.make.title}</div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </React.Fragment>
                              );
                            })}
                        </div>
                      );
                    })}
                  </>
                )}
              </>
            </div>

            <div className="sales__btn-div">
              <Button
                className="sales__btn margin_r-1"
                onClick={() => {
                  setCurrentStep(currentStep - 1);
                  setCurrentBodyMake(null);
                }}
              >
                Back
              </Button>
              {currentStep < totalSteps - 1 && (
                <Button
                  type="primary"
                  loading={loading}
                  disabled={currentBodyMake === null ? true : false}
                  onClick={() => {
                    // Then call the body lengths API
                    if (currentBodyMake === null) return;
                    if (currentBodyMake) {
                      onGetSalesAccessories(currentBodyMake.id);
                    }
                  }}
                  className="sales__btn"
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
export default BodyMakeSection;
