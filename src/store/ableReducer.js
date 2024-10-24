import * as actionTypes from './actions';


export const initialState = {
    isOpen: [],
    isTrigger: [],
    isFormModal: false,
    generalModalId: '',
    buttonStatus: 'none',

};
const ableReducer = (state = initialState, action) => {
    let trigger = [];
    let open = [];
    switch (action.type) {

        case actionTypes.MODAL_OPEN:
            return {
                ...state,
                isFormModal: true,
                generalModalId: action?.id
            };
        case actionTypes.CREATE_AND_CLOSE_BUTTON:
            return {
                ...state,
                buttonStatus: 'create'
            };
        case actionTypes.CREATE_AND_ADD_NEW_BUTTON:
            return {
                ...state,
                buttonStatus: 'addNew'
            };
        case actionTypes.UPDATE_BUTTON:
            return {
                ...state,
                buttonStatus: 'update'
            };
        case actionTypes.DELETE_BUTTON:
            return {
                ...state,
                buttonStatus: 'delete'
            };

        default:
            return state;
    }
}

export default ableReducer;