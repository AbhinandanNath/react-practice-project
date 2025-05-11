

import React, { useState, useEffect } from "react";

const Round3Todo = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    console.log("Component re-rendered");
  }, []);

  const addTodo = () => {
    if (text.trim() === "") return;
    // todos.push({ text, completed: false });
    setTodos((prevState) => {
      let updateState = { text, completed: false };
      return [...prevState, updateState];
    });
    setText("");
  };

  const toggleTodo = (index) => {
    // todos[index].completed = !todos[index].completed;

    setTodos((prevState) => {
       let updatedState = [...prevState.map((item) => { return { ...item }; })];
      return updatedState.map((item,idx) => {
       return  idx === index ? { ...item, completed: !item.completed } : item
      })

      // return updatedState;
    });

    // return prevState.map((item, idx) => 
    //   idx === index ? { ...item, completed: !item.completed } : item
    // );
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div>
      <h2>Todo List</h2>
      <input value={text} onChange={handleChange} />
      <button onClick={addTodo}>Add</button>

      <ul>
        {todos.map((todo, idx) => (
          <li
            key={idx}
            style={{ textDecoration: todo.completed ? "line-through" : "none" }}
            onClick={() => toggleTodo(idx)}
          >
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Round3Todo;

// Look for and address below issues:
// Mutating state directly
// Causes re-renders to break
// Allows empty strings/spaces as todos
