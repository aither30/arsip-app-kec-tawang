"use client";

import { useState } from "react";
import Link from "next/link";

interface AuthPageProps {
  type: "login" | "register";
}

export default function AuthPage({ type }: AuthPageProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (type === "register" && form.password !== form.confirmPassword) {
      alert("Password tidak cocok!");
      return;
    }
    console.log(`${type} form submitted:`, form);
  };

  return (
    <div className="flex h-screen items-center pb-10 justify-center bg-gray-900">
      <div className="w-full max-w-md p-6  shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6">
          {type === "login" ? "Login" : "Register"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {type === "register" && (
            <input
              type="text"
              name="name"
              placeholder="Nama Lengkap"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {type === "register" && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Konfirmasi Password"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            {type === "login" ? "Login" : "Register"}
          </button>
        </form>
        <p className="text-center mt-4 text-sm">
          {type === "login" ? (
            <>
              Belum punya akun?{" "}
              <Link href="/auth/register" className="text-blue-500">
                Daftar
              </Link>
            </>
          ) : (
            <>
              Sudah punya akun?{" "}
              <Link href="/auth/login" className="text-blue-500">
                Masuk
              </Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
