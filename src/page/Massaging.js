import React, { useContext, useEffect, useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { AiOutlineSend } from 'react-icons/ai';
import {addDoc, collection, getFirestore, limit, onSnapshot, orderBy, query, serverTimestamp} from "firebase/firestore"
import {AuthContext} from "../routes/AuthProvider"

const db = getFirestore();
const Massaging = () => {
    const [inputValue, setInputValue] = useState("");
    const [allMessage, setAllMessage] = useState([])
    const {user} = useContext(AuthContext);
    // console.log(user.uid);

    // Submit the New message in Firebase DB
    const handleSubmit = async (e) =>{
        console.log("submiter running");
        e.preventDefault();
        const messageRef = collection(db, "chat");
       const docRef = await addDoc(messageRef, {
            text: inputValue,
            createdAt: (new Date()).toLocaleString(),
            uid: user.uid,
            userInfo: {name: user.displayName}
        })
        console.log("Document written with ID: ", docRef.id);
        // console.log(inputValue);
        e.target.reset();
        setInputValue("")
    }

    // Load New text msg
    useEffect(() =>{
        console.log("Get firebase Data");
        const q = query(
            collection(db, "chat"),
            orderBy("createdAt"),
            limit(30)
        );
        const data = onSnapshot(q, (res) =>{
            let allMessage = [];
            res.forEach(el => {
                allMessage.push({...el.data(), id: el.id});
            })
            // console.log(res);
            setAllMessage(allMessage);
        })
        return () => data;
    },[]);
    console.log(allMessage);
    // console.log(allMessage);


    return (
        <div className='h-[90vh] grid place-items-center'>
            <div className='w-[450px] overflow-y-hidden border border-gray-700 rounded-lg relative'>
                <div className='border-b border-gray-300 p-3'>
                    <div className='flex justify-between items-center'>
                        <div className='flex items-center'>
                            <div className='rounded-full mr-2'>
                                <img className='h-10 w-10 rounded-full' src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="" />
                            </div>
                            <p className='mr-2 text-lg font-semibold'>Hasan Mia</p>
                        </div>
                        <div className=''>
                            <BsThreeDots />
                        </div>
                    </div>
                </div>
                <div className=' h-[390px] min-h-[360px] overflow-y-auto p-3'>
                    <p className='p-2 my-2 font-medium bg-gray-300 w-[85%] rounded-r-xl'>Hello, I am a MERN Stack Developer</p>
                    <p className='p-2 text-right my-2 font-medium bg-sky-400 w-[85%] ml-auto rounded-l-lg'>oh Fine. Where from you learn MERN stack?</p>
                </div>
                <form  onSubmit={handleSubmit} className='flex align-baseline p-3'>
                    <input onChange={(e) => setInputValue(e.target.value)} className='w-5/6 rounded-lg outline-sky-300 p-3 bg-[#f6f8fa]' type="text" placeholder='Aa' />
                    <button className='text-3xl font-bold text-sky-500 hover:bg-sky-800 hover:text-white hover:rounded-full duration-300 p-2 ml-2 align-baseline'><AiOutlineSend /></button>
                </form>
            </div>
        </div>
    );
};

export default Massaging;