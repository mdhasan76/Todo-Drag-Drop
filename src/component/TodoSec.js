import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineArrowRight, AiOutlineArrowLeft, AiOutlinePlus } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs"
// import { AuthContext } from '../routes/AuthProvider';

const TodoSec = () => {
    const [todoInput, setTodoInput] = useState("");
    const [showInput, setShowInput] = useState(false);
    const [todoCatagory, setTodoCategory] = useState("");
    const [todoList, setTodoList] = useState([]);
    const [todo, setTodo] = useState([]);
    const [inProgress, setInProgress] = useState([]);
    const [done, setDone] = useState([]);
    const inputRef = useRef(null);

    // handle outside click for hidden the input
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleClickOutside = (event) => {
        if (inputRef.current && !inputRef.current.contains(event.target)) {
            handleOutsideClick();
        }
    };

    const handleOutsideClick = () => {
        // console.log('Clicked outside the element');
        setShowInput(false)
    };


    //Get the todo data 
    const handleTodoSubmit = (e) => {
        e.preventDefault();
        setShowInput(false)
        const todoData = { text: todoInput, category: todoCatagory };
        setTodoList([...todoList, todoData])
        filteredTodo([...todoList, todoData])
        // console.log(todoData, todoList)
        e.target.reset()
    }
    // console.log(todoList)
    //specific card data
    const todoCate = (val) => {
        setShowInput(true);
        setTodoCategory(val);
    }

    //filtered todo
    const filteredTodo = (arr) => {
        const todo = arr.filter(data => data.category === "todo");
        const inProgress = arr.filter(data => data.category === "in-progress");
        const done = arr.filter(data => data.category !== "todo" && data.category !== "in-progress");
        setTodo(todo)
        setInProgress(inProgress)
        setDone(done)
        console.log("todo", todo, "inprogress", inProgress, "done", done)
    }
    return (<div className='w-[1152px] p-7 relative'>
        <div className='flex gap-2 '>

            <div className='min-w-[350px] overflow-y-hidden p-3 bg-[#f6f8fa] border border-gray-200 rounded-lg relative'>
                <div>
                    <div className='flex justify-between items-center'>
                        <div className='flex items-center'>
                            <div className='h-4 w-4  bg-[#bf3989] rounded-full mr-2'></div>
                            <p className='mr-2 text-lg font-semibold'>Todo</p>
                            <p className='bg-gray-200  px-2 rounded-full'>1</p>
                        </div>
                        <div className=''>
                            <BsThreeDots />
                        </div>
                    </div>
                    <p className='text-[rgb(87, 96, 106)] text-sm py-2'>This item hasn't been started</p>
                </div>
                <div className=' h-[360px] min-h-[360px] overflow-y-scroll'>
                    {
                        todo.map((data, i) => <div key={i} className="bg-[#9e6186] p-3 rounded-lg mb-2 text-white">
                            <div className='flex justify-end'>
                                <div className='bg-gray-500 p-2 rounded-full'>
                                <AiOutlineArrowLeft  />
                                </div>
                                <div className='bg-gray-500 p-2 rounded-full ml-2'>
                                <AiOutlineArrowRight className='' />
                                </div>
                            </div>
                            <p className='p-2'>{data.text}</p>
                        </div>)
                    }
                </div>
                <div className='bg-[#f6f8fa] absolute bottom-0 rounded-lg left-0 hover:bg-gray-200 duration-300 w-full hover:cursor-pointer'>
                    <button onClick={() => todoCate("todo")} className='p-3 w-full text-left font-semibold'><AiOutlinePlus className='inline-block' /> Add item</button>
                </div>
            </div>

            {/* card 2 */}
            <div className='min-w-[350px] overflow-y-hidden p-3 bg-[#f6f8fa] border border-gray-200 rounded-lg relative'>
                <div>
                    <div className='flex justify-between'>
                        <div className='flex items-center'>
                            <div className='h-4 w-4 bg-[#bf8700] rounded-full mr-2'></div>
                            <p className='mr-2 text-lg font-semibold'>In Progress</p>
                            <p className='bg-gray-200  px-2 rounded-full'>0</p>
                        </div>
                        <div className=''>
                            <BsThreeDots />
                        </div>
                    </div>
                    <p className='text-[rgb(87, 96, 106)] text-sm py-2'>This is actively being worked on
                    </p>
                </div>
                <div className=' h-[360px] min-h-[360px] overflow-y-scroll'>
                    {
                        inProgress.map((data, i) => <div key={i} className="bg-[#a78b49] p-3 rounded-lg mb-2 text-white">
                            <div className='flex justify-end'>
                                <div className='bg-gray-500 p-2 rounded-full'>
                                <AiOutlineArrowLeft  />
                                </div>
                                <div className='bg-gray-500 p-2 rounded-full ml-2'>
                                <AiOutlineArrowRight className='' />
                                </div>
                            </div>
                            <p className='p-2'>{data.text}</p>
                        </div>)
                    }
                </div>
                <div className='bg-[#f6f8fa] absolute bottom-0 rounded-lg left-0 hover:bg-gray-200 duration-300 w-full hover:cursor-pointer'>
                    <button onClick={() => todoCate("in-progress")} className='p-3 w-full text-left font-semibold'><AiOutlinePlus className='inline-block' /> Add item</button>
                </div>
            </div>

            {/* card 3 */}
            <div className='min-w-[350px]  overflow-y-hidden p-3 bg-[#f6f8fa] border border-gray-200 rounded-lg relative'>
                <div>
                    <div className='flex justify-between'>
                        <div className='flex items-center'>
                            <div className='h-4 w-4 bg-[#2da44e] rounded-full mr-2'></div>
                            <p className='mr-2 text-lg font-semibold'>Done</p>
                            <p className='bg-gray-200  px-2 rounded-full'>0</p>
                        </div>
                        <div className=''>
                            <BsThreeDots />
                        </div>
                    </div>
                    <p className='text-[rgb(87, 96, 106)] text-sm py-2'>This has been completed</p>
                </div>
                <div className=' h-[360px] min-h-[360px] overflow-y-scroll'>
                    {
                        done.map((data, i) => <div key={i} className="bg-[#2e6e40] p-3 rounded-lg mb-2 text-white">
                            <div className='flex justify-end'>
                                <div className='bg-gray-500 p-2 rounded-full'>
                                <AiOutlineArrowLeft  />
                                </div>
                                <div className='bg-gray-500 p-2 rounded-full ml-2'>
                                <AiOutlineArrowRight className='' />
                                </div>
                            </div>
                            <p className='p-2'>{data.text}</p>
                        </div>)
                    }
                </div>
                <div className='bg-[#f6f8fa] absolute bottom-0 rounded-lg left-0 hover:bg-gray-200 duration-300 w-full hover:cursor-pointer'>
                    <button onClick={() => todoCate("done")} className='p-3 w-full text-left font-semibold'><AiOutlinePlus className='inline-block' /> Add item</button>
                </div>
            </div>
            <div className='p-3 bg-[#f6f8fa] h-10 border border-gray-200 rounded-lg grid place-content-center'>
                <AiOutlinePlus />
            </div>
        </div>
        <form ref={inputRef} onSubmit={handleTodoSubmit} className={`${showInput ? 'block' : 'hidden'}  duration-300 absolute w-full bottom-9 flex border-2 border-sky-700 rounded-lg`}>
            <div className='p-3 bg-[#f6f8fa] border border-gray-200 rounded-tl-lg rounded-bl-lg grid place-items-center'>
                <AiOutlinePlus />
            </div>
            <input className='w-full rounded-br-lg rounded-tr-lg outline-none p-3 bg-[#f6f8fa]' type="text" onChange={(e) => setTodoInput(e.target.value)} placeholder='Start typing to create a draft, or type # to select a repository' />
        </form>
    </div>
    );
};

export default TodoSec;