'use client'

import { useState, useRef, useContext } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import TodoContext from '../services/todoContext';

export default function CreateTodo() {
    const [open, setOpen] = useState(true)
    const titleInput = useRef(null);
    const descriptionInput = useRef(null);
    const colorInput = useRef(null);

    const { setFilteredTodos, setIsCreateModalVisible, filteredTodos } = useContext(TodoContext);

    const createTodo = () => {
        const title = titleInput.current.value;
        const description = descriptionInput.current.value;
        const color = colorInput.current.value;
        const newTodo = {
            id: filteredTodos.length + 1,
            title,
            description,
            bgColor: color,
            isCompleted: false,
        }
        setFilteredTodos([newTodo, ...filteredTodos]);
        setIsCreateModalVisible(false);
    }

    return (
        <Dialog open={open} onClose={setOpen} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-stone-900 bg-opacity-95 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm mobiles:w-80"
                    >
                        <div className="bg-white px-4 py-5 sm:p-6">
                            <div className="flex flex-col items-center space-y-4">
                                <div className="w-full">
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                                        Title
                                    </label>
                                    <input
                                        ref={titleInput}
                                        id="title"
                                        placeholder="Enter Title"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring focus:ring-indigo-500"
                                    />
                                </div>

                                <div className="w-full">
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                        Description
                                    </label>
                                    <textarea
                                        ref={descriptionInput}
                                        id="description"
                                        placeholder="Enter Description"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring focus:ring-indigo-500 resize-none"
                                        maxLength="78"
                                    />

                                </div>

                                <div className="w-full">
                                    <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-1">
                                        Color
                                    </label>
                                    <select
                                        ref={colorInput}
                                        id="color"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring focus:ring-indigo-500"
                                        defaultValue=""
                                    >
                                        <option value="" disabled hidden>Select Color</option>
                                        <option value="bg-amber-200">Yellow</option>
                                        <option value="bg-red-400">Red</option>
                                        <option value="bg-indigo-300">Blue</option>
                                        <option value="bg-fuchsia-200">Purple</option>
                                        <option value="bg-orange-300">Orange</option>
                                        <option value="bg-stone-300">Gray</option>
                                    </select>
                                </div>
                            </div>


                        </div>
                        <div className="bg-gray-50 justify-center px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button
                                type="button"
                                onClick={createTodo}
                                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                            >
                                Create Task
                            </button>
                            <button
                                type="button"
                                data-autofocus
                                onClick={() => setIsCreateModalVisible(false)}
                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                            >
                                Cancel
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}
