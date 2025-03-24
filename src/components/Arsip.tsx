import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

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
  },
];

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

export default function ArsipSurat() {
  const [tab, setTab] = useState("masuk");

  return (
    <div className="p-6 bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-4">Arsip Surat</h1>
      <Tabs value={tab} onValueChange={setTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="masuk">Surat Masuk</TabsTrigger>
          <TabsTrigger value="keluar">Surat Keluar</TabsTrigger>
        </TabsList>
      </Tabs>

      <Card>
        <CardContent>
          <TabsContent value="masuk">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No</TableHead>
                  <TableHead>Tanggal Terima</TableHead>
                  <TableHead>Pengirim</TableHead>
                  <TableHead>Tanggal & Nomor Surat</TableHead>
                  <TableHead>Hal / Isi Surat</TableHead>
                  <TableHead>Lampiran</TableHead>
                  <TableHead>Diteruskan Kepada</TableHead>
                  <TableHead>Keterangan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {suratMasuk.map((surat) => (
                  <TableRow key={surat.no}>
                    <TableCell>{surat.no}</TableCell>
                    <TableCell>{surat.tanggalTerima}</TableCell>
                    <TableCell>{surat.pengirim}</TableCell>
                    <TableCell>{surat.nomorSurat}</TableCell>
                    <TableCell>{surat.isiSurat}</TableCell>
                    <TableCell>{surat.lampiran}</TableCell>
                    <TableCell>{surat.diteruskanKepada}</TableCell>
                    <TableCell>{surat.keterangan}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="keluar">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Nomor & Indeks Surat</TableHead>
                  <TableHead>Diteruskan Kepada</TableHead>
                  <TableHead>Isi Surat</TableHead>
                  <TableHead>Keterangan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {suratKeluar.map((surat) => (
                  <TableRow key={surat.no}>
                    <TableCell>{surat.no}</TableCell>
                    <TableCell>{surat.tanggal}</TableCell>
                    <TableCell>{surat.nomorIndeksSurat}</TableCell>
                    <TableCell>{surat.diteruskanKepada}</TableCell>
                    <TableCell>{surat.isiSurat}</TableCell>
                    <TableCell>{surat.keterangan}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </CardContent>
      </Card>
    </div>
  );
}
