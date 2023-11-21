import React, { useState } from "react";
import { capitalizeFirstLetter } from "../utils/StringUtility";
import todosUrl from "../utils/ManageURL";
import { fetchRequestedData } from "../utils/DataFetch";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const TodoListDisplay = ({ todos, setTodos }) => {
  const strikeThrough = async (e) => {
    let state = "";
    // updating the current array so that state may be updated at front-end
    const updatedTodos = todos.map((todo) => {
      if (todo._id == e.target.value) {
        state = todo.state == "completed" ? "active" : "completed";
        todo.state = state;
      }
      return todo;
    });

    // striking-through the todo if checked or vice-versa
    e.target.nextSibling.classList.toggle("line-through");

    // updating the state of todos list
    setTodos(updatedTodos);

    // updating the state of todo
    await fetchRequestedData(
      todosUrl + "/state",
      "PUT",
      { "Content-Type": "application/json" },
      {
        id: e.target.value,
        state: state,
      }
    );
  };

  const handleOnDragEnd = async (result) => {
    // updating the state on UI with the dragged component
    const [reorderedItem] = todos.splice(result.source.index, 1);
    todos.splice(result.destination.index, 0, reorderedItem);

    setTodos(todos);

    // Getting the previous position of elements and last position of elements
    const prev = result.destination.index - 1 >= 0 ? todos[result.destination.index - 1].position : 0;
    const next = result.destination.index + 1 < todos.length ? todos[result.destination.index + 1].position : 0;
    const finalPos = (prev + next) / 2;

    // Saving the data
    await fetchRequestedData(
      todosUrl+"/position",
      "PUT",
      {"Content-Type":"application/json"},
      {id:result.draggableId, pos:finalPos}
    )
  };

  return (
    <>
      <div className="bg-white px-8 py-2 rounded-lg shadow-lg w-[600px] h-[400px] overflow-auto">
        <h1 className="text-center font-serif text-3xl text-violet-900 font-bold my-3 px-3 py-2">
          Your Todos
        </h1>
        {todos.length == 0 && (
          <span className="block text-md text-gray-600 font-semibold">
            No Todos
          </span>
        )}

        <DragDropContext onDragEnd={handleOnDragEnd}>
          {todos.length != 0 && (
            <Droppable droppableId="todos-list">
              {(provided) => (
                <ul
                  className="todos-list divide divide-y-2 divide-gray-300 mb-3"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {todos.map((todo, index) => {
                    const { _id, title, link, position, state } = todo;
                    return (
                      <Draggable key={_id} draggableId={_id} index={index}>
                        {(provided) => (
                          <li
                            className="px-6 py-4"
                            key={_id}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div className="flex items-center space-x-3">
                              <input
                                checked={state === "completed"}
                                id="todo-item"
                                type="checkbox"
                                value={_id}
                                className="w-4 h-4 text-violet-600 bg-gray-100 border-gray-300 rounded focus:ring-0 focus:ring-violet-500 dark:focus:ring-violet-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                                onChange={strikeThrough}
                              />
                              <a
                                href={link}
                                target="_blank"
                                className={`text-xl text-gray-800 font-semibold hover:text-violet-900 ${
                                  state === "completed" ? "line-through" : ""
                                }`}
                              >
                                {capitalizeFirstLetter(title)}
                              </a>
                            </div>
                          </li>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          )}
        </DragDropContext>
      </div>
    </>
  );
};

export default TodoListDisplay;
