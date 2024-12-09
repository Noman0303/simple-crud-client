import React from 'react'
import { useLoaderData } from 'react-router-dom'

const Update = (id) => {
    const loadeduser = useLoaderData();
    const handleUpdate = event =>{
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        // console.log(name,email)
        const updatedUser = {name, email};
        console.log(id, updatedUser);


        fetch(`http://localhost:5000/users/${loadeduser._id}`,{
            method: 'PUT',
            // backend e jeta dibo setai method e mention korte hobe. tahole seikhane gie hit korbe. 
            headers:{
                'content-type' : 'application/json'
            },
            body : JSON.stringify(updatedUser)
            // ekhane stringify korbo udpdatedUser ke
        })

        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.modifiedCount>0){
                alert('User updated successfully.')
            }
        })
    }

  return (
    <div>
        <h3>Updated information of {loadeduser.name}</h3>
        <form onSubmit={handleUpdate} >
            <input type="text" name="name" defaultValue={loadeduser?.name} id="" />
            <br />
            <input type="email" name="email" defaultValue={loadeduser?.email} id="" />
            <br />
            <input type="submit" value="Update" />
        </form>
    </div>
  )
}

export default Update