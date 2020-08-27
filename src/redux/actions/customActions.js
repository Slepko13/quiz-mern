import { TOGGLE_MODAL, RESET_STATE } from '../constants/constants';

export const toggleModal = () => {
    return {
        type: TOGGLE_MODAL
    }
}

export const resetState = () => {
    return {
        type: RESET_STATE
    }
}