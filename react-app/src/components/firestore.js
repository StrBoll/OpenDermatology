import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from '../config/firebase-config';
import { auth } from '../config/firebase-config';
//https://firebase.google.com/docs/firestore/manage-data/add-data

export const addInput = async (input, setInputs, fetchPost) => {
    const user = auth.currentUser;
        const uid = user.uid;
            const docRef = await addDoc(collection(db, `users/${uid}/inputs`), {
                input: input,
                timestamp: serverTimestamp(),
            });
            setInputs((prevInputs) => [...prevInputs, { input, id: docRef.id }]);
            fetchPost(); 
       
};

const Input = () => {
  

    const [inputs, setInputs] = useState([]);
    const user = auth.currentUser;
   


    const fetchPost = async () => {
        const user = auth.currentUser;
          const uid = user.uid;
          const querySnapshot = await getDocs(collection(db, `users/${uid}/inputs`));
    
          const newData = querySnapshot.docs.map((doc) => {
            return {
              ...doc.data(),
              timestamp: doc.data().timestamp.toDate().toLocaleString(),
            };
          });
          setInputs(newData);
      };
      
      

    useEffect(()=>{
        
        fetchPost();
    }, [user])


}

export default Input