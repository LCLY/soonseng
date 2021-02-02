// to ignore this whole file for typedoc
// The name of action types
/* ================================================================================== */
/*                                      General                                       */
/* ================================================================================== */
export const SAVE_PROJECT_VERSION = 'SAVE_PROJECT_VERSION';
export const CLEAR_LOCALSTORAGE = 'CLEAR_LOCALSTORAGE';
export const SET_QUOTATION_DISCOUNT = 'SET_QUOTATION_DISCOUNT';

/* ================================================================================== */
/*                                  Authentication                                    */
/* ================================================================================== */
// Clear Auth State
export const CLEAR_AUTH_STATE = 'CLEAR_AUTH_STATE';

// Sign in
export const SIGN_IN = 'SIGN_IN';
export const SIGN_IN_START = 'SIGN_IN_START';
export const SIGN_IN_SUCCEED = 'SIGN_IN_SUCCEED';
export const SIGN_IN_FAILED = 'SIGN_IN_FAILED';

// Sign out
export const SIGN_OUT = 'SIGN_OUT';

// Get user info
export const GET_USER_INFO = 'GET_USER_INFO';
export const GET_USER_INFO_START = 'GET_USER_INFO_START';
export const GET_USER_INFO_SUCCEED = 'GET_USER_INFO_SUCCEED';
export const GET_USER_INFO_FAILED = 'GET_USER_INFO_FAILED';

// Assign Access
export const ASSIGN_ACCESS = 'ASSIGN_ACCESS';

/* ================================================================================== */
/*                                     Catalog                                        */
/* ================================================================================== */

// Clear catalog state
export const CLEAR_CATALOG_STATE = 'CLEAR_CATALOG_STATE';
// Get catalog make
export const GET_CATALOG_MAKES = 'GET_CATALOG_MAKES';
export const GET_CATALOG_MAKES_START = 'GET_CATALOG_MAKES_START';
export const GET_CATALOG_MAKES_SUCCEED = 'GET_CATALOG_MAKES_SUCCEED';
export const GET_CATALOG_MAKES_FAILED = 'GET_CATALOG_MAKES_FAILED';

// Get catalog body make
export const GET_CATALOG_BODYMAKES = 'GET_CATALOG_BODYMAKES';
export const GET_CATALOG_BODYMAKES_START = 'GET_CATALOG_BODYMAKES_START';
export const GET_CATALOG_BODYMAKES_SUCCEED = 'GET_CATALOG_BODYMAKES_SUCCEED';
export const GET_CATALOG_BODYMAKES_FAILED = 'GET_CATALOG_BODYMAKES_FAILED';

// Set Accessory Type for the accessory form, general,body and dimension
export const SET_ACCESSORY_TYPE = 'SET_ACCESSORY_TYPE';

/* ================================================================================== */
/*                                       Sales                                        */
/* ================================================================================== */
// Clear Sales State
export const CLEAR_SALES_STATE = 'CLEAR_SALES_STATE';

export const STORE_LOCAL_ORDERS = 'STORE_LOCAL_ORDERS';
export const REMOVE_AN_ORDER = 'REMOVE_AN_ORDER';

// Get Lengths in sales page
export const GET_SALES_LENGTHS = 'GET_SALES_LENGTHS';
export const GET_SALES_LENGTHS_START = 'GET_SALES_LENGTHS_START';
export const GET_SALES_LENGTHS_SUCCEED = 'GET_SALES_LENGTHS_SUCCEED';
export const GET_SALES_LENGTHS_FAILED = 'GET_SALES_LENGTHS_FAILED';

// Get Body Types in sales page
export const GET_SALES_BODIES = 'GET_SALES_BODIES';
export const GET_SALES_BODIES_START = 'GET_SALES_BODIES_START';
export const GET_SALES_BODIES_SUCCEED = 'GET_SALES_BODIES_SUCCEED';
export const GET_SALES_BODIES_FAILED = 'GET_SALES_BODIES_FAILED';

