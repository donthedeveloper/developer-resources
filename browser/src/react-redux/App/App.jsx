import React from 'react';
import Categories from './Categories/Categories.react';
import Category from './Categories/Category/Category.react';
import {Route} from 'react-router-dom';

const App = (props) => {
    return (
        <div>
            <Route exact path='/' component={Categories} />
            <Route path={`/:categoryName`} component={Category} />
        </div>
    );
};

export default App;