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
export const SET_LOCAL_ORDERS_DICT = 'SET_LOCAL_ORDERS_DICT';
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
// Users
/* --------------------------------------------- */

export const GET_USERS = 'GET_USERS';
export const GET_USERS_START = 'GET_USERS_START';
export const GET_USERS_SUCCEED = 'GET_USERS_SUCCEED';
export const GET_USERS_FAILED = 'GET_USERS_FAILED';

export const CREATE_USER = 'CREATE_USER';
export const CREATE_USER_START = 'CREATE_USER_START';
export const CREATE_USER_SUCCEED = 'CREATE_USER_SUCCEED';
export const CREATE_USER_FAILED = 'CREATE_USER_FAILED';

export const UPDATE_USER = 'UPDATE_USER';
export const UPDATE_USER_START = 'UPDATE_USER_START';
export const UPDATE_USER_SUCCEED = 'UPDATE_USER_SUCCEED';
export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED';

export const DELETE_USER = 'DELETE_USER';
export const DELETE_USER_START = 'DELETE_USER_START';
export const DELETE_USER_SUCCEED = 'DELETE_USER_SUCCEED';
export const DELETE_USER_FAILED = 'DELETE_USER_FAILED';
/* --------------------------------------------- */
// Users Roles
/* --------------------------------------------- */
export const GET_ROLES = 'GET_ROLES';
export const GET_ROLES_START = 'GET_ROLES_START';
export const GET_ROLES_SUCCEED = 'GET_ROLES_SUCCEED';
export const GET_ROLES_FAILED = 'GET_ROLES_FAILED';

export const CREATE_ROLE = 'CREATE_ROLE';
export const CREATE_ROLE_START = 'CREATE_ROLE_START';
export const CREATE_ROLE_SUCCEED = 'CREATE_ROLE_SUCCEED';
export const CREATE_ROLE_FAILED = 'CREATE_ROLE_FAILED';

export const UPDATE_ROLE = 'UPDATE_ROLE';
export const UPDATE_ROLE_START = 'UPDATE_ROLE_START';
export const UPDATE_ROLE_SUCCEED = 'UPDATE_ROLE_SUCCEED';
export const UPDATE_ROLE_FAILED = 'UPDATE_ROLE_FAILED';

export const DELETE_ROLE = 'DELETE_ROLE';
export const DELETE_ROLE_START = 'DELETE_ROLE_START';
export const DELETE_ROLE_SUCCEED = 'DELETE_ROLE_SUCCEED';
export const DELETE_ROLE_FAILED = 'DELETE_ROLE_FAILED';

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

/* ================================================================================================= */
// Jobs
/* ================================================================================================= */

export const CLEAR_TASK_STATE = 'CLEAR_TASK_STATE';
/* --------------------------------------------- */
// INTAKESTATUS Page - INTAKESTATUS
/* --------------------------------------------- */
// Create INTAKESTATUS (Tail)
export const CREATE_INTAKESTATUS = 'CREATE_INTAKESTATUS';
export const CREATE_INTAKESTATUS_START = 'CREATE_INTAKESTATUS_START';
export const CREATE_INTAKESTATUS_SUCCEED = 'CREATE_INTAKESTATUS_SUCCEED';
export const CREATE_INTAKESTATUS_FAILED = 'CREATE_INTAKESTATUS_FAILED';
// Get INTAKESTATUS (Tail)
export const GET_INTAKESTATUS = 'GET_INTAKESTATUS';
export const GET_INTAKESTATUS_START = 'GET_INTAKESTATUS_START';
export const GET_INTAKESTATUS_SUCCEED = 'GET_INTAKESTATUS_SUCCEED';
export const GET_INTAKESTATUS_FAILED = 'GET_INTAKESTATUS_FAILED';
// Update INTAKESTATUS (Tail)
export const UPDATE_INTAKESTATUS = 'UPDATE_INTAKESTATUS';
export const UPDATE_INTAKESTATUS_START = 'UPDATE_INTAKESTATUS_START';
export const UPDATE_INTAKESTATUS_SUCCEED = 'UPDATE_INTAKESTATUS_SUCCEED';
export const UPDATE_INTAKESTATUS_FAILED = 'UPDATE_INTAKESTATUS_FAILED';
// Delete INTAKESTATUS (Tail)
export const DELETE_INTAKESTATUS = 'DELETE_INTAKESTATUS';
export const DELETE_INTAKESTATUS_START = 'DELETE_INTAKESTATUS_START';
export const DELETE_INTAKESTATUS_SUCCEED = 'DELETE_INTAKESTATUS_SUCCEED';
export const DELETE_INTAKESTATUS_FAILED = 'DELETE_INTAKESTATUS_FAILED';