// Get Body Makes in sales page
export const GET_SALES_BODYMAKES = 'GET_SALES_BODYMAKES';
export const GET_SALES_BODYMAKES_START = 'GET_SALES_BODYMAKES_START';
export const GET_SALES_BODYMAKES_SUCCEED = 'GET_SALES_BODYMAKES_SUCCEED';
export const GET_SALES_BODYMAKES_FAILED = 'GET_SALES_BODYMAKES_FAILED';

// Get accessories through body length in sales page
export const GET_SALES_ACCESSORIES = 'GET_SALES_ACCESSORIES';
export const GET_SALES_ACCESSORIES_START = 'GET_SALES_ACCESSORIES_START';
export const GET_SALES_ACCESSORIES_SUCCEED = 'GET_SALES_ACCESSORIES_SUCCEED';
export const GET_SALES_ACCESSORIES_FAILED = 'GET_SALES_ACCESSORIES_FAILED';

// Get Makes through length and tyre count
export const GET_SALES_MAKES = 'GET_SALES_MAKES';
export const GET_SALES_MAKES_START = 'GET_SALES_MAKES_START';
export const GET_SALES_MAKES_SUCCEED = 'GET_SALES_MAKES_SUCCEED';
export const GET_SALES_MAKES_FAILED = 'GET_SALES_MAKES_FAILED';

/* ================================================================================== */
/*                                      Dashboard                                     */
/* ================================================================================== */
// Clear Dashboard state
export const CLEAR_DASHBOARD_STATE = 'CLEAR_DASHBOARD_STATE';

// Upload Image(s)
export const UPLOAD_IMAGE = 'UPLOAD_IMAGE';
export const UPLOAD_IMAGE_START = 'UPLOAD_IMAGE_START';
export const UPLOAD_IMAGE_SUCCEED = 'UPLOAD_IMAGE_SUCCEED';
export const UPLOAD_IMAGE_FAILED = 'UPLOAD_IMAGE_FAILED';

// Delete Uploaded Image(s)
export const DELETE_UPLOAD_IMAGE = 'DELETE_UPLOAD_IMAGE';
export const DELETE_UPLOAD_IMAGE_START = 'DELETE_UPLOAD_IMAGE_START';
export const DELETE_UPLOAD_IMAGE_SUCCEED = 'DELETE_UPLOAD_IMAGE_SUCCEED';
export const DELETE_UPLOAD_IMAGE_FAILED = 'DELETE_UPLOAD_IMAGE_FAILED';

/* ======================================================================================== */
/* --------------------------------------------- */
// Standard Charges and fees
/* --------------------------------------------- */
// Getting all Standard Charges and fees Fees
export const GET_CHARGES_FEES = 'GET_CHARGES_FEES';
export const GET_CHARGES_FEES_START = 'GET_CHARGES_FEES_START';
export const GET_CHARGES_FEES_SUCCEED = 'GET_CHARGES_FEES_SUCCEED';
export const GET_CHARGES_FEES_FAILED = 'GET_CHARGES_FEES_FAILED';
// Create Standard Charges and fees Fees
export const CREATE_CHARGES_FEES = 'CREATE_CHARGES_FEES';
export const CREATE_CHARGES_FEES_START = 'CREATE_CHARGES_FEES_START';
export const CREATE_CHARGES_FEES_SUCCEED = 'CREATE_CHARGES_FEES_SUCCEED';
export const CREATE_CHARGES_FEES_FAILED = 'CREATE_CHARGES_FEES_FAILED';
// Update Standard Charges and fees Fees
export const UPDATE_CHARGES_FEES = 'UPDATE_CHARGES_FEES';
export const UPDATE_CHARGES_FEES_START = 'UPDATE_CHARGES_FEES_START';
export const UPDATE_CHARGES_FEES_SUCCEED = 'UPDATE_CHARGES_FEES_SUCCEED';
export const UPDATE_CHARGES_FEES_FAILED = 'UPDATE_CHARGES_FEES_FAILED';
// Delete Standard Charges and fees Fees
export const DELETE_CHARGES_FEES = 'DELETE_CHARGES_FEES';
export const DELETE_CHARGES_FEES_START = 'DELETE_CHARGES_FEES_START';
export const DELETE_CHARGES_FEES_SUCCEED = 'DELETE_CHARGES_FEES_SUCCEED';
export const DELETE_CHARGES_FEES_FAILED = 'DELETE_CHARGES_FEES_FAILED';

