import React, { useState } from "react";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");

  const register = async () => {
    await fetch("http://localhost:8080/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    alert("Registered!");
  };

  const login = async () => {
    let res = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    let text = await res.text();
    alert(text);
  };

  const addTodo = async () => {
    let res = await fetch(`http://localhost:8080/todos/${username}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task, done: false })
    });
    let newTodo = await res.json();
    setTodos([...todos, newTodo]);
  };

  const loadTodos = async () => {
    let res = await fetch(`http://localhost:8080/todos/${username}`);
    let data = await res.json();
    setTodos(data);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Todo App</h1>
      <input placeholder="Username" onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button onClick={register}>Register</button>
      <button onClick={login}>Login</button>

      <hr />

      <input placeholder="New Task" onChange={e => setTask(e.target.value)} />
      <button onClick={addTodo}>Add Todo</button>
      <button onClick={loadTodos}>Load Todos</button>

      <ul>
        {todos.map(t => (
          <li key={t.id}>{t.task} - {t.done ? "yup" : 'nope"}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
