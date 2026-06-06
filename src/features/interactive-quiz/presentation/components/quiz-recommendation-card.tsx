import { StyleSheet, Text, View } from "react-native";

import { AppIcon } from "@/core/components/ui/app-icon";
import { BudgetinThemeTokens, Fonts } from "@/core/theme/theme";

type QuizRecommendationCardProps = {
  description: string;
  label: string;
  summary: string;
  theme: BudgetinThemeTokens;
};

export function QuizRecommendationCard({
  description,
  label,
  summary,
  theme,
}: QuizRecommendationCardProps) {
  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: "rgba(255, 246, 236, 0.09)",
          borderColor: "rgba(255, 246, 236, 0.08)",
          boxShadow: "0 22px 46px rgba(0, 0, 0, 0.24)",
        },
      ]}
    >
      <View style={styles.headerRow}>
        <View
          style={[
            styles.iconWrap,
            {
              backgroundColor: "rgba(240, 107, 97, 0.16)",
              borderColor: "rgba(240, 107, 97, 0.34)",
            },
          ]}
        >
          <AppIcon color="#FF8E86" family="feather" name="target" size={18} />
        </View>
        <View style={styles.headerText}>
          <Text style={[styles.eyebrow, { color: "#FFB0AA" }]}>Rekomendasi metode</Text>
          <Text style={[styles.label, { color: theme.text.primary }]}>{label}</Text>
        </View>
      </View>

      <Text style={[styles.summary, { color: theme.text.primary }]}>{summary}</Text>
      <Text style={[styles.description, { color: theme.text.secondary }]}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    borderWidth: 1,
    gap: 16,
    padding: 18,
  },
  description: {
    fontFamily: "DMSans_400Regular",
    fontSize: 13,
    lineHeight: 19,
  },
  eyebrow: {
    fontFamily: Fonts.body,
    fontSize: 11,
    lineHeight: 14,
    textTransform: "uppercase",
  },
  headerRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
  },
  headerText: {
    flex: 1,
    gap: 2,
  },
  iconWrap: {
    alignItems: "center",
    borderRadius: 14,
    borderWidth: 1,
    height: 44,
    justifyContent: "center",
    width: 44,
  },
  label: {
    fontFamily: Fonts.display,
    fontSize: 28,
    letterSpacing: -0.8,
    lineHeight: 30,
    textTransform: "uppercase",
  },
  summary: {
    fontFamily: Fonts.body,
    fontSize: 16,
    lineHeight: 20,
  },
});
