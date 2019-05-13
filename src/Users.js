import React from 'react';
import './Users.css';
import User from './User';
import { NavLink } from 'react-router-dom';


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
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    var bottom = this.state.page < this.state.total_pages ? 
                  <button onClick={this.getUsers}>
                    Load More
                  </button> 
                : "You’ve reached the end of the list"

    var users = this.state.data.map((user) =>
      <NavLink to="/user">
        <li key={user.id} >{ user.first_name + " " + user.last_name} </li>
      </NavLink>
    );

    if (this.state.userView) {
      return (
        <User />
      )
    }
    else {
      return (
        <div className = "Users">
          {users}
          {bottom}
        </div>
      );
    }
    
  }
}

export default Users;

