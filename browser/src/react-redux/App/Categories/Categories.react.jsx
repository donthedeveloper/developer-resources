import React from 'react';
import {retrieveCategories} from './Categories.reducer';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class Categories extends React.Component {
    componentWillMount() {
        this.props.retrieveCategories();
    }

    render() {
        return (
            <ul>
                {this.props.categories.map((category, i) =>
                    <li key={i}>
                        <Link to={`/${category.name}`}>{category.name}</Link>
                    </li>
                )}
            </ul>
        );
    }
}

const mapStateToProps = (state) => ({
    categories: state.categories
});

const mapDispatchToProps = (dispatch) => ({
    retrieveCategories: () =>
        dispatch(retrieveCategories())
});

export default connect(mapStateToProps, mapDispatchToProps)(Categories);