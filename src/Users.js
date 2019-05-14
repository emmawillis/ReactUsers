import React from 'react';
import './Users.css';
import { NavLink } from 'react-router-dom';
import store from './store';

class Users extends React.Component {
    constructor() {
        super();
        this.state = {
            page: 0,
            per_page: 0,
            total: 0,
            total_pages: 0,
            data: []
        };

        this.getUsers = this.getUsers.bind(this);
    }

    componentWillMount() {
        this.getUsers();
    }

    getUsers() {
        var newPage = this.state.page + 1
        fetch('https://reqres.in/api/users?page=' + newPage)
            .then(response => {
                if (response.ok) return response.json();
                throw new Error('Request failed.');
            })
            .then(data => {
                var newData = this.state.data.concat(data.data)
                this.setState({
                    page: data.page,
                    per_page: data.per_page,
                    total: data.total,
                    total_pages: data.total_pages,
                    data: newData
                });
                store.dispatch({ type: "dataLoad", payload: newData });
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleUserClick(user) {
        store.dispatch({ type: "userClick", payload: user});
    }

    usersList = () => {
        var users = this.state.data.map((user) =>
            <NavLink to="/user" key={user.id} onClick = {this.handleUserClick.bind(this, user)}>
                <div >{user.first_name + " " + user.last_name} </div>
            </NavLink>
        );
        return users;
    }

    endOfList = () => {
        if (this.state.page < this.state.total_pages) {
            return (
                <button onClick={this.getUsers}>
                    Load More
                </button>
            );
        }
        else {
            return "You’ve reached the end of the list";
        }
    }

    render() {
        return (
            <div className="Users">
                <h1 className="Users-header"> Users </h1>
                {this.usersList()}
                <br />
                {this.endOfList()}
            </div>
        );
    }
}

export default Users;

