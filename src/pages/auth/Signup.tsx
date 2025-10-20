import { useState } from "react";
import AuthForm from "@/components/auth/AuthForm";
import RoleSelect from "@/components/auth/RoleSelect";
import { useAuth } from "@/providers/AuthProvider";
import type { UserRole } from "@/providers/AuthProvider";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("Patient");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn({ email, password, role, name });
    if (role === "Administrator") navigate("/Administrator");
    else if (role === "Doctor") navigate("/Doctor");
    else navigate("/Patient");
  };

  return (
    <AuthForm title="Create account" subtitle="Join the platform">
      <form onSubmit={onSubmit} className="space-y-3">
        <RoleSelect role={role} onChange={setRole} />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input value={name} onChange={(e)=>setName(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
        </div>
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2.5 font-semibold">Sign Up</button>
        <div className="text-sm text-center">
          Already have an account? <Link to="/auth/login" className="text-blue-600 hover:underline">Sign in</Link>
        </div>
      </form>
    </AuthForm>
  );
}
