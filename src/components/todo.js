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
    }

    const editTodo = (editTodoId) => {
        setIsEditModalVisible(true);
        setTodoId(editTodoId);
    }

    const { toggleStatus } = useContext(TodoContext);

    return (
        <div class={`${filteredTodo.bgColor} ${filteredTodo.isCompleted ? 'opacity-20' : ''} h-52 border-2 border-transparent hover:border-black rounded-lg shadow-lg p-3.5 transition duration-300 transform hover:scale-105`}>
            <div>
                <h3 class={`text-lg font-bold text-gray-900 mb-2 ${filteredTodo.isCompleted ? 'line-through' : ''}`}>{filteredTodo.title}</h3>
            </div>
            <p class={`text-black mb-2 h-12 max-h-12 max-w-80 ${filteredTodo.isCompleted ? 'line-through' : ''}`}>{filteredTodo.description}</p>
            <p className='text-black font-bold mb-4'>Status: <span className='font-normal'>{filteredTodo.isCompleted ? 'Completed' : 'Not Completed'}</span></p>
            <div className='flex justify-between items-center'>
                <div class="flex items-center gap-3 lg:gap-2">
                    <button className='relative border border-black p-2 rounded-full transition-transform transform hover:scale-110 hover:bg-black hover:border-transparent hover:shadow-lg flex items-center justify-center group lg:p-0.5 xl:p-2'>
                        <Image
                            onClick={() => editTodo(filteredTodo.id)}
                            src="/edit-icon.png"
                            alt="edit"
                            width={20}
                            height={20}
                            className='transition-transform duration-300 ease-in-out group-hover:opacity-100 group-hover:invert lg:w-4 h-4 xl:w-5 h-5'
                        />
                    </button>
                    <button
                        onClick={deleteTodo}
                        className='relative border border-black p-2 rounded-full transition-transform transform hover:scale-110 hover:bg-black hover:border-transparent hover:shadow-lg flex items-center justify-center group lg:p-0.5 xl:p-2'>
                        <Image
                            src="/delete-icon.png"
                            alt="delete"
                            width={20}
                            height={20}
                            className='transition-transform duration-300 ease-in-out group-hover:opacity-100 group-hover:invert lg:w-4 h-4 xl:w-5 h-5'
                        />
                    </button>


                    {isDeleteModalVisible && <DeleteTodo filteredTodo={filteredTodo} setIsDeleteModalVisible={setIsDeleteModalVisible} />}
                </div>
                <div>
                    <label class="inline-flex items-center space-x-2">
                        <span class="text-black font-semibold">Mark as Completed</span>
                        <input
                            onChange={() => toggleStatus(filteredTodo.id)}
                            type="checkbox"
                            checked={filteredTodo.isCompleted}
                            class="h-5 w-5 rounded-full border border-black appearance-none checked:bg-transparent checked:border-black relative checked:after:block checked:after:content-['✓'] checked:after:text-black checked:after:text-sm checked:after:font-extrabold checked:after:absolute checked:after:left-1 checked:after:items-baseline"
                        />
                    </label>
                </div>
            </div>

            {isEditModalVisible && <EditTodo setIsEditModalVisible={setIsEditModalVisible} filteredTodo={filteredTodo} />}

        </div>
    )
}

export default Todo;