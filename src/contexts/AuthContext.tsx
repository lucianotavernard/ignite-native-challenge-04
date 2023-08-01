/* eslint-disable no-useless-catch */
import { useState, createContext, PropsWithChildren, useEffect } from 'react'

import { api } from '@/services/api'

import { deleteTokens, getTokens, saveTokens } from '@/storage/storage-token'
import { deleteUser, getUser, saveUser } from '@/storage/storage-user'

type AuthState = {
  user: User
  accessToken: string
  refreshToken: string
}

type SignInCredentials = {
  email: string
  password: string
}

export type AuthContextData = {
  user: User
  signIn(credentials: SignInCredentials): Promise<void>
  signOut(): Promise<void>
  updatedUser(user: UserWithPassword): Promise<void>
  isLoadingUserStorageData: boolean
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function AuthProvider({ children }: PropsWithChildren<unknown>) {
  const [data, setData] = useState<AuthState>({} as AuthState)
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true)

  async function userAndTokenUpdate(
    user: User,
    accessToken: string,
    refreshToken: string
  ) {
    api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`

    setData({ user, accessToken, refreshToken })
  }

  async function storageUserAndTokenSave(
    user: User,
    accessToken: string,
    refreshToken: string
  ) {
    try {
      setIsLoadingUserStorageData(true)
      await saveUser(user)
      await saveTokens({ accessToken, refreshToken })
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post('auth', { email, password })

      const { user, accessToken, refreshToken } = response.data

      if (user && accessToken && refreshToken) {
        await storageUserAndTokenSave(user, accessToken, refreshToken)
        userAndTokenUpdate(user, accessToken, refreshToken)
      }
    } catch (error) {
      throw new Error('Ocorreu algum erro de comunicação com o backend.')
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  async function signOut() {
    try {
      setIsLoadingUserStorageData(true)
      setData({} as AuthState)

      await deleteUser()
      await deleteTokens()
    } catch (error) {
      throw new Error('Ocorreu algum erro no processo de sign out.')
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  async function updatedUser(user: UserWithPassword) {
    try {
      const response = await api.patch('user/profile', user)

      const updatedUser = response.data

      setData((prevData) => ({ ...prevData, user: updatedUser }))
      await saveUser(updatedUser)
    } catch (error) {
      throw new Error(
        'Ocorreu algum erro no processo de atualização do perfil.'
      )
    }
  }

  async function loadUserData() {
    try {
      setIsLoadingUserStorageData(true)

      const userLogged = await getUser()
      const { accessToken, refreshToken } = await getTokens()

      if (accessToken && userLogged) {
        userAndTokenUpdate(userLogged, accessToken, refreshToken)
      }
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  useEffect(() => {
    loadUserData()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        signIn,
        signOut,
        updatedUser,
        isLoadingUserStorageData
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
