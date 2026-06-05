# Budgetin

Budgetin adalah aplikasi budgeting berbasis Expo SDK 56 yang sedang dibangun untuk membantu pengguna mengatur cashflow, menentukan metode budgeting yang cocok, dan menyiapkan fondasi perencanaan finansial dari awal onboarding.

Saat ini repo ini sudah memiliki:

- flow onboarding 3 slide dengan ilustrasi custom
- halaman auth dengan CTA Google dan guest mode
- navigasi manual berbasis React Navigation
- state global ringan dengan Zustand
- bootstrap database lokal menggunakan `expo-sqlite`
- fondasi API client berbasis Axios
- dukungan Android, iOS, dan web

## Tech Stack

- Expo `~56.0.8`
- React `19.2.3`
- React Native `0.85.3`
- React Navigation `7`
- Zustand
- Axios
- Expo SQLite
- Expo Secure Store
- Expo UI / Glass Effect / Symbols

## Requirement

- Node.js LTS
- npm
- Xcode untuk iOS Simulator
- Android Studio untuk Android Emulator

Project ini mengikuti dokumentasi Expo versi SDK 56:

- [Expo SDK 56 docs](https://docs.expo.dev/versions/v56.0.0/)

## Menjalankan Project

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

- `npm run ios` dan `npm run android` akan menjalankan Expo dan membuka simulator/emulator bila environment native sudah siap.
- Project ini memakai library native seperti `expo-sqlite` dan `expo-secure-store`, jadi pastikan environment Expo SDK 56 kamu sinkron.

## Environment Variables

Beberapa modul sudah membaca environment variable berikut:

```env
EXPO_PUBLIC_API_URL=https://your-api-url
EXPO_PUBLIC_LOG_LEVEL=debug
```

Keterangan:

- `EXPO_PUBLIC_API_URL` dipakai oleh API client di `src/core/network`.
- `EXPO_PUBLIC_LOG_LEVEL` dipakai untuk kontrol level logging.

Kalau `EXPO_PUBLIC_API_URL` belum diisi lalu ada request ke relative endpoint, aplikasi akan melempar error.

## Struktur Project

```text
budgetin/
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
│   │   ├── explore/
│   │   ├── home/
│   │   └── onboarding/
│   └── types/
└── scripts/
```

Ringkasnya:

- `src/core` berisi fondasi aplikasi yang reusable.
- `src/features` berisi implementasi per fitur.
- navigator langsung mengimpor `presentation/views` dari tiap fitur.
- `App.tsx` menangani bootstrap font, database, dan root navigation.

## Arsitektur

Repo ini bergerak ke arah feature-driven architecture. Pola yang saat ini sudah terlihat:

- UI utama fitur berada di `src/features/*/presentation/views`
- navigator dipisah di `src/core/navigation`
- state aplikasi dipusatkan di `src/core/store`
- database dan network dipisah sebagai service layer di `src/core`
- komponen shared seperti shell/layout berada di `src/core/components`

Catatan penting: dokumen [INSTRUCTION.md](/Volumes/MobileDev/Projects/ExpoProject/budgetin/INSTRUCTION.md) sekarang sudah diselaraskan dengan kondisi repo saat ini, termasuk keputusan untuk memakai React Navigation manual dan direct import `view` dari feature.

## Flow Aplikasi Saat Ini

1. App memuat font dan inisialisasi database SQLite.
2. User yang belum menyelesaikan onboarding akan masuk ke screen onboarding.
3. Setelah onboarding selesai, user masuk ke flow auth.
4. User bisa lanjut dengan Google CTA atau guest mode.
5. Setelah session aktif, user diarahkan ke tab utama.
6. Tab utama saat ini terdiri dari:
   - `Home`
   - `Explore`

## Database

Database lokal menggunakan `expo-sqlite` dengan nama:

```text
budgetin.db
```

Migration awal yang sudah tersedia:

- membuat tabel `app_meta`
- menyimpan `initialized_at` saat database pertama kali dibuat

## Script

- `npm run start` menjalankan Expo dev server
- `npm run android` membuka Android target
- `npm run ios` membuka iOS target
- `npm run web` menjalankan versi web
- `npm run lint` menjalankan Expo lint
- `npm run reset-project` menjalankan script reset bawaan repo

## Status Implementasi

Yang sudah ada:

- visual onboarding custom
- visual auth custom
- dark theme dasar untuk app shell
- bootstrap database
- fondasi API client
- navigasi tab + stack

Yang masih terlihat sebagai placeholder:

- konten `Home`
- konten `Explore`
- integrasi API bisnis
- persistence auth token yang benar-benar terhubung ke flow auth

## File Penting

- [App.tsx](/Volumes/MobileDev/Projects/ExpoProject/budgetin/App.tsx)
- [app.json](/Volumes/MobileDev/Projects/ExpoProject/budgetin/app.json)
- [package.json](/Volumes/MobileDev/Projects/ExpoProject/budgetin/package.json)
- [src/core/navigation/root-navigator.tsx](/Volumes/MobileDev/Projects/ExpoProject/budgetin/src/core/navigation/root-navigator.tsx)
- [src/core/navigation/app-tabs.tsx](/Volumes/MobileDev/Projects/ExpoProject/budgetin/src/core/navigation/app-tabs.tsx)
- [src/features/auth/presentation/views/auth-view.tsx](/Volumes/MobileDev/Projects/ExpoProject/budgetin/src/features/auth/presentation/views/auth-view.tsx)
- [src/core/database/database.service.ts](/Volumes/MobileDev/Projects/ExpoProject/budgetin/src/core/database/database.service.ts)
- [src/features/onboarding/presentation/views/onboarding-view.tsx](/Volumes/MobileDev/Projects/ExpoProject/budgetin/src/features/onboarding/presentation/views/onboarding-view.tsx)

## Lisensi

Project ini mengikuti lisensi yang ada di file [LICENSE](/Volumes/MobileDev/Projects/ExpoProject/budgetin/LICENSE).
