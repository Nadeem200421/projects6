"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme, restoreTheme } from "@/redux/features/themeSlice";
import type { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import "../styles/register.css";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const darkMode = useSelector((state: RootState) => state.theme.mode === "dark");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Restore theme on mount
  useEffect(() => {
    dispatch(restoreTheme());
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setError("");
    // Normally, call API here
    router.push("/login");
  };

  return (
    <div className={`register-page ${darkMode ? "dark" : "light"}`}>
      {/* Theme toggle button */}
      <button
        className="theme-toggle"
        onClick={() => dispatch(toggleTheme())}
      >
        {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
      </button>

      <div className="register-card">
        <h1 className="register-title">Create Account</h1>

        {error && <p className="register-error">{error}</p>}

        <form onSubmit={handleSubmit} className="register-form">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="register-input"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="register-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="register-input"
          />

          <button type="submit" className="register-btn">
            Register
          </button>
        </form>

        <p className="register-login">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}
