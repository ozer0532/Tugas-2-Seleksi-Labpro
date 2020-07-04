# Suspect Expander App
(Betul sekali, namanya sangat original 🙂)

Dibuat oleh Chokyi Ozer (13518107)

Aplikasi dapat dilihat secara daring pada https://ozer0532.github.io/Tugas-2-Seleksi-Labpro/

## Cara menggunakan
Untuk mencari orang, Anda dapat memasukkan id atau nama orang tersebut pada kolom pencarian di bagian atas, dan menekan *Enter*
Untuk mendapatkan informasi lebih lanjut mengenai rekan orang yang dicari, Anda dapat memilih orang tersebut pada kartu di bagian samping layar atau pada graf

Warna warna pada graf menunjukkan elemen milik orang tersebut.
1. Air - Biru
2. Bumi - Hijau
3. Api - Merah
4. Udara - Kuning

## Cara memasang pada sistem lokal
Sebelum menjalankan aplikasi, pastikan node.js sudah terinstalasi pada perangkat Anda.
Untuk menjalankan aplikasi pada komputer lokal, unduh atau klon repository ini pada perangkat Anda.
Kemudian jalankan kode berikut:
```
npm install
npm start
```
Penjelajah Anda akan otomatis membuka aplikasi tersebut. Bila tidak, buka penjelajah secara manual dan buka `localhost:3000/Tugas-2-Seleksi-Labpro`.

## Kakas yang dipakai
1. React - Spek tugas.
2. Material UI - Spek tugas.
3. Material UI Icons - Bukan spek tugas, tapi sudah kompatibel dengan Material UI Core, jadi aku pakai ini.
4. Axios - Tujuan kakas ini sebenarnya untuk memperbaiki gagal pemuatan aplikasi saat sudah di-*deploy*. (Padahal masalah sebenarnya bukan karena butuh axios, tapi sudah dipasang jadi malas cabut lagi :) )
5. React-d3-graph - Aku pakai ini karena tampilannya menarik (sudah itu aja aslinya) dan bisa menyusun graf secara otomatis (walaupun berantakan). Komentar untuk kakas ini: karena cara susunnya pakai simulasi fisika, dengan jumlah simpul yang banyak, aplikasi bisa menjadi sangat (**sangat**) lambat, jadi disarankan disusunnya tanpa cara otomatis.

## Review API
Aku tidak tahu semua kecacatan API, tapi setidaknya aku tahu beberapa kekurangan ini:
1. *Intense Loving Action*: Seseorang bisa memiliki dua teman yang sama (Misal A berteman dengan B, R, I, B, E)
2. *Self Centered Person*: Seseorang bisa berteman dengan dirinya sendiri (Misal A berteman dengan B, A, K, E)

API yang baik disarankan untuk tidak memiliki data yang duplikat atau tidak logis karena hal tersebut mempersulit pengguna API. Aku asumsi daftar orang ini dibangkitkan secara acak tanpa ada pengecekan sehingga ada data yang duplikat dan tidak logis. Saran untuk pembangkitan secara acak: sebaiknya dilakukan pengecekan data setelah pembangkitan agar tidak terdapat data yang tidak logis.