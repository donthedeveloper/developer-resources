import React from 'react';
import {connect} from 'react-redux';
import {retrieveResources} from './Resources.reducer';

class Resources extends React.Component {
    componentWillMount() {
        this.props.retrieveResources(this.props.categoryName);
    }

    render() {
        console.log('resources:', this.props.resources);
        return (
            <ul>
                {this.props.resources.map((resource) =>
                    <li>
                        {resource.name}<br />
                        {resource.description}<br />
                        {resource.url}
                    </li>
                )}
            </ul>
        );
    }
}

const mapStateToProps = (state) => ({
    resources: state.resources
});

const mapDispatchToProps = (dispatch) => ({
    retrieveResources: (categoryName) =>
        dispatch(retrieveResources(categoryName))
});

export default connect(mapStateToProps, mapDispatchToProps)(Resources);