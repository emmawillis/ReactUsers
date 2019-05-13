import React from 'react';
import './Users.css';

class User extends React.Component {
    constructor() {
        super();
        this.state = {
        };

        this.getUser = this.getUser.bind(this); 
        this.backToList = this.backToList.bind(this);
    }

    componentWillMount() {
        this.getUser();
    }

    getUser() {
        //get user from redux and set state
    }

    backToList() {
        console.log("back")
    }

    render() {

        return (
            <div>
                hello
            
                <button onClick={this.backToList}>
                    Back To List
                </button> 
            </div>
        );
    }
}

export default User;

