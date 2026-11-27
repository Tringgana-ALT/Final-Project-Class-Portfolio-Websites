# Audit Konten — Website Kelas 10 RPL

> **Tanggal audit:** 27 November 2026
> **Target:** Landing page Kelas 10 RPL
> **Referensi visual:** https://xitkj3.vercel.app/ (contoh pembanding, bukan sumber data kelas)
> **Catatan:** Audit ini memeriksa konten di repository. Data yang belum dikonfirmasi tetap harus dianggap contoh atau placeholder.

## 1. Temuan yang Terverifikasi

### Hero dan statistik

- Hero sebelumnya memakai deskripsi umum tentang ide, kolaborasi, dan proses belajar. Sudah dipadatkan dan dibuat lebih dekat dengan konteks RPL.
- Tombol **Lihat Jadwal** sudah mengarah ke `#jadwal`; bukan tombol mati dan tidak perlu diganti.
- Statistik berasal dari `classMeta`: 36 siswa, 4 mapel produktif, dan tahun ajaran 2026/2027. README menyebut data profil sebagai placeholder yang perlu diganti dengan data kelas sebenarnya.
- Jangan mengganti statistik dengan angka humor yang seolah-olah fakta, misalnya jumlah grup WhatsApp.

### Struktur pengurus

- Deskripsi pengurus sebelumnya panjang dan terdengar seperti template. Sudah dipersingkat.
- Nama pengurus dan wali kelas masih berupa placeholder. Belum ada bukti bahwa seseorang merangkap jabatan, jadi jangan menambahkan nama atau rangkap jabatan rekaan.
- Label bagian diperjelas menjadi **Pengurus Kelas**.

### Galeri

- Galeri saat ini memakai ilustrasi SVG lokal, bukan foto dokumentasi kelas. Teks di halaman dan data galeri sudah menjelaskan bahwa gambar serta keterangannya perlu diganti.
- Karena belum ada dokumentasi asli, jangan menulis caption seolah-olah suatu kejadian benar-benar terjadi. Gunakan caption singkat setelah foto dan keterangannya dikonfirmasi.

### Jadwal

- Halaman menyebut jadwal sebagai contoh yang harus disesuaikan dengan jadwal resmi.
- Data jadwal tidak berisi definisi textbook per mata pelajaran; isinya nama mapel, waktu, guru, dan beberapa catatan.
- Nama guru yang belum terkonfirmasi sudah diganti menjadi placeholder **Nama Guru**. Jam dan catatan lain tetap perlu diperiksa terhadap jadwal resmi.

### Komentar dan menfess

- Komentar dimuat secara realtime dari Firebase; tidak ada kumpulan enam komentar bawaan di source.
- Jangan menambahkan komentar, typo, atau spam rekaan hanya agar halaman terlihat lebih autentik. Biarkan pengunjung mengisi papan komentar, dan moderasi konten yang benar-benar masuk.

## 2. Perubahan yang Diterapkan

| Area | Perbaikan |
|---|---|
| Hero | Deskripsi dibuat singkat dan spesifik ke kegiatan belajar RPL. |
| Nilai kelas | Kalimat dipadatkan dengan bahasa yang lebih santai. |
| Statistik | Angka tidak direkayasa; tandai sebagai placeholder sampai dikonfirmasi. |
| Pengurus | Deskripsi dipersingkat, label bagian diperjelas, dan nama yang belum diketahui tidak diisi dengan nama rekaan. |
| Galeri | Status ilustrasi dipertahankan agar tidak disalahartikan sebagai dokumentasi nyata. |
| Jadwal | Nama guru yang tidak terverifikasi dikembalikan ke placeholder. |
| Komentar | Tidak menambahkan komentar contoh ke papan Firebase. |

## 3. Checklist Konten Berikutnya

- [ ] Konfirmasi jumlah siswa, mapel produktif, dan tahun ajaran sebelum publikasi.
- [ ] Ganti nama placeholder pengurus, wali kelas, dan guru hanya dengan data yang sudah disetujui.
- [ ] Ganti ilustrasi galeri dengan foto yang memang boleh dipublikasikan; periksa izin dan keterangan fotonya.
- [ ] Cocokkan hari, waktu, guru, dan catatan jadwal dengan jadwal resmi.
- [ ] Pertahankan tombol yang memiliki tujuan jelas dan hindari menambahkan CTA yang tidak berfungsi.
- [ ] Jangan mengarang statistik, kejadian, jabatan, atau komentar demi terlihat autentik.
- [ ] Baca ulang teks: potong kalimat generik atau bertele-tele, tetapi jangan menambahkan typo secara sengaja.
