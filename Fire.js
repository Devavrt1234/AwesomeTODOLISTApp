
// import {auth} from 'firebase/compat/auth';

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc,getDocs, initializeFirestore,doc, updateDoc, deleteDoc,getDoc } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyDfV7-oiQQEchVoKopEGqF96Wo_CuPtRuc",
  authDomain: "todoapp-8e3d7.firebaseapp.com",
  projectId: "todoapp-8e3d7",
  storageBucket: "todoapp-8e3d7.appspot.com",
  messagingSenderId: "214925542007",
  appId: "1:214925542007:web:71a2c8c00ee88fec25bc72",
  measurementId: "G-FRX1VTSX5B"
  };



  const app=initializeApp(firebaseConfig);
  const db = initializeFirestore(app,{
      experimentalForceLongPolling:true
  });
  
  export {app,db,getFirestore, collection, addDoc,getDocs,doc,updateDoc, deleteDoc,getDoc};