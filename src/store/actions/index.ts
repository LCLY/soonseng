// export all the actions
export {
  // clear state
  clearAuthState,
  // assign access
  assignAccess,
  // sign in
  signIn,
  signInStart,
  signInSucceed,
  signInFailed,
  // signout
  signOut,
  // get user info
  getUserInfo,
  getUserInfoFailed,
  getUserInfoStart,
  getUserInfoSucceed,
} from './auth';

export {
  // Clear all dashboard state
  clearDashboardState,
  /* =================== */
  //   Image(s)
  /* =================== */
  // Upload
  uploadImage,
  uploadImageStart,
  uploadImageFailed,
  uploadImageSucceed,
  // Delete
  deleteUploadImage,
  deleteUploadImageStart,
  deleteUploadImageFailed,
  deleteUploadImageSucceed,
  /* --------------------------------------- */
  /* =================== */
  //  Brand (Make Page)
  /* =================== */
  // Create brand
  createBrand,
  createBrandStart,
  createBrandFailed,
  createBrandSucceed,
  // Get brands
  getBrands,
  getBrandsStart,
  getBrandsSucceed,
  getBrandsFailed,
  // Update brand
  updateBrand,
  updateBrandStart,
  updateBrandSucceed,
  updateBrandFailed,
  /* =================== */
  // Wheelbase (Make Page)
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
  // Get Wheelbases
  updateWheelbase,
  updateWheelbaseStart,
  updateWheelbaseFailed,
  updateWheelbaseSucceed,
  /* =================== */
  //  Make (Make Page)
  /* =================== */
  // Create Make
  createMake,
  createMakeStart,
  createMakeFailed,
  createMakeSucceed,
  // Get Make
  getMakes,
  getMakesStart,
  getMakesFailed,
  getMakesSucceed,
  // Get Series
  getSeries,
  getSeriesStart,
  getSeriesFailed,
  getSeriesSucceed,
  // Update Make
  updateMake,
  updateMakeStart,
  updateMakeFailed,
  updateMakeSucceed,
  /* --------------------------------------- */
  /* =================== */
  // Body (Body Page)
  /* =================== */
  // Create Body
  createBody,
  createBodyStart,
  createBodyFailed,
  createBodySucceed,
  // Get Bodies
  getBodies,
  getBodiesStart,
  getBodiesFailed,
  getBodiesSucceed,
  // Update Body
  updateBody,
  updateBodyStart,
  updateBodyFailed,
  updateBodySucceed,
  // Delete Body
  deleteBody,
  deleteBodyStart,
  deleteBodyFailed,
  deleteBodySucceed,
  /* =================== */
  // Length (Body Page)
  /* =================== */
  // Create Length
  createLength,
  createLengthStart,
  createLengthFailed,
  createLengthSucceed,
  // Get Lengths
  getLengths,
  getLengthsStart,
  getLengthsFailed,
  getLengthsSucceed,
  // Update Length
  updateLength,
  updateLengthStart,
  updateLengthFailed,
  updateLengthSucceed,
  // Delete Length
  deleteLength,
  deleteLengthStart,
  deleteLengthFailed,
  deleteLengthSucceed,
  /* =================== */
  //  Body Make (Body Page)
  /* =================== */
  // Create Body Make
  createBodyMake,
  createBodyMakeStart,
  createBodyMakeFailed,
  createBodyMakeSucceed,
  // Get Body Makes
  getBodyMakes,
  getBodyMakesStart,
  getBodyMakesFailed,
  getBodyMakesSucceed,
  // Update Body Make
  updateBodyMake,
  updateBodyMakeStart,
  updateBodyMakeFailed,
  updateBodyMakeSucceed,
  // Delete Body Make
  deleteBodyMake,
  deleteBodyMakeStart,
  deleteBodyMakeFailed,
  deleteBodyMakeSucceed,
  /* =================== */
  //  Body Accessory (Body Page)
  /* =================== */
  // Create Body Accessory
  createBodyAccessory,
  createBodyAccessoryStart,
  createBodyAccessoryFailed,
  createBodyAccessorySucceed,
  // Get Body Accessories
  getBodyAccessories,
  getBodyAccessoriesStart,
  getBodyAccessoriesFailed,
  getBodyAccessoriesSucceed,
  // Update Body Accessory
  updateBodyAccessory,
  updateBodyAccessoryStart,
  updateBodyAccessoryFailed,
  updateBodyAccessorySucceed,
  // Delete Body Accessory
  deleteBodyAccessory,
  deleteBodyAccessoryStart,
  deleteBodyAccessoryFailed,
  deleteBodyAccessorySucceed,
  // Clear Body Accessory Array
  clearBodyAccessoryArray,
  // Get Body associated Accessories
  getBodyAssociatedAccessories,
  getBodyAssociatedAccessoriesStart,
  getBodyAssociatedAccessoriesSucceed,
  getBodyAssociatedAccessoriesFailed,
  // Clear body associated accessories
  clearBodyAssociatedAccessoriesArray,
  /* ------------------------------------- */
  /* =================== */
  //  Accessory (Accessory Page)
  /* =================== */
  // Create Accessory
  createAccessory,
  createAccessoryStart,
  createAccessoryFailed,
  createAccessorySucceed,
  // Get Accessories
  getAccessories,
  getAccessoriesStart,
  getAccessoriesFailed,
  getAccessoriesSucceed,
  // Update Accessory
  updateAccessory,
  updateAccessoryStart,
  updateAccessoryFailed,
  updateAccessorySucceed,
} from './dashboard';

export {
  // clear sales state
  clearSalesState,
  // Store local orders
  storeLocalOrders,
  // Remove a local
  removeAnOrder,
  // get sales lengths
  getSalesLengths,
  getSalesLengthsStart,
  getSalesLengthsSucceed,
  getSalesLengthsFailed,
  // get sales bodies
  getSalesBodies,
  getSalesBodiesFailed,
  getSalesBodiesStart,
  getSalesBodiesSucceed,
  // get sales body makes
  getSalesBodyMakes,
  getSalesBodyMakesFailed,
  getSalesBodyMakesStart,
  getSalesBodyMakesSucceed,
  // get sales Body accessories
  getSalesAccessories,
  getSalesAccessoriesFailed,
  getSalesAccessoriesStart,
  getSalesAccessoriesSucceed,
  // get sales makes
  getSalesMakes,
  getSalesMakesFailed,
  getSalesMakesStart,
  getSalesMakesSucceed,
} from './sales';
