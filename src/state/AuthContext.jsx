// src/state/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { account, ID } from "../appwrite";

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check current session on app load
  useEffect(() => {
    async function init() {
      try {
        const res = await account.get();
        setUser(res);
      } catch (err) {
        // 401 here just means "no active session"
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    init();
  }, []);

  async function register(email, password, name) {
    await account.create(ID.unique(), email, password, name);
    await login(email, password); // auto-login after signup
  }

  async function login(email, password) {
    await account.createEmailPasswordSession(email, password);
    const res = await account.get();
    setUser(res);
  }

  async function logout() {
    await account.deleteSessions();
    setUser(null);
  }

  const value = { user, loading, register, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
