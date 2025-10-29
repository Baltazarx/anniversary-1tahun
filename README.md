# 🎂 Website Ulang Tahun Romantis 🎉

Website romantis untuk merayakan ulang tahun pacar kamu! Website ini dibuat dengan Vite + React + TypeScript dan penuh dengan fitur-fitur romantis untuk membuat hari spesialnya menjadi semakin istimewa.

## ✨ Fitur-Fitur

- **Countdown Timer** - Menghitung mundur ke ulang tahun atau ulang tahun berikutnya
- **Gallery Kenangan** - Slideshow foto-foto kenangan indah kalian
- **Ucapan Ulang Tahun** - Surat ucapan ulang tahun yang romantis dan bisa dikustomisasi
- **Animasi Romantis** - Emoji ulang tahun (🎂🎉🎈🎁✨) yang beranimasi dan efek visual yang indah
- **Perhitungan Usia** - Otomatis menampilkan usia ulang tahun
- **Responsive Design** - Tampil sempurna di semua device
- **Background Gradient** - Background yang berubah-ubah dengan efek yang indah

## 🚀 Cara Menjalankan

1. Install dependencies:
```bash
npm install
```

2. Jalankan development server:
```bash
npm run dev
```

3. Buka browser dan akses `http://localhost:5173`

## 🎨 Kustomisasi

### Mengubah Tanggal Ulang Tahun
Edit file `src/App.tsx` pada baris 24 dan 34:
```typescript
// Ganti bulan (0=Januari, 11=Desember) dan tanggal
const birthdayThisYear = new Date(thisYear, 0, 15) // Contoh: 15 Januari

// Ganti dengan tahun lahir pacar kamu
const birthYear = 2000
```

### Menambah Kenangan
Edit array `memories` di file `src/App.tsx`:
```typescript
const memories: Memory[] = [
  {
    id: 1,
    date: '15 Januari 2024',
    title: 'Hari Pertama Kita Jadian',
    description: 'Deskripsi kenangan kalian...',
    image: 'URL_GAMBAR_KALIAN'
  },
  // Tambahkan kenangan lainnya...
]
```

### Mengubah Ucapan Ulang Tahun
Edit bagian `love-letter` di file `src/App.tsx` untuk menulis ucapan ulang tahun yang personal dan romantis.

### Mengubah Warna dan Styling
Edit file `src/App.css` untuk mengubah warna, font, dan styling sesuai keinginan.

## 📱 Responsive

Website ini sudah responsive dan akan tampil sempurna di:
- Desktop
- Tablet
- Mobile phone

## 💝 Tips untuk Membuat Lebih Personal

1. **Ganti Foto**: Upload foto-foto kalian ke hosting seperti Imgur, Cloudinary, atau Google Drive
2. **Edit Teks**: Ubah semua teks menjadi personal dan sesuai dengan hubungan kalian
3. **Tambah Kenangan**: Tambahkan lebih banyak kenangan dengan foto dan cerita
4. **Ubah Warna**: Sesuaikan warna dengan kesukaan pacar kamu
5. **Tambah Musik**: Kamu bisa menambahkan background music romantis

## 🎉 Cara Deploy

### Deploy ke Netlify (Gratis)
1. Build project: `npm run build`
2. Upload folder `dist` ke Netlify
3. Website siap online!

### Deploy ke Vercel (Gratis)
1. Push ke GitHub
2. Connect ke Vercel
3. Deploy otomatis!

## 💌 Semoga Pacar Kamu Suka!

Website ini dibuat dengan penuh cinta untuk merayakan hari spesial ulang tahunnya. Semoga website ini bisa membuat hari ulang tahunnya menjadi semakin istimewa dan penuh kebahagiaan! 🎂🎉💕

---

*Made with 💕 for the most amazing person in the world*