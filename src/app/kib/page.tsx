"use client";

import { useState } from "react";
import Image from "next/image";
import { kibData } from "@/data/kibData";
import { exportExcel } from "@/utils/exportExcel";
import jsPDF from "jspdf";
import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, Table, TableCell, TableRow, TextRun } from "docx";

type KIBItem = {
  image: string;
  name: string;
  description: string;
  code: string;
  brand: string;
  size: string;
  material: string;
  year: number;
  publicNumber: string;
  frameNumber: string;
  engineNumber: string;
  policeNumber: string;
  bpkb: string;
  origin: string;
  price: string;
};

export default function KIBTable() {
  const [selectedItem, setSelectedItem] = useState<KIBItem | null>(null);
  const [exportType, setExportType] = useState<string>("");

  const handleSelect = (item: KIBItem) => {
    setSelectedItem(item);
  };

  const handleExport = () => {
    if (exportType === "excel") exportExcel();
    if (exportType === "pdf") exportPDF();
    if (exportType === "word") exportWord();
  };

  const exportPDF = () => {
    const doc = new jsPDF("p", "mm", "f4");
    doc.text("Kartu Inventaris Barang B - Peralatan dan Mesin Tahun 2024", 15, 20);
    doc.text("SKPD      : Kecamatan Tawang", 15, 30);
    doc.text("Kab/Kota  : Pemerintah Kota Tasikmalaya", 15, 40);
    doc.text("Provinsi  : Jawa Barat", 15, 50);

    let startY = 70;
    kibData.forEach((item, index) => {
      doc.text(
        `${index + 1}. ${item.name} | ${item.brand} | ${item.year} | ${item.price}`,
        15,
        startY
      );
      startY += 10;
    });

    doc.save("KIB_Data.pdf");
  };

  const exportWord = async () => {
    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              children: [
                new TextRun("Kartu Inventaris Barang B - Peralatan dan Mesin Tahun 2024\n").bold(),
                new TextRun("SKPD      : Kecamatan Tawang\n"),
                new TextRun("Kab/Kota  : Pemerintah Kota Tasikmalaya\n"),
                new TextRun("Provinsi  : Jawa Barat\n\n"),
              ],
            }),
            new Table({
              rows: [
                new TableRow({
                  children: [
                    new TableCell({ children: [new Paragraph("No.")] }),
                    new TableCell({ children: [new Paragraph("Nama Barang")] }),
                    new TableCell({ children: [new Paragraph("Merk/Type")] }),
                    new TableCell({ children: [new Paragraph("Tahun")] }),
                    new TableCell({ children: [new Paragraph("Harga")] }),
                  ],
                }),
                ...kibData.map((item, index) =>
                  new TableRow({
                    children: [
                      new TableCell({ children: [new Paragraph((index + 1).toString())] }),
                      new TableCell({ children: [new Paragraph(item.name)] }),
                      new TableCell({ children: [new Paragraph(item.brand)] }),
                      new TableCell({ children: [new Paragraph(item.year.toString())] }),
                      new TableCell({ children: [new Paragraph(item.price)] }),
                    ],
                  })
                ),
              ],
            }),
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, "KIB_Data.docx");
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <div className="flex space-x-6">
        {/* Bagian Tabel */}
        <div className="w-2/3 bg-gray-800 p-4 rounded-lg shadow-lg overflow-hidden">
          <div className="flex justify-between border-b border-gray-600 mb-4 p-4">
            <h2 className="text-2xl font-bold">Daftar KIB</h2>
            {/* Bagian Export */}
            <div className="items-center space-x-3">
              <select
                value={exportType}
                onChange={(e) => setExportType(e.target.value)}
                className="p-2 bg-gray-800 border border-gray-700 rounded text-white"
              >
                <option value="">Pilih Format Export</option>
                <option value="excel">Excel</option>
                <option value="pdf">PDF</option>
                <option value="word">Word</option>
              </select>
              <button
                onClick={handleExport}
                disabled={!exportType}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded disabled:bg-gray-600"
              >
                Export
              </button>
            </div>
          </div>
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-700">
                <th className="border border-gray-600 p-2">No. Urut</th>
                <th className="border border-gray-600 p-2">Kode Barang</th>
                <th className="border border-gray-600 p-2">Nama Barang</th>
                <th className="border border-gray-600 p-2">Merk / Type</th>
                <th className="border border-gray-600 p-2">Tahun</th>
                <th className="border border-gray-600 p-2">Harga</th>
              </tr>
            </thead>
            <tbody>
              {kibData.map((item, index) => (
                <tr
                  key={index}
                  onClick={() => handleSelect(item)}
                  className="cursor-pointer hover:bg-gray-700"
                >
                  <td className="border border-gray-600 p-2 text-center">{index + 1}</td>
                  <td className="border border-gray-600 p-2">{item.code}</td>
                  <td className="border border-gray-600 p-2">{item.name}</td>
                  <td className="border border-gray-600 p-2">{item.brand}</td>
                  <td className="border border-gray-600 p-2 text-center">{item.year}</td>
                  <td className="border border-gray-600 p-2 text-right">{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
         {/* Bagian Detail (Kanan) */}
<div className="w-1/3 relative bg-gradient-to-b from-gray-800 to-gray-900 p-6 rounded-xl shadow-2xl overflow-hidden border border-gray-700 backdrop-blur-md">
  {selectedItem ? (
    <div className="relative z-10 p-4 bg-white/5 rounded-lg shadow-lg backdrop-blur-md border border-gray-700">
      {/* Gambar Barang */}
      <div className="flex justify-center mb-4">
        <Image
          src={selectedItem.image}
          alt={selectedItem.name}
          width={160}
          height={160}
          className="rounded-xl border-4 border-gray-700 shadow-lg hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Nama Barang */}
      <h2 className="text-3xl font-extrabold text-center mb-4 text-gray-200 tracking-wide">{selectedItem.name}</h2>

      {/* Detail Barang */}
      <ul className="mt-4 space-y-3 text-gray-300 text-sm p-4 bg-gray-800/60 rounded-lg shadow-inner border border-gray-700">
        <li className="flex justify-between">
          <span className="font-semibold text-blue-400">Kode Barang:</span>
          <span>{selectedItem.code}</span>
        </li>
        <li className="flex justify-between">
          <span className="font-semibold text-blue-400">Registrasi:</span>
          <span>{selectedItem.registration}</span>
        </li>
        <li className="flex justify-between">
          <span className="font-semibold text-blue-400">Merk/Type:</span>
          <span>{selectedItem.brand}</span>
        </li>
        <li className="flex justify-between">
          <span className="font-semibold text-blue-400">Ukuran:</span>
          <span>{selectedItem.size}</span>
        </li>
        <li className="flex justify-between">
          <span className="font-semibold text-blue-400">Bahan:</span>
          <span>{selectedItem.material}</span>
        </li>
        <li className="flex justify-between">
          <span className="font-semibold text-blue-400">Tahun:</span>
          <span>{selectedItem.year}</span>
        </li>
        <li className="flex justify-between">
          <span className="font-semibold text-blue-400">Nomor Polisi:</span>
          <span>{selectedItem.policeNumber}</span>
        </li>
        <li className="flex justify-between">
          <span className="font-semibold text-blue-400">Nomor Rangka:</span>
          <span>{selectedItem.frameNumber}</span>
        </li>
        <li className="flex justify-between">
          <span className="font-semibold text-blue-400">Nomor Mesin:</span>
          <span>{selectedItem.engineNumber}</span>
        </li>
        <li className="flex justify-between">
          <span className="font-semibold text-blue-400">BPKB:</span>
          <span>{selectedItem.bpkb}</span>
        </li>
        <li className="flex justify-between">
          <span className="font-semibold text-blue-400">Asal Usul:</span>
          <span>{selectedItem.origin}</span>
        </li>
        <li className="flex justify-between">
          <span className="font-semibold text-blue-400">Harga:</span>
          <span>{selectedItem.price}</span>
        </li>
        <li className="flex justify-between">
          <span className="font-semibold text-blue-400">Deskripsi:</span>
          <span className="italic">{selectedItem.description}</span>
        </li>
      </ul>
    </div>
  ) : (
    <p className="text-gray-400 mt-20 text-center">Klik item pada tabel untuk melihat detail lengkap.</p>
  )}
</div>

      </div>
    </div>
  );
}
