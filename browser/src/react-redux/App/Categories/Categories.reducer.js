import axios from 'axios';

const initialState = ({
    categories: []
});
const RETRIEVE_CATEGORIES = 'RETRIEVE_CATEGORIES';

export default (state=initialState, action) => {
    const newState = Object.assign({}, state);

    switch(action.type) {
        case RETRIEVE_CATEGORIES:
            newState.categories = action.categories
            break;
        defaut:
            return state;
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