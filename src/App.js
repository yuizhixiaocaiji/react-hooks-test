import React, { useCallback, useEffect, useState } from "react";
import "./App.css";

import MyHeader from "./components/Header";
import AddInput from "./components/AddInput";
import TodoItem from "./components/TodoItem";

function App() {
  const [isInputShow, setIsInputShow] = useState(false),
    [todoList, setTodoList] = useState([]);

  useEffect(() => {
    const todoData = JSON.parse(localStorage.getItem("todoData")) || [];
    setTodoList(todoData);
  }, []);

  useEffect(() => {
    localStorage.setItem("todoData", JSON.stringify(todoList));
  }, [todoList]);

  const addItem = useCallback((value) => {
    const dataItem = {
      id: new Date().getTime(),
      content: value,
      completed: false,
    };

    setTodoList((todoList) => [...todoList, dataItem]);
    setIsInputShow(false);
  }, []);
  return (
    <div className="App">
      <MyHeader openInput={() => setIsInputShow(!isInputShow)} />
      <AddInput isInputShow={isInputShow} addItem={addItem} />
      <ul className="todo-list">
        {todoList.map((item, index) => {
          return <TodoItem key={index} data={item} />;
        })}
      </ul>
    </div>
  );
}

export default App;
