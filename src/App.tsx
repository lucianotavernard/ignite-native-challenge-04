import { LayoutChangeEvent } from 'react-native'
import { View } from 'native-base'

import { Routes } from './routes'

type AppProps = {
  onLayout?: ((event: LayoutChangeEvent) => void) | undefined
}

export function App({ onLayout }: AppProps) {
  return (
    <View flex={1} onLayout={onLayout}>
      <Routes />
    </View>
  )
}
