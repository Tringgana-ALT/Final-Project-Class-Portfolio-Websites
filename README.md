# Portofolio Kelas 10 RPL

Website kelas berbasis Vite untuk Kelas 10 Rekayasa Perangkat Lunak (RPL) dengan tampilan tema samudra, galeri kegiatan, jadwal pelajaran, serta papan komentar dan menfess realtime.

## Menjalankan secara lokal

1. Pastikan Node.js dan npm tersedia.
2. Jalankan `npm install`.
3. Jalankan `npm run dev`, lalu buka URL lokal yang dicetak Vite.
4. Jalankan `npm run validate:content` untuk memvalidasi struktur data kelas dan keberadaan seluruh aset gambar lokal di `public/images/`.
5. Untuk membuat hasil produksi, jalankan `npm run build`. Berkas hasilnya ada di `dist/`.

## Struktur sumber

- `index.html` berisi kerangka halaman, navigasi, serta dialog semantik `#galleryModal`.
- `src/styles.css` berisi gaya glassmorphism samudra, pola grid, styling `dialog::backdrop`, dan aksesibilitas gerakan (`prefers-reduced-motion`).
- `src/main.js` menjadi entry point aplikasi yang memanggil `renderLandingContent()`, `initializeInteractions()`, dan `initializeComments(...)`.
- `src/renderLanding.js` merender bagian Hero, Struktur Kelas, Galeri, Jadwal Mapel, dan tautan sosial Footer dari `src/data/classProfile.js` menggunakan DOM API aman tanpa `innerHTML`.
- `src/interactions.js` mengatur tema gelap/terang, menu seluler, mini terminal interaktif, filter galeri dan jadwal, serta dialog galeri (`showModal()`/`close()`).
- `src/data/classProfile.js` menyimpan data terpusat profil kelas (`classMeta`), struktur pengurus (`leadership`), item galeri (`galleryItems`), dan jadwal (`scheduleDays`).
- `scripts/validate-content.mjs` skrip validasi konten ESM yang dijalankan lewat `npm run validate:content`.
- `public/images/gallery/` berisi ilustrasi SVG lokal yang dimuat langsung tanpa bergantung pada jaringan eksternal.
- `src/comments.js`, `src/firebase.js`, dan `src/status.js` mengelola guestbook dan listener komentar realtime.

## Mengganti Data Placeholder Kelas (`src/data/classProfile.js`)

Seluruh teks profil, nama pengurus, foto galeri, tautan media sosial, dan jadwal pelajaran terpusat di [`src/data/classProfile.js`](./src/data/classProfile.js):

1. **`classMeta`**: ubah `homeroomTeacher` (mengisi nama wali kelas di terminal Hero), `studentCount`, `productiveSubjectsCount`, `academicYear`, `values`, serta URL pada `socials` dengan akun resmi kelas.
2. **`leadership`**: isi `advisor.name`, nama dan deskripsi pengurus inti di `core`, serta nama koordinator seksi di `coordinators`.
3. **`galleryItems`**: simpan foto kegiatan kelas ke `public/images/gallery/`, lalu perbarui `image`, `alt`, `title`, `subtitle`, dan `description` untuk setiap item. Kategori yang didukung: `'lab'`, `'event'`, atau `'outdoor'`.
4. **`scheduleDays`**: perbarui daftar `subjects` untuk lima hari wajib (`senin` hingga `jumat`). Tandai mapel jurusan dengan `isProductive: true` dan agenda piket dengan `isCleaning: true`.
5. Jalankan `npm run validate:content` setelah mengubah data untuk memastikan seluruh field dan path gambar `/images/...` valid.

## Firebase Realtime Database

Firebase hanya dipakai untuk komentar. Data kelas dan gambar galeri dikelola langsung di repositori melalui `src/data/` dan `public/images/`.

Konfigurasi aplikasi web disimpan lokal di `.env.local` dan tidak masuk Git. `.env.example` menunjukkan nama variabel yang diperlukan. Nilai Firebase Web config dipakai di browser; keamanan data ditentukan oleh Firebase Database Rules, bukan oleh penyembunyian config.

Database tertutup secara default. Hanya `/comments` yang boleh dibaca publik dan menerima komentar baru yang memenuhi validasi. Field tambahan ditolak; klien tidak dapat mengubah atau menghapus komentar yang sudah ada. Jika Firebase Console saat ini menampilkan `.read: false` dan `.write: false` di root, ganti dengan aturan berikut agar hanya fitur komentar yang aktif:

1. Buka Firebase Console → **Realtime Database** → **Rules**.
2. Salin isi [`database.rules.json`](./database.rules.json) ke editor Rules.
3. Tekan **Publish**.

Komentar langsung terlihat untuk semua pengunjung. Aturan memvalidasi kategori dan panjang teks, tetapi komentar anonim publik tetap berisiko menerima spam; hapus konten yang tidak pantas dari Firebase Console dan pertimbangkan App Check sebelum situs dipublikasikan.
