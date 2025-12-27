"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../redux/store";
import { useRouter } from "next/navigation";
import { toggleTheme, restoreTheme } from "../redux/features/themeSlice";
import "../styles/post-classified.css";

export default function PostClassifiedPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const darkMode = useSelector((state: RootState) => state.theme.mode === "dark");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Restore theme on mount
  useEffect(() => {
    dispatch(restoreTheme());
  }, [dispatch]);

  if (!isLoggedIn) {
    return (
      <div className={`post-classified-container ${darkMode ? "dark" : "light"}`}>
        <button className="theme-toggle" onClick={() => dispatch(toggleTheme())}>
          {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>

        <div className="not-logged-in">
          <p>Please login first to post a classified.</p>
          <button onClick={() => router.push("/login")}>Go to Login</button>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !price) {
      setError("Please fill in all fields.");
      setSuccess("");
      return;
    }

    setError("");
    setSuccess("Your classified has been posted successfully!");

    // Reset form
    setTitle("");
    setDescription("");
    setPrice("");
  };

  return (
    <div className={`post-classified-container ${darkMode ? "dark" : "light"}`}>
      <button className="theme-toggle" onClick={() => dispatch(toggleTheme())}>
        {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
      </button>

      <div className="card">
        <h1>Post a Classified</h1>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="number"
            placeholder="Price (₹)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <button type="submit" className="btn-submit">
            Post Classified
          </button>
        </form>
      </div>
    </div>
  );
}
