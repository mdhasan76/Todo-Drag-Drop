import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineArrowRight, AiOutlineArrowLeft, AiOutlinePlus } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';

const TodoSec = () => {
    const [todoInput, setTodoInput] = useState("");
    const [showInput, setShowInput] = useState(false);
    const [todoCatagory, setTodoCategory] = useState("");
    const [todoList, setTodoList] = useState([]);
    const [todo, setTodo] = useState([]);
    const [inProgress, setInProgress] = useState([]);
    const [done, setDone] = useState([]);
    const [target, setTarget] = useState({
        cardId: "",
        boardId: ""
    });
    // const [todoCateBorder, setTodoCateBorder] = useState({});
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

    //todo update
    const updateTodo = (data) => {
        // console.log(data);
        const dataForUpdate = todoList.find(el => el.id === data.id);
        const update = window.prompt("Update Todo", data.text);
        if (update === null) {
            return
        }
        const newArr = todoList.map(el => {
            if (el.id === data.id) {
                dataForUpdate.text = update;
            }
            return el
        })
        setTodoList(newArr)
        filteredTodo(newArr)

    }
    //deteletodo
    const deleteTodo = (id) => {
        const findTodo = todoList.filter(el => el.id !== id);
        setTodoList(findTodo);
        filteredTodo(findTodo)
    }

    //Get the todo data 
    const handleTodoSubmit = (e) => {
        e.preventDefault();
        if (todoInput === "") {
            return
        }
        setShowInput(false)
        const todoData = { text: todoInput, id: uuidv4(), category: todoCatagory, isDraging: false };
        setTodoList([...todoList, todoData])
        filteredTodo([...todoList, todoData])
        setTodoInput("")
        // console.log(todoData, todoList)
        e.target.reset()
    }

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
        // console.log("todo", todo, "inprogress", inProgress, "done", done)
    }

    //left arrow btn handler
    const handleLeftArrow = (data) => {
        if (data.category === "in-progress") {
            const updatedArray = todoList.map(item => {
                if (item.text === data.text) {
                    return { ...item, category: 'todo' };
                }
                return item;
            });
            setTodoList(updatedArray);
            filteredTodo(updatedArray);
        }
        else {
            const updatedArray = todoList.map(item => {
                if (item.text === data.text) {
                    return { ...item, category: 'in-progress' };
                }
                return item;
            });
            setTodoList(updatedArray);
            filteredTodo(updatedArray);
        }
    }

    //right arrow btn handler
    const handleRightArrow = (data) => {
        if (data.category === "todo") {
            const updatedArray = todoList.map(item => {
                if (item.text === data.text) {
                    return { ...item, category: 'in-progress' };
                }
                return item;
            });
            setTodoList(updatedArray);
            filteredTodo(updatedArray);
        }
        else {
            const updatedArray = todoList.map(item => {
                if (item.text === data.text) {
                    return { ...item, category: 'done' };
                }
                return item;
            });
            setTodoList(updatedArray);
            filteredTodo(updatedArray);
        }
    }

    const BorderCompo = () => {
        return <div className='h-1 bg-indigo-700 w-full rounded-bl-lg rounded-br-lg'></div>
    }

    const dragEnded = (boardId, cardId) => {
        let s_bIndex, s_cIndex, t_bIndex, t_cIndex;
        // console.log("droped")

        s_cIndex = todoList.findIndex(el => el.id === cardId);
        if (s_cIndex < 0) return;
        s_bIndex = todoList.findIndex(el => el.id === boardId);
        // if (s_bIndex < 0) return;
        t_cIndex = todoList.findIndex(el => el.id === target.cardId);
        if (t_cIndex < 0) return;
        t_bIndex = todo.findIndex(el => el.id === boardId);
        const tempList = [...todoList]
        const sourceCard = todoList.find(el => el.id === cardId);
        sourceCard.category = target.boardId;
        console.log(sourceCard);
        tempList.splice(s_cIndex, 1);
        tempList.splice(t_cIndex, 0, sourceCard);
        tempList.forEach(el => {
            el.isDraging = false
        })
        setTodoList([...tempList]);
        filteredTodo([...tempList])
        console.log(tempList);

        setTarget({
            cardId: "",
            boardId: "",
        });
    }

    const dragEntered = (boardId, cardId) => {
        // console.log();
        // if (target.cardId === cardId) return;
        setTarget({ boardId, cardId })
        todoList.forEach(element => {
            if(element.id === cardId){
                element.isDraging = true;
                console.log(cardId);
            } else {
                element.isDraging = false;
            }

        });
    }
    console.log(target);

    return (<div className='w-[1152px] p-7 relative'>
        <div className='flex gap-2 '>

            <div className='min-w-[350px] overflow-y-hidden p-3 bg-[#f6f8fa] border border-gray-200 rounded-lg relative'>
                <div>
                    <div className='flex justify-between items-center'>
                        <div className='flex items-center'>
                            <div className='h-4 w-4  bg-[#bf3989] rounded-full mr-2'></div>
                            <p className='mr-2 text-lg font-semibold'>Todo</p>
                            <p className='bg-gray-200  px-2 rounded-full'>{todo.length}</p>
                        </div>
                        <div className=''>
                            <BsThreeDots />
                        </div>
                    </div>
                    <p className='text-[rgb(87, 96, 106)] text-sm py-2'>This item hasn't been started</p>
                </div>
                <div className=' h-[360px] min-h-[360px] overflow-y-auto'
                >
                    {
                        todo.map((data, i) => <div key={i} className=" bg-gradient-to-bl from-fuchsia-400 to-pink-400 p-3 rounded-lg mb-2 text-white"
                            onDragEnd={() => dragEnded("todo", data.id)}
                            onDragEnter={() => dragEntered("todo", data.id)}
                            draggable
                        >
                            <div className='flex justify-between'>
                                <div className='flex'>
                                    <div onClick={() => deleteTodo(data.id)} className='bg-red-500 p-2 rounded-full ml-2'>
                                        <MdDelete />
                                    </div>
                                    <div onClick={() => updateTodo(data)} className='bg-gray-500 p-2 rounded-full ml-2'>
                                        <AiFillEdit />
                                    </div>
                                </div>
                                <div onClick={() => handleRightArrow(data)} className='bg-gray-500 p-2 rounded-full ml-2'>
                                    <AiOutlineArrowRight className='' />
                                </div>
                            </div>
                            <p className='p-2'>{data.text}</p>
                            {
                                data.isDraging ? <BorderCompo/> : null
                            }
                        </div>)
                    }
                    {
                        showInput === true && todoCatagory === "todo" && <BorderCompo />
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
                            <p className='bg-gray-200  px-2 rounded-full'>{inProgress.length}</p>
                        </div>
                        <div className=''>
                            <BsThreeDots />
                        </div>
                    </div>
                    <p className='text-[rgb(87, 96, 106)] text-sm py-2'>This is actively being worked on
                    </p>
                </div>

                <div className=' h-[360px] min-h-[360px] overflow-y-auto'
                >
                    {
                        inProgress.map((data, i) => <div key={i} className="bg-gradient-to-bl to-[#bf8700] from-[#e8ca84] p-3 rounded-lg mb-2 text-white"
                            onDragEnd={() => dragEnded("in-progress", data.id)}
                            onDragEnter={() => dragEntered("in-progress", data.id)}
                            draggable
                        >
                            <div className='flex justify-between'>
                            <div className='flex'>
                                    <div onClick={() => deleteTodo(data.id)} className='bg-red-500 p-2 rounded-full ml-2'>
                                        <MdDelete />
                                    </div>
                                    <div onClick={() => updateTodo(data)} className='bg-gray-500 p-2 rounded-full ml-2'>
                                        <AiFillEdit />
                                    </div>
                                </div>
                                <div className='flex'>
                                    <div onClick={() => handleLeftArrow(data)} className='bg-gray-500 p-2 rounded-full'>
                                        <AiOutlineArrowLeft />
                                    </div>
                                    <div onClick={() => handleRightArrow(data)} className='bg-gray-500 p-2 rounded-full ml-2'>
                                        <AiOutlineArrowRight className='' />
                                    </div>
                                </div>
                            </div>
                            <p className='p-2'>{data.text}</p>
                            {
                                data.isDraging ? <BorderCompo/> : null
                            }
                        </div>)
                    }
                    {
                        showInput === true && todoCatagory === "in-progress" && <BorderCompo />
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
                            <p className='bg-gray-200  px-2 rounded-full'>{done.length}</p>
                        </div>
                        <div className=''>
                            <BsThreeDots />
                        </div>
                    </div>
                    <p className='text-[rgb(87, 96, 106)] text-sm py-2'>This has been completed</p>
                </div>
                <div className=' h-[360px] min-h-[360px] overflow-y-auto [&>*last-child]:mb-10'>
                    {
                        done.map((data, i) => <div key={i} className="bg-gradient-to-bl 
                        to-[#2da44e] from-lime-400 p-3 rounded-lg mb-2 text-white"
                            onDragEnd={() => dragEnded("done", data.id)}
                            onDragEnter={() => dragEntered("done", data.id)}
                            draggable
                        >
                            <div className='flex justify-between'>
                            <div className='flex'>
                                    <div onClick={() => deleteTodo(data.id)} className='bg-red-500 p-2 rounded-full ml-2'>
                                        <MdDelete />
                                    </div>
                                    <div onClick={() => updateTodo(data)} className='bg-gray-500 p-2 rounded-full ml-2'>
                                        <AiFillEdit />
                                    </div>
                                </div>
                                <div onClick={() => handleLeftArrow(data)} className='bg-gray-500 p-2 rounded-full'>
                                    <AiOutlineArrowLeft />
                                </div>
                            </div>
                            <p className='p-2'>{data.text}</p>
                            {
                                data.isDraging ? <BorderCompo/> : null
                            }
                        </div>)
                    }
                    {
                        showInput === true && todoCatagory === "done" && <BorderCompo />
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