# Kai Salvador — Portfolio Website (HTML, CSS & JavaScript)

Website portofolio full-stack developer bergaya terminal/code-editor.
Struktur folder sengaja dibuat sesederhana mungkin: cukup 3 file utama
(`index.html`, `style.css`, `script.js`) dalam satu folder, ditambah folder
`images/` untuk foto.

## Struktur Folder

```
index.html            -> Markup halaman home
projects.html         -> Halaman archive seluruh project
style.css             -> Semua styling (dark & light theme, animasi, responsive)
script.js             -> Semua interaktivitas (tema toggle, menu mobile,
                          typewriter effect, tab About, scroll-spy navbar,
                          carousel projects, modal services, render skill grid)
projects.js           -> Render project archive dan theme toggle archive
images/                -> Semua foto (bebas diganti sesuai kebutuhan)
favicon.svg            -> Ikon tab browser
kai-salvador-cv.pdf     -> Contoh file CV (bisa diunduh dari tombol "Download CV")
```

## Cara Menjalankan

### Opsi 1 — Buka langsung
Klik dua kali `index.html`, atau buka lewat browser (`File > Open File`).

### Opsi 2 — VS Code Live Server (disarankan)
1. Buka folder ini di VS Code (`File > Open Folder`).
2. Install ekstensi **Live Server** (oleh Ritwick Dey) dari Extensions Marketplace.
3. Klik kanan `index.html` → **Open with Live Server**.
4. Website terbuka otomatis di browser dengan live-reload saat kode diedit.

Tidak perlu Node.js, npm, atau proses build apa pun — murni HTML/CSS/JS.

## Mengganti Foto

Semua gambar ada di folder `images/`. Ganti file dengan nama yang sama,
atau ubah path-nya langsung di `index.html` (untuk hero) dan `script.js`
(untuk gambar proyek & layanan yang dirender lewat JavaScript).

## Mengganti Teks / Data

- Nama, tagline, isi hero: langsung di `index.html` pada `<section id="hero">`
- Bio & lokasi (About): objek `ABOUT_FILES` di `script.js`
- Daftar proyek: array `PROJECTS` di `script.js`
- Daftar layanan: array `SERVICES` di `script.js`
- Skill/teknologi: array `SKILLS` di `script.js` (ikon memakai Devicon dari CDN)
- Kontak & sosial media: `<footer id="footer">` di `index.html`
- Warna, font, jarak antar elemen: `style.css` (variabel warna ada di `:root`
  dan `html[data-theme="light"]` di bagian paling atas file)

## Catatan Teknis

- Font "Bricolage Grotesque" & "JetBrains Mono" dimuat dari Google Fonts (CDN).
- Ikon teknologi di bagian Skills memakai Devicon (CDN).
- Ikon UI lainnya (menu, panah, sosial media, dll.) adalah SVG inline — tidak
  butuh library ikon apa pun.
- Tema gelap/terang tersimpan otomatis di `localStorage` browser pengguna.

Selamat berkarya! 🚀
