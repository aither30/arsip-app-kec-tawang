"use client";

import { useState } from "react";

export default function ArsipPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const archives = [
    { id: 1, title: "Surat Keputusan", category: "Surat Masuk", date: "2024-03-10" },
    { id: 2, title: "Undangan Rapat", category: "Surat Masuk", date: "2024-03-05" },
    { id: 3, title: "Laporan Tahunan", category: "Surat Keluar", date: "2024-02-15" },
    { id: 4, title: "Nota Dinas", category: "Surat Keluar", date: "2024-01-22" },
  ];

  const filteredArchives = archives.filter(
    (archive) =>
      (filter === "all" || archive.category === filter) &&
      archive.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Arsip Surat</h1>

      {/* Search & Filter */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Cari surat..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-600 bg-gray-900 text-white rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-primary-500"
        />
        <select
          className="border border-gray-600 bg-gray-900 text-white rounded-lg px-4 py-2"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">Semua</option>
          <option value="Surat Masuk">Surat Masuk</option>
          <option value="Surat Keluar">Surat Keluar</option>
        </select>
      </div>

      {/* Archive Table */}
      <div className="bg-gray-900 bg-opacity-60 shadow-lg rounded-lg p-4">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="py-3 px-4">Judul</th>
              <th className="py-3 px-4">Kategori</th>
              <th className="py-3 px-4">Tanggal</th>
              <th className="py-3 px-4">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredArchives.length > 0 ? (
              filteredArchives.map((archive) => (
                <tr key={archive.id} className="border-b border-gray-800 hover:bg-gray-800 transition">
                  <td className="py-3 px-4">{archive.title}</td>
                  <td className="py-3 px-4">{archive.category}</td>
                  <td className="py-3 px-4">{archive.date}</td>
                  <td className="py-3 px-4">
                    <button className="text-primary-400 hover:text-primary-300 transition">
                      Lihat Detail
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-gray-400 text-center py-4">
                  Tidak ada arsip ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
