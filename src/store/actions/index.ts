// export all the actions
export { saveProjectVersion, clearLocalStorage } from './general';

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
  // Clear catalog state
  clearCatalogState,
  // Catalog Make
  getCatalogMakes,
  getCatalogMakesFailed,
  getCatalogMakesStart,
  getCatalogMakesSucceed,
  // Catalog Body Make
  getCatalogBodyMakes,
  getCatalogBodyMakesFailed,
  getCatalogBodyMakesStart,
  getCatalogBodyMakesSucceed,
} from './catalog';

export {
  /* =========================================== */
  // Miscellaneous
  /* =========================================== */
  // Clear all dashboard state
  clearDashboardState,
  // Upload Image(s)
  uploadImage,
  uploadImageStart,
  uploadImageFailed,
  uploadImageSucceed,
  // Delete Image(s)
  deleteUploadImage,
  deleteUploadImageStart,
  deleteUploadImageFailed,
  deleteUploadImageSucceed,
  /* =========================================== */
  //  Brand (Make Page)
  /* =========================================== */
  createBrand,
  createBrandStart,
  createBrandFailed,
  createBrandSucceed,
  getBrands,
  getBrandsStart,
  getBrandsSucceed,
  getBrandsFailed,
  updateBrand,
  updateBrandStart,
  updateBrandSucceed,
  updateBrandFailed,
  deleteBrand,
  deleteBrandStart,
  deleteBrandSucceed,
  deleteBrandFailed,
  /* =========================================== */
  // Wheelbase (Make Page)
  /* =========================================== */
  createWheelbase,
  createWheelbaseStart,
  createWheelbaseFailed,
  createWheelbaseSucceed,
  getWheelbases,
  getWheelbasesStart,
  getWheelbasesFailed,
  getWheelbasesSucceed,
  updateWheelbase,
  updateWheelbaseStart,
  updateWheelbaseFailed,
  updateWheelbaseSucceed,
  /* =========================================== */
  //  Make (Make Page)
  /* =========================================== */
  createMake,
  createMakeStart,
  createMakeFailed,
  createMakeSucceed,
  getMakes,
  getMakesStart,
  getMakesFailed,
  getMakesSucceed,
  updateMake,
  updateMakeStart,
  updateMakeFailed,
  updateMakeSucceed,
  /* =========================================== */
  // Series (Make Page)
  /* =========================================== */
  getSeries,
  getSeriesStart,
  getSeriesFailed,
  getSeriesSucceed,
  /* =========================================== */
  //  MakeWheelbase (Make Page)
  /* =========================================== */
  createMakeWheelbase,
  createMakeWheelbaseStart,
  createMakeWheelbaseFailed,
  createMakeWheelbaseSucceed,
  getMakeWheelbases,
  getMakeWheelbasesStart,
  getMakeWheelbasesFailed,
  getMakeWheelbasesSucceed,
  updateMakeWheelbase,
  updateMakeWheelbaseStart,
  updateMakeWheelbaseFailed,
  updateMakeWheelbaseSucceed,
  deleteMakeWheelbase,
  deleteMakeWheelbaseStart,
  deleteMakeWheelbaseFailed,
  deleteMakeWheelbaseSucceed,
  /* =========================================== */
  // Body (Body Page)
  /* =========================================== */
  createBody,
  createBodyStart,
  createBodyFailed,
  createBodySucceed,
  getBodies,
  getBodiesStart,
  getBodiesFailed,
  getBodiesSucceed,
  updateBody,
  updateBodyStart,
  updateBodyFailed,
  updateBodySucceed,
  deleteBody,
  deleteBodyStart,
  deleteBodyFailed,
  deleteBodySucceed,
  /* =========================================== */
  // Length (Body Page)
  /* =========================================== */
  createLength,
  createLengthStart,
  createLengthFailed,
  createLengthSucceed,
  getLengths,
  getLengthsStart,
  getLengthsFailed,
  getLengthsSucceed,
  updateLength,
  updateLengthStart,
  updateLengthFailed,
  updateLengthSucceed,
  deleteLength,
  deleteLengthStart,
  deleteLengthFailed,
  deleteLengthSucceed,
  /* =========================================== */
  //  Body Make (Body Page)
  /* =========================================== */
  createBodyMake,
  createBodyMakeStart,
  createBodyMakeFailed,
  createBodyMakeSucceed,
  getBodyMakes,
  getBodyMakesStart,
  getBodyMakesFailed,
  getBodyMakesSucceed,
  updateBodyMake,
  updateBodyMakeStart,
  updateBodyMakeFailed,
  updateBodyMakeSucceed,
  deleteBodyMake,
  deleteBodyMakeStart,
  deleteBodyMakeFailed,
  deleteBodyMakeSucceed,
  /* =========================================== */
  //  Body Accessory (Body Page)
  /* =========================================== */
  createBodyAccessory,
  createBodyAccessoryStart,
  createBodyAccessoryFailed,
  createBodyAccessorySucceed,
  getBodyAccessories,
  getBodyAccessoriesStart,
  getBodyAccessoriesFailed,
  getBodyAccessoriesSucceed,
  updateBodyAccessory,
  updateBodyAccessoryStart,
  updateBodyAccessoryFailed,
  updateBodyAccessorySucceed,
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
  // Get Dimension associated Accessories
  getDimensionAssociatedAccessories,
  getDimensionAssociatedAccessoriesStart,
  getDimensionAssociatedAccessoriesSucceed,
  getDimensionAssociatedAccessoriesFailed,
  /* =========================================== */
  //  Accessory (Accessory Page)
  /* =========================================== */
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
  /* =========================================== */
  //  Body Make Accessory (Body make Page)
  /* =========================================== */
  createBodyMakeAccessory,
  createBodyMakeAccessoryStart,
  createBodyMakeAccessoryFailed,
  createBodyMakeAccessorySucceed,
  getBodyMakeAccessories,
  getBodyMakeAccessoriesStart,
  getBodyMakeAccessoriesFailed,
  getBodyMakeAccessoriesSucceed,
  updateBodyMakeAccessory,
  updateBodyMakeAccessoryStart,
  updateBodyMakeAccessoryFailed,
  updateBodyMakeAccessorySucceed,
  deleteBodyMakeAccessory,
  deleteBodyMakeAccessoryStart,
  deleteBodyMakeAccessoryFailed,
  deleteBodyMakeAccessorySucceed,
} from './dashboard/index';

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