/* --------------------------------------------- */
// ServiceType Page - SERVICETYPE
/* --------------------------------------------- */
// Create SERVICETYPE (Tail)
export const CREATE_SERVICETYPE = 'CREATE_SERVICETYPE';
export const CREATE_SERVICETYPE_START = 'CREATE_SERVICETYPE_START';
export const CREATE_SERVICETYPE_SUCCEED = 'CREATE_SERVICETYPE_SUCCEED';
export const CREATE_SERVICETYPE_FAILED = 'CREATE_SERVICETYPE_FAILED';
// Get ServiceTypeS (Tail)
export const GET_SERVICETYPES = 'GET_SERVICETYPES';
export const GET_SERVICETYPES_START = 'GET_SERVICETYPES_START';
export const GET_SERVICETYPES_SUCCEED = 'GET_SERVICETYPES_SUCCEED';
export const GET_SERVICETYPES_FAILED = 'GET_SERVICETYPES_FAILED';
// Update SERVICETYPES (Tail)
export const UPDATE_SERVICETYPE = 'UPDATE_SERVICETYPE';
export const UPDATE_SERVICETYPE_START = 'UPDATE_SERVICETYPE_START';
export const UPDATE_SERVICETYPE_SUCCEED = 'UPDATE_SERVICETYPE_SUCCEED';
export const UPDATE_SERVICETYPE_FAILED = 'UPDATE_SERVICETYPE_FAILED';
// Delete SERVICETYPES (Tail)
export const DELETE_SERVICETYPE = 'DELETE_SERVICETYPE';
export const DELETE_SERVICETYPE_START = 'DELETE_SERVICETYPE_START';
export const DELETE_SERVICETYPE_SUCCEED = 'DELETE_SERVICETYPE_SUCCEED';
export const DELETE_SERVICETYPE_FAILED = 'DELETE_SERVICETYPE_FAILED';

/* --------------------------------------------- */
// Task/Job
/* --------------------------------------------- */
export const CREATE_TASK = 'CREATE_TASK';
export const CREATE_TASK_START = 'CREATE_TASK_START';
export const CREATE_TASK_SUCCEED = 'CREATE_TASK_SUCCEED';
export const CREATE_TASK_FAILED = 'CREATE_TASK_FAILED';

export const GET_TASKS = 'GET_TASKS';
export const GET_TASKS_START = 'GET_TASKS_START';
export const GET_TASKS_SUCCEED = 'GET_TASKS_SUCCEED';
export const GET_TASKS_FAILED = 'GET_TASKS_FAILED';

export const UPDATE_TASK = 'UPDATE_TASK';
export const UPDATE_TASK_START = 'UPDATE_TASK_START';
export const UPDATE_TASK_SUCCEED = 'UPDATE_TASK_SUCCEED';
export const UPDATE_TASK_FAILED = 'UPDATE_TASK_FAILED';

export const DELETE_TASK = 'DELETE_TASK';
export const DELETE_TASK_START = 'DELETE_TASK_START';
export const DELETE_TASK_SUCCEED = 'DELETE_TASK_SUCCEED';
export const DELETE_TASK_FAILED = 'DELETE_TASK_FAILED';

/* --------------------------------------------- */
// Service Task Title
/* --------------------------------------------- */
export const CREATE_SERVICE_TASK = 'CREATE_SERVICE_TASK';
export const CREATE_SERVICE_TASK_START = 'CREATE_SERVICE_TASK_START';
export const CREATE_SERVICE_TASK_SUCCEED = 'CREATE_SERVICE_TASK_SUCCEED';
export const CREATE_SERVICE_TASK_FAILED = 'CREATE_SERVICE_TASK_FAILED';

export const GET_SERVICE_TASKS = 'GET_SERVICE_TASKS';
export const GET_SERVICE_TASKS_START = 'GET_SERVICE_TASKS_START';
export const GET_SERVICE_TASKS_SUCCEED = 'GET_SERVICE_TASKS_SUCCEED';
export const GET_SERVICE_TASKS_FAILED = 'GET_SERVICE_TASKS_FAILED';

export const UPDATE_SERVICE_TASK = 'UPDATE_SERVICE_TASK';
export const UPDATE_SERVICE_TASK_START = 'UPDATE_SERVICE_TASK_START';
export const UPDATE_SERVICE_TASK_SUCCEED = 'UPDATE_SERVICE_TASK_SUCCEED';
export const UPDATE_SERVICE_TASK_FAILED = 'UPDATE_SERVICE_TASK_FAILED';

