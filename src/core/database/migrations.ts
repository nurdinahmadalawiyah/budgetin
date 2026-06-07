import type { SQLiteDatabase } from 'expo-sqlite';

export type DatabaseMigration = {
  version: number;
  name: string;
  up: (db: SQLiteDatabase) => Promise<void>;
};

export const DATABASE_NAME = 'budgetin.db';

export const databaseMigrations: DatabaseMigration[] = [
  {
    version: 1,
    name: 'create_app_meta_table',
    up: async (db) => {
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS app_meta (
          key TEXT PRIMARY KEY NOT NULL,
          value TEXT
        );
      `);

      await db.runAsync(
        'INSERT OR IGNORE INTO app_meta (key, value) VALUES (?, ?)',
        'initialized_at',
        new Date().toISOString()
      );
    },
  },
  {
    version: 2,
    name: 'create_budgeting_methods_table',
    up: async (db) => {
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS budgeting_methods (
          id TEXT PRIMARY KEY NOT NULL,
          label TEXT NOT NULL,
          description TEXT NOT NULL,
          summary TEXT NOT NULL
        );
      `);

      const methods: Array<{ id: string; label: string; description: string; summary: string }> = [
        {
          id: 'anti-impulse',
          label: 'Zero-Impulse Budget',
          description:
            'Setiap pemasukan langsung dibagi jelas: kebutuhan, tabungan, sinking fund, dan spending limit. Cocok buat kamu yang ingin rem impulsif lebih kuat.',
          summary: 'Metode ini cocok kalau kamu tenang saat semua uang sudah punya tugas.',
        },
        {
          id: 'flexible',
          label: 'Goal-First Budget',
          description:
            'Fokus utama ada pada target yang sedang dikejar. Kategori harian tetap ada, tapi pengambilan keputusan selalu dikembalikan ke goal terdekat.',
          summary: 'Kamu terlihat nyaman kalau budgeting tetap luwes tapi tujuan besarnya jelas.',
        },
        {
          id: 'freedom',
          label: 'Freedom Builder',
          description:
            'Budgeting dipakai untuk memperbesar porsi tabungan, investasi, dan runway hidup. Cocok kalau kamu rela hidup lebih lean demi percepatan target besar.',
          summary: 'Arahmu kuat ke aset dan kebebasan finansial jangka panjang.',
        },
        {
          id: 'priority-based',
          label: 'Priority Buckets',
          description:
            'Income dibagi ke beberapa bucket utama supaya keputusan belanja tetap ringan. Enak untuk dipakai konsisten tanpa merasa terlalu dikekang.',
          summary: 'Kamu butuh sistem yang simpel, cepat dibaca, dan tetap menjaga keseimbangan hidup.',
        },
        {
          id: 'zero-based',
          label: 'Zero-Based Budget',
          description:
            'Setiap rupiah diberi peran dari awal bulan supaya sisa uang bukan misteri. Cocok untuk kamu yang suka detail, kontrol, dan evaluasi rutin.',
          summary: 'Kamu cenderung nyaman saat cashflow harian terlihat jelas dan terukur.',
        },
      ];

      for (const method of methods) {
        await db.runAsync(
          'INSERT OR IGNORE INTO budgeting_methods (id, label, description, summary) VALUES (?, ?, ?, ?)',
          method.id,
          method.label,
          method.description,
          method.summary
        );
      }
    },
  },
];
