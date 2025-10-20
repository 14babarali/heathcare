import { useState } from "react";
import AuthForm from "@/components/auth/AuthForm";
import { Link } from "react-router-dom";

export default function Reset() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [done, setDone] = useState(false);
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password && password === confirm) setDone(true);
  };
  return (
    <AuthForm title="Reset password" subtitle="Enter your new password">
      {done ? (
        <div className="space-y-3">
          <div className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-md p-3">Password updated.</div>
          <Link to="/auth/login" className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2.5 font-semibold">Go to login</Link>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <input type="password" value={confirm} onChange={(e)=>setConfirm(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2.5 font-semibold">Reset password</button>
        </form>
      )}
    </AuthForm>
  );
}
