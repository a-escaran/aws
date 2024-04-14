import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/Registerpage"; 
import MainPage from "./components/Main"; 
import createLoginTable from './components/DynamoDB/LoginTable'; // Assuming logintable.js is in the same directory
import './App.css';

function App() {
    useEffect(() => {
      createLoginTable(); // Call the function to create the table
    }, []);

  return (
    <Router>
      <Routes> 
        <Route path='/' element={<LoginPage />} /> 
        <Route path='/register' element={<RegisterPage />} /> 
        <Route path='/main' element={<MainPage />} /> 
      </Routes>
    </Router>
  );
}

export default App;