/* ======================================================================================== */
/* --------------------------------------------- */
// Make Page - Brand
/* --------------------------------------------- */
// Getting all brands (head)
export const GET_BRANDS = 'GET_BRANDS';
export const GET_BRANDS_START = 'GET_BRANDS_START';
export const GET_BRANDS_SUCCEED = 'GET_BRANDS_SUCCEED';
export const GET_BRANDS_FAILED = 'GET_BRANDS_FAILED';

// Create brand (head)
export const CREATE_BRAND = 'CREATE_BRAND';
export const CREATE_BRAND_START = 'CREATE_BRAND_START';
export const CREATE_BRAND_SUCCEED = 'CREATE_BRAND_SUCCEED';
export const CREATE_BRAND_FAILED = 'CREATE_BRAND_FAILED';

// Update brand (head)
export const UPDATE_BRAND = 'UPDATE_BRAND';
export const UPDATE_BRAND_START = 'UPDATE_BRAND_START';
export const UPDATE_BRAND_SUCCEED = 'UPDATE_BRAND_SUCCEED';
export const UPDATE_BRAND_FAILED = 'UPDATE_BRAND_FAILED';

// Delete brand (head)
export const DELETE_BRAND = 'DELETE_BRAND';
export const DELETE_BRAND_START = 'DELETE_BRAND_START';
export const DELETE_BRAND_SUCCEED = 'DELETE_BRAND_SUCCEED';
export const DELETE_BRAND_FAILED = 'DELETE_BRAND_FAILED';
/* --------------------------------------------- */
// Make Page - Wheelbase
/* --------------------------------------------- */

// Get all wheelbases (head)
export const GET_WHEELBASES = 'GET_WHEELBASES';
export const GET_WHEELBASES_START = 'GET_WHEELBASES_START';
export const GET_WHEELBASES_SUCCEED = 'GET_WHEELBASES_SUCCEED';
export const GET_WHEELBASES_FAILED = 'GET_WHEELBASES_FAILED';

// Create Wheelbase (head)
export const CREATE_WHEELBASE = 'CREATE_WHEELBASE';
export const CREATE_WHEELBASE_START = 'CREATE_WHEELBASE_START';
export const CREATE_WHEELBASE_SUCCEED = 'CREATE_WHEELBASE_SUCCEED';
export const CREATE_WHEELBASE_FAILED = 'CREATE_WHEELBASE_FAILED';

// Update Wheelbase (head)
export const UPDATE_WHEELBASE = 'UPDATE_WHEELBASE';
export const UPDATE_WHEELBASE_START = 'UPDATE_WHEELBASE_START';
export const UPDATE_WHEELBASE_SUCCEED = 'UPDATE_WHEELBASE_SUCCEED';
export const UPDATE_WHEELBASE_FAILED = 'UPDATE_WHEELBASE_FAILED';

// Delete Wheelbase (head)
export const DELETE_WHEELBASE = 'DELETE_WHEELBASE';
export const DELETE_WHEELBASE_START = 'DELETE_WHEELBASE_START';
export const DELETE_WHEELBASE_SUCCEED = 'DELETE_WHEELBASE_SUCCEED';
export const DELETE_WHEELBASE_FAILED = 'DELETE_WHEELBASE_FAILED';

/* --------------------------------------------- */
// Make Page - Make / Model
/* --------------------------------------------- */

// Create Make (head)
export const CREATE_MAKE = 'CREATE_MAKE';
export const CREATE_MAKE_START = 'CREATE_MAKE_START';
export const CREATE_MAKE_SUCCEED = 'CREATE_MAKE_SUCCEED';
export const CREATE_MAKE_FAILED = 'CREATE_MAKE_FAILED';

// Get Make (head)
export const GET_MAKES = 'GET_MAKES';
export const GET_MAKES_START = 'GET_MAKES_START';
export const GET_MAKES_SUCCEED = 'GET_MAKES_SUCCEED';
export const GET_MAKES_FAILED = 'GET_MAKES_FAILED';

