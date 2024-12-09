import React, { useState } from 'react'
import { Link, useLoaderData } from 'react-router-dom'

const Users = () => {

    const loadedUsers = useLoaderData();
    const [users, setUsers] = useState(loadedUsers);

    const handleDelete = _id => {
        console.log('delete', _id);

        // client side e server side er user route theke data fetch kora hoyeche. dynamically id wise. 
        fetch(`http://localhost:5000/users/${_id}`, {
            // by default server side er post.get ke hit kore. Ejonno method mention kore dea lage
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount > 0) {
                    alert('deleted successfully')
                    const remainingUsers = users.filter(user => user._id !== _id)
                    setUsers(remainingUsers)
                    
                    
                }

            })
    }

    return (
        <div>
            <h2>No. of useres : {users.length}</h2>
            <div>
                {
                    users.map(user => <div key={user._id}>
                        <p>{user.name} : {user.email} : {user._id} 
                            <Link to= {`/update/${user._id}`}>
                            <button>Update User</button>
                            </Link>
                            <button
                            onClick={() => handleDelete(user._id)}
                        >Delete User</button></p>

                    </div>)
                }
            </div>
        </div>
    )
}

export default Users