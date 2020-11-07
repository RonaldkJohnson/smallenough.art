import * as ActionTypes from './ActionTypes';

export const photos = (state = { isLoading: true,
                                     errMess: null,
                                     photos: []}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_PHOTOS:
            return {...state, isLoading: false, errMess: null, photos: action.payload};

        case ActionTypes.PHOTOS_LOADING:
            return {...state, isLoading: true, errMess: null, photos: []}

        case ActionTypes.PHOTOS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
      }
};