import React from 'react';
import Resources from './Resources/Resources.react';

const Category = (props) => {
    return (
        <div>
            <Resources categoryName={props.match.params.categoryName} />
        </div>
    );
}

export default Category;