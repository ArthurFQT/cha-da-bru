import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

// Cole aqui as configurações do Firebase que você pegou no console
const firebaseConfig = {
  apiKey: "AIzaSyA0yE65N4S3YcPWmfoLAFkCi67o-45rT74",
  authDomain: "cha-da-bru.firebaseapp.com",
  databaseURL: "https://cha-da-bru-default-rtdb.firebaseio.com",
  projectId: "cha-da-bru",
  storageBucket: "cha-da-bru.firebasestorage.app",
  messagingSenderId: "657853885452",
  appId: "1:657853885452:web:45b2b5f4fd5c4f1f285229",
  measurementId: "G-L1FZJ8GV7B",
};

// Inicializa Firebase
export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
