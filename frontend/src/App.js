import React, { useState, useEffect } from 'react';

export default function App() {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [todos, setTodos] = useState([]);

  // Get all Todos
  const getTodos = async () => {
    try {
      const response = await fetch('http://localhost:5000/all');

      const data = await response.json();

      if (data.success) {
        setTodos(data.todos);
      }

    } catch (error) {
      console.log(error.message);
    }
  };

  // Add Todo
  const addTodo = async () => {
    try {
      const response = await fetch('http://localhost:5000/create', {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          title,
          description
        })
      });

      const data = await response.json();

      if (data.success) {
        setTitle('');
        setDescription('');

        getTodos();
      } else {
        alert(data.message);
      }

    } catch (error) {
      console.log(error.message);
    }
  };

  // Fetch Todos on initial render
  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div style={{ padding: 50 }}>

      <h2>Todos</h2>

      <input
        placeholder="Enter title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        placeholder="Enter description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button onClick={addTodo}>
        Add Todo
      </button>

      <hr />

      <h3>All Todos</h3>

      {todos.map((todo) => (
        <div key={todo._id}>
          <h3>{todo.title}</h3>
          <p>{todo.description}</p>
          <hr />
        </div>
      ))}

    </div>
  );
}