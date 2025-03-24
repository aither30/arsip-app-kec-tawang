"use client";

import { Document, Page, pdfjs } from "react-pdf";
import { useState, useEffect } from "react";

pdfjs.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js";

interface PreviewDokumenProps {
  dokumenPdf?: string;
}

export default function PreviewDokumen({ dokumenPdf }: PreviewDokumenProps) {
  const [numPages, setNumPages] = useState<number | null>(null);

  useEffect(() => {
    console.log("Dokumen PDF yang diterima:", dokumenPdf);
  }, [dokumenPdf]);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return (
    <div className="mt-4 p-4 bg-gray-800 rounded-lg shadow-lg flex flex-col items-center">
      <h3 className="text-lg font-semibold mb-4 text-white">Preview Dokumen</h3>

      {dokumenPdf ? (
        <div className="w-full h-[600px] border rounded-lg overflow-hidden shadow-md">
          <Document
            file={dokumenPdf}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={(error) => console.error("Gagal memuat PDF:", error)}
          >
            {numPages &&
              Array.from(new Array(numPages), (_, index) => (
                <Page key={index} pageNumber={index + 1} width={600} />
              ))}
          </Document>
        </div>
      ) : (
        <p className="text-white">Pilih surat untuk melihat preview.</p>
      )}
    </div>
  );
}
