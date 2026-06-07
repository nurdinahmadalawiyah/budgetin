const id = {
  auth: {
    continueAsGuest: 'Lanjut sebagai tamu',
    continueWithGoogle: 'Lanjut dengan Google',
    heroTitle: 'BUDGET CERDAS',
    subtitle:
      'Supaya template budget, goals, dan gold tracker kamu tersimpan rapi.',
    title: 'MASUK DULU, YUK.',
  },
  common: {
    back: 'Kembali',
    continue: 'Lanjut',
    expoDocumentation: 'Dokumentasi Expo',
    learnMore: 'Pelajari lebih lanjut',
    skip: 'Skip',
  },
  explore: {
    androidIosWebSupportBody:
      'Project ini bisa dibuka di Android, iOS, dan web. Untuk membuka versi web, tekan w di terminal yang menjalankan project ini.',
    androidIosWebSupportTitle: 'Dukungan Android, iOS, dan web',
    animationsBody:
      'Template ini menyertakan contoh komponen animasi. Komponen `src/core/components/ui/collapsible.tsx` memakai `react-native-reanimated` untuk menganimasikan panel ini.',
    animationsTitle: 'Animasi',
    imagesBody:
      'Untuk gambar statis, kamu bisa memakai suffix @2x dan @3x untuk menyediakan aset di berbagai kepadatan layar.',
    imagesTitle: 'Gambar',
    lightDarkBody:
      'Template ini sudah mendukung light dan dark mode. Hook useColorScheme() membantumu membaca preferensi color scheme pengguna supaya UI bisa ikut menyesuaikan.',
    lightDarkTitle: 'Komponen light dan dark mode',
    manualNavigationBody:
      'App ini mendefinisikan screen secara manual di src/core/navigation/root-navigator.tsx dan src/core/navigation/app-tabs.tsx.',
    manualNavigationExtra:
      'Komponen halaman utama diimpor langsung dari presentation/views, jadi flow navigasi dan UI tetap terpisah tapi tidak menambah wrapper screen tipis.',
    manualNavigationTitle: 'Navigasi manual',
    subtitle:
      'Starter app ini berisi contoh kode untuk membantu kamu mulai lebih cepat.',
    title: 'Eksplorasi',
  },
  home: {
    devTools: 'Dev tools',
    devToolsDevice: 'goyang device atau tekan m di terminal',
    devToolsSimulator: 'tekan %{shortcut}',
    devToolsWeb: 'gunakan browser devtools',
    freshStart: 'Mulai ulang',
    freshStartHint: 'npm run reset-project',
    getStarted: 'mulai dari sini',
    title: 'Selamat datang di Expo',
    tryEditing: 'Coba edit',
    tryEditingHint: 'src/core/navigation/root-navigator.tsx',
  },
  interactiveQuiz: {
    cta: {
      chooseAnswerFirst: 'Pilih jawaban dulu',
      enterApp: 'Masuk ke App',
      seeRecommendation: 'Lihat rekomendasi',
    },
    questionCounter: 'Pertanyaan %{current}/%{total}',
    recommendation: {
      antiImpulse: {
        description:
          'Kamu butuh sistem pencatatan yang bikin sadar uang pergi ke mana, tanpa terasa seperti spreadsheet horor.',
        label: 'THE ZEN ACCOUNTANT',
        summary: 'Okane Kakeibo',
      },
      cta: 'Atur income bulanan',
      eyebrow: 'FINANCIAL PROFILE MATCH',
      flexible: {
        description:
          'Kamu paling kuat saat uang diarahkan ke target spesifik: nikah, laptop, liburan, atau emergency fund.',
        label: 'THE GOAL CRUSHER',
        summary: 'Sinking Fund Strategy',
      },
      freedom: {
        description:
          'Kamu siap mode agresif: tekan pengeluaran, naikin saving rate, dan fokus kebebasan finansial.',
        label: 'THE FREEDOM FIGHTER',
        summary: 'FIRE Mode',
      },
      priorityBased: {
        description:
          'Kamu cocok dengan pembagian simpel: kebutuhan aman, lifestyle tetap hidup, tabungan jalan.',
        label: 'THE BALANCED HARMONIST',
        summary: '50/30/20 Rule',
      },
      retry: 'Ulangi',
      switchLabel: 'Ganti metode',
      switchPrompt: 'Kurang cocok?',
      zeroBased: {
        description:
          'Kamu suka kontrol penuh. Setiap rupiah akan punya tugas jelas sebelum sempat kabur ke checkout.',
        label: 'THE MONEY ARCHITECT',
        summary: 'Zero-Based Budgeting',
      },
    },
    questions: {
      comfortStyle: {
        options: {
          detailDisciplined: {
            subtitle: 'Checklist bikin tenang',
            title: 'Detail dan disiplin',
          },
          everyRupiahTask: {
            subtitle: 'Full allocation mode',
            title: 'Setiap rupiah ada tugas',
          },
          futureExtreme: {
            subtitle: 'Advanced mode',
            title: 'Hemat ekstrem demi masa depan',
          },
          goalTarget: {
            subtitle: 'Goal-driven',
            title: 'Fleksibel tapi target jelas',
          },
          simpleFast: {
            subtitle: 'Tidak ribet',
            title: 'Sederhana dan cepat',
          },
        },
        title: 'KAMU LEBIH NYAMAN DENGAN METODE...',
      },
      expenseTracking: {
        options: {
          allocateAll: {
            subtitle: 'Kontrol penuh dari awal',
            title: 'Setiap rupiah harus ada alokasi',
          },
          focusBiggest: {
            subtitle: 'Lebih fokus ke prioritas besar',
            title: 'Bagi income ke kategori besar',
          },
          freedomFirst: {
            subtitle: 'Long game mode',
            title: 'Hemat demi kebebasan finansial',
          },
          goalFirst: {
            subtitle: 'Goal jadi pusat budgeting',
            title: 'Nabung khusus untuk tujuan',
          },
          trackAll: {
            subtitle: 'Sadar arus pergi ke mana',
            title: 'Catat detail setiap pengeluaran',
          },
        },
        title: 'BAGAIMANA CARA KAMU BIASANYA MENGATUR PENGELUARAN?',
      },
      financialFocus: {
        options: {
          balanceLife: {
            subtitle: 'Stabil dulu',
            title: 'Menyeimbangkan hidup dan tabungan',
          },
          cutDaily: {
            subtitle: 'Mulai dari detail kecil',
            title: 'Mengurangi pengeluaran harian',
          },
          fullControl: {
            subtitle: 'Precision budgeting',
            title: 'Kontrol penuh setiap rupiah',
          },
          passiveIncome: {
            subtitle: 'Financial freedom',
            title: 'Investasi besar untuk pensiun dini',
          },
          shortGoal: {
            subtitle: 'Progress terasa cepat',
            title: 'Nabung untuk tujuan pendek',
          },
        },
        title: 'FOKUS UTAMA KAMU DALAM KEUANGAN ADALAH...',
      },
      mainPriority: {
        options: {
          dailyControl: {
            subtitle: 'Biar cepat kelihatan polanya',
            title: 'Kontrol cashflow harian',
          },
          everyRupiah: {
            subtitle: 'Tidak ada yang nganggur',
            title: 'Disiplin alokasi tiap rupiah',
          },
          longTerm: {
            subtitle: 'Agresif mendorong aset',
            title: 'Kebebasan finansial jangka panjang',
          },
          needsVsWants: {
            subtitle: 'Mau hidup rapi tapi tetap enjoy',
            title: 'Balance kebutuhan dan keinginan',
          },
          specialGoals: {
            subtitle: 'Target spesifik dulu',
            title: 'Dana khusus nikah/gadget/liburan',
          },
        },
        title: 'APA PRIORITAS UTAMA KAMU SEKARANG?',
      },
      promoResponse: {
        options: {
          compareToGoal: {
            subtitle: 'Tujuan tetap nomor satu',
            title: 'Lihat dulu diarahkan ke goal',
          },
          investmentFirst: {
            subtitle: 'Mindset future-first',
            title: 'Tidak tergoda, fokus investasi',
          },
          oftenBuy: {
            subtitle: 'Budget detail bantu rem',
            title: 'Kadang tergoda, masih kontrol',
          },
          rarelyTempted: {
            subtitle: 'Disiplin itu kamu banget',
            title: 'Tahan diri, jarang tergoda',
          },
          veryTempted: {
            subtitle: 'Butuh filter prioritas',
            title: 'Sering tergoda',
          },
        },
        title: 'KALAU ADA PROMO ATAU FLASH SALE, BIASANYA KAMU...',
      },
    },
  },
  onboarding: {
    slides: {
      cashflow: {
        copy:
          'Catat cashflow, pilih metode budgeting yang cocok, lalu app bantu setup kategori otomatis dari income kamu.',
        title: 'BUDGET KAMU, TAPI LEBIH WARAS.',
      },
      gold: {
        copy:
          'Track gram Antam, UBS, atau perhiasan. Goal bisa berbentuk uang maupun target gram.',
        title: 'EMAS JUGA IKUT KE-PLAN.',
      },
      quiz: {
        copy:
          'Jawab 5 pertanyaan soal spending, impulsif, goals, comfort level, dan risk appetite.',
        title: 'QUIZ DULU, BARU BUDGETING.',
      },
    },
  },
  tabs: {
    explore: 'Explore',
    home: 'Home',
  },
} as const;

export default id;
