import React from 'react';
import './CatalogBodyMake.scss';
/*Components*/
/*3rd party lib*/
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
/* Util */
import { RootState } from 'src';
import * as actions from 'src/store/actions/index';

interface CatalogBodyMakeProps {}

type Props = CatalogBodyMakeProps & StateProps & DispatchProps;

const CatalogBodyMake: React.FC<Props> = () => {
  /* ================================================== */
  /*  state */
  /* ================================================== */
  /* ================================================== */
  /*  method */
  /* ================================================== */
  /* ================================================== */
  /*  useEffect */
  /* ================================================== */
  /* ================================================== */
  /* ================================================== */
  return <></>;
};

interface StateProps {
  catalogBodyMakesArray: any;
}
const mapStateToProps = (state: RootState): StateProps | void => {
  return {
    catalogBodyMakesArray: state.catalog.catalogBodyMakesArray,
  };
};

interface DispatchProps {
  onGetCatalogBodyMakes: typeof actions.getCatalogBodyMakes;
}
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => {
  return {
    onGetCatalogBodyMakes: (make_id) => dispatch(actions.getCatalogBodyMakes(make_id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CatalogBodyMake);
