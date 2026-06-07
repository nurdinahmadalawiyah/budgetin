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
          'Setiap pemasukan langsung dibagi jelas: kebutuhan, tabungan, sinking fund, dan spending limit. Cocok buat kamu yang ingin rem impulsif lebih kuat.',
        label: 'Zero-Impulse Budget',
        summary:
          'Metode ini cocok kalau kamu tenang saat semua uang sudah punya tugas.',
      },
      eyebrow: 'Rekomendasi metode',
      flexible: {
        description:
          'Fokus utama ada pada target yang sedang dikejar. Kategori harian tetap ada, tapi pengambilan keputusan selalu dikembalikan ke goal terdekat.',
        label: 'Goal-First Budget',
        summary:
          'Kamu terlihat nyaman kalau budgeting tetap luwes tapi tujuan besarnya jelas.',
      },
      freedom: {
        description:
          'Budgeting dipakai untuk memperbesar porsi tabungan, investasi, dan runway hidup. Cocok kalau kamu rela hidup lebih lean demi percepatan target besar.',
        label: 'Freedom Builder',
        summary:
          'Arahmu kuat ke aset dan kebebasan finansial jangka panjang.',
      },
      intro:
        'Dari jawabanmu, ini pola yang paling nyambung untuk bantu atur cashflow tanpa terasa terlalu maksa.',
      pill: 'Hasil quiz kamu',
      priorityBased: {
        description:
          'Income dibagi ke beberapa bucket utama supaya keputusan belanja tetap ringan. Enak untuk dipakai konsisten tanpa merasa terlalu dikekang.',
        label: 'Priority Buckets',
        summary:
          'Kamu butuh sistem yang simpel, cepat dibaca, dan tetap menjaga keseimbangan hidup.',
      },
      title: 'METODE BUDGETING YANG PALING COCOK BUAT KAMU.',
      zeroBased: {
        description:
          'Setiap rupiah diberi peran dari awal bulan supaya sisa uang bukan misteri. Cocok untuk kamu yang suka detail, kontrol, dan evaluasi rutin.',
        label: 'Zero-Based Budget',
        summary:
          'Kamu cenderung nyaman saat cashflow harian terlihat jelas dan terukur.',
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
