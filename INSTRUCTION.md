# Architecture Guidelines: Budgetin Current State

Dokumen ini menjelaskan **realita arsitektur project Budgetin saat ini**, bukan target ideal template lain.

Project ini sekarang memakai:

- **Expo SDK 56**
- **React Navigation manual**, bukan Expo Router
- **Feature-first folder structure**
- **Presentation views** sebagai entry UI utama fitur
- **Core layer** untuk shared infra seperti navigation, theme, store, database, dan network

---

## Prinsip Utama

Budgetin sedang bergerak ke arah **feature-driven architecture** dengan batas tanggung jawab yang jelas, tetapi implementasinya **belum sepenuhnya clean architecture penuh di semua fitur**.

Aturan praktisnya:

- kode dibagi berdasarkan fitur bisnis di `src/features/*`
- shared concern masuk ke `src/core/*`
- navigator langsung mengimpor `presentation/views` dari feature
- `view` adalah entry point UI fitur
- logic infra seperti navigation shell, store, database, dan network tidak disimpan di feature bila dipakai lintas fitur

---

## Struktur Folder Aktual

```text
root/
├── App.tsx
├── app.json
├── assets/
├── src/
│   ├── core/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   └── ui/
│   │   ├── database/
│   │   ├── navigation/
│   │   ├── network/
│   │   ├── store/
│   │   ├── theme/
│   │   └── utils/
│   ├── features/
│   │   ├── auth/
│   │   │   └── presentation/
│   │   │       ├── components/
│   │   │       └── views/
│   │   ├── explore/
│   │   │   └── presentation/
│   │   │       └── views/
│   │   ├── home/
│   │   │   └── presentation/
│   │   │       └── views/
│   │   └── onboarding/
│   │       ├── data/
│   │       ├── domain/
│   │       └── presentation/
│   │           ├── components/
│   │           ├── viewmodels/
│   │           └── views/
│   └── types/
└── scripts/
```

Catatan penting:

- Tidak ada folder `app/` untuk routing.
- Tidak ada lagi folder `src/screens/`.
- Navigasi sekarang berada di `src/core/navigation/`.
- Beberapa fitur sudah punya struktur `data/domain/presentation`, tetapi belum semua fitur berada pada level kedalaman yang sama.

---

## Peran Tiap Layer

### 1. `src/core/`

Tempat untuk concern yang dipakai lintas fitur.

Isi yang cocok di sini:

- navigator
- komponen shared
- design tokens dan hooks theme
- app store global
- database service
- network client
- logger, helper, dan utilitas umum

Contoh dari project saat ini:

- `src/core/navigation/root-navigator.tsx`
- `src/core/components/layout/phone-shell.tsx`
- `src/core/store/app.store.ts`
- `src/core/database/database.service.ts`

### 2. `src/features/[feature]/presentation/`

Tempat UI dan komponen yang spesifik untuk satu fitur.

Isi yang cocok:

- `views/` untuk entry UI utama halaman fitur
- `components/` untuk subkomponen lokal fitur
- `viewmodels/` atau hooks UI bila fitur memang butuh

Aturan saat ini:

- navigator boleh langsung mengimpor komponen dari `presentation/views`
- jika sebuah file hanya menjadi wrapper tipis dan cuma `return <SomeView />`, wrapper itu **tidak perlu dibuat**

### 3. `src/features/[feature]/domain/`

Tempat business model dan kontrak fitur bila fiturnya memang sudah cukup kompleks untuk membutuhkan lapisan domain.

Isi yang cocok:

- entities
- repository contracts
- use cases

Catatan:

- lapisan ini **sudah dipakai di onboarding**, tetapi **belum wajib** untuk semua fitur kecil
- jangan memaksa semua fitur kecil langsung punya domain/data layer kalau belum ada kebutuhan nyata

### 4. `src/features/[feature]/data/`

Tempat implementasi sumber data bila fitur sudah butuh pemisahan data yang nyata.

