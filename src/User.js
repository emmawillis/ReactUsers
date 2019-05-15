import React from 'react';
import './User.css';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { userClick, store } from './store';

class User extends React.Component {
    constructor() {
        super();
        this.getUser = this.getUser.bind(this); 
    }

    componentWillMount() {
        this.getUser();
    }

    getUser() {
        var user = this.props.currentUser;
        if (user) {
            return (
                <div>
                    <img src = {user.avatar} alt="avatar"/>
                    < br/>
                    ID: {user.id} <br />
                    First Name: {user.first_name} <br/>
                    Last Name: {user.last_name} <br />
                    Email: {user.email} <br />
                </div>
            );
        }
        else {
            return "Error: No user selected.";
        }
    } 

    backToList() {
        store.dispatch(userClick(null));
    }

    render() {
        return (
            <div className="User">
                {this.getUser()}
                <br />
                <NavLink to="/" onClick={this.backToList}>
                    <button>
                        Back To List
                    </button> 
                </NavLink>
            </div>
        );
    }
}

export default connect((state) => {
    return state;
})(User); //connect store state to user props

