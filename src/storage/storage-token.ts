import AsyncStorage from '@react-native-async-storage/async-storage'

import { tokenCollection } from '@/storage/storage-config'

type StorageAuthTokenProps = {
  accessToken: string
  refreshToken: string
}

export async function getTokens() {
  const response = await AsyncStorage.getItem(tokenCollection)

  const { accessToken, refreshToken }: StorageAuthTokenProps = response
    ? JSON.parse(response)
    : {}

  return {
    accessToken,
    refreshToken
  }
}

export async function saveTokens({
  accessToken,
  refreshToken
}: StorageAuthTokenProps) {
  await AsyncStorage.setItem(
    tokenCollection,
    JSON.stringify({ accessToken, refreshToken })
  )
}

export async function deleteTokens() {
  await AsyncStorage.removeItem(tokenCollection)
}