// Update Make (head)
export const UPDATE_MAKE = 'UPDATE_MAKE';
export const UPDATE_MAKE_START = 'UPDATE_MAKE_START';
export const UPDATE_MAKE_SUCCEED = 'UPDATE_MAKE_SUCCEED';
export const UPDATE_MAKE_FAILED = 'UPDATE_MAKE_FAILED';

// Delete Make (head)
export const DELETE_MAKE = 'DELETE_MAKE';
export const DELETE_MAKE_START = 'DELETE_MAKE_START';
export const DELETE_MAKE_SUCCEED = 'DELETE_MAKE_SUCCEED';
export const DELETE_MAKE_FAILED = 'DELETE_MAKE_FAILED';

/* -------------------------- */
// Get series for the dropdown
/* -------------------------- */
// Create Series
export const CREATE_SERIES = 'CREATE_SERIES';
export const CREATE_SERIES_START = 'CREATE_SERIES_START';
export const CREATE_SERIES_SUCCEED = 'CREATE_SERIES_SUCCEED';
export const CREATE_SERIES_FAILED = 'CREATE_SERIES_FAILED';
// Get Series
export const GET_SERIES = 'GET_SERIES';
export const GET_SERIES_START = 'GET_SERIES_START';
export const GET_SERIES_SUCCEED = 'GET_SERIES_SUCCEED';
export const GET_SERIES_FAILED = 'GET_SERIES_FAILED';
// Update Series
export const UPDATE_SERIES = 'UPDATE_SERIES';
export const UPDATE_SERIES_START = 'UPDATE_SERIES_START';
export const UPDATE_SERIES_SUCCEED = 'UPDATE_SERIES_SUCCEED';
export const UPDATE_SERIES_FAILED = 'UPDATE_SERIES_FAILED';
// Delete Series
export const DELETE_SERIES = 'DELETE_SERIES';
export const DELETE_SERIES_START = 'DELETE_SERIES_START';
export const DELETE_SERIES_SUCCEED = 'DELETE_SERIES_SUCCEED';
export const DELETE_SERIES_FAILED = 'DELETE_SERIES_FAILED';

/* -------------------------- */
//  Make Page - Make Wheelbase / Configuration
/* -------------------------- */
// Clear Make Wheelbase
export const CLEAR_MAKEWHEELBASE = 'CLEAR_MAKEWHEELBASE';
// Create Make Wheelbase(head)
export const CREATE_MAKEWHEELBASE = 'CREATE_MAKEWHEELBASE';
export const CREATE_MAKEWHEELBASE_START = 'CREATE_MAKEWHEELBASE_START';
export const CREATE_MAKEWHEELBASE_SUCCEED = 'CREATE_MAKEWHEELBASE_SUCCEED';
export const CREATE_MAKEWHEELBASE_FAILED = 'CREATE_MAKEWHEELBASE_FAILED';

// Get Make Wheelbase (head)
export const GET_MAKEWHEELBASES = 'GET_MAKEWHEELBASES';
export const GET_MAKEWHEELBASES_START = 'GET_MAKEWHEELBASES_START';
export const GET_MAKEWHEELBASES_SUCCEED = 'GET_MAKEWHEELBASES_SUCCEED';
export const GET_MAKEWHEELBASES_FAILED = 'GET_MAKEWHEELBASES_FAILED';

// Update Make Wheelbase (head)
export const UPDATE_MAKEWHEELBASE = 'UPDATE_MAKEWHEELBASE';
export const UPDATE_MAKEWHEELBASE_START = 'UPDATE_MAKEWHEELBASE_START';
export const UPDATE_MAKEWHEELBASE_SUCCEED = 'UPDATE_MAKEWHEELBASE_SUCCEED';
export const UPDATE_MAKEWHEELBASE_FAILED = 'UPDATE_MAKEWHEELBASE_FAILED';

