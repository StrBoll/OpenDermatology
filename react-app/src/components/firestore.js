import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from '../config/firebase-config';
import { auth } from '../config/firebase-config';

export const addInput = async (input, setInputs, fetchPost) => {
    const user = auth.currentUser;
    if (user) {
        const uid = user.uid;
        try {
            const docRef = await addDoc(collection(db, `users/${uid}/inputs`), {
                input: input,
            });
            console.log("Document written with ID: ", docRef.id);
            setInputs((prevInputs) => [...prevInputs, { input, id: docRef.id }]);
            fetchPost(); // Refresh the list after adding a new input
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
};

const Input = () => {
    const [input, setInput] = useState("");
    const [inputs, setInputs] = useState([]);
    const user = auth.currentUser;
   
    


    const fetchPost = async () => {
        if(user){
            const uid = user.uid;
        
        await getDocs(collection(db, `users/${uid}/inputs`))
            .then((querySnapshot)=>{              
                const newData = querySnapshot.docs
                    .map((doc) => ({...doc.data(), id:doc.id }));
                    setInputs(newData);                
                console.log(inputs, newData);
            })

    }
}

    useEffect(()=>{
        fetchPost();
    }, [user])


    return (
        <section className="todo-container">
            <div className="todo">
                <h1 className="header">
                    History
                </h1>

                <div>

                    <div>
                        <input
                            type="text"
                            placeholder="What do you have to do today?"
                            onChange={(e)=>setInput(e.target.value)}
                        />
                    </div>

                    <div className="btn-container">
                        <button
                            type="submit"
                            className="btn"
                            onClick={addInput}
                        >
                            Submit
                        </button>
                    </div>

                </div>

                <div className="todo-content">
                    {
                        inputs?.map((input,i)=>(
                            <p key={i}>
                                {input.input}
                            </p>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

export default Input