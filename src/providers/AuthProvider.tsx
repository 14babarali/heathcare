import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type UserRole = "Administrator" | "Doctor" | "Patient";

type User = {
  id: string;
  name: string;
  role: UserRole;
};

type AuthContextType = {
  user: User | null;
  signIn: (payload: { email: string; password: string; role: UserRole; name?: string }) => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem("app_auth_user");
    if (raw) setUser(JSON.parse(raw));
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem("app_auth_user", JSON.stringify(user));
    else localStorage.removeItem("app_auth_user");
  }, [user]);

  const signIn: AuthContextType["signIn"] = async ({ email, password, role, name }) => {
    // Fake sign-in for demo; replace with API later
    await new Promise((r) => setTimeout(r, 300));
    setUser({ id: "u1", name: name || email.split("@")[0], role });
  };

  const signOut = () => setUser(null);

  const value = useMemo(() => ({ user, signIn, signOut }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
