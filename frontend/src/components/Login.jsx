import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartContext from "../context/CartContext";
import axios from "axios";
import toast from "react-hot-toast";
const API= import.meta.env.VITE_API_BASE_URL;


function Login() {
  const [email,setEmail]= useState(()=>localStorage.getItem("email") || '' );
  const [password,setPassword]= useState(()=>localStorage.getItem("pass") || '' );


  const [emailError, setEmailError] = useState('');
  const [passError, setPassError] = useState('');

  const { setUser } = useContext(CartContext);
  const navigate = useNavigate();

   useEffect(()=>{
    localStorage.setItem("email",email);
    localStorage.setItem("pass",password)
   },[email,password])

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Email Validation: Only show error if user has started typing
    if (email.length > 0 && !emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }

    // Password Validation
    if (password.length > 0 && password.length < 5) {
      setPassError("Password must be at least 5 characters");
    } else {
      setPassError("");
    }
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (emailError || passError || !email || !password) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    try {
      const body = { email, password };
      const response = await axios.post(`${API}/api/login`, body);

      if (response.data === "No User") {
        toast.error("No User Found");
      } else if (response.data === "Invalid Credentials") {
        toast.error("Invalid Credentials");
      } else {
        // Assuming response.data contains { user, token }
        setUser(response.data.user);
        localStorage.setItem("token", response.data.token);
        toast.success("Logged in successfully!");
        navigate('/');
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Server error. Please try again later.");
    }
  };
const isFormValid = !emailError && !passError && email.length > 0 && password.length > 0;
  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-3xl  mb-4">Login Form</h2>

      <form className="flex flex-col gap-3 w-80" onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-2 border border-gray-400 rounded"
            required
          /> <br />
          {emailError && <p className="text-red-500 text-sm">{emailError}</p>} <br />
        </div>

        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-2 border border-gray-400 rounded"
            required
          /> <br />
          {passError && <p className="text-red-500 text-sm">{passError}</p>}
        </div> <br />
       <button 
       type="submit" 
       disabled={!isFormValid} // Simpler than ternary
         className={`p-2 rounded transition text-white ${
      isFormValid 
        ? "bg-indigo-600 hover:bg-indigo-700 cursor-pointer" 
        : "bg-gray-400 cursor-not-allowed"
       }`}
          >
        Login
        </button>

        <p className="text-center mt-2 mb-4 cursor-pointer text-blue-600 hover:underline" onClick={() => navigate('/signup')}>
          New User? Register Here
        </p>
      </form>
    </div>
  );
}

export default Login;