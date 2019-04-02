import React from 'react';
import {
    BrowserRouter,
    Route,
    Switch
} from 'react-router-dom';
import List from '../components/Boxes/List';
import Create from '../components/Boxes/Create';

export default () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={List}/>
            <Route  path="/listboxes" component={List}/>
            <Route  path="/addbox" component={Create}/>
        </Switch>
    </BrowserRouter>
);