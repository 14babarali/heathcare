import { useState } from "react";
import AuthForm from "@/components/auth/AuthForm";

export default function Forgot() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };
  return (
    <AuthForm title="Forgot your password?" subtitle="We will send you a reset link">
      {sent ? (
        <div className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-md p-3">If an account exists, a reset link has been sent to {email}.</div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2.5 font-semibold">Send reset link</button>
        </form>
      )}
    </AuthForm>
  );
}
