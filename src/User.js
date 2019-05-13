import React from 'react';
import './Users.css';
import { NavLink } from 'react-router-dom';

class User extends React.Component {
    constructor() {
        super();
        this.state = {

        };

        this.getUser = this.getUser.bind(this); 
    }

    componentWillMount() {
        this.getUser();
    }

    getUser() {
        //get user from redux and set state
    }

    render() {
        return (
            <div>
                hello

                <NavLink to="/">
                    <button>
                        Back To List
                    </button> 
                </NavLink>
            </div>
        );
    }
}

export default User;

