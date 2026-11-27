# 🎨 Design System & UI Style Guide — Portofolio Kelas 10 RPL

Panduan gaya desain (Design Guide) resmi untuk ekosistem web **Kelas 10 RPL (Software Engineering)**. Dokumen ini memastikan konsistensi visual, aksesibilitas, dan kemudahan kolaborasi pengembangan web kelas.

---

## 1. Brand Identity & Design Principles
- **Theme:** Modern Tech, Ocean Breeze & High-school Solidarity.
- **Mood & Tone:** Kolaboratif, bersih, bersemangat, rapi (*clean code vibe*), dan ramah pengguna.
- **Visual Motif:** Sentuhan elemen koding (*syntax code preview, monospace badges, terminal dots, subtle tech grid lines*), dipadukan dengan aksen *glassmorphism* modern.

---

## 2. Palet Warna (Color Palette)

### A. Brand Colors (Ocean Blue Spectrum)
| Token | HEX Code | Tailwind Utility | Peruntukan / Penggunaan |
| :--- | :--- | :--- | :--- |
| **Navy Deep** | `#0A2540` | `bg-[#0A2540]`, `text-[#0A2540]` | Heading utama, dark container, header teks kontras |
| **Ocean Blue (Primary)** | `#0284C7` | `bg-sky-600` / `bg-[#0284C7]` | Tombol utama, tab aktif, ikon fokus, brand mark |
| **Cyan Bright (Accent)** | `#38BDF8` | `bg-sky-400` / `text-sky-400` | Border highlight, glow efek, kata kunci heading hero |
| **Soft Sky** | `#E0F2FE` | `bg-sky-50` / `text-sky-700` | Background badge produktif, kartu aktif ringan |

### B. Functional & Semantic Colors
- **Success / Online (`#10B981` / Emerald 500):** Indikator status sistem, verifikasi, status kehadiran.
- **Warning / Star (`#F59E0B` / Amber 500):** Badge kesan/pesan khusus, highlight guru.
- **Accent / Menfess (`#F43F5E` / Rose 500):** Badge kategori "Menfess", tombol hati/like.
- **Neutral Background (`#F8FAFC` / Slate 50):** Kanvas latar belakang utama (mode terang).
- **Surface Card (`#FFFFFF` / White):** Background kartu konten dengan border tipis `#E2E8F0`.
- **Text Main (`#0F172A` / Slate 900):** Teks judul dan body utama.
- **Text Muted (`#64748B` / Slate 500):** Deskripsi sekunder, metadata waktu, label form.

---

## 3. Tipografi (Typography System)

- **Primary Font Family:** `'Plus Jakarta Sans', sans-serif`  
  Digunakan untuk seluruh judul (Heading), navigasi, label form, dan teks isi paragraf.
- **Code & Tech Font Family:** `'Fira Code', 'JetBrains Mono', monospace`  
  Digunakan untuk *code preview card*, badge mata pelajaran kejuruan (*PRODUKTIF RPL*), dan atribut coding.

### Type Scale:
- **Display 1 (Hero Title):** `text-4xl` s/d `text-5xl` (36px - 48px), `font-extrabold`, `tracking-tight`
- **Heading 2 (Section Title):** `text-2xl` s/d `text-3xl` (24px - 30px), `font-bold`
- **Heading 3 (Card Title):** `text-lg` s/d `text-xl` (18px - 20px), `font-semibold`
- **Body Regular:** `text-sm` s/d `text-base` (14px - 16px), `font-normal`, `leading-relaxed`
- **Caption / Badge:** `text-xs` (11px - 12px), `font-semibold` / `font-mono`, `tracking-wider`

---

## 4. Spacing, Radius & Shadows

### Border Radius (Corner Smoothing)
- `rounded-lg` (8px): Form input controls, dropdown select, thumbnail kecil.
- `rounded-xl` (12px): Kartu item jadwal, galeri mini, dialog alert.
- `rounded-2xl` (16px): Kartu utama (Struktur Organisasi, Hero Code Box, Komentar Card).
- `rounded-full` (9999px): Pill badges, avatar profil bundar, tombol CTA pill.

### Elevation & Effects
- **Glassmorphism:** `bg-white/80 backdrop-blur-md border border-white/20 shadow-sm`
- **Card Shadow (Default):** `shadow-sm hover:shadow-md transition-shadow duration-200`
- **Hover Lift:** `hover:-translate-y-1 transition-transform duration-200`

---

## 5. Komponen Kunci (Component Guidelines)

### 1. Navigation Bar
- Tinggi navbar: `h-16` s/d `h-20` (64px - 80px)
- Fixed / Sticky di bagian atas layar dengan efek blur kaca (`backdrop-blur-md`).
- Menampung logo identitas, navigasi anchor smooth scroll, switcher tema, dan shortcut CTA.

### 2. Badge "PRODUKTIF RPL"
- Ditampilkan di modul **Jadwal Mapel** untuk membedakan mata pelajaran IT (Basis Data, Pemrograman, Desain Grafis, Sistem Komputer).
- Style: Background `#0284C7` (atau `bg-sky-600`), teks putih, font monospace bold kecil (`text-[10px] tracking-wider uppercase`).

### 3. Kartu Struktur Organisasi
- Desain berjenjang (Wali Kelas berada di tingkat atas dengan kartu lebih prominent beraksen ring emas/biru; diikuti Pengurus Inti 4 kolom, dan Seksi Bidang 3 kolom).
- Avatar berbentuk lingkaran (`rounded-full`) dengan placeholder inisial atau foto siswa.

### 4. Feed Komentar & Menfess
- Input form bersih dengan counter dan dropdown kategori (`Pesan`, `Kesan`, `Menfess`).
- Kartu feed interaktif: Nama pengirim/anonim di sebelah kiri, badge kategori dengan warna relevan (Biru untuk Pesan, Kuning untuk Kesan, Merah/Rose untuk Menfess), dan tanggal/jam di sisi kanan.

---

## 6. Aksesibilitas & Responsivitas (A11y & RWD)
- **Rasio Kontras Konten:** Minimal 4.5:1 untuk teks normal terhadap background latar.
- **Mobile First Adaptation:**
  - Layout grid otomatis berubah: `grid-cols-1` pada smartphone (<640px) $\rightarrow$ `grid-cols-2` pada tablet $\rightarrow$ `grid-cols-3` atau `grid-cols-4` pada desktop.
  - Target sentuhan tombol (touch target) minimal 44x44 piksel pada perangkat layar sentuh.
