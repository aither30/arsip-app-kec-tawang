"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isArsipOpen, setIsArsipOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <nav className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-gray-800 dark:text-white"
        >
          ARKATA
        </Link>

        {/* Navigation Links */}
        <ul className="hidden lg:flex space-x-8 items-center text-gray-700 dark:text-gray-300">
          <li className="relative">
            <button
              onClick={() => setIsArsipOpen(!isArsipOpen)}
              className="hover:text-primary-700 dark:hover:text-white transition"
            >
              Arsip Dokumen
            </button>
            {isArsipOpen && (
              <ul className="absolute left-0 mt-2 w-40 bg-white dark:bg-gray-700 shadow-lg rounded-lg overflow-hidden">
                <li>
                  <Link
                    href="/arsip/surat-masuk"
                    onClick={() => setIsArsipOpen(false)} // ✅ Dropdown tertutup setelah klik
                    className="block px-4 py-2 text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    Surat Masuk
                  </Link>
                </li>
                <li>
                  <Link
                    href="/arsip/surat-keluar"
                    onClick={() => setIsArsipOpen(false)} // ✅ Dropdown tertutup setelah klik
                    className="block px-4 py-2 text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    Surat Keluar
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link
              href="/kib"
              className="hover:text-primary-700 dark:hover:text-white transition"
            >
              KIB (Inventaris)
            </Link>
          </li>
          <li>
            <input
              type="text"
              placeholder="Cari ..."
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 transition"
            />
          </li>
        </ul>

        {/* Auth Buttons */}
        <div className="hidden lg:flex space-x-4">
          <Link
            href="/login"
            className="px-4 py-2 text-sm font-medium text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
          >
            Log in
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition"
          >
            Register
          </Link>
        </div>
      </nav>
    </header>
  );
}
