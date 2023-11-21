import React, { useEffect, useState } from "react";
import TodoListDisplay from "./TodoListDisplay";
import TodoAddForm from "./TodoAddForm";
import {fetchRequestedData} from "../utils/DataFetch";
import todosUrl from "../utils/ManageURL";

const Dashboard = () => {
  const [todos, setTodos] = useState([]);

  const fetchAllTodos = async () =>{
    const headers = {"Content-Type":"application/json"};
    
    const allTodos = await fetchRequestedData(
      todosUrl,
      "GET",
      headers
    );

    if(allTodos.success) {
      setTodos(allTodos.todos);
    }
  }

  useEffect(()=>{
    fetchAllTodos();
  }, [])
  return (
    <>
      <div className="flex justify-between items-center w-full h-screen bg-[url('images/todoBackground.jpg')] bg-opacity-50 p-10">
        <TodoListDisplay todos={todos} setTodos={setTodos} />
        <TodoAddForm todos={todos} setTodos={setTodos} />
      </div>
    </>
  );
};

export default Dashboard;
