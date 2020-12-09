import React, { useState } from 'react';
/*components*/
import LightboxComponent from 'src/components/ImageRelated/LightboxComponent/LightboxComponent';
/*3rd party lib*/
import { v4 as uuidv4 } from 'uuid';
import { Breadcrumb, Button, Card, Divider, Empty, Skeleton } from 'antd';
import { LazyLoadImage } from 'react-lazy-load-image-component';
/* Util */
import { AppActions } from 'src/store/types';
import { TReceivedBodyObj } from 'src/store/types/dashboard';
import { img_loading_link, img_not_available_link } from 'src/shared/global';
import { TLocalOrderObj, TReceivedSalesLengthCategoryObj, TReceivedSalesLengthObj } from 'src/store/types/sales';

interface BodySectionProps {
  loading?: boolean;
  totalSteps: number;
  auth_token?: string | null;
  bodiesArray?: TReceivedBodyObj[] | null;
  currentStep: number; //for steps component
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  currentTyre: number | null; //current picked tire count
  setCurrentTyre: React.Dispatch<React.SetStateAction<number | null>>; //the setstateaction of currentTyre
  currentLength: TReceivedSalesLengthObj | null;
  setCurrentLength: React.Dispatch<React.SetStateAction<TReceivedSalesLengthObj | null>>;
  currentBody: TReceivedBodyObj | null;
  setCurrentBody: React.Dispatch<React.SetStateAction<TReceivedBodyObj | null>>;
  currentOrderObj: TLocalOrderObj; //to keep track of the current order
  setCurrentOrderObj: React.Dispatch<React.SetStateAction<TLocalOrderObj>>;
  lengthsCategoriesArray?: TReceivedSalesLengthCategoryObj[] | null;
  onGetSalesBodyMakes: (length_id: number, tire: number, body_id: number, auth_token: string | null) => AppActions;
}

type Props = BodySectionProps;

