import { useState } from "react";
import AuthForm from "@/components/auth/AuthForm";
import { useAuth } from "@/providers/AuthProvider";
import { useNavigate, Link } from "react-router-dom";
import { message } from "antd";

export default function Login() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Login with email and password only - server will determine the role
      await signIn({ email, password, role: "Patient" }); // Role is ignored by new login method
      message.success("Login successful!");
      
      // Get the user role from localStorage after successful login
      const storedUser = localStorage.getItem('app_auth_user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        const userRole = user.role;
        
        // Navigate based on the user's actual role
        if (userRole === "Administrator") {
          navigate("/Administrator");
        } else if (userRole === "Doctor") {
          navigate("/Doctor");
        } else {
          navigate("/Patient");
        }
      } else {
        // Fallback to patient dashboard
        navigate("/Patient");
      }
    } catch (error: any) {
      message.error(error.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthForm title="Welcome back" subtitle="Sign in to continue">
      <form onSubmit={onSubmit} className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
        </div>
        <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2.5 font-semibold">{loading? 'Signing in...' : 'Sign In'}</button>
        <div className="flex items-center justify-between text-sm">
          <Link to="/auth/forgot" className="text-blue-600 hover:underline">Forgot password?</Link>
          <Link to="/auth/signup" className="text-gray-600 hover:underline">Create account</Link>
        </div>
      </form>
    </AuthForm>
  );
}
