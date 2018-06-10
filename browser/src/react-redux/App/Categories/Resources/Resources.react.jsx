import React from 'react';
import {retrieveResources} from './Resources.reducer';

class Resources extends React.Component {
    componentWillMount() {
        this.props.retrieveResources();
    }

    render() {
        return (
            <ul>
                {this.props.map((resource) =>
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
    retrieveResources: () =>
        dispatch(retrieveResources)
});

export default connect(mapStateToProps, mapDispatchToProps)(Resources);