const BodySection: React.FC<Props> = ({
  loading,
  auth_token,
  totalSteps,
  bodiesArray,
  currentTyre,
  currentLength,
  currentBody,
  setCurrentBody,
  currentStep,
  setCurrentStep,
  currentOrderObj,
  setCurrentOrderObj,
  onGetSalesBodyMakes,
}) => {
  /* ================================================== */
  /*  state */
  /* ================================================== */
  // To keep track which image is it in the lightbox
  const [bodyPhotoIndex, setBodyPhotoIndex] = useState(0);
  // whether the lightbox is opened
  const [bodyLightboxOpen, setBodyLightboxOpen] = useState(false);
  return (
    <>
      {/*  only show if length is selected */}
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
            <Breadcrumb.Item>
              <span className="sales__breadcrumb-text">Body</span>
              {currentBody && <span className="sales__breadcrumb-highlight">({currentBody?.title})</span>}
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <Divider className="sales__section-header-divider" orientation="left">
          <div className="sales__section-header">Body </div>
        </Divider>
        <section className="sales__section-innerdiv">
          {/* Description */}
          <div className="sales__section-left">
            {currentBody ? (
              <>
                {/* if there is no image then show image not available */}
                {currentBody.images.length > 0 ? (
                  <>
                    <div className="sales__lightbox-parent" onClick={() => setBodyLightboxOpen(true)}>
                      {/* Clickable image to show lightbox */}

                      <LazyLoadImage
                        className="sales__section-img"
                        src={currentBody.images[0].url}
                        alt={currentBody.images[0].filename}
                        placeholderSrc={img_loading_link}
                      />

                      <LightboxComponent
                        images={currentBody?.images}
                        photoIndex={bodyPhotoIndex}
                        isOpen={bodyLightboxOpen}
                        setPhotoIndex={setBodyPhotoIndex}
                        setIsOpen={setBodyLightboxOpen}
                      />
                      <div className="sales__lightbox-icon">
                        <i className="fas fa-expand"></i>
                      </div>
                    </div>
                  </>
                ) : (
                  <div>
                    <img className="sales__section-img" src={img_not_available_link} alt="no result" />
                    <div className="sales__section-img-unavailabletext"> No image is provided for this body</div>
                  </div>
                )}
              </>
            ) : (
              // if nothing has been picked yet then show this
              <>
                <div className="sales__section-preview">
                  <div className="sales__section-preview-innerdiv">
                    <div className="sales__section-img--illustratoricon-div">
                      <img
                        alt="material"
                        className="sales__section-img sales__section-img--illustratoricon"
                        src="data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjU2IDI1NiIgaGVpZ2h0PSI1MTIiIHZpZXdCb3g9IjAgMCAyNTYgMjU2IiB3aWR0aD0iNTEyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxnPjxnPjxnPjxnPjxwYXRoIGQ9Im0xMjggMTM4LjMzMS05My4zMzggMjguNjY5IDkzLjMzOCAyOC42NjktMzAtMjguNjY5eiIgZmlsbD0iI2E0ZDRhMCIvPjwvZz48Zz48cGF0aCBkPSJtMTI4IDEzOC4zMzEgMzAgMjguNjY5LTMwIDI4LjY2OSA5My4zMzgtMjguNjY5eiIgZmlsbD0iIzQxOWI0NiIvPjwvZz48Zz48cGF0aCBkPSJtMTI4IDEzOC4zMzEtMzAgMjguNjY5IDMwIDI4LjY2OSAzMC0yOC42Njl6IiBmaWxsPSIjNjViYzQ5Ii8+PC9nPjwvZz48Zz48Zz48cGF0aCBkPSJtMTI4IDE5OC42NjljLS4yOTcgMC0uNTk0LS4wNDQtLjg4MS0uMTMybC05My4zMzgtMjguNjY5Yy0xLjI2LS4zODctMi4xMTktMS41NS0yLjExOS0yLjg2OHMuODU5LTIuNDgxIDIuMTE5LTIuODY4bDkzLjMzOC0yOC42NjljLjU3NC0uMTc3IDEuMTg4LS4xNzcgMS43NjIgMGw5My4zMzggMjguNjY5YzEuMjYuMzg3IDIuMTE5IDEuNTUgMi4xMTkgMi44NjhzLS44NTkgMi40ODEtMi4xMTkgMi44NjhsLTkzLjMzOCAyOC42NjljLS4yODcuMDg4LS41ODQuMTMyLS44ODEuMTMyem0tODMuMTItMzEuNjY5IDgzLjEyIDI1LjUzMSA4My4xMi0yNS41MzEtODMuMTItMjUuNTMxeiIgZmlsbD0iIzFjMmQ2YiIvPjwvZz48L2c+PGc+PGc+PHBhdGggZD0ibTM0LjY2MiAxNjd2MTEuOTg2aC4wNDNsLS4wNDMuMDE0IDkzLjMzOCAyOC42NjktNDEuMjM3LTI0LjY2NnoiIGZpbGw9IiNhNGQ0YTAiLz48L2c+PGc+PHBhdGggZD0ibTIyMS4zMzggMTY3LTUyLjEwMSAxNi4wMDMtNDEuMjM3IDI0LjY2NiA5My4zMzgtMjguNjY5LS4wNDMtLjAxNGguMDQzeiIgZmlsbD0iIzQxOWI0NiIvPjwvZz48Zz48cGF0aCBkPSJtMTI4IDE5NS42NjktNDEuMjM3LTEyLjY2NiA0MS4yMzcgMjQuNjY2IDQxLjIzNy0yNC42NjZ6IiBmaWxsPSIjNjViYzQ5Ii8+PC9nPjwvZz48Zz48Zz48Zz48cGF0aCBkPSJtMTI4IDIxMC42NjljLS4yOTcgMC0uNTk0LS4wNDQtLjg4MS0uMTMybC05My4zMzgtMjguNjY5Yy0xLjI2LS4zODctMi4xMTktMS41NS0yLjExOS0yLjg2OCAwLS4wMDIgMC0uMDA0IDAtLjAwNnMwLS4wMDQgMC0uMDA3di0xMS45ODdjMC0uOTUyLjQ1MS0xLjg0NyAxLjIxNy0yLjQxMy43NjUtLjU2NiAxLjc1Mi0uNzM1IDIuNjY0LS40NTVsOTIuNDU3IDI4LjM5OSA5Mi40NTctMjguMzk5Yy45MS0uMjggMS44OTgtLjExMSAyLjY2NC40NTUuNzY2LjU2NSAxLjIxNyAxLjQ2MSAxLjIxNyAyLjQxM3YxMS45ODdjMCAuNzQ5LS4yNzQgMS40MzQtLjcyOSAxLjk1OS0uMzU2LjQyNC0uODMyLjc1LTEuMzkxLjkyMWwtOTMuMzM4IDI4LjY2OWMtLjI4Ni4wODktLjU4My4xMzMtLjg4LjEzM3ptLTkwLjMzOC0zMy44ODYgOTAuMzM4IDI3Ljc0OCA5MC4zMzgtMjcuNzQ4di01LjcyNGwtODkuNDU3IDI3LjQ3OGMtLjU3NC4xNzctMS4xODguMTc3LTEuNzYyIDBsLTg5LjQ1Ny0yNy40Nzh6IiBmaWxsPSIjMWMyZDZiIi8+PC9nPjwvZz48L2c+PC9nPjxnPjxnPjxnPjxwYXRoIGQ9Im0xMjggOTEuMzM1LTkzLjMzOCAyOC42NjkgOTMuMzM4IDI4LjY2OS0zMC0yOC42Njl6IiBmaWxsPSIjODlhYWRiIi8+PC9nPjxnPjxwYXRoIGQ9Im0xMjggOTEuMzM1IDMwIDI4LjY2OS0zMCAyOC42NjkgOTMuMzM4LTI4LjY2OXoiIGZpbGw9IiM0YjY3YjAiLz48L2c+PGc+PHBhdGggZD0ibTEyOCA5MS4zMzUtMzAgMjguNjY5IDMwIDI4LjY2OSAzMC0yOC42Njl6IiBmaWxsPSIjNjI4N2M1Ii8+PC9nPjwvZz48Zz48Zz48cGF0aCBkPSJtMTI4IDE1MS42NzNjLS4yOTcgMC0uNTk0LS4wNDQtLjg4MS0uMTMybC05My4zMzgtMjguNjY5Yy0xLjI2LS4zODctMi4xMTktMS41NS0yLjExOS0yLjg2OHMuODU5LTIuNDgxIDIuMTE5LTIuODY4bDkzLjMzOC0yOC42NjljLjU3NC0uMTc3IDEuMTg4LS4xNzcgMS43NjIgMGw5My4zMzggMjguNjY5YzEuMjYuMzg3IDIuMTE5IDEuNTUgMi4xMTkgMi44NjhzLS44NTkgMi40ODEtMi4xMTkgMi44NjhsLTkzLjMzOCAyOC42NjljLS4yODcuMDg4LS41ODQuMTMyLS44ODEuMTMyem0tODMuMTItMzEuNjY5IDgzLjEyIDI1LjUzMSA4My4xMi0yNS41MzEtODMuMTItMjUuNTMxeiIgZmlsbD0iIzFjMmQ2YiIvPjwvZz48L2c+PGc+PGc+PHBhdGggZD0ibTM0LjY2MiAxMjAuMDA0djExLjk4N2guMDQzbC0uMDQzLjAxMyA5My4zMzggMjguNjY5LTQxLjIzNy0yNC42NjZ6IiBmaWxsPSIjODlhYWRiIi8+PC9nPjxnPjxwYXRoIGQ9Im0yMjEuMzM4IDEyMC4wMDQtNTIuMTAxIDE2LjAwMy00MS4yMzcgMjQuNjY2IDkzLjMzOC0yOC42NjktLjA0My0uMDEzaC4wNDN6IiBmaWxsPSIjNGI2N2IwIi8+PC9nPjxnPjxwYXRoIGQ9Im0xMjggMTQ4LjY3My00MS4yMzctMTIuNjY2IDQxLjIzNyAyNC42NjYgNDEuMjM3LTI0LjY2NnoiIGZpbGw9IiM2Mjg3YzUiLz48L2c+PC9nPjxnPjxnPjxnPjxwYXRoIGQ9Im0xMjggMTYzLjY3M2MtLjI5NyAwLS41OTQtLjA0NC0uODgxLS4xMzJsLTkzLjMzOC0yOC42NjljLTEuMjYtLjM4Ny0yLjExOS0xLjU1LTIuMTE5LTIuODY4IDAtLjAwMiAwLS4wMDQgMC0uMDA2czAtLjAwNCAwLS4wMDd2LTExLjk4N2MwLS45NTIuNDUxLTEuODQ3IDEuMjE3LTIuNDEzLjc2NS0uNTY2IDEuNzUyLS43MzUgMi42NjQtLjQ1NWw5Mi40NTcgMjguMzk5IDkyLjQ1Ny0yOC4zOThjLjkxLS4yOCAxLjg5OC0uMTExIDIuNjY0LjQ1NS43NjYuNTY1IDEuMjE3IDEuNDYxIDEuMjE3IDIuNDEzdjExLjk4N2MwIC43NDktLjI3NCAxLjQzNC0uNzI5IDEuOTYtLjM1Ni40MjQtLjgzMi43NS0xLjM5MS45MjFsLTkzLjMzOCAyOC42NjljLS4yODYuMDg3LS41ODMuMTMxLS44OC4xMzF6bS05MC4zMzgtMzMuODg2IDkwLjMzOCAyNy43NDggOTAuMzM4LTI3Ljc0OHYtNS43MjRsLTg5LjQ1NyAyNy40NzdjLS41NzQuMTc3LTEuMTg4LjE3Ny0xLjc2MiAwbC04OS40NTctMjcuNDc3eiIgZmlsbD0iIzFjMmQ2YiIvPjwvZz48L2c+PC9nPjwvZz48Zz48Zz48Zz48cGF0aCBkPSJtMTI4IDQ4LjMzMS05My4zMzggMjguNjY5IDkzLjMzOCAyOC42NjktMzAtMjguNjY5eiIgZmlsbD0iI2VkZTQ5ZCIvPjwvZz48Zz48cGF0aCBkPSJtMTI4IDQ4LjMzMSAzMCAyOC42NjktMzAgMjguNjY5IDkzLjMzOC0yOC42Njl6IiBmaWxsPSIjZDNiYTJhIi8+PC9nPjxnPjxwYXRoIGQ9Im0xMjggNDguMzMxLTMwIDI4LjY2OSAzMCAyOC42NjkgMzAtMjguNjY5eiIgZmlsbD0iI2VlZTA0NSIvPjwvZz48L2c+PGc+PGc+PHBhdGggZD0ibTEyOCAxMDguNjY5Yy0uMjk3IDAtLjU5NC0uMDQ0LS44ODEtLjEzMmwtOTMuMzM4LTI4LjY2OWMtMS4yNi0uMzg3LTIuMTE5LTEuNTUtMi4xMTktMi44NjhzLjg1OS0yLjQ4MSAyLjExOS0yLjg2OGw5My4zMzgtMjguNjY5Yy41NzQtLjE3NyAxLjE4OC0uMTc3IDEuNzYyIDBsOTMuMzM4IDI4LjY2OWMxLjI2LjM4NyAyLjExOSAxLjU1IDIuMTE5IDIuODY4cy0uODU5IDIuNDgxLTIuMTE5IDIuODY4bC05My4zMzggMjguNjY5Yy0uMjg3LjA4OC0uNTg0LjEzMi0uODgxLjEzMnptLTgzLjEyLTMxLjY2OSA4My4xMiAyNS41MzEgODMuMTItMjUuNTMxLTgzLjEyLTI1LjUzMXoiIGZpbGw9IiMxYzJkNmIiLz48L2c+PC9nPjxnPjxnPjxwYXRoIGQ9Im0zNC42NjIgNzd2MTEuOTg3aC4wNDNsLS4wNDMuMDEzIDkzLjMzOCAyOC42NjktNDEuMjM3LTI0LjY2NnoiIGZpbGw9IiNlZjdmNzIiLz48L2c+PGc+PHBhdGggZD0ibTIyMS4zMzggNzctNTIuMTAxIDE2LjAwMy00MS4yMzcgMjQuNjY2IDkzLjMzOC0yOC42NjktLjA0My0uMDEzaC4wNDN6IiBmaWxsPSIjZTgzODNiIi8+PC9nPjxnPjxwYXRoIGQ9Im0xMjggMTA1LjY2OS00MS4yMzctMTIuNjY2IDQxLjIzNyAyNC42NjYgNDEuMjM3LTI0LjY2NnoiIGZpbGw9IiNlOTU5NDciLz48L2c+PC9nPjxnPjxnPjxnPjxwYXRoIGQ9Im0xMjggMTIwLjY2OWMtLjI5NyAwLS41OTQtLjA0NC0uODgxLS4xMzJsLTkzLjMzOC0yOC42NjljLTEuMjU0LS4zODUtMi4xMTItMS41NDEtMi4xMTktMi44NTMgMC0uMDA4IDAtLjAxNiAwLS4wMjMgMC0uMDAyIDAtLjAwNCAwLS4wMDV2LTExLjk4N2MwLS45NTIuNDUxLTEuODQ3IDEuMjE3LTIuNDEzLjc2NS0uNTY2IDEuNzUyLS43MzYgMi42NjQtLjQ1NWw5Mi40NTcgMjguMzk5IDkyLjQ1Ny0yOC4zOThjLjkxLS4yODEgMS44OTgtLjExMSAyLjY2NC40NTUuNzY2LjU2NSAxLjIxNyAxLjQ2MSAxLjIxNyAyLjQxM3YxMS45ODZjMCAuNzQ0LS4yNzEgMS40MjUtLjcxOSAxLjk0OS0uMzU3LjQzLS44MzcuNzYtMS40LjkzM2wtOTMuMzM4IDI4LjY2OWMtLjI4Ny4wODctLjU4NC4xMzEtLjg4MS4xMzF6bS05MC4zMzgtMzMuODg1IDkwLjMzOCAyNy43NDcgOTAuMzM4LTI3Ljc0OHYtNS43MjNsLTg5LjQ1NyAyNy40NzdjLS41NzQuMTc3LTEuMTg4LjE3Ny0xLjc2MiAwbC04OS40NTctMjcuNDc3eiIgZmlsbD0iIzFjMmQ2YiIvPjwvZz48L2c+PC9nPjxnPjxnPjxwYXRoIGQ9Im0zNC42NjEgODAuMDAxYy0xLjI4MyAwLTIuNDcxLS44My0yLjg2Ny0yLjEyLS40ODYtMS41ODQuNDAzLTMuMjYyIDEuOTg3LTMuNzQ5bDkzLjMzOC0yOC42NjljMS41ODEtLjQ4NyAzLjI2My40MDMgMy43NDkgMS45ODdzLS40MDMgMy4yNjItMS45ODcgMy43NDlsLTkzLjMzOCAyOC42NjljLS4yOTMuMDktLjU5LjEzMy0uODgyLjEzM3oiIGZpbGw9IiMxYzJkNmIiLz48L2c+PC9nPjxnPjxnPjxwYXRoIGQ9Im0xMjcuOTk5IDYyLjU1NWMtMS4yODMgMC0yLjQ3MS0uODMtMi44NjctMi4xMi0uNDg2LTEuNTg0LjQwMy0zLjI2MiAxLjk4Ny0zLjc0OWwxOC4yNy01LjYxMWMxLjU4Mi0uNDg2IDMuMjYzLjQwMiAzLjc0OSAxLjk4Ny40ODYgMS41ODQtLjQwMyAzLjI2Mi0xLjk4NyAzLjc0OWwtMTguMjcgNS42MTFjLS4yOTMuMDktLjU5LjEzMy0uODgyLjEzM3oiIGZpbGw9IiMxYzJkNmIiLz48L2c+PC9nPjxnPjxnPjxwYXRoIGQ9Im03OS45OTkgNzcuMjk5Yy0xLjI4MyAwLTIuNDcxLS44My0yLjg2Ny0yLjEyLS40ODYtMS41ODQuNDAzLTMuMjYyIDEuOTg3LTMuNzQ5bDI0LTcuMzcyYzEuNTgyLS40ODggMy4yNjMuNDAzIDMuNzQ5IDEuOTg3cy0uNDAzIDMuMjYyLTEuOTg3IDMuNzQ5bC0yNCA3LjM3MmMtLjI5My4wOS0uNTkuMTMzLS44ODIuMTMzeiIgZmlsbD0iIzFjMmQ2YiIvPjwvZz48L2c+PGc+PGc+PHBhdGggZD0ibTExNS45OTkgNzcuNDY0Yy0xLjI4MyAwLTIuNDcxLS44My0yLjg2Ny0yLjEyLS40ODYtMS41ODQuNDAzLTMuMjYyIDEuOTg3LTMuNzQ5bDE4LTUuNTI5YzEuNTgyLS40ODcgMy4yNjMuNDAzIDMuNzQ5IDEuOTg3cy0uNDAzIDMuMjYyLTEuOTg3IDMuNzQ5bC0xOCA1LjUyOWMtLjI5My4wOS0uNTkuMTMzLS44ODIuMTMzeiIgZmlsbD0iIzFjMmQ2YiIvPjwvZz48L2c+PGc+PGc+PHBhdGggZD0ibTcxLjA4NyA5MS4yNTljLTEuMjgzIDAtMi40NzEtLjgzLTIuODY3LTIuMTItLjQ4Ni0xLjU4NC40MDMtMy4yNjIgMS45ODctMy43NDlsMjguNDQ5LTguNzM4YzEuNTgtLjQ4NSAzLjI2My40MDIgMy43NDkgMS45ODcuNDg2IDEuNTg0LS40MDMgMy4yNjItMS45ODcgMy43NDlsLTI4LjQ0OSA4LjczOGMtLjI5My4wOS0uNTkuMTMzLS44ODIuMTMzeiIgZmlsbD0iIzFjMmQ2YiIvPjwvZz48L2c+PGc+PGc+PHBhdGggZD0ibTE1Ny45OTkgNzUuNzg3Yy0xLjI4MyAwLTIuNDcxLS44My0yLjg2Ny0yLjEyLS40ODYtMS41ODQuNDAzLTMuMjYyIDEuOTg3LTMuNzQ5bDI0Ljc0OS03LjYwMmMxLjU4Mi0uNDg4IDMuMjYzLjQwMyAzLjc0OSAxLjk4N3MtLjQwMyAzLjI2Mi0xLjk4NyAzLjc0OWwtMjQuNzQ5IDcuNjAyYy0uMjkzLjA5LS41OS4xMzMtLjg4Mi4xMzN6IiBmaWxsPSIjMWMyZDZiIi8+PC9nPjwvZz48Zz48Zz48cGF0aCBkPSJtMTQ2LjAwNiA5MC42OTRjLTEuMjgzIDAtMi40NzEtLjgzLTIuODY3LTIuMTItLjQ4Ni0xLjU4NC40MDMtMy4yNjIgMS45ODctMy43NDlsMTkuNjExLTYuMDIzYzEuNTgxLS40ODUgMy4yNjMuNDAyIDMuNzQ5IDEuOTg3LjQ4NiAxLjU4NC0uNDAzIDMuMjYyLTEuOTg3IDMuNzQ5bC0xOS42MTEgNi4wMjNjLS4yOTMuMDktLjU5LjEzMy0uODgyLjEzM3oiIGZpbGw9IiMxYzJkNmIiLz48L2c+PC9nPjxnPjxnPjxwYXRoIGQ9Im0xMDcuNzE4IDEwMi40NTRjLTEuMjgzIDAtMi40NzEtLjgzLTIuODY3LTIuMTItLjQ4Ni0xLjU4NC40MDMtMy4yNjIgMS45ODctMy43NDlsMjYuNDMxLTguMTE4YzEuNTgyLS40ODYgMy4yNjMuNDAzIDMuNzQ5IDEuOTg3cy0uNDAzIDMuMjYyLTEuOTg3IDMuNzQ5bC0yNi40MzEgOC4xMThjLS4yOTMuMDktLjU5LjEzMy0uODgyLjEzM3oiIGZpbGw9IiMxYzJkNmIiLz48L2c+PC9nPjwvZz48L2c+PC9zdmc+"
                      />
                    </div>
                    <div className="sales__section-img--illustratoricon-text">Materials</div>
                  </div>
                </div>
              </>
            )}

            {/* Card Details */}
            {currentBody && currentLength ? (
              <Card className="sales__selectarea-card" size="small" title="Selected body type">
                <div className="sales__selectarea-card-row">
                  <div className="sales__selectarea-card-row-left">Title</div>
                  <div className="sales__selectarea-card-row-right sales__selectarea-card-row-right-title">
                    {currentBody?.title}
                  </div>
                </div>
                <div className="sales__selectarea-card-row">
                  <div className="sales__selectarea-card-row-left">Description</div>
                  <div className="sales__selectarea-card-row-right">
                    {`${currentLength.title}ft${
                      currentBody.description === null || currentBody.description === ''
                        ? ''
                        : `, ${currentBody.description}`
                    }`}
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="sales__selectarea-card" size="small" title="Selected body type">
                None
              </Card>
            )}
          </div>

          {/* Selections on the right */}
          <div className="sales__section-right">
            <div className="sales__selectarea-desc">
              Decide on the type of the cargo body, material decides the capabilities of the vehicle.
              <br />
              There are a few of main body types in the market.
            </div>
            <div className="sales__selectarea-innerdiv">
              <div className="sales__selectarea-selecttext">Select the material type of the cargo body</div>

              {bodiesArray ? (
                <>
                  {bodiesArray.length > 0 ? (
                    <div className="sales__selectarea-div sales__selectarea-div--twocolumn">
                      <>
                        {bodiesArray
                          .sort((a: TReceivedBodyObj, b: TReceivedBodyObj) => a.title.localeCompare(b.title))
                          .map((body) => {
                            return (
                              <div
                                key={uuidv4()}
                                className={`sales__selectarea-button  ${currentBody?.id === body.id ? 'active' : ''}`}
                                onClick={() => {
                                  //  if currentLength has an id
                                  if (currentBody?.id === body.id) {
                                    // reset the selection
                                    setCurrentBody(null);
                                    setCurrentOrderObj({ ...currentOrderObj, bodyObj: null });
                                  } else {
                                    setCurrentBody(body);
                                    setCurrentOrderObj({
                                      ...currentOrderObj,
                                      bodyObj: body,
                                    });
                                  }
                                }}
                              >
                                {body.title}
                              </div>
                            );
                          })}
                      </>
                    </div>
                  ) : (
                    <Empty />
                  )}
                </>
              ) : (
                <div className="sales__selectarea-button margin_t-4 margin_b-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <Skeleton.Button className="sales__skeleton" key={num + uuidv4()} active={true} size="large" />
                  ))}
                </div>
              )}
            </div>
            <div className="sales__btn-div">
              <Button
                className="sales__btn margin_r-1"
                onClick={() => {
                  setCurrentStep(currentStep - 1);
                  setCurrentBody(null);
                }}
              >
                Back
              </Button>
              {currentStep < totalSteps - 1 && (
                <Button
                  type="primary"
                  onClick={() => {
                    // Then call the body lengths API
                    if (
                      currentBody === null ||
                      currentLength === null ||
                      currentTyre === null ||
                      auth_token === undefined
                    )
                      return;
                    onGetSalesBodyMakes(currentLength.id, currentTyre, currentBody.id, auth_token);
                  }}
                  className="sales__btn"
                  loading={loading}
                  disabled={currentBody === null ? true : false}
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
export default BodySection;
