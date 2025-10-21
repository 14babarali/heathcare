import { useState } from "react";
import AuthForm from "@/components/auth/AuthForm";
import SignupRoleSelect from "@/components/auth/SignupRoleSelect";
import { useAuth } from "@/providers/AuthProvider";
import type { UserRole } from "@/types";
import { useNavigate, Link } from "react-router-dom";
import { message } from "antd";

export default function Signup() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("Patient");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signUp({ 
        email, 
        password, 
        firstName, 
        lastName, 
        role 
      });
      message.success("Registration successful!");
      if (role === "Doctor") navigate("/Doctor");
      else navigate("/Patient");
    } catch (error: any) {
      message.error(error.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthForm title="Create account" subtitle="Join the platform">
      <form onSubmit={onSubmit} className="space-y-3">
        <SignupRoleSelect role={role} onChange={setRole} />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
          <input value={firstName} onChange={(e)=>setFirstName(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
          <input value={lastName} onChange={(e)=>setLastName(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
        </div>
        <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2.5 font-semibold">{loading? 'Creating account...' : 'Sign Up'}</button>
        <div className="text-sm text-center">
          Already have an account? <Link to="/auth/login" className="text-blue-600 hover:underline">Sign in</Link>
        </div>
      </form>
    </AuthForm>
  );
}
