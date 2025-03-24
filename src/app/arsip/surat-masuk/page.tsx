"use client";
import { suratMasuk, SuratMasuk } from "@/data/suratMasuk";

export default function SuratMasukTable() {
  return (
    <div className="overflow-x-auto p-4 shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
        Daftar Surat Masuk
      </h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="p-3 border border-gray-700">No</th>
            <th className="p-3 border  border-gray-700">Tanggal Terima</th>
            <th className="p-3 border  border-gray-700">Pengirim</th>
            <th className="p-3 border  border-gray-700">Nomor Surat</th>
            <th className="p-3 border border-gray-700">Isi Surat</th>
            <th className="p-3 border border-gray-700">Lampiran</th>
            <th className="p-3 border border-gray-700">Diteruskan Kepada</th>
            <th className="p-3 border border-gray-700">Keterangan</th>
          </tr>
        </thead>
        <tbody className="bg-gray-900 text-white">
          {suratMasuk.map((surat, index) => (
            <tr key={index} className="border-t">
              <td className="p-3 border text-center  border-gray-700">{surat.no}</td>
              <td className="p-3 border border-gray-700">{surat.tanggalTerima}</td>
              <td className="p-3 border border-gray-700">{surat.pengirim}</td>
              <td className="p-3 border border-gray-700">{surat.nomorSurat}</td>
              <td className="p-3 border border-gray-700">{surat.isiSurat}</td>
              <td className="p-3 border border-gray-700">
                <a href={surat.lampiran} className="text-blue-400 underline">
                  Lihat
                </a>
              </td>
              <td className="p-3 border border-gray-700">{surat.diteruskanKepada}</td>
              <td className="p-3 border border-gray-700">{surat.keterangan}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
