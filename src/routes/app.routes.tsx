import { Platform } from 'react-native'
import { useTheme } from 'native-base'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import HomeSvg from '@/assets/icons/home.svg'
import HistorySvg from '@/assets/icons/history.svg'
import ProfileSvg from '@/assets/icons/profile.svg'

import { Home } from '@/screens/Home'
import { Profile } from '@/screens/Profile'
import { History } from '@/screens/History'
import { Exercise } from '@/screens/Exercise'

const { Navigator, Screen } = createBottomTabNavigator()

export function AppRoutes() {
  const theme = useTheme()

  return (
    <Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.green[500],
        tabBarInactiveTintColor: theme.colors.gray[200],
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: Platform.OS === 'android' ? 'auto' : 96,
          paddingTop: theme.sizes[6],
          paddingBottom: theme.sizes[10],
          borderTopWidth: theme.sizes[0],
          backgroundColor: theme.colors.white
        }
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <HomeSvg
              width={theme.sizes[6]}
              height={theme.sizes[6]}
              fill={color}
            />
          )
        }}
      />
      <Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <ProfileSvg
              width={theme.sizes[6]}
              height={theme.sizes[6]}
              fill={color}
            />
          )
        }}
      />
      <Screen
        name="history"
        component={History}
        options={{
          tabBarIcon: ({ color }) => (
            <HistorySvg
              width={theme.sizes[6]}
              height={theme.sizes[6]}
              fill={color}
            />
          )
        }}
      />
      <Screen
        name="exercise"
        component={Exercise}
        options={{ tabBarButton: () => null }}
      />
    </Navigator>
  )
}
