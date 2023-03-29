import React from 'react';
import { AiOutlineArrowRight, AiOutlineArrowLeft, AiOutlinePlus } from "react-icons/ai"

const TodoSec = () => {
    return (<div className='w-[1152px] p-7 '>

        <div className='flex gap-2 overflow-x-auto'>
            <div className='w-[350px] h-[446px] p-3 bg-[#f6f8fa] border border-gray-200 rounded-lg relative'>
                <div>
                    <div className='flex justify-between'>
                        <div className='flex items-center'>
                            <div className='h-4 w-4  bg-[#bf3989] rounded-full mr-2'></div>
                            <p className='mr-2 text-lg font-semibold'>Todo</p>
                            <p className='bg-gray-200  px-2 rounded-full'>1</p>
                        </div>
                        <div className='flex'>
                            <AiOutlineArrowLeft />
                            <AiOutlineArrowRight className='ml-5' />
                        </div>
                    </div>
                    <p className='text-[rgb(87, 96, 106)] text-sm py-2'>This item hasn't been started</p>
                </div>
                <div className='absolute bottom-0 rounded-lg left-0 hover:bg-gray-200 duration-300 w-full hover:cursor-pointer'>
                    <p className='p-3'><AiOutlinePlus className='inline-block' /> Add item</p>
                </div>
            </div>

            {/* card 2 */}
            <div className='w-[350px] h-[446px] p-3 bg-[#f6f8fa] border border-gray-200 rounded-lg relative'>
                <div>
                    <div className='flex justify-between'>
                        <div className='flex items-center'>
                            <div className='h-4 w-4 bg-[#bf8700] rounded-full mr-2'></div>
                            <p className='mr-2 text-lg font-semibold'>In Progress</p>
                            <p className='bg-gray-200  px-2 rounded-full'>0</p>
                        </div>
                        <div className='flex'>
                            <AiOutlineArrowLeft />
                            <AiOutlineArrowRight className='ml-5' />
                        </div>
                    </div>
                    <p className='text-[rgb(87, 96, 106)] text-sm py-2'>This is actively being worked on
                    </p>
                </div>
                <div className='absolute bottom-0 rounded-lg left-0 hover:bg-gray-200 duration-300 w-full hover:cursor-pointer'>
                    <p className='p-3'><AiOutlinePlus className='inline-block' /> Add item</p>
                </div>
            </div>

            {/* card 3 */}
            <div className='w-[350px] h-[446px] p-3 bg-[#f6f8fa] border border-gray-200 rounded-lg relative'>
                <div>
                    <div className='flex justify-between'>
                        <div className='flex items-center'>
                            <div className='h-4 w-4 bg-[#2da44e] rounded-full mr-2'></div>
                            <p className='mr-2 text-lg font-semibold'>Done</p>
                            <p className='bg-gray-200  px-2 rounded-full'>0</p>
                        </div>
                        <div className='flex'>
                            <AiOutlineArrowLeft />
                            <AiOutlineArrowRight className='ml-5' />
                        </div>
                    </div>
                    <p className='text-[rgb(87, 96, 106)] text-sm py-2'>This has been completed</p>
                </div>


                <div className='absolute bottom-0 rounded-lg left-0 hover:bg-gray-200 duration-300 w-full hover:cursor-pointer'>
                    <p className='p-3'><AiOutlinePlus className='inline-block' /> Add item</p>
                </div>
            </div>
            <div className='p-3 bg-[#f6f8fa] h-10 border border-gray-200 rounded-lg grid place-content-center'>
                <AiOutlinePlus />
            </div>
        </div>
    </div>
    );
};

export default TodoSec;