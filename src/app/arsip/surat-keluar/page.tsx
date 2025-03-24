"use client";

import { useState, useEffect, useRef } from "react";
import { suratKeluarData } from "@/data/suratKeluarData";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, Table, TableRow, TableCell } from "docx";

export default function SuratKeluarTable() {
  const [availableFiles, setAvailableFiles] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    const checkFileExists = async () => {
      const fileStatus: { [key: string]: boolean } = {};
      for (const surat of suratKeluarData) {
        if (surat.dokumenPdf) {
          try {
            const response = await fetch(surat.dokumenPdf, { method: "HEAD" });
            fileStatus[surat.dokumenPdf] = response.ok;
          } catch (error) {
            fileStatus[surat.dokumenPdf] = false;
          }
        }
      }
      setAvailableFiles(fileStatus);
    };
    checkFileExists();
  }, []);

  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(suratKeluarData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Surat Keluar");
    XLSX.writeFile(workbook, "SuratKeluar.xlsx");
  };

  const exportPDF = () => {
    const doc = new jsPDF({ orientation: "landscape", format: "f4" });
    doc.text("Daftar Surat Keluar", 14, 10);
    autoTable(doc, {
      head: [["No", "Tanggal", "Nomor Indeks", "Diteruskan Kepada", "Isi Surat", "Keterangan"]],
      body: suratKeluarData.map(surat => [
        surat.no,
        surat.tanggal,
        surat.nomorIndeksSurat,
        surat.diteruskanKepada,
        surat.isiSurat,
        surat.keterangan,
      ]),
    });
    doc.save("SuratKeluar.pdf");
  };

  const exportWord = async () => {
    const doc = new Document();
    const tableRows = suratKeluarData.map(surat => new TableRow({
      children: ["no", "tanggal", "nomorIndeksSurat", "diteruskanKepada", "isiSurat", "keterangan"].map(key =>
        new TableCell({ children: [new Paragraph(surat[key])] })
      ),
    }));
    doc.addSection({
      children: [
        new Paragraph("Daftar Surat Keluar"),
        new Table({ rows: tableRows })
      ],
    });
    const blob = await Packer.toBlob(doc);
    saveAs(blob, "SuratKeluar.docx");
  };

  return (
    <div className="p-4 text-white rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Daftar Surat Keluar</h2>

      <div className="mb-4 space-x-2">
        <button onClick={exportExcel} className="px-3 py-1 bg-green-600 rounded">Export Excel</button>
        <button onClick={exportPDF} className="px-3 py-1 bg-red-600 rounded">Export PDF</button>
        <button onClick={exportWord} className="px-3 py-1 bg-blue-600 rounded">Export Word</button>
      </div>

      <table className="w-full border-collapse border border-gray-700 bg-gray-900">
        <thead>
          <tr className="bg-gray-800">
            <th className="border border-gray-700 p-2">No</th>
            <th className="border border-gray-700 p-2">Tanggal</th>
            <th className="border border-gray-700 p-2">Nomor Indeks</th>
            <th className="border border-gray-700 p-2">Diteruskan Kepada</th>
            <th className="border border-gray-700 p-2">Isi Surat</th>
            <th className="border border-gray-700 p-2">Keterangan</th>
          </tr>
        </thead>
        <tbody>
          {suratKeluarData.map((surat) => (
            <tr key={surat.no} className="hover:bg-gray-800">
              <td className="border border-gray-700 p-2 text-center">{surat.no}</td>
              <td className="border border-gray-700 p-2">{surat.tanggal}</td>
              <td className="border border-gray-700 p-2">{surat.nomorIndeksSurat}</td>
              <td className="border border-gray-700 p-2">{surat.diteruskanKepada}</td>
              <td className="border border-gray-700 p-2">{surat.isiSurat}</td>
              <td className="border border-gray-700 p-2">{surat.keterangan}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
