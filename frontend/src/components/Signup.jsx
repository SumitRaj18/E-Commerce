import './SignUp.css'
import Login from "./Login";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import axios from 'axios';
const API= import.meta.env.VITE_API_BASE_URL;

function Register() {
   const[FormData,setFormData]= useState(()=>{
    const savedUser= localStorage.getItem("signup");
    return savedUser ? JSON.parse(savedUser) : {
        username:'',
        email:'',
        password:''
    }})
    const[error,setError]=useState({
        name:'',
        email:'',
        password:''
    })
const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};
    useEffect(() => {
    let newErrors = { name: '', email: '', password: '' };

    // Validate Name
    if (FormData.username.length > 0 && FormData.username.length < 3) {
        newErrors.name = "Name should be at least 3 characters";
    }

    // Validate Email (Independent check)
    if (FormData.email.length > 0 && !validateEmail(FormData.email)) {
        newErrors.email = "Please enter a valid email address";
    }

    // Validate Password (Independent check)
    if (FormData.password.length > 0 && FormData.password.length < 5) {
        newErrors.password = "Password must be more than 5 characters";
    }

    setError(newErrors);
}, [FormData]);
const isFormInvalid = 
    error.name !== '' || 
    error.email !== '' || 
    error.password !== '' || 
    !FormData.username || 
    !FormData.email || 
    !FormData.password;
    const navigate= useNavigate();
const handleChange=(e)=>{
    setFormData({...FormData,[e.target.name]:e.target.value})
}
   useEffect(()=>{
    localStorage.setItem("signup",JSON.stringify(FormData))
   },[FormData])

   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post(`${API}/api/signup`, FormData);
        if (response.data === 'User Created') {
            toast.success("User Created");
            localStorage.removeItem("signup"); 
            navigate('/login');
            
        }
    } catch (error) {
        console.error("Signup Error:", error);
        
        if (error.response) {
            toast.error(error.response.data.message || "Something went wrong on the server");
        } else if (error.request) {
            toast.error("Network error: Server is unreachable");
        } else {
            toast.error("An unexpected error occurred");
        }
    }
};

    return (
        <>
            <h2 className='text-3xl'>Registration Form</h2>

            <form className="App" onSubmit={handleSubmit}>
<input
    type="text"
    placeholder="Name"
    onChange={handleChange}
    name="username"
    value={FormData.username}
    style={{ border: '1px solid black' }}
/>
{error.name && <span className="text-red-500 text-sm block">{error.name}</span>}
<br />

<input
    type="email"
    placeholder="Email"
    onChange={handleChange}
    name="email"
    value={FormData.email}
    style={{ border: '1px solid black' }}
/>
{error.email && <span className="text-red-500 text-sm block">{error.email}</span>}
<br />

<input
    type="password"
    onChange={handleChange}
    name="password"
    value={FormData.password}
    placeholder="Password"
    style={{ border: '1px solid black' }}
/>
{error.password && <span className="text-red-500 text-sm block">{error.password}</span>}
<br />

<button 
    disabled={isFormInvalid} 
    type="submit" 
    className={`h-10 text-white transition ${isFormInvalid ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 cursor-pointer'}`}
>
    Submit
</button>
                <span  style={{color:'blue',cursor:'pointer'}} onClick={()=>navigate('/login')}>Already a User? Login</span>
            </form>
        </>
    );
}

export default Register;