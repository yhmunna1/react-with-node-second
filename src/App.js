import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);


  const handleAddUser = event => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    // console.log(name, email);
    const user = { name, email };

    // Post/Send data to server
    fetch('http://localhost:5000/user', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(res => res.json())
      .then(data => {
        const newUsers = [...users, data];
        setUsers(newUsers);
        console.log('Success:', data);
      })

  }

  return (
    <div className="App">
      <h1>My own data: {users.length}</h1>
      <form onSubmit={handleAddUser}>
        <input type="text" name='name' placeholder='Name' required />
        <input type="text" name='email' placeholder='Email' required />
        <input type="submit" value="Add user" />
      </form>
      <ul>
        {
          users.map(user => <li key={user.id}>ID: {user.id} <br /> Name: {user.name}, <br /> Email: {user.email}</li>)
        }
      </ul>
    </div>
  );
}

export default App;
