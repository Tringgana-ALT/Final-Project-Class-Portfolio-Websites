# Inventaris Ikon

Website memakai ikon Phosphor melalui `@phosphor-icons/web` yang dimuat di `index.html`. Nama kelas ikon memakai awalan `ph ph-...`; warna dan ukuran biasanya ditambahkan sebagai kelas utility terpisah.

## Ikon yang tampil di halaman

| Ikon | Fungsi |
|---|---|
| `ph-terminal-window` | Logo situs di navigasi |
| `ph-moon` / `ph-sun` | Tombol ganti tema terang/gelap |
| `ph-chat-circle-dots` | Tautan Kirim Menfess |
| `ph-list` / `ph-x` | Buka/tutup navigasi seluler |
| `ph-code` | Status kelas dan identitas footer |
| `ph-terminal` | Penanda bagian hero |
| `ph-calendar-check` | Tautan ke jadwal |
| `ph-users` | Tautan ke struktur kelas |
| `ph-crown` | Penanda bagian struktur |
| `ph-camera` | Penanda galeri dan ikon fallback item galeri |
| `ph-clock` | Penanda bagian jadwal |
| `ph-chat-teardrop-dots` | Penanda bagian komentar |
| `ph-mask-happy` | Penanda input nama atau samaran |
| `ph-tag` | Penanda kategori komentar |
| `ph-caret-down` | Penanda pilihan kategori |
| `ph-cloud-check` | Penanda penyimpanan Firebase |
| `ph-paper-plane-tilt` | Tombol kirim komentar |
| `ph-chats` | Penanda daftar komentar |
| `ph-chat-teardrop` | Ikon saat papan komentar masih kosong |
| `ph-camera-rotate` | Ikon pada dialog galeri |
| `ph-bug` | Galeri pemrograman |
| `ph-megaphone` | Galeri classmeeting |
| `ph-users-three` | Galeri study tour dan kegiatan kelas |
| `ph-cpu` | Galeri perangkat keras |
| `ph-trophy` | Galeri lomba 17-an |
| `ph-instagram-logo` | Tautan Instagram |
| `ph-tiktok-logo` | Tautan TikTok |
| `ph-github-logo` | Tautan GitHub |

Ikon sosial berasal dari `classMeta.socials`, sedangkan ikon galeri berasal dari `galleryItems` di `src/data/classProfile.js`.

## Ikon fallback

Fallback dipakai renderer jika data ikon tidak tersedia:

| Ikon | Fungsi |
|---|---|
| `ph-sparkle` | Fallback umum untuk elemen ikon |
| `ph-camera` | Fallback ikon galeri |
| `ph-link` | Fallback tautan sosial |

## Ikon yang tercantum di data, tetapi belum tampil

Kelas berikut masih tersimpan sebagai metadata pengurus atau catatan jadwal. Renderer struktur dan jadwal saat ini tidak menampilkannya. Ikon ini bukan daftar fitur yang dijanjikan; gunakan hanya jika elemen terkait ditampilkan kembali.

| Ikon | Metadata terkait |
|---|---|
| `ph-shield-star` | Wakil Ketua |
| `ph-notepad` | Sekretaris |
| `ph-coins` | Bendahara |
| `ph-plugs` | Koordinator Peralatan / Lab |
| `ph-warning-circle` | Koordinator Keamanan |
| `ph-broom` | Koordinator Kebersihan |
| `ph-warning` | Catatan jadwal |
| `ph-info` | Catatan jadwal |
| `ph-plugs-connected` | Catatan jadwal |
| `ph-database` | Catatan jadwal |

## Menambah ikon

1. Pastikan nama ikon tersedia di pustaka Phosphor yang dipakai.
2. Tambahkan kelas ikon pada elemen yang membutuhkan, atau isi field `iconClass` di `src/data/classProfile.js` untuk ikon yang dirender dari data.
3. Perbarui inventaris ini dan pastikan ikon tetap memiliki label teks yang menjelaskan fungsi kontrolnya.

Tidak ada ikon baru yang dijadwalkan saat ini; inventaris hanya mencatat ikon aktif, fallback, dan ikon metadata yang belum dirender.
