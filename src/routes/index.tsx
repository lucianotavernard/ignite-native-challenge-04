import { useContext } from 'react'

import { NavigationContainer } from '@react-navigation/native'

import { AuthContext } from '@/contexts/AuthContext'
import { Loading } from '@/components/Loading'

import { AuthRoutes } from './auth.routes'
import { AppRoutes } from './app.routes'

export function Routes() {
  const { user, isLoadingUserStorageData } = useContext(AuthContext)
  const isAuthenticated = !!user

  if (isLoadingUserStorageData) {
    return <Loading />
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  )
}
