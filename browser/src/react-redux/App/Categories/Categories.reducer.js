import axios from 'axios';

const initialState = [];
const RETRIEVE_CATEGORIES = 'RETRIEVE_CATEGORIES';

export default (state=initialState, action) => {
    let newState = [...state];

    switch(action.type) {
        case RETRIEVE_CATEGORIES:
            newState = action.categories
            break;
        default:
            return initialState;
    }

    return newState;
}

const retrieve = (categories) => ({
    type: RETRIEVE_CATEGORIES,
    categories
});

export const retrieveCategories = () =>
    dispatch =>
        axios.get('/api/category')
            .then((categories) => {
                dispatch(retrieve(categories.data))
            });