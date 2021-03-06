import React from 'react';
import './Users.css';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchList, userClick } from './store';

class Users extends React.Component {
    constructor() {
        super();
        this.loadMore = this.loadMore.bind(this);
    }

    componentWillMount() { //first time loading users
        if (this.props.loadedUsers.length === 0) {
            this.props.dispatch(fetchList())
        }
    }

    loadMore() { //get next page
        this.props.dispatch(fetchList(this.props.page + 1))
    }

    handleUserClick(user) { //pass user information to store to be loaded in user page
        this.props.dispatch(userClick(user))
    }

    usersList = () => {
        if (this.props.error) {
            return "Error loading users."
        }
        else {
            var users = this.props.loadedUsers.map((user) =>
                <NavLink to="/user" key={user.id} onClick = {this.handleUserClick.bind(this, user)}>
                    <div >{user.first_name + " " + user.last_name} </div>
                </NavLink>
            );
            return users;
        }
    }

    endOfList = () => {
        if (this.props.loading) {
            return "Loading..."
        }
        else if (this.props.page < this.props.total_pages) {
            return (
                <button onClick={this.loadMore}>
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

export default connect((state) => {
    return state;
})(Users); //connect store state to users props
