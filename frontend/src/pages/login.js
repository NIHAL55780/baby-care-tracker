import {useState} from 'react';
import { supabase } from '../supabaseclient';
import { useNavigate ,Link } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleLogin = async()=>{
        const {error} = await supabase.auth.signInWithPassword({
            email,
            password
        });
        if(error){
            alert(error.message);
        }
        else{
            alert("Login successful!");
            navigate("/dashboard");
        }
    };
    return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    
    <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
      
      <h2 className="text-2xl font-bold text-center mb-6">
        Login 👶
      </h2>

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button
        onClick={handleLogin}
        className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
      >
        Login
      </button>

      <p className="text-center mt-4">
        Don't have an account?{" "}
        <Link to="/signup" className="text-blue-500 font-semibold">
          Sign up
        </Link>
      </p>

    </div>

  </div>
);
}