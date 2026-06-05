# Budgetin

Budgetin adalah aplikasi budgeting mobile yang dirancang untuk membantu pengguna menyusun keuangan dengan cara yang terasa lebih ringan, visual, dan realistis untuk dipakai sehari-hari.

Fokus produk ini adalah membantu pengguna:

- memahami cashflow pribadi
- memulai budgeting dari onboarding yang lebih ramah
- menyimpan setup budget dan goals dengan rapi
- menyiapkan fondasi untuk pelacakan tabungan dan gold goals

## Product Snapshot

Versi project saat ini sudah memiliki:

- onboarding 3 langkah dengan ilustrasi custom
- auth landing dengan CTA Google dan guest mode
- flow awal aplikasi dari onboarding ke auth lalu ke tab utama
- dukungan Android, iOS, dan web

Saat ini Budgetin masih berada di tahap pengembangan fondasi produk. Beberapa bagian inti UI dan app flow sudah mulai terbentuk, sementara fitur finansial utamanya masih akan terus dikembangkan.

## Experience Direction

Budgetin dibangun dengan arah pengalaman seperti ini:

- terasa hangat dan tidak “finance app banget”
- visual kuat, bukan sekadar form dan list
- onboarding membantu pengguna masuk ke sistem budgeting secara bertahap
- komponen dan layout dibuat supaya terasa konsisten lintas halaman

## Current App Flow

Urutan pengalaman pengguna saat ini:

1. aplikasi melakukan bootstrap font dan database lokal
2. pengguna baru masuk ke onboarding
3. setelah onboarding, pengguna masuk ke auth flow
4. pengguna bisa lanjut via Google CTA atau guest mode
5. setelah session aktif, pengguna masuk ke tab utama

Tab utama yang tersedia saat ini:

- `Home`
- `Explore`

## What Exists Today

Yang sudah tersedia di repo:

- visual onboarding custom
- visual auth custom
- manual navigation dengan React Navigation
- state global ringan dengan Zustand
- bootstrap SQLite lokal
- fondasi API client berbasis Axios

Yang masih dalam tahap berikutnya:

- konten bisnis utama di `Home`
- konten bisnis utama di `Explore`
- integrasi auth Google yang benar-benar aktif
- persistence session/token yang lengkap
- fitur budgeting dan goal tracking yang penuh

## Tech Stack

- Expo SDK 56
- React Native
- React Navigation 7
- Zustand
- Axios
- Expo SQLite
- Expo Secure Store

## Getting Started

1. Install dependency:

```bash
npm install
```

2. Jalankan development server:

```bash
npm run start
```

3. Buka target platform:

- `npm run ios`
- `npm run android`
- `npm run web`

Catatan:

- project ini mengikuti dokumentasi Expo SDK 56
- beberapa library yang dipakai bersifat native, jadi pastikan environment Expo kamu siap untuk iOS atau Android

Referensi utama:

- [Expo SDK 56 docs](https://docs.expo.dev/versions/v56.0.0/)

## Environment Variables

Environment variable yang saat ini dipakai:

```env
EXPO_PUBLIC_API_URL=https://your-api-url
EXPO_PUBLIC_LOG_LEVEL=debug
```

Keterangan:

- `EXPO_PUBLIC_API_URL` dipakai oleh API client
- `EXPO_PUBLIC_LOG_LEVEL` dipakai untuk kontrol logging

Jika `EXPO_PUBLIC_API_URL` belum diisi lalu app mencoba memanggil relative endpoint, request akan gagal.

## Project Structure

Struktur repo saat ini secara ringkas:

```text
src/
├── core/
│   ├── components/
│   ├── database/
│   ├── navigation/
│   ├── network/
│   ├── store/
│   ├── theme/
│   └── utils/
├── features/
│   ├── auth/
│   ├── explore/
│   ├── home/
│   └── onboarding/
└── types/
```

Pola yang dipakai sekarang:

- `core` untuk shared infra dan reusable building blocks
- `features` untuk implementasi UI dan logic per fitur
- navigator langsung mengimpor `presentation/views` dari tiap fitur

Untuk panduan teknis internal yang lebih detail, lihat [INSTRUCTION.md](/Volumes/MobileDev/Projects/ExpoProject/budgetin/INSTRUCTION.md).

## Important Files

- [App.tsx](/Volumes/MobileDev/Projects/ExpoProject/budgetin/App.tsx)
- [app.json](/Volumes/MobileDev/Projects/ExpoProject/budgetin/app.json)
- [src/core/navigation/root-navigator.tsx](/Volumes/MobileDev/Projects/ExpoProject/budgetin/src/core/navigation/root-navigator.tsx)
- [src/core/navigation/app-tabs.tsx](/Volumes/MobileDev/Projects/ExpoProject/budgetin/src/core/navigation/app-tabs.tsx)
- [src/features/auth/presentation/views/auth-view.tsx](/Volumes/MobileDev/Projects/ExpoProject/budgetin/src/features/auth/presentation/views/auth-view.tsx)
- [src/features/onboarding/presentation/views/onboarding-view.tsx](/Volumes/MobileDev/Projects/ExpoProject/budgetin/src/features/onboarding/presentation/views/onboarding-view.tsx)

## License

Project ini mengikuti lisensi yang ada di file [LICENSE](/Volumes/MobileDev/Projects/ExpoProject/budgetin/LICENSE).
