import React, { useContext, useEffect, useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { AiOutlineSend } from 'react-icons/ai';
import { addDoc, collection, getFirestore, limit, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore"
import { AuthContext } from "../routes/AuthProvider"
import { FaUserAlt } from 'react-icons/fa';

const db = getFirestore();
const Massaging = () => {
    const [inputValue, setInputValue] = useState("");
    const [allMessage, setAllMessage] = useState([])
    const { user } = useContext(AuthContext);
    // console.log(user.uid);

    // Submit the New message in Firebase DB
    const handleSubmit = async (e) => {
        console.log("submiter running");
        e.preventDefault();
        const messageRef = collection(db, "chat");
        const docRef = await addDoc(messageRef, {
            text: inputValue,
            time: (new Date()).toLocaleString(),
            createdAt: serverTimestamp(),
            uid: user.uid,
            userInfo: { name: user.displayName, img: user?.photoURL }
        })
        console.log("Document written with ID: ", docRef.id);
        // console.log(inputValue);
        e.target.reset();
        setInputValue("")
    }

    // Load New text msg
    useEffect(() => {
        console.log("Get firebase Data");
        const q = query(
            collection(db, "chat"),
            orderBy("createdAt"),
            limit(30)
        );
        const data = onSnapshot(q, (res) => {
            let allMessage = [];
            res.forEach(el => {
                allMessage.push({ ...el.data(), id: el.id });
            })
            // console.log(res);
            setAllMessage(allMessage);
        })
        return () => data;
    }, []);
    // console.log(allMessage);
    // console.log(user.photoURL);


    return (
        <div className='h-[90vh] grid place-items-center'>
            <div className='w-[450px] bg-white overflow-y-hidden border border-gray-700 rounded-lg relative'>
                <div className='border-b border-gray-300 p-3'>
                    <div className='flex justify-between items-center'>
                        <div className='flex items-center'>
                            <div className='rounded-full mr-2'>
                                {
                                    user?.photoURL ?
                                        <img className='h-10 w-10 rounded-full' src={user.photoURL} alt="" /> :
                                        <p className="text-3xl mr-3 tooltip tooltip-bottom"><FaUserAlt /></p>
                                }
                            </div>
                            <p className='mr-2 text-lg font-semibold'>{user.displayName}</p>
                        </div>
                        <div className=''>
                            <BsThreeDots />
                        </div>
                    </div>
                </div>
                <div className=' h-[390px] min-h-[360px] overflow-y-auto p-3'>
                    <p className='p-2 my-2 font-medium bg-gray-300 w-[85%] rounded-r-xl'>Hello, This is a Minimul Chat bot create with firebase</p>
                    <p className='p-2 text-right my-2 font-medium bg-sky-400 w-[85%] ml-auto rounded-l-lg'>Start your chat with any person</p>
                    {
                        allMessage?.map(el => {
                            if (user.uid === el.uid) {
                                return  <div  data-tip={el.time} key={el.id} className='flex justify-end  tooltip tooltip-top'>
                                    <p className='p-2 text-right my-2 font-medium bg-sky-400 w-[80%] ml-auto rounded-l-lg'>{el.text}</p>
                                </div> 
                               
                            } else {
                                return <div className='flex items-center'>
                                    {
                                        el.userInfo?.img ?
                                            <div  data-tip={el.userInfo?.name+ " " + el.time} ><img className='h-7 w-7 rounded-full mr-2' src={user.photoURL} alt="" /> </div> :
                                            <p data-tip={el.userInfo?.name+ " " + el.time} className="text-3xl mr-3 tooltip tooltip-right"><FaUserAlt /></p>
                                    }
                                    <p key={el.id} className='p-2 my-2 font-medium bg-gray-300 w-[80%] rounded-r-xl'>{el.text}</p></div>
                            }
                        })
                    }
                </div>
                <form onSubmit={handleSubmit} className='flex align-baseline p-3'>
                    <input onChange={(e) => setInputValue(e.target.value)} className='w-5/6 rounded-lg outline-sky-300 p-3 bg-[#f6f8fa]' type="text" placeholder='Aa' />
                    <button className='text-3xl font-bold text-sky-500 hover:bg-sky-800 hover:text-white hover:rounded-full duration-300 p-2 ml-2 align-baseline'><AiOutlineSend /></button>
                </form>
            </div>
        </div>
    );
};

export default Massaging;