export const DELETE_SERVICE_TASK = 'DELETE_SERVICE_TASK';
export const DELETE_SERVICE_TASK_START = 'DELETE_SERVICE_TASK_START';
export const DELETE_SERVICE_TASK_SUCCEED = 'DELETE_SERVICE_TASK_SUCCEED';
export const DELETE_SERVICE_TASK_FAILED = 'DELETE_SERVICE_TASK_FAILED';

/* --------------------------------------------- */
// Intakes Summary
/* --------------------------------------------- */
export const CREATE_INTAKE_SUMMARY = 'CREATE_INTAKE_SUMMARY';
export const CREATE_INTAKE_SUMMARY_START = 'CREATE_INTAKE_SUMMARY_START';
export const CREATE_INTAKE_SUMMARY_SUCCEED = 'CREATE_INTAKE_SUMMARY_SUCCEED';
export const CREATE_INTAKE_SUMMARY_FAILED = 'CREATE_INTAKE_SUMMARY_FAILED';

export const GET_INTAKE_SUMMARY = 'GET_INTAKE_SUMMARY';
export const GET_INTAKE_SUMMARY_START = 'GET_INTAKE_SUMMARY_START';
export const GET_INTAKE_SUMMARY_SUCCEED = 'GET_INTAKE_SUMMARY_SUCCEED';
export const GET_INTAKE_SUMMARY_FAILED = 'GET_INTAKE_SUMMARY_FAILED';

export const UPDATE_INTAKE_SUMMARY = 'UPDATE_INTAKE_SUMMARY';
export const UPDATE_INTAKE_SUMMARY_START = 'UPDATE_INTAKE_SUMMARY_START';
export const UPDATE_INTAKE_SUMMARY_SUCCEED = 'UPDATE_INTAKE_SUMMARY_SUCCEED';
export const UPDATE_INTAKE_SUMMARY_FAILED = 'UPDATE_INTAKE_SUMMARY_FAILED';

export const DELETE_INTAKE_SUMMARY = 'DELETE_INTAKE_SUMMARY';
export const DELETE_INTAKE_SUMMARY_START = 'DELETE_INTAKE_SUMMARY_START';
export const DELETE_INTAKE_SUMMARY_SUCCEED = 'DELETE_INTAKE_SUMMARY_SUCCEED';
export const DELETE_INTAKE_SUMMARY_FAILED = 'DELETE_INTAKE_SUMMARY_FAILED';

/* --------------------------------------------- */
// Specific Intake & Jobs
/* --------------------------------------------- */
export const GET_SPECIFIC_INTAKE_JOBS = 'GET_SPECIFIC_INTAKE_JOBS';
export const GET_SPECIFIC_INTAKE_JOBS_START = 'GET_SPECIFIC_INTAKE_JOBS_START';
export const GET_SPECIFIC_INTAKE_JOBS_SUCCEED = 'GET_SPECIFIC_INTAKE_JOBS_SUCCEED';
export const GET_SPECIFIC_INTAKE_JOBS_FAILED = 'GET_SPECIFIC_INTAKE_JOBS_FAILED';

export const CLEAR_SPECIFIC_INTAKE_JOBS = 'CLEAR_SPECIFIC_INTAKE_JOBS';

export const UPDATE_SPECIFIC_INTAKE_JOBS = 'UPDATE_SPECIFIC_INTAKE_JOBS';
export const UPDATE_SPECIFIC_INTAKE_JOBS_START = 'UPDATE_SPECIFIC_INTAKE_JOBS_START';
export const UPDATE_SPECIFIC_INTAKE_JOBS_SUCCEED = 'UPDATE_SPECIFIC_INTAKE_JOBS_SUCCEED';
export const UPDATE_SPECIFIC_INTAKE_JOBS_FAILED = 'UPDATE_SPECIFIC_INTAKE_JOBS_FAILED';

export const SET_SPECIFIC_INTAKE_LOGS = 'SET_SPECIFIC_INTAKE_LOGS';

/* -------------------------------------------------- */
// Users
/* -------------------------------------------------- */

export const GET_USERS_BY_ROLES = 'GET_USERS_BY_ROLES';
export const GET_USERS_BY_ROLES_START = 'GET_USERS_BY_ROLES_START';
export const GET_USERS_BY_ROLES_SUCCEED = 'GET_USERS_BY_ROLES_SUCCEED';
export const GET_USERS_BY_ROLES_FAILED = 'GET_USERS_BY_ROLES_FAILED';
