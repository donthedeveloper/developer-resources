import React from 'react';
import {retrieveCategories} from './Categories.reducer';
import {connect} from 'react-redux';

class Categories extends React.Component {
    componentWillMount() {
        this.props.retrieveCategories();
    }

    render() {
        return (
            <ul>
                {this.props.categories.map((category, i) =>
                    <li key={i}>{category.name}</li>
                )}
            </ul>
        );
    }
}

const mapStateToProps = (state) => ({
    categories: state.categories.categories
});

const mapDispatchToProps = (dispatch) => ({
    retrieveCategories: () =>
        dispatch(retrieveCategories())
});

export default connect(mapStateToProps, mapDispatchToProps)(Categories);