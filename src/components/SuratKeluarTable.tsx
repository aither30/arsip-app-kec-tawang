export default function SuratKeluarTable() {
    const suratKeluar = [
      {
        no: 1,
        tanggal: "2025-03-12",
        nomorIndeksSurat: "456/OPS/III/2025",
        diteruskanKepada: "PT. Abadi Jaya",
        isiSurat: "Konfirmasi Kehadiran Meeting",
        keterangan: "Sudah dikirim",
      },
    ];
  
    return (
      <div className="overflow-x-auto border rounded-lg">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="p-3 border">No</th>
              <th className="p-3 border">Tanggal</th>
              <th className="p-3 border">Nomor & Indeks Surat</th>
              <th className="p-3 border">Diteruskan Kepada</th>
              <th className="p-3 border">Isi Surat</th>
              <th className="p-3 border">Keterangan</th>
            </tr>
          </thead>
          <tbody>
            {suratKeluar.map((surat) => (
              <tr key={surat.no} className="border-t">
                <td className="p-3 border">{surat.no}</td>
                <td className="p-3 border">{surat.tanggal}</td>
                <td className="p-3 border">{surat.nomorIndeksSurat}</td>
                <td className="p-3 border">{surat.diteruskanKepada}</td>
                <td className="p-3 border">{surat.isiSurat}</td>
                <td className="p-3 border">{surat.keterangan}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  