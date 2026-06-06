import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { useLocale } from '@/core/i18n';
import { AppIcon } from '@/core/components/ui/app-icon';
import { MainTabParamList } from '@/core/navigation/types';
import { Colors } from '@/core/theme/theme';
import { ExploreView } from '@/features/explore/presentation/views/explore-view';
import { HomeView } from '@/features/home/presentation/views/home-view';

const Tab = createBottomTabNavigator<MainTabParamList>();

export function AppTabs() {
  const colors = Colors.dark;
  const { t } = useLocale();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: colors.background },
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.backgroundElement,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeView}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <AppIcon
              color={color}
              family="ion"
              name={focused ? 'home' : 'home-outline'}
              size={size}
            />
          ),
          title: t('tabs.home'),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreView}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <AppIcon
              color={color}
              family="ion"
              name={focused ? 'compass' : 'compass-outline'}
              size={size}
            />
          ),
          title: t('tabs.explore'),
        }}
      />
    </Tab.Navigator>
  );
}
