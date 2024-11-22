import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, serverTimestamp } from "firebase/firestore";
import { db } from '../config/firebase-config';
import { auth } from '../config/firebase-config';

export const addInput = async (input, setInputs, fetchPost) => {
    const user = auth.currentUser;
    if (user) {
        const uid = user.uid;
        try {
            const docRef = await addDoc(collection(db, `users/${uid}/inputs`), {
                input: input,
                timestamp: serverTimestamp(),
            });
            console.log("Document written with ID: ", docRef.id);
            setInputs((prevInputs) => [...prevInputs, { input, id: docRef.id }]);
            fetchPost(); 
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
        const user = auth.currentUser;
        if (user) {
          const uid = user.uid;
          const querySnapshot = await getDocs(collection(db, `users/${uid}/inputs`));
          const newData = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            return {
              ...data,
              id: doc.id,
              timestamp: data.timestamp ? data.timestamp.toDate().toLocaleString() : "No timestamp",
            };
          });
          setInputs(newData);
          console.log("Fetched inputs:", newData);
        }
      };
      
      

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
        className="submit-button"
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