// Delete Make Wheelbase (head)
export const DELETE_MAKEWHEELBASE = 'DELETE_MAKEWHEELBASE';
export const DELETE_MAKEWHEELBASE_START = 'DELETE_MAKEWHEELBASE_START';
export const DELETE_MAKEWHEELBASE_SUCCEED = 'DELETE_MAKEWHEELBASE_SUCCEED';
export const DELETE_MAKEWHEELBASE_FAILED = 'DELETE_MAKEWHEELBASE_FAILED';

/* ======================================================================================== */
/* --------------------------------------------- */
// Body Page - Body
/* --------------------------------------------- */

// Create Body (Tail)
export const CREATE_BODY = 'CREATE_BODY';
export const CREATE_BODY_START = 'CREATE_BODY_START';
export const CREATE_BODY_SUCCEED = 'CREATE_BODY_SUCCEED';
export const CREATE_BODY_FAILED = 'CREATE_BODY_FAILED';

// Get Bodies (Tail)
export const GET_BODIES = 'GET_BODIES';
export const GET_BODIES_START = 'GET_BODIES_START';
export const GET_BODIES_SUCCEED = 'GET_BODIES_SUCCEED';
export const GET_BODIES_FAILED = 'GET_BODIES_FAILED';

// Update Body (Tail)
export const UPDATE_BODY = 'UPDATE_BODY';
export const UPDATE_BODY_START = 'UPDATE_BODY_START';
export const UPDATE_BODY_SUCCEED = 'UPDATE_BODY_SUCCEED';
export const UPDATE_BODY_FAILED = 'UPDATE_BODY_FAILED';

// Delete Body (Tail)
export const DELETE_BODY = 'DELETE_BODY';
export const DELETE_BODY_START = 'DELETE_BODY_START';
export const DELETE_BODY_SUCCEED = 'DELETE_BODY_SUCCEED';
export const DELETE_BODY_FAILED = 'DELETE_BODY_FAILED';

/* --------------------------------------------- */
// Body Page - Body Accessory
/* --------------------------------------------- */
// Create Body Accessory (Tail)
export const CREATE_BODYACCESSORY = 'CREATE_BODYACCESSORY';
export const CREATE_BODYACCESSORY_START = 'CREATE_BODYACCESSORY_START';
export const CREATE_BODYACCESSORY_SUCCEED = 'CREATE_BODYACCESSORY_SUCCEED';
export const CREATE_BODYACCESSORY_FAILED = 'CREATE_BODYACCESSORY_FAILED';

// Get Body Accessories (Tail)
export const GET_BODYACCESSORIES = 'GET_BODYACCESSORIES';
export const GET_BODYACCESSORIES_START = 'GET_BODYACCESSORIES_START';
export const GET_BODYACCESSORIES_SUCCEED = 'GET_BODYACCESSORIES_SUCCEED';
export const GET_BODYACCESSORIES_FAILED = 'GET_BODYACCESSORIES_FAILED';

// Update Body Accessory(Tail)
export const UPDATE_BODYACCESSORY = 'UPDATE_BODYACCESSORY';
export const UPDATE_BODYACCESSORY_START = 'UPDATE_BODYACCESSORY_START';
export const UPDATE_BODYACCESSORY_SUCCEED = 'UPDATE_BODYACCESSORY_SUCCEED';
export const UPDATE_BODYACCESSORY_FAILED = 'UPDATE_BODYACCESSORY_FAILED';

// Delete Body Accessory(Tail)
export const DELETE_BODYACCESSORY = 'DELETE_BODYACCESSORY';
export const DELETE_BODYACCESSORY_START = 'DELETE_BODYACCESSORY_START';
export const DELETE_BODYACCESSORY_SUCCEED = 'DELETE_BODYACCESSORY_SUCCEED';
export const DELETE_BODYACCESSORY_FAILED = 'DELETE_BODYACCESSORY_FAILED';

export const CLEAR_BODYACCESSORY_ARRAY = 'CLEAR_BODYACCESSORY_ARRAY ';

// Get Body Associated Accessories
export const GET_BODYASSOCIATED_ACCESSORIES = 'GET_BODYASSOCIATED_ACCESSORIES';
export const GET_BODYASSOCIATED_ACCESSORIES_START = 'GET_BODYASSOCIATED_ACCESSORIES_START';
export const GET_BODYASSOCIATED_ACCESSORIES_SUCCEED = 'GET_BODYASSOCIATED_ACCESSORIES_SUCCEED';
export const GET_BODYASSOCIATED_ACCESSORIES_FAILED = 'GET_BODYASSOCIATED_ACCESSORIES_FAILED';

