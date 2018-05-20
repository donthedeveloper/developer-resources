import axios from 'axios';

const RETRIEVE_CATEGORIES = 'RETRIEVE_CATEGORIES';

const initialState = ({
    resources: [],
    errorMessage: ''
})

export default (state=initialState, action) => {
    const newState = Object.assign({}, state);

    switch(action.type) {

    }
}

const retrieve = (categories) => ({
    type: RETRIEVE_CATEGORIES,
    categories
});

export const retreiveCategories = () =>
    dispatch =>
        axios.get('/api/resource)')
            then((resources) => {
                dispatch(retrieve(resources.data))
            })