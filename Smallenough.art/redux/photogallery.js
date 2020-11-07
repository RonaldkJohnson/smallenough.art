import * as ActionTypes from './ActionTypes';

export const photogallery = (state = { isLoading: true,
                                     errMess: null,
                                     photogallery: []}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_PHOTOGALLERY:
            return {...state, isLoading: false, errMess: null, photogallery: action.payload};

        case ActionTypes.PHOTOGALLERY_LOADING:
            return {...state, isLoading: true, errMess: null, photogallery: []}

        case ActionTypes.PHOTOGALLERY_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
      }
};