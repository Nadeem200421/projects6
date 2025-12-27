"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/redux/features/authSlice";
import { toggleTheme, restoreTheme } from "@/redux/features/themeSlice";
import type { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import "@/styles/login.css";


export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const darkMode = useSelector((state: RootState) => state.theme.mode === "dark");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Restore theme from localStorage on mount
  useEffect(() => {
    dispatch(restoreTheme());
  }, [dispatch]);

  // Redirect if logged in
  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    dispatch(login({ email }));
  };

  return (
    <div className={`login-page ${darkMode ? "dark" : "light"}`}>
      {/* Theme toggle button */}
      <button className="theme-toggle" onClick={() => dispatch(toggleTheme())}>
        {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
      </button>

      <div className="login-card">
        <h1 className="login-title">Welcome Back</h1>
        <p className="login-subtitle">Login to continue</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            placeholder="Email address"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        <p className="login-footer">
          Don’t have an account? <a href="/register">Create one</a>
        </p>
      </div>
    </div>
  );
}
