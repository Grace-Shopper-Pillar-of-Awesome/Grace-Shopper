import React from 'react';
import { connect } from 'react-redux'
import { fetchUsers } from '../store/userDashboard'
import UserRow from './UserRow'

class UserDashboard extends React.Component {
    constructor() {
        super()
    }

    componentDidMount() {
        this.props.getUsers();
    }

    render() {
        const users = this.props.users
        return (
            <div>
                <h1 className="dashboard-header">USERS</h1>
                <table>
                    <tbody>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>User type</th>
                        </tr>
                        {users.map((user) => {
                            return (
                                <UserRow key={user.id} user={user} />
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      users: state.userDashboard,
    };
  };

const mapDispatchToProps = (dispatch) => {
    return {
        getUsers: () => dispatch(fetchUsers())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDashboard)