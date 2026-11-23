# Portofolio Kelas 10 RPL

## Menjalankan secara lokal

1. Pastikan Node.js dan npm tersedia.
2. Jalankan `npm install`.
3. Jalankan `npm run dev`, lalu buka URL lokal yang dicetak Vite.
4. Untuk membuat hasil produksi, jalankan `npm run build`. Berkas hasilnya ada di `dist/`.

## Struktur sumber

- `index.html` berisi markup halaman.
- `src/styles.css` berisi gaya khusus dan aksesibilitas gerakan.
- `src/main.js` menjadi entry point aplikasi.
- `src/interactions.js` mengatur navigasi, galeri, jadwal, terminal, dan modal.
- `src/comments.js` mengelola guestbook dan listener komentar realtime.
- `src/firebase.js` menginisialisasi Firebase Realtime Database dari environment.

## Firebase Realtime Database

Firebase hanya dipakai untuk komentar. Artikel dan gambar tidak dikirim ke Firebase; keduanya akan ditambahkan ke situs dari file yang kamu unggah di chat.

Konfigurasi aplikasi web disimpan lokal di `.env.local` dan tidak masuk Git. `.env.example` menunjukkan nama variabel yang diperlukan. Nilai Firebase Web config dipakai di browser; keamanan data ditentukan oleh Firebase Database Rules, bukan oleh penyembunyian config.

Database tertutup secara default. Hanya `/comments` yang boleh dibaca publik dan menerima komentar baru yang memenuhi validasi. Field tambahan ditolak; klien tidak dapat mengubah atau menghapus komentar yang sudah ada. Jika Firebase Console saat ini menampilkan `.read: false` dan `.write: false` di root, ganti dengan aturan berikut agar hanya fitur komentar yang aktif:

1. Buka Firebase Console → **Realtime Database** → **Rules**.
2. Salin isi [`database.rules.json`](./database.rules.json) ke editor Rules.
3. Tekan **Publish**.

Komentar langsung terlihat untuk semua pengunjung. Aturan memvalidasi kategori dan panjang teks, tetapi komentar anonim publik tetap berisiko menerima spam; hapus konten yang tidak pantas dari Firebase Console dan pertimbangkan App Check sebelum situs dipublikasikan.