Isi yang cocok:

- datasources
- models/dto
- repository implementations

Catatan:

- saat ini beberapa fondasi data masih berada di `src/core` karena dipakai global, misalnya database dan network client
- nanti saat fitur bisnis tumbuh, data source spesifik fitur boleh dipindahkan ke bawah feature masing-masing

---

## Aturan Routing dan Navigation

Budgetin saat ini memakai **React Navigation manual**.

Aturan yang dipakai:

- semua konfigurasi navigator berada di `src/core/navigation/`
- `root-navigator` dan `app-tabs` boleh langsung mengimpor `presentation/views`
- auth flow dan onboarding flow dikendalikan oleh state store, bukan `replace()` manual
- jika screen tree dirender secara conditional, biarkan navigator yang berpindah otomatis saat state berubah

Kenapa:

- ini lebih stabil untuk flow auth
- transisi Android lebih halus
- struktur feature tetap sederhana

---

## Penamaan Komponen

Gunakan aturan ini supaya konsisten:

- `View` untuk entry UI utama fitur
- `Component` untuk bagian UI kecil di dalam fitur
- `PhoneShell`, `AppButton`, dan komponen reusable lain masuk ke `core/components`

Aturan praktis:

- jika komponen adalah halaman utama fitur dan dirender langsung oleh navigator, nama `*View` masih valid
- jangan buat `*Screen` terpisah kecuali memang ada tanggung jawab adapter navigasi yang nyata

---

## Aturan Shared vs Feature

Pindahkan sesuatu ke `core` bila:

- dipakai oleh lebih dari satu fitur
- bukan milik domain bisnis fitur tertentu
- merupakan primitive layout, theme, atau infra

Biarkan sesuatu tetap di feature bila:

- hanya dipakai oleh satu fitur
- warna, art, copy, atau komposisinya spesifik untuk fitur itu
- dia bagian dari UI/UX khas flow fitur tersebut

Contoh:

- `PhoneShell` cocok di `core/components/layout`
- `AuthHeroArt` tetap milik fitur `auth`
- `OnboardingHeroArt` tetap milik fitur `onboarding`

---

## Larangan Praktis

1. Jangan menambah wrapper `screen` tipis yang tidak punya tanggung jawab jelas.
2. Jangan menaruh business logic fitur acak di `src/core/navigation`.
3. Jangan hardcode brand color berulang-ulang bila sudah ada di `BudgetinPalette`.
4. Jangan memasukkan komponen reusable lintas fitur ke dalam folder feature.
5. Jangan memaksa semua fitur kecil langsung punya `domain/data/usecase` kalau belum benar-benar dibutuhkan.

---

## Checklist Fitur Baru

Untuk fitur baru, pakai checklist ini:

- [ ] Buat folder fitur di `src/features/[nama-fitur]/`
- [ ] Mulai dari `presentation/views/` bila kebutuhan masih sederhana
- [ ] Tambahkan `presentation/components/` jika UI fitur mulai pecah
- [ ] Tambahkan `viewmodels/` atau hooks jika state/interaction mulai rumit
- [ ] Tambahkan `domain/` bila business rules mulai nyata
- [ ] Tambahkan `data/` bila fitur sudah punya data source spesifik
- [ ] Hubungkan navigator langsung ke `presentation/views`
- [ ] Naikkan komponen ke `src/core/components` bila mulai dipakai lintas fitur

---

## Kesimpulan

Arsitektur Budgetin saat ini adalah:

- **feature-first**
- **React Navigation manual**
- **direct import of feature views from navigator**
- **core for shared infra**
- **clean architecture diterapkan bertahap, bukan dipaksa penuh sekaligus**

Tujuan dokumen ini sederhana: menjaga struktur project tetap jujur terhadap kondisi sekarang, sambil tetap memberi arah yang sehat untuk pertumbuhan fitur berikutnya.
