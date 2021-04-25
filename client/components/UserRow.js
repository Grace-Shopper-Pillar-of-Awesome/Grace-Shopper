import React from 'react';

const UserRow = (props) => {
    const user = props.user
    
    return (
        <tr>
            <td>{user.id}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.userType}</td>
        </tr>
    )
}

export default UserRow