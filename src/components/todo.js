"use client";
import Image from 'next/image';
import TodoContext from '../services/todoContext';
import { useContext } from 'react';
import DeleteTodo from '../components/deleteTodo';
import { useState } from 'react';
import EditTodo from '../components/editTodo';

function Todo(props) {
    const { filteredTodo } = props;

    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [todoId, setTodoId] = useState();

    const deleteTodo = () => {
        setIsDeleteModalVisible(true);
    };

    const editTodo = (editTodoId) => {
        setIsEditModalVisible(true);
        setTodoId(editTodoId);
    };

    const { toggleStatus } = useContext(TodoContext);

    return (
        <div className={`${filteredTodo.bgColor} ${filteredTodo.isCompleted ? 'opacity-20' : ''} p-3.5 h-52 border-2 border-transparent hover:border-black rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300`}>
            <div>
                <h3 className={`mb-2 text-lg font-bold text-gray-900 tablets:mb-1 ${filteredTodo.isCompleted ? 'line-through' : ''}`}>{filteredTodo.title}</h3>
            </div>
            <p className={`mb-2 h-12 max-h-12 max-w-80 text-black ${filteredTodo.isCompleted ? 'line-through' : ''} tablets:mb-0`}>{filteredTodo.description}</p>
            <p className="mb-4 font-bold text-black md:mb-2 tablets:mb-2 xl:mb-4">Status: <span className="font-normal">{filteredTodo.isCompleted ? 'Completed' : 'Not Completed'}</span></p>
            <div className="flex items-center justify-between tablets:flex tablets:flex-col tablets:items-start tablets:gap-y-1.5 tablets:my-2 lg:flex lg:flex-col lg:items-start lg:gap-y-1 xl:flex xl:items-center xl:justify-between xl:flex-row">
                <div className="flex items-center gap-3 md:gap-2 lg:gap-2">
                    <button className="relative flex items-center justify-center p-2 transition-transform transform border border-black rounded-full hover:scale-110 hover:bg-black hover:border-transparent hover:shadow-lg group tablets:py-1 tablets:px-1 md:px-2.5 lg:py-1 lg:px-1 xl:p-2">
                        <Image
                            onClick={() => editTodo(filteredTodo.id)}
                            src="/edit-icon.png"
                            alt="edit"
                            width={20}
                            height={20}
                            className="transition-transform duration-300 ease-in-out group-hover:opacity-100 group-hover:invert lg:w-5 h-5 xl:w-5 h-5"
                        />
                    </button>
                    <button
                        onClick={deleteTodo}
                        className="relative flex items-center justify-center p-2 transition-transform transform border border-black rounded-full hover:scale-110 hover:bg-black hover:border-transparent hover:shadow-lg group tablets:py-1 tablets:px-1 md:px-2.5 lg:py-1 lg:px-1 xl:p-2"
                    >
                        <Image
                            src="/delete-icon.png"
                            alt="delete"
                            width={20}
                            height={20}
                            className="transition-transform duration-300 ease-in-out group-hover:opacity-100 group-hover:invert lg:w-5 h-5 xl:w-5 h-5"
                        />
                    </button>

                    {isDeleteModalVisible && <DeleteTodo filteredTodo={filteredTodo} setIsDeleteModalVisible={setIsDeleteModalVisible} />}
                </div>
                <div>
                    <label className="inline-flex items-center space-x-2">
                        <span className="font-semibold text-black tablets:text-sm">Mark as Completed</span>
                        <input
                            onChange={() => toggleStatus(filteredTodo.id)}
                            type="checkbox"
                            checked={filteredTodo.isCompleted}
                            className="h-5 w-5 border border-black rounded-full appearance-none checked:bg-transparent checked:border-black relative checked:after:block checked:after:content-['✓'] checked:after:text-black checked:after:text-sm checked:after:font-extrabold checked:after:absolute checked:after:left-1 checked:after:items-baseline"
                        />
                    </label>
                </div>
            </div>

            {isEditModalVisible && <EditTodo setIsEditModalVisible={setIsEditModalVisible} filteredTodo={filteredTodo} />}
        </div>
    );
}

export default Todo;
