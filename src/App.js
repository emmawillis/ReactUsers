import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Users from './Users';
import User from './User';

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
            <BrowserRouter>
                <Switch>
                    <Route path="/" component={Users} exact/>
                    <Route path="/user" component={User} />
                    <Route component={Error}/>
                </Switch>
            </BrowserRouter>
        );
    }
}
export default App;
