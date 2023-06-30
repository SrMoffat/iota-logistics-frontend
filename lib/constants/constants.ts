const USER_STORAGE_KEY = process.env.REACT_USER_STORAGE_KEY || 'iota-user';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "https://iota-logistics-backend-1d4ea9f13238.herokuapp.com/api";
const FORM_PARENT_STYLES = {
    border: "0.1px solid rgba(0,0,0,0.1)",
    borderRadius: 15,
    backgroundColor: "white",
    overflow: "hidden",
};
const ITEM_EDIT_MODES = {
    DETAILS: "details",
    STATUS: "status",
};
export default {
    API_BASE_URL,
    ITEM_EDIT_MODES,
    USER_STORAGE_KEY,
    FORM_PARENT_STYLES
}