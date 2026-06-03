import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ColorValue, StyleProp, TextStyle } from 'react-native';

import { BudgetinPalette, BudgetinTheme } from '@/core/theme/theme';

export type IconFamily = 'ion' | 'material' | 'material-community' | 'feather' | 'ant';
export type IconTone = keyof typeof BudgetinPalette | 'primary' | 'secondary' | 'inverted';

const iconFamilies = {
  ion: Ionicons,
  material: MaterialIcons,
  'material-community': MaterialCommunityIcons,
  feather: Feather,
  ant: AntDesign,
} satisfies Record<IconFamily, unknown>;

function resolveIconColor(tone?: IconTone, color?: ColorValue) {
  if (color) return color;
  if (!tone || tone === 'primary') return BudgetinTheme.text.primary;
  if (tone === 'secondary') return BudgetinTheme.text.secondary;
  if (tone === 'inverted') return BudgetinTheme.text.inverted;

  return BudgetinPalette[tone];
}

export type AppIconProps = {
  color?: ColorValue;
  family?: IconFamily;
  name: string;
  size?: number;
  style?: StyleProp<TextStyle>;
  tone?: IconTone;
};

export function AppIcon({
  color,
  family = 'ion',
  name,
  size = 24,
  style,
  tone = 'primary',
}: AppIconProps) {
  const IconComponent = iconFamilies[family] as typeof Ionicons;

  return (
    <IconComponent
      color={resolveIconColor(tone, color)}
      name={name as never}
      size={size}
      style={style}
    />
  );
}