// Get Dimension Associated Accessories
export const GET_DIMENSIONASSOCIATED_ACCESSORIES = 'GET_DIMENSIONASSOCIATED_ACCESSORIES';
export const GET_DIMENSIONASSOCIATED_ACCESSORIES_START = 'GET_DIMENSIONASSOCIATED_ACCESSORIES_START';
export const GET_DIMENSIONASSOCIATED_ACCESSORIES_SUCCEED = 'GET_DIMENSIONASSOCIATED_ACCESSORIES_SUCCEED';
export const GET_DIMENSIONASSOCIATED_ACCESSORIES_FAILED = 'GET_DIMENSIONASSOCIATED_ACCESSORIES_FAILED';

export const CLEAR_BODYASSOCIATED_ACCESSORIES_ARRAY = 'CLEAR_BODYASSOCIATED_ACCESSORIES_ARRAY ';
/* --------------------------------------------- */
// Body Page -  Length
/* --------------------------------------------- */
// Create Length (Tail)
export const CREATE_LENGTH = 'CREATE_LENGTH';
export const CREATE_LENGTH_START = 'CREATE_LENGTH_START';
export const CREATE_LENGTH_SUCCEED = 'CREATE_LENGTH_SUCCEED';
export const CREATE_LENGTH_FAILED = 'CREATE_LENGTH_FAILED';

// Get Lengths (Tail)
export const GET_LENGTHS = 'GET_LENGTHS';
export const GET_LENGTHS_START = 'GET_LENGTHS_START';
export const GET_LENGTHS_SUCCEED = 'GET_LENGTHS_SUCCEED';
export const GET_LENGTHS_FAILED = 'GET_LENGTHS_FAILED';

// Update Length(Tail)
export const UPDATE_LENGTH = 'UPDATE_LENGTH';
export const UPDATE_LENGTH_START = 'UPDATE_LENGTH_START';
export const UPDATE_LENGTH_SUCCEED = 'UPDATE_LENGTH_SUCCEED';
export const UPDATE_LENGTH_FAILED = 'UPDATE_LENGTH_FAILED';

// Delete Length(Tail)
export const DELETE_LENGTH = 'DELETE_LENGTH';
export const DELETE_LENGTH_START = 'DELETE_LENGTH_START';
export const DELETE_LENGTH_SUCCEED = 'DELETE_LENGTH_SUCCEED';
export const DELETE_LENGTH_FAILED = 'DELETE_LENGTH_FAILED';

/* --------------------------------------------- */
// Body Page - Body Make
/* --------------------------------------------- */
// Create Body Make (Tail)
export const CREATE_BODYMAKE = 'CREATE_BODYMAKE';
export const CREATE_BODYMAKE_START = 'CREATE_BODYMAKE_START';
export const CREATE_BODYMAKE_SUCCEED = 'CREATE_BODYMAKE_SUCCEED';
export const CREATE_BODYMAKE_FAILED = 'CREATE_BODYMAKE_FAILED';

// Get Body Makes (Tail)
export const GET_BODYMAKES = 'GET_BODYMAKES';
export const GET_BODYMAKES_START = 'GET_BODYMAKES_START';
export const GET_BODYMAKES_SUCCEED = 'GET_BODYMAKES_SUCCEED';
export const GET_BODYMAKES_FAILED = 'GET_BODYMAKES_FAILED';

// Update Body Make(Tail)
export const UPDATE_BODYMAKE = 'UPDATE_BODYMAKE';
export const UPDATE_BODYMAKE_START = 'UPDATE_BODYMAKE_START';
export const UPDATE_BODYMAKE_SUCCEED = 'UPDATE_BODYMAKE_SUCCEED';
export const UPDATE_BODYMAKE_FAILED = 'UPDATE_BODYMAKE_FAILED';

