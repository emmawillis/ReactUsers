import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import Users from './Users';
import User from './User';
import {store} from './store';

const Error = () => {
    return (
        <div>
            <p> Error: path does not exist.</p> 
        </div>
    );
};

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Switch>
                        <Route path="/" component={Users} exact/>
                        <Route path="/user" component={User} />
                        <Route component={Error}/>
                    </Switch>
                </BrowserRouter>
            </Provider>
        );
    }
}
export default App;
