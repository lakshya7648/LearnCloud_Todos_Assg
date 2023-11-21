import React, { useState } from "react";
import ButtonSpinner from "./Spinners/ButtonSpinner";
import { fetchRequestedData } from "../utils/DataFetch";
import todosUrl from "../utils/ManageURL";

const TodoAddForm = ({todos, setTodos}) => {
  const [todoDetail, setTodoDetail] = useState({ title: "", link: "" });
  const [loading, setLoading] = useState(false);

  const updateTodoDetails = (e) => {
    setTodoDetail({ ...todoDetail, [e.target.name]: e.target.value });
  };

  const addTodo = async (e) => {
    e.preventDefault();
    setLoading(true);

    // clearing out the value of input elements : title and link
    const elements = document.querySelectorAll("#title, #link");
    elements.forEach((element)=>{
      element.value = "";
    })

    
    // saving the todo in database
    const headers = {"Content-Type":"application/json"};
    const todo = await fetchRequestedData(todosUrl, "POST", headers, todoDetail);
    
    // updating the ui
    if(todo.success) {
      setTodos((arr)=>{
        return [...arr, todo.todo];
      });
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-white px-8 py-4 rounded-lg shadow-lg w-80">
        <h1 className="text-3xl text-gray-800 font-bold mx-2 px-2 text-center mb-6">
          Add Todos
        </h1>
        <form onSubmit={addTodo}>
          <div className="mb-6">
            <label
              htmlFor="title"
              className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="bg-white border border-gray-500 text-gray-900 text-sm rounded-lg outline-none focus:ring-1 focus:ring-violet-500 focus:border-violet-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
              placeholder="Todo Title"
              required
              minLength={3}
              onChange={updateTodoDetails}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="link"
              className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
            >
              Link
            </label>
            <input
              type="text"
              id="link"
              name="link"
              className="bg-white border border-gray-500 text-gray-900 text-sm rounded-lg outline-none focus:ring-1 focus:ring-violet-500 focus:border-violet-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
              placeholder="Todo Link"
              required
              minLength={3}
              onChange={updateTodoDetails}
            />
          </div>
          {!loading && (
            <button className="w-full mb-6 mt-4 mx-auto px-6 py-2 rounded-full shadow-2xl bg-violet-700 hover:bg-violet-800 text-white font-semibold text-xl transition-all">
              Add
            </button>
          )}
          {loading && <ButtonSpinner message={"Adding..."} />}
        </form>
      </div>
    </>
  );
};

export default TodoAddForm;
