import ExcelJS from "exceljs";
import { kibData } from "@/data/kibData";
import { saveAs } from "file-saver";

export const exportExcel = async () => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("KIB Data");

  // Gaya Alignment dan Border
  const centerStyle: Partial<ExcelJS.Alignment> = {
    vertical: "middle",
    horizontal: "center",
    wrapText: true,
  };

  const borderStyle: Partial<ExcelJS.Borders> = {
    top: { style: "thin" },
    left: { style: "thin" },
    bottom: { style: "thin" },
    right: { style: "thin" },
  };

  // Judul
  worksheet.mergeCells("A1:P1");
  worksheet.getCell("A1").value = "Kartu Inventaris Barang B - Peralatan dan Mesin";
  worksheet.getCell("A1").alignment = centerStyle;
  worksheet.getCell("A1").font = { bold: true };

  worksheet.mergeCells("A2:P2");
  worksheet.getCell("A2").value = "Tahun 2024";
  worksheet.getCell("A2").alignment = centerStyle;
  worksheet.getCell("A2").font = { bold: true };

  // Identitas
  worksheet.mergeCells("A4:B4");
  worksheet.getCell("A4").value = "SKPD";
  worksheet.mergeCells("C4:D4");
  worksheet.getCell("C4").value = ": Kecamatan Tawang";

  worksheet.mergeCells("A5:B5");
  worksheet.getCell("A5").value = "Kab/ Kota";
  worksheet.mergeCells("C5:D5");
  worksheet.getCell("C5").value = ": Pemerintahan Kota Tasikmalaya";

  worksheet.mergeCells("A6:B6");
  worksheet.getCell("A6").value = "Provinsi";
  worksheet.mergeCells("C6:D6");
  worksheet.getCell("C6").value = ": Jawa Barat";

  // Header Tabel (Mulai dari A8)
  const header1 = [
    "No. Urut",
    "Kode Barang",
    "Nama Barang / Jenis Barang",
    "Nomor Registrasi",
    "Merk / Type",
    "Ukuran / cc",
    "Bahan",
    "Tahun Pembelian",
    "Nomor", "", "", "", "",
    "Asal Usul / Cara Perolehan",
    "Harga",
    "Keterangan"
  ];

  const header2 = [
    "", "", "", "", "", "", "", "",
    "Publik", "Kerangka", "Mesin", "Polisi", "BPKB",
    "", "", ""
  ];

  // Header Mulai dari Baris 8
  worksheet.getRow(8).values = header1;
  worksheet.getRow(9).values = header2;

  // Merge Header (A8 - P9)
  worksheet.mergeCells("A8:A9");
  worksheet.mergeCells("B8:B9");
  worksheet.mergeCells("C8:C9");
  worksheet.mergeCells("D8:D9");
  worksheet.mergeCells("E8:E9");
  worksheet.mergeCells("F8:F9");
  worksheet.mergeCells("G8:G9");
  worksheet.mergeCells("H8:H9");
  worksheet.mergeCells("I8:M8");
  worksheet.mergeCells("N8:N9");
  worksheet.mergeCells("O8:O9");
  worksheet.mergeCells("P8:P9");

  // Styling Header
  [8, 9].forEach(rowNumber => {
    worksheet.getRow(rowNumber).eachCell(cell => {
      cell.alignment = centerStyle;
      cell.font = { bold: true };
      cell.border = borderStyle;
    });
  });

  // Data
kibData.forEach((item, index) => {
    const row = [
      index + 1, // No. Urut
      item.code,
      item.name,
      item.registration,
      item.brand,
      item.size,
      item.material,
      item.year,
      item.publicNumber,
      item.frameNumber,
      item.engineNumber,
      item.policeNumber,
      item.bpkb,
      item.origin,
      item.price,
      item.description ?? ""
    ];
  
    const dataRow = worksheet.addRow(row);
  
    // Styling setiap sel di dalam baris data
    dataRow.eachCell((cell, colNumber) => {
      cell.alignment = { vertical: "middle", wrapText: true };
      cell.border = borderStyle;
  
      // Alignment khusus untuk kolom No. Urut (kolom pertama)
      if (colNumber === 1) {
        cell.alignment = { vertical: "middle", horizontal: "center", wrapText: true };
      }
    });
  });
  

  // Autofit Lebar Kolom yang Proporsional
  worksheet.columns.forEach(column => {
    let totalLength = 0;
    let nonEmptyCells = 0;

    column.eachCell({ includeEmpty: true }, cell => {
      if (cell.value) {
        totalLength += String(cell.value).length;
        nonEmptyCells++;
      }
    });

    // Panjang rata-rata + buffer
    const averageLength = nonEmptyCells ? totalLength / nonEmptyCells : 10;
    column.width = Math.min(Math.max(averageLength + 2, 10), 30); // Minimal 10, maksimal 30
  });

  // Export Excel
  const buffer = await workbook.xlsx.writeBuffer();
  saveAs(new Blob([buffer]), "KIB_Data_Fix.xlsx");
};
