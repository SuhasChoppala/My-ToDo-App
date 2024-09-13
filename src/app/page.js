"use client";

import { useState } from "react";
import TodoContext from "../services/todoContext";
import Todo from "../components/todo";
import { useRef } from "react";
import Image from "next/image";
import CreateTodo from '../components/createTodo';

function TodoApp() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: "Buy groceries",
      description: "Pick up milk, eggs, and bread from the store.",
      bgColor: "bg-amber-200",
      isCompleted: true
    },
    {
      id: 2,
      title: "Finish project report",
      description: "Complete the final section of the CRM project report.",
      bgColor: "bg-red-400",
      isCompleted: false
    },
    {
      id: 3,
      title: "Workout",
      description: "Go for a 30-minute run and do strength training.",
      bgColor: "bg-indigo-300",
      isCompleted: true
    },
    {
      id: 4,
      title: "Read a book",
      description: "Finish reading 'Atomic Habits' by James Clear.",
      bgColor: "bg-fuchsia-200",
      isCompleted: false
    },
    {
      id: 5,
      title: "Call parents",
      description: "Catch up with mom and dad this evening.",
      bgColor: "bg-orange-300",
      isCompleted: true
    },
    {
      id: 6,
      title: "Call parents",
      description: "Catch up with mom and dad this evening.",
      bgColor: "bg-stone-300",
      isCompleted: false
    }
  ]
  );

  const [filteredTodos, setFilteredTodos] = useState(todos);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [bodyColor, setBodyColor] = useState('black');

  const removeTodo = (id) => {
    setFilteredTodos(filteredTodos.filter(todo => todo.id !== id));
  }

  const toggleStatus = (id) => {
    const temp = filteredTodos.map(todo => {
      if (todo.id == id) {
        return { ...todo, isCompleted: !todo.isCompleted };
      } else {
        return todo;
      }
    });
    setFilteredTodos(temp);
  }

  const searchInput = useRef(null);
  const sortTodosByFilter = useRef(null);

  const searchTodos = (searchString) => {
    const temp = todos.filter(todo => todo.title.toLowerCase().includes(searchString.toLowerCase()));
    setFilteredTodos(temp);
  }

  const sortTodos = (selectedFilter) => {
    if (selectedFilter === 'completed') {
      const temp = filteredTodos.filter(todo => todo.isCompleted == true);
      setFilteredTodos(temp);
    } else if (selectedFilter === 'notCompleted') {
      const temp = todos.filter(todo => todo.isCompleted == false);
      setFilteredTodos(temp);
    }
  }

  const toggleDarkMode = () => {
    setBodyColor((prevColor) => (prevColor === 'black' ? 'white' : 'black'));
  }



  return (
    <div className={`min-h-screen flex justify-center bg-${bodyColor}`}>
      <TodoContext.Provider value={{ removeTodo, toggleStatus, filteredTodos, setFilteredTodos, setIsCreateModalVisible }}>

        <div className="sm:container mx-auto mobiles:mx-0">
          <div className="flex items-center justify-between mobiles:justify-between mobiles:pr-5 sm:pr-5 mobiles:items-start">
            <div className="flex flex-col mobiles:flex-col mobiles:mt-2 mobiles:gap-4 sm:flex-row justify-between px-5 pt-5 my-10 gap-20 items-center">
              <h1 className={`text-3xl ${bodyColor == 'black' ? 'text-neutral-400' : 'text-black'} mobiles:text-xl`}>My ToDo App</h1>
              <div className="sm:flex flex-row gap-4">
                <input
                  ref={searchInput}
                  onChange={(searchInput) => searchTodos(searchInput.currentTarget.value)}
                  placeholder="Search task"
                  className={`w-full ${bodyColor == 'black' ? 'bg-black border border-neutral-700 text-neutral-400 font-extralight' : 'bg-white border border-black text-black font-normal'} px-3 py-0.5 rounded mobiles:w-full mobiles:px-1 py-1 h-8`}
                />

                <div className="relative w-full mobiles:mt-4">
                  <select
                    ref={sortTodosByFilter}
                    onChange={(sortTodosByFilter) => sortTodos(sortTodosByFilter.currentTarget.value)}
                    className={` w-full ${bodyColor == 'black' ? 'bg-black border border-neutral-700 text-neutral-400 font-extralight' : 'bg-white border border-black text-black font-normal'} px-3 py-0.5 rounded mobiles:w-full mobiles:px-1 h-8 font-extralight pr-10 appearance-none`}>
                    <option value="" disabled selected hidden>Filter</option>
                    <option className="hover:bg-red-500" value='completed'>Completed</option>
                    <option className="hover:bg-red-500" value='notCompleted'>Not Completed</option>
                  </select>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className={`w-4 h-4 ${bodyColor == 'black' ? 'text-neutral-400' : 'text-black'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </span>
                </div>
                <div onClick={toggleDarkMode} className={`cursor-pointer flex items-center w-80 flex justify-center items-center text-center rounded-full ${bodyColor == 'black' ? 'border border-neutral-400 border-1' : 'border border-black border-1'}`}>
                  <Image src='/dark.png' alt="dark-mode" height={20} width={20} className={`${bodyColor == 'black' ? '' : 'filter invert'}`} />
                  <span className={`ml-2 text-sm ${bodyColor == 'black' ? 'text-neutral-400' : 'text-black'}`}>{bodyColor == 'black' ? 'Light Mode' : 'Dark Mode'}</span>
                </div>

              </div>
            </div>
            <div className="flex items-center my-10 pt-5 mobiles:mt-2">
              <button onClick={() => setIsCreateModalVisible(true)}>
                <Image
                  src="/add.png"
                  alt="addIcon"
                  width={30}
                  height={30}
                  className={`${bodyColor === 'white' ? 'filter invert' : ''}`}
                />
              </button>

            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
            {filteredTodos.map(filteredTodo => (
              <Todo key={filteredTodo.id} filteredTodo={filteredTodo}></Todo>
            ))}
          </div>
        </div>

        {isCreateModalVisible && <CreateTodo />}

      </TodoContext.Provider>
    </div>

  )
}

export default TodoApp;