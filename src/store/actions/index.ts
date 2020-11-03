// export all the actions
export {
  // Clear all sales state
  clearSalesState,
  /* =================== */
  //   Brand
  /* =================== */
  // Get brands
  getBrands,
  getBrandsStart,
  getBrandsSucceed,
  getBrandsFailed,
  // Create brand
  createBrand,
  createBrandStart,
  createBrandFailed,
  createBrandSucceed,
  /* =================== */
  //   Wheelbase
  /* =================== */
  // Create Wheelbase
  createWheelbase,
  createWheelbaseStart,
  createWheelbaseFailed,
  createWheelbaseSucceed,
  // Get Wheelbases
  getWheelbases,
  getWheelbasesStart,
  getWheelbasesFailed,
  getWheelbasesSucceed,
  /* =================== */
  //   Make
  /* =================== */
  // Create Make
  createMake,
  createMakeStart,
  createMakeFailed,
  createMakeSucceed,
} from './sales';