// Delete Body Make(Tail)
export const DELETE_BODYMAKE = 'DELETE_BODYMAKE';
export const DELETE_BODYMAKE_START = 'DELETE_BODYMAKE_START';
export const DELETE_BODYMAKE_SUCCEED = 'DELETE_BODYMAKE_SUCCEED';
export const DELETE_BODYMAKE_FAILED = 'DELETE_BODYMAKE_FAILED';

/* --------------------------------------------- */
// Body Make Accessory
/* --------------------------------------------- */
// Create Body Accessory (Tail)
export const CREATE_BODYMAKE_ACCESSORY = 'CREATE_BODYMAKE_ACCESSORY';
export const CREATE_BODYMAKE_ACCESSORY_START = 'CREATE_BODYMAKE_ACCESSORY_START';
export const CREATE_BODYMAKE_ACCESSORY_SUCCEED = 'CREATE_BODYMAKE_ACCESSORY_SUCCEED';
export const CREATE_BODYMAKE_ACCESSORY_FAILED = 'CREATE_BODYACCESSORY_FAILED';

// Get Body Accessories (Tail)
export const GET_BODYMAKE_ACCESSORIES = 'GET_BODYMAKE_ACCESSORIES';
export const GET_BODYMAKE_ACCESSORIES_START = 'GET_BODYMAKE_ACCESSORIES_START';
export const GET_BODYMAKE_ACCESSORIES_SUCCEED = 'GET_BODYMAKE_ACCESSORIES_SUCCEED';
export const GET_BODYMAKE_ACCESSORIES_FAILED = 'GET_BODYMAKE_ACCESSORIES_FAILED';

// Update Body Accessory(Tail)
export const UPDATE_BODYMAKE_ACCESSORY = 'UPDATE_BODYMAKE_ACCESSORY';
export const UPDATE_BODYMAKE_ACCESSORY_START = 'UPDATE_BODYMAKE_ACCESSORY_START';
export const UPDATE_BODYMAKE_ACCESSORY_SUCCEED = 'UPDATE_BODYMAKE_ACCESSORY_SUCCEED';
export const UPDATE_BODYMAKE_ACCESSORY_FAILED = 'UPDATE_BODYMAKE_ACCESSORY_FAILED';

// Delete Body Accessory(Tail)
export const DELETE_BODYMAKE_ACCESSORY = 'DELETE_BODYMAKE_ACCESSORY';
export const DELETE_BODYMAKE_ACCESSORY_START = 'DELETE_BODYMAKE_ACCESSORY_START';
export const DELETE_BODYMAKE_ACCESSORY_SUCCEED = 'DELETE_BODYMAKE_ACCESSORY_SUCCEED';
export const DELETE_BODYMAKE_ACCESSORY_FAILED = 'DELETE_BODYMAKE_ACCESSORY_FAILED';

/* --------------------------------------------- */
// Accessory Page - Accessory
/* --------------------------------------------- */
// Create Accessory (Tail)
export const CREATE_ACCESSORY = 'CREATE_ACCESSORY';
export const CREATE_ACCESSORY_START = 'CREATE_ACCESSORY_START';
export const CREATE_ACCESSORY_SUCCEED = 'CREATE_ACCESSORY_SUCCEED';
export const CREATE_ACCESSORY_FAILED = 'CREATE_ACCESSORY_FAILED';
// Get Accessories (Tail)
export const GET_ACCESSORIES = 'GET_ACCESSORIES';
export const GET_ACCESSORIES_START = 'GET_ACCESSORIES_START';
export const GET_ACCESSORIES_SUCCEED = 'GET_ACCESSORIES_SUCCEED';
export const GET_ACCESSORIES_FAILED = 'GET_ACCESSORIES_FAILED';
// Update Accessory (Tail)
export const UPDATE_ACCESSORY = 'UPDATE_ACCESSORY';
export const UPDATE_ACCESSORY_START = 'UPDATE_ACCESSORY_START';
export const UPDATE_ACCESSORY_SUCCEED = 'UPDATE_ACCESSORY_SUCCEED';
export const UPDATE_ACCESSORY_FAILED = 'UPDATE_ACCESSORY_FAILED';
// Delete Accessory (Tail)
export const DELETE_ACCESSORY = 'DELETE_ACCESSORY';
export const DELETE_ACCESSORY_START = 'DELETE_ACCESSORY_START';
export const DELETE_ACCESSORY_SUCCEED = 'DELETE_ACCESSORY_SUCCEED';
export const DELETE_ACCESSORY_FAILED = 'DELETE_ACCESSORY_FAILED';

