# Architecture Guidelines: Feature-Driven Clean Architecture in Expo

Dokumen ini berisi panduan, struktur folder, dan aturan main penerapan **Clean Architecture berbasis Fitur/Modul** (_Feature-Driven Clean Architecture_) di dalam ekosistem **React Native + Expo Router**.

---

## 📌 Prinsip Utama: The Dependency Rule

Arsitektur ini membagi kode ke dalam modul-modul independen berdasarkan fitur bisnis. Setiap fitur memiliki batasan lapisan (_layer_) yang ketat.

> **Aturan Emas:** lapisan dalam (**Domain**) tidak boleh mengetahui apa pun tentang lapisan luar (**Data** dan **Presentation**). Ketergantungan (_dependency_) hanya boleh mengarah ke dalam.

```text
[ Lapisan Terluar: Expo Router (app/) ]
                  │
                  ▼
[ Presentation Layer (Views / ViewModels) ]
                  │
                  ▼
[ Data Layer ]
                  │
                  ▼
[ Lapisan Terinti: Domain Layer (Pure TS) ]
```

---

## 📂 Struktur Folder Global

```text
root/
├── app/                             # EXPO ROUTER (Entry Point Navigasi)
│   ├── _layout.tsx                  # Root Layout & Global Providers
│   ├── index.tsx                    # Splash / Initial Redirect
│   ├── (auth)/                      # Group Route: Fitur Autentikasi
│   │   ├── login.tsx                # Hanya memanggil View dari feature/auth
│   │   └── register.tsx
│   └── (main)/                      # Group Route: Fitur Utama (Tabs/Drawer)
│       ├── _layout.tsx
│       └── home.tsx                 # Hanya memanggil View dari feature/home
│
├── src/                             # CORE SOURCE CODE
│   ├── core/                        # Shared Utilities & Konfigurasi Global
│   │   ├── network/                 # HttpClient (Axios/Fetch), Interceptors
│   │   ├── theme/                   # Design system (warna, font, spacing)
│   │   └── utils/                   # Helper global (formatters, validators)
│   │
│   └── features/                    # Tempat modul / fitur berada
│       └── [nama-fitur]/            # Contoh: auth, home, profile, dll.
│           ├── data/                # DATA LAYER
│           │   ├── datasources/     # Remote API & Local Storage/SQLite
│           │   ├── models/          # DTO / JSON Mapping
│           │   └── repositories/    # Implementasi Repository Interface
│           │
│           ├── domain/              # DOMAIN LAYER (Pure TypeScript)
│           │   ├── entities/        # Core business models
│           │   ├── repositories/    # Interface / kontrak repository
│           │   └── usecases/        # Logika bisnis per aksi
│           │
│           └── presentation/        # PRESENTATION LAYER
│               ├── components/      # Komponen UI lokal khusus fitur
│               ├── viewmodels/      # State management / hooks logika UI
│               └── views/           # Screen utama yang bersih dari business logic
```

---

## 🛠️ Penjelasan Lapisan per Fitur

### 1. Domain Layer (`domain/`)

Lapisan paling inti dan tidak boleh terkontaminasi oleh library eksternal, konfigurasi database, atau komponen UI Expo/React Native. Isinya harus murni TypeScript.

Isi utama layer ini:

- **Entities**  
  Representasi objek bisnis utama yang digunakan di seluruh aplikasi.

- **Repositories (Interface)**  
  Kontrak yang menentukan fungsi apa saja yang harus disediakan oleh Data Layer.  
  Contoh:

  ```ts
  login(email: string, password: string): Promise<User>;
  ```

- **Use Cases**  
  Unit logika bisnis tunggal. Satu berkas hanya boleh menangani satu skenario aksi.  
  Contoh:

  ```text
  LoginWithEmailUseCase.ts
  ```

---

### 2. Data Layer (`data/`)

Layer ini bertanggung jawab penuh atas penyediaan dan manipulasi data.

Isi utama layer ini:

- **Data Sources**  
  Tempat eksekusi network request seperti Axios/GraphQL atau akses penyimpanan lokal seperti SecureStore/AsyncStorage.

- **Models**  
  Kelas atau tipe data untuk memetakan response JSON dari API. Biasanya memiliki mapper dari **Model** ke **Entity**.

- **Repository Implementations**  
  Kelas yang mengimplementasikan interface dari Domain Layer. Di sinilah keputusan dibuat: apakah data diambil dari remote API, local cache, atau kombinasi keduanya.

