import Image from "next/image";

export default function SuratMasukTable() {
  const suratMasuk = [
    {
      no: 1,
      tanggalTerima: "2025-03-10",
      pengirim: "PT. Abadi Jaya",
      nomorSurat: "123/ABJ/III/2025",
      isiSurat: "Undangan Meeting",
      lampiran: "Dokumen.pdf",
      diteruskanKepada: "Manager Operasional",
      keterangan: "Diterima dan diproses",
      scanSurat: "/images/surat1.jpg",
    },
  ];

  return (
    <div className="overflow-x-auto rounded-lg p-4  shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
        Surat Masuk
      </h2>
      <div className="flex space-x-6">
        {/* Table Section */}
        <div className="w-3/4">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-900 text-white">
                <th className="p-3 border">No</th>
                <th className="p-3 border">Tanggal Terima</th>
                <th className="p-3 border">Pengirim</th>
                <th className="p-3 border">Nomor Surat</th>
                <th className="p-3 border">Isi Surat</th>
                <th className="p-3 border">Lampiran</th>
                <th className="p-3 border">Diteruskan Kepada</th>
                <th className="p-3 border">Keterangan</th>
              </tr>
            </thead>
            <tbody>
              {suratMasuk.map((surat, index) => (
                <tr
                  key={index}
                  className={`border-t ${
                    index % 2 === 0
                      ? "bg-gray-100 dark:bg-gray-800"
                      : "bg-white dark:bg-gray-900"
                  } hover:bg-gray-200 dark:hover:bg-gray-700 transition`}
                >
                  <td className="p-3 border text-center">{surat.no}</td>
                  <td className="p-3 border">{surat.tanggalTerima}</td>
                  <td className="p-3 border">{surat.pengirim}</td>
                  <td className="p-3 border">{surat.nomorSurat}</td>
                  <td className="p-3 border">{surat.isiSurat}</td>
                  <td className="p-3 border">
                    <a
                      href={surat.lampiran}
                      className="text-blue-500 underline"
                    >
                      Lihat
                    </a>
                  </td>
                  <td className="p-3 border">{surat.diteruskanKepada}</td>
                  <td className="p-3 border">{surat.keterangan}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Image Section */}
        <div className="w-1/4 bg-gray-800 p-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
            Bukti Surat
          </h3>
          <Image
            src={suratMasuk[0].scanSurat}
            alt="Scan Surat"
            width={64}
            height={64}
            className="w-full rounded-lg shadow-md"
          />
        </div>
      </div>
    </div>
  );
}
