import React from "react";
import { useState } from "react"
import { v4 as uuidv4 } from 'uuid';
import "bootstrap/dist/css/bootstrap.css";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import './App.css'
import TodoCard from "./components/TodoCard";

const App = () => {
  const [userInput, setuserInput] = useState("")
  const [todos, setTodos] = useState(() => {
    return JSON.parse(localStorage.getItem("todoList")) || []
  });

  const onChangeUserInput = (event) => {
    setuserInput(event.target.value)
  }

  const onAddtodos = () => {
    setTodos([...todos, { id: uuidv4(), todo: userInput, isChecked: false }])
    setuserInput("")
  }

  const checkableStatus = (status, todoId) => {
    setTodos(todos.map(item => {
      if (item.id === todoId) {
        return { ...item, isChecked: status }
      }
      return item
    }))
  }

  const deleteTodo = (todoId) => {
    setTodos(todos.filter(item => {
      return item.id !== todoId
    }))
  }

  const onSave = () => {
    localStorage.setItem('todoList', JSON.stringify(todos))
    const todosFromStorage = JSON.parse(localStorage.getItem("todoList"));
    console.log("local storage data: ", todosFromStorage)
    setTodos(todosFromStorage)
  }

  const onClearStorage = () => {
    localStorage.removeItem("todoList")
    setTodos([])
  }

  const renderSaveTooltip = props => {
    return <Tooltip {...props}>Click here to save data in local storage</Tooltip>
  }

  const renderClearTooltip = props => {
    return <Tooltip {...props}>Click here to clear data in local storage</Tooltip>
  }

  return (
    <div className="todo-container">
      <h1 className="todo-header">Todos</h1>
      <h1 className="create-task-heading">
        Create <span className="create-task-heading-subpart">Task</span>
      </h1>
      <input type="text" placeholder="Whats needs to be done?" className="input-ele" onChange={onChangeUserInput} value={userInput} />
      <button type="button" className="add-btn" onClick={onAddtodos}>Add</button>
      <h1 className="todo-items-heading">
        My <span className="todo-items-heading-subpart">Tasks</span>
      </h1>
      <ul class="todo-items-container" type="none" id="todoItemsContainer">
        {todos.map(item => {
          return <TodoCard key={item.id} todoItem={item} checkableStatus={checkableStatus} deleteTodo={deleteTodo} />
        })}

      </ul>
      <OverlayTrigger placement="top" overlay={renderSaveTooltip}>
        <button className="button" onClick={onSave}>Save</button>
      </OverlayTrigger>
      <OverlayTrigger placement="top" overlay={renderClearTooltip}>
        <button className="button1" onClick={onClearStorage}>Clear</button>
      </OverlayTrigger>
    </div>
  )
}
export default App;