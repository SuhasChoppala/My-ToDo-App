"use client";

import { useState, useEffect } from "react";
import TodoContext from "../services/todoContext";
import CreateTodo from '../components/createTodo';
import Todo from "../components/todo";
import { useRef } from "react";
import Image from "next/image";

function TodoApp() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: "Buy groceries",
      description: "Pick up milk, eggs, and bread from the store.",
      bgColor: "bg-amber-200",
      isCompleted: false
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
      isCompleted: false
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
      isCompleted: false
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
  const [selectedFilter, setSelectedFilter] = useState('all');

  useEffect(() => {
    sortTodos(selectedFilter);
  }, [todos, selectedFilter]);

  const removeTodo = (id) => {
    setFilteredTodos(filteredTodos.filter(todo => todo.id !== id));
  }

  const toggleStatus = (id) => {
    const temp = todos.map(todo => {
      if (todo.id == id) {
        return { ...todo, isCompleted: !todo.isCompleted };
      } else {
        return todo;
      }
    });
    setFilteredTodos(temp);
    setTodos(temp)
  }

  const searchInput = useRef(null);
  const sortTodosByFilter = useRef(null);

  const searchTodos = (searchString) => {
    const temp = todos.filter(todo => todo.title.toLowerCase().includes(searchString.toLowerCase()));
    setFilteredTodos(temp);
  }

  const sortTodos = (filter) => {
    setSelectedFilter(filter)
    if (filter === 'completed') {
      const temp = todos.filter(todo => todo.isCompleted == true);
      setFilteredTodos(temp);
    } else if (filter === 'notCompleted') {
      const temp = todos.filter(todo => todo.isCompleted == false);
      setFilteredTodos(temp);
    } else if (filter === 'all') {
      setFilteredTodos(todos);
    }
  }

  const toggleDarkMode = () => {
    setBodyColor((prevColor) => (prevColor === 'black' ? 'white' : 'black'));
  }

  const editTodo = (editedTemp) => {
    const updatedTodo = todos.map(todo => {
      if (todo.id == editedTemp.id) {
        return { ...todo, ...editedTemp };
      }

      else {
        return todo;
      }
    })

    setTodos(updatedTodo);
    setFilteredTodos(updatedTodo);
  }



  return (
    <div className={`min-h-screen flex justify-center bg-${bodyColor}`}>
      <TodoContext.Provider value={{ removeTodo, toggleStatus, filteredTodos, setFilteredTodos, setIsCreateModalVisible, editTodo }}>

        <div className="sm:container mx-auto mobiles:mx-0">
          <div className="flex items-center justify-between mobiles:justify-between mobiles:pr-5 sm:pr-5 mobiles:items-start">
            <div className="flex flex-col mobiles:flex-col mobiles:mt-2 mobiles:gap-4 sm:flex-row justify-between px-5 pt-5 items-center">
              <h1 className={`text-3xl ${bodyColor == 'black' ? 'text-neutral-400' : 'text-black font-semibold'} mobiles:text-[31px] text-left`}>My Task Trackr</h1>
            </div>
            <div className="flex items-center mobiles:gap-3 sm:gap-5">
              <div className="flex items-center pt-5 mobiles:mt-3.5">
                <div onClick={toggleDarkMode} className={`cursor-pointer flex items-center`}>
                  {bodyColor === 'black' ?
                    <Image src='/dark.png' alt="dark-mode" height={24} width={24} />
                    : <Image src='/dark2.png' alt="dark-mode" height={24} width={24} />}
                </div>
              </div>
              <div className="flex items-center pt-5 mobiles:mt-3.5">
                <button onClick={() => setIsCreateModalVisible(true)}>
                  {bodyColor === 'black' ? <Image
                    src="/add.png"
                    alt="addIcon"
                    width={30}
                    height={30}
                  /> :
                    <Image
                      src="/add-black.png"
                      alt="addIcon"
                      width={30}
                      height={30}
                      style={{ filter: 'contrast(200%)' }}
                    />
                  }
                </button>
              </div>
            </div>
          </div>
          <div className="w-full flex px-6 mobiles:gap-3 my-4 pt-3 md:gap-5 lg:w-96">
            <div className="w-1/2">
              <div className="relative w-full">
                <input
                  ref={searchInput}
                  onChange={(searchInput) => searchTodos(searchInput.currentTarget.value)}
                  placeholder="Search task"
                  className={`w-full pr-8 ${bodyColor == 'black' ? 'bg-black border border-neutral-700 text-neutral-400 font-extralight' : 'bg-white border border-black text-black font-normal'} px-3 py-0.5 rounded mobiles:w-full mobiles:px-1.5 pb-1 py-1 h-8`}
                />
                <span className="absolute right-2 top-1/2 transform -translate-y-1/2 mobiles:mt-0.5 lg:mt-0.5">
                  {bodyColor === 'black' ?
                    <Image src='/search.png' width={16} height={16} alt="search-icon" />
                    : <Image src='/search2.png' width={16} height={16} alt="search-icon" />
                  }
                </span>
              </div>


            </div>
            <div className="w-1/2">
              <div className="relative w-full">
                <select
                  ref={sortTodosByFilter}
                  onChange={(sortTodosByFilter) => sortTodos(sortTodosByFilter.currentTarget.value)}
                  className={`w-full ${bodyColor == 'black' ? 'bg-black border border-neutral-700 text-neutral-400 font-extralight' : 'bg-white border border-black text-black font-normal'} px-3 py-0.5 rounded mobiles:w-full mobiles:px-1.5 h-8 font-extralight pr-10 appearance-none`}>
                  <option value="" disabled selected hidden>Filter</option>
                  <option className="hover:bg-red-500" value='all'>All</option>
                  <option className="hover:bg-red-500" value='completed'>Completed</option>
                  <option className="hover:bg-red-500" value='notCompleted'>Not Completed</option>
                </select>
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className={`w-4 h-4 ${bodyColor == 'black' ? 'text-neutral-400' : 'text-black'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </span>
              </div>
            </div>
          </div>

          {filteredTodos && filteredTodos.length > 0 ?

            (<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 mobiles:pt-2">
              {filteredTodos.map(filteredTodo => (
                <Todo key={filteredTodo.id} filteredTodo={filteredTodo}></Todo>
              ))}
            </div>) :

            (<div className="w-80 flex justify-center items-center xl:w-full">
              {selectedFilter === 'all' && <p className="text-neutral-400 text-center">Nothing here yet, start by adding your first task!</p>}
              {selectedFilter === 'completed' && <p className="text-neutral-400 text-center">No completed tasks</p>}
              {selectedFilter === 'notCompleted' && <p className="text-neutral-400 text-center">No incomplete tasks</p>}
            </div>)}

        </div>

        {isCreateModalVisible && <CreateTodo />}

      </TodoContext.Provider>
    </div>

  )
}

export default TodoApp;