/* --------------------------------------------- */
// JOBSTATUS Page - JOBSTATUS
/* --------------------------------------------- */
// Create JOBSTATUS (Tail)
export const CREATE_JOBSTATUS = 'CREATE_JOBSTATUS';
export const CREATE_JOBSTATUS_START = 'CREATE_JOBSTATUS_START';
export const CREATE_JOBSTATUS_SUCCEED = 'CREATE_JOBSTATUS_SUCCEED';
export const CREATE_JOBSTATUS_FAILED = 'CREATE_JOBSTATUS_FAILED';
// Get Accessories (Tail)
export const GET_JOBSTATUS = 'GET_JOBSTATUS';
export const GET_JOBSTATUS_START = 'GET_JOBSTATUS_START';
export const GET_JOBSTATUS_SUCCEED = 'GET_JOBSTATUS_SUCCEED';
export const GET_JOBSTATUS_FAILED = 'GET_JOBSTATUS_FAILED';
// Update JOBSTATUS (Tail)
export const UPDATE_JOBSTATUS = 'UPDATE_JOBSTATUS';
export const UPDATE_JOBSTATUS_START = 'UPDATE_JOBSTATUS_START';
export const UPDATE_JOBSTATUS_SUCCEED = 'UPDATE_JOBSTATUS_SUCCEED';
export const UPDATE_JOBSTATUS_FAILED = 'UPDATE_JOBSTATUS_FAILED';
// Delete JOBSTATUS (Tail)
export const DELETE_JOBSTATUS = 'DELETE_JOBSTATUS';
export const DELETE_JOBSTATUS_START = 'DELETE_JOBSTATUS_START';
export const DELETE_JOBSTATUS_SUCCEED = 'DELETE_JOBSTATUS_SUCCEED';
export const DELETE_JOBSTATUS_FAILED = 'DELETE_JOBSTATUS_FAILED';

/* --------------------------------------------- */
// ServiceType Page - SERVICETYPE
/* --------------------------------------------- */
// Create SERVICETYPE (Tail)
export const CREATE_SERVICETYPES = 'CREATE_SERVICETYPES';
export const CREATE_SERVICETYPES_START = 'CREATE_SERVICETYPES_START';
export const CREATE_SERVICETYPES_SUCCEED = 'CREATE_SERVICETYPES_SUCCEED';
export const CREATE_SERVICETYPES_FAILED = 'CREATE_SERVICETYPES_FAILED';
// Get ServiceTypeS (Tail)
export const GET_SERVICETYPES = 'GET_SERVICETYPES';
export const GET_SERVICETYPES_START = 'GET_SERVICETYPES_START';
export const GET_SERVICETYPES_SUCCEED = 'GET_SERVICETYPES_SUCCEED';
export const GET_SERVICETYPES_FAILED = 'GET_SERVICETYPES_FAILED';
// Update SERVICETYPES (Tail)
export const UPDATE_SERVICETYPES = 'UPDATE_SERVICETYPES';
export const UPDATE_SERVICETYPES_START = 'UPDATE_SERVICETYPES_START';
export const UPDATE_SERVICETYPES_SUCCEED = 'UPDATE_SERVICETYPES_SUCCEED';
export const UPDATE_SERVICETYPES_FAILED = 'UPDATE_SERVICETYPES_FAILED';
// Delete SERVICETYPES (Tail)
export const DELETE_SERVICETYPES = 'DELETE_SERVICETYPES';
export const DELETE_SERVICETYPES_START = 'DELETE_SERVICETYPES_START';
export const DELETE_SERVICETYPES_SUCCEED = 'DELETE_SERVICETYPES_SUCCEED';
export const DELETE_SERVICETYPES_FAILED = 'DELETE_SERVICETYPES_FAILED';
