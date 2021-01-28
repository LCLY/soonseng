import { Input } from 'antd';
import React, { MutableRefObject, useEffect, useRef } from 'react';
import './CatalogFilter.scss';
/* components */
/* 3rd party lib */
/* Util */
interface CatalogFilterProps {
  showSearch: boolean;
  setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
  filterString: string;
  setFilterString: React.Dispatch<React.SetStateAction<string>>;
}

type Props = CatalogFilterProps;

function useOutsideAlerter(wrapperRef: any, dropdownRef: any, setShowPopUp: any, setShowSearch: any) {
  useEffect(() => {
    /**
     * Hide pop up if clicked on outside of element
     */
    function handleClickOutside(event: any) {
      if (
        wrapperRef.current &&
        dropdownRef.current &&
        !wrapperRef.current.contains(event.target) &&
        !dropdownRef.current.contains(event.target)
      ) {
        setShowPopUp(false);
        setShowSearch(false);
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef, dropdownRef, setShowPopUp, setShowSearch]);
}

const CatalogFilter: React.FC<Props> = ({ showSearch, filterString, setFilterString, setShowSearch }) => {
  /* ================================================== */
  /*  state */
  /* ================================================== */
  // need to refer to both the pop up and also the dropdown button itself
  const wrapperRef = useRef(null);
  const dropdownRef = useRef(null);
  const searchInputRef = useRef() as MutableRefObject<any>;
  /* ================================================== */
  /*  method */
  /* ================================================== */

  /* -------------------------- */
  // animation
  /* -------------------------- */
  const showSearchbar = () => {
    gsap.to('.catalog__search-input-outerdiv', { top: '30%', zIndex: 100, opacity: 1, duration: 0.5 });
    setTimeout(() => {
      if (searchInputRef && searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, 700);
  };
  const hideSearchbar = () => {
    gsap.to('.catalog__search-input-outerdiv', { top: '60%', zIndex: 0, opacity: 0, duration: 0.5 });
    setTimeout(() => {
      if (searchInputRef && searchInputRef.current) {
        searchInputRef.current.blur();
      }
    }, 700);
  };

  useOutsideAlerter(wrapperRef, dropdownRef, hideSearchbar, setShowSearch);

  const handleEsc = (e: any) => {
    // key Esc
    if (e.keyCode === 27) {
      hideSearchbar();
      setShowSearch(false);
      setFilterString('');
    }

    // key F
    if (e.keyCode === 70) {
      showSearchbar();
      setShowSearch(true);
    }
  };

  /* ================================================== */
  /*  useEffect */
  /* ================================================== */

  useEffect(() => {
    document.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  });

  /* ================================================== */
  /* ================================================== */
  return (
    <>
      <div className="catalog__search-btn-outerdiv">
        <div
          className="catalog__search-btn"
          onClick={() => {
            if (showSearch) {
              hideSearchbar();
              setShowSearch(false);
            } else {
              showSearchbar();
              setShowSearch(true);
            }
          }}
        >
          {showSearch ? (
            <i className="fas fa-times catalog__search-btn-icon"></i>
          ) : (
            <i className="fas fa-filter catalog__search-btn-icon"></i>
          )}
          <span className="catalog__search-btn-text">{showSearch ? 'Close Filter' : 'Filter Model'}</span>
        </div>
      </div>
      {/* The floating search input div */}
      <div className="catalog__search-input-outerdiv" ref={wrapperRef}>
        <div className="catalog__search-input-div" id="catalog__search-input-div" ref={dropdownRef}>
          <div
            className="catalog__search-input-div-close"
            onClick={() => {
              setShowSearch(false);
              hideSearchbar();
            }}
          >
            Close&nbsp;<i className="far fa-times-circle"></i>
          </div>
          <Input
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                hideSearchbar();
                setShowSearch(false);
              }
            }}
            autoFocus
            allowClear
            ref={searchInputRef}
            className="catalog__search-input"
            value={filterString}
            placeholder="&#xF002;   Search model"
            onChange={(event) => setFilterString(event.target.value)}
            style={{ width: 200, fontFamily: ' FontAwesome, Arial', fontStyle: 'normal' }}
          />
          <div className="catalog__search-input-text">
            Press Enter to confirm filter, press ESC to quick clear filter.
          </div>
        </div>
      </div>
    </>
  );
};

export default CatalogFilter;
