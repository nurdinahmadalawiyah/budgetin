import { useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { AppCard } from '@/core/components/ui/app-card';
import { withOpacity } from '@/core/theme/glass';
import { BudgetinPalette, Fonts, Spacing } from '@/core/theme/theme';

const PRESETS = [
  { label: '5 jt', value: 5_000_000 },
  { label: '8 jt', value: 8_000_000 },
  { label: '12 jt', value: 12_000_000 },
] as const;

function formatRupiah(value: number): string {
  if (!value) return '';
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

const gradientStyle = Platform.select({
  web: {
    backgroundImage: `radial-gradient(circle at 82% 12%, ${withOpacity(BudgetinPalette.mint, 0.42)}, transparent 32%)`,
  } as object,
  default: {},
});

type MonthlyIncomeCardProps = {
  value: number;
  onChange: (value: number) => void;
};

export function MonthlyIncomeCard({ value, onChange }: MonthlyIncomeCardProps) {
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);

  const handlePresetPress = (presetValue: number) => {
    setSelectedPreset(presetValue);
    onChange(presetValue);
  };

  const handleInputChange = (text: string) => {
    const raw = text.replace(/\D/g, '');
    const num = parseInt(raw, 10) || 0;
    setSelectedPreset(null);
    onChange(num);
  };

  return (
    <AppCard
      borderRadius={22}
      glowColor={withOpacity(BudgetinPalette.mint, 0.48)}
      padding="three"
      style={{
        backgroundColor: BudgetinPalette.violet,
        ...gradientStyle,
      }}
    >
      <Text style={styles.label}>Monthly income</Text>

      <Text style={styles.subText}>
        Pakai income bersih per bulan biar auto-budget kamu lebih pas.
      </Text>

      <View style={styles.inputRow}>
        <Text style={styles.prefix}>Rp</Text>
        <TextInput
          keyboardType="numeric"
          onChangeText={handleInputChange}
          placeholder="0"
          placeholderTextColor={withOpacity(BudgetinPalette.ivory, 0.44)}
          style={styles.input}
          value={formatRupiah(value)}
        />
      </View>

      <View style={styles.presets}>
        {PRESETS.map((preset) => (
          <Pressable
            key={preset.value}
            onPress={() => handlePresetPress(preset.value)}
            style={({ pressed }) => [
              styles.chip,
              selectedPreset === preset.value && styles.chipActive,
              pressed && styles.chipPressed,
            ]}
          >
            <Text style={styles.chipText}>{preset.label}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.helpText}>
        Bisa kamu ubah kapan aja setelah masuk dashboard.
      </Text>
    </AppCard>
  );
}

const TEXT_IVORY = BudgetinPalette.ivory;

const styles = StyleSheet.create({
  label: {
    color: withOpacity(TEXT_IVORY, 1),
    fontFamily: Fonts.body,
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 0.6,
    marginBottom: Spacing.two,
    textTransform: 'uppercase',
  },
  subText: {
    color: withOpacity(TEXT_IVORY, 0.72),
    fontFamily: Fonts.body,
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 19,
    marginBottom: 14,
  },
  inputRow: {
    alignItems: 'baseline',
    flexDirection: 'row',
    gap: 10,
    marginBottom: 14,
  },
  prefix: {
    color: TEXT_IVORY,
    fontFamily: Fonts.body,
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 0.4,
  },
  input: {
    color: TEXT_IVORY,
    flex: 1,
    fontFamily: Fonts.display,
    fontSize: 36,
    lineHeight: 40,
    padding: 0,
  },
  presets: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 10,
  },
  chip: {
    backgroundColor: withOpacity(TEXT_IVORY, 0.14),
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  chipActive: {
    backgroundColor: withOpacity(TEXT_IVORY, 0.28),
  },
  chipPressed: {
    opacity: 0.8,
    transform: [{ translateY: 1 }],
  },
  chipText: {
    color: withOpacity(TEXT_IVORY, 0.88),
    fontFamily: Fonts.body,
    fontSize: 13,
    fontWeight: '700',
  },
  helpText: {
    color: withOpacity(TEXT_IVORY, 0.66),
    fontFamily: Fonts.body,
    fontSize: 12,
    fontWeight: '700',
    marginTop: 4,
  },
});