---

### 3. Presentation Layer (`presentation/`)

Layer ini menangani semua urusan tampilan dan interaksi pengguna.

Isi utama layer ini:

- **Views**  
  Komponen UI murni React Native. Tugasnya hanya menampilkan data dan melempar aksi pengguna ke ViewModel. Jangan taruh logic bercabang kompleks di sini.

- **ViewModels / Hooks**  
  Menggunakan custom React Hooks seperti `use[Fitur]ViewModel.ts` untuk memegang state halaman, seperti loading, error, dan data. Layer ini juga berinteraksi dengan Use Cases dan mengisolasi logika UI dari komponen visual.

- **Components**  
  Atom UI kecil yang hanya digunakan secara spesifik di dalam fitur tersebut.

---

### 4. Expo Router Entry Point (`app/`)

Folder `app/` bukan tempat untuk menulis komponen UI panjang atau logika bisnis. Folder ini murni untuk konfigurasi routing.

Aturan untuk folder `app/`:

- Setiap berkas di dalam `app/` hanya boleh mengimpor komponen View dari folder `src/features/[fitur]/presentation/views/` terkait.
- Folder ini boleh digunakan untuk mengatur opsi navigasi visual seperti konfigurasi `<Stack.Screen>` atau `<Tabs.Screen>`, misalnya judul header, visibilitas navbar, dan konfigurasi navigasi lain.

---

## 🔄 Alur Komunikasi Data: Data Flow

Ketika pengguna menekan tombol di aplikasi, alur datanya berjalan seperti ini:

```text
User Tap Button
      │
      ▼
View
      │
      ▼
ViewModel
      │
      ▼
Use Case
      │
      ▼
Repository Interface (Domain)
      │
      ▼
Repository Implementation (Data)
      │
      ▼
Data Source (Remote / Local)
      │
      ▼
Entity diterima ViewModel
      │
      ▼
State berubah
      │
      ▼
View melakukan render ulang
```

Versi ringkas:

```text
User Tap Button
  → View
  → ViewModel
  → Use Case
  → Repository Implementation / Data Source
  → Entity kembali ke ViewModel
  → State berubah
  → View update UI
```

---

## ⛔ Aturan Larangan: Strict Rules

1. **Jangan import layer luar ke Domain Layer.**  
   Dilarang keras melakukan import berkas dari `data/` atau `presentation/` ke dalam `domain/`.

2. **Jangan fetching API langsung di UI.**  
   Dilarang menulis inline API fetching seperti `axios.post` langsung di dalam komponen View atau ViewModel. Semua wajib melalui Data Source dan Repository.

3. **Folder `app/` harus tetap tipis.**  
   Jika berkas di folder `app/` memiliki panjang lebih dari 30 baris kode di luar konfigurasi router/header, kemungkinan besar kodenya salah tempat dan harus dipindahkan ke folder `features/`.

4. **Komponen reusable harus naik ke core.**  
   Jika sebuah komponen UI digunakan oleh lebih dari dua fitur berbeda, pindahkan komponen tersebut ke `src/core/components/` sebagai Shared Component.

---

## ✅ Checklist Implementasi Fitur Baru

Gunakan checklist ini setiap kali membuat fitur baru. Biar tidak jadi arsitektur “niatnya clean, realitanya spaghetti enterprise edition”.

- [ ] Buat folder fitur di `src/features/[nama-fitur]/`.
- [ ] Definisikan entity di `domain/entities/`.
- [ ] Buat repository interface di `domain/repositories/`.
- [ ] Buat use case di `domain/usecases/`.
- [ ] Buat model/DTO di `data/models/`.
- [ ] Buat data source di `data/datasources/`.
- [ ] Buat repository implementation di `data/repositories/`.
- [ ] Buat ViewModel atau custom hook di `presentation/viewmodels/`.
- [ ] Buat View utama di `presentation/views/`.
- [ ] Hubungkan route di `app/` dengan mengimpor View dari fitur terkait.

---

## 🧭 Kesimpulan

Feature-Driven Clean Architecture membantu menjaga kode tetap modular, scalable, dan mudah dites. Setiap fitur memiliki batas yang jelas, sementara Dependency Rule memastikan business logic tetap aman dari detail teknis seperti UI, network, storage, atau routing.

Kuncinya sederhana: **Domain tetap murni, Data mengurus sumber data, Presentation mengurus UI, dan `app/` hanya menjadi pintu masuk navigasi.**
