import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { AppIcon } from '@/core/components/ui/app-icon';
import { Colors } from '@/core/theme/theme';
import { MainTabParamList } from '@/core/navigation/types';
import { ExploreScreen } from '@/screens/explore-screen';
import { HomeScreen } from '@/screens/home-screen';

const Tab = createBottomTabNavigator<MainTabParamList>();

export function AppTabs() {
  const colors = Colors.dark;

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
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <AppIcon
              color={color}
              family="ion"
              name={focused ? 'home' : 'home-outline'}
              size={size}
            />
          ),
          title: 'Home',
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <AppIcon
              color={color}
              family="ion"
              name={focused ? 'compass' : 'compass-outline'}
              size={size}
            />
          ),
          title: 'Explore',
        }}
      />
    </Tab.Navigator>
  );
}
