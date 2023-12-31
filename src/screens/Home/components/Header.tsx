import { useContext } from 'react'
import { TouchableOpacity } from 'react-native'

import { Heading, HStack, Text, VStack, Icon } from 'native-base'

import { MaterialIcons } from '@expo/vector-icons'

import defaulUserPhotoImg from '@assets/userPhotoDefault.png'

import { api } from '@/services/api'
import { AuthContext } from '@/contexts/AuthContext'

import { Avatar } from '@/components/Avatar'

export function HomeHeader() {
  const { user, signOut } = useContext(AuthContext)

  return (
    <HStack bg="gray.600" pt={16} pb={5} px={8} alignItems="center">
      <Avatar
        source={
          user.avatar
            ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` }
            : defaulUserPhotoImg
        }
        marginRight={4}
        size={16}
        alt="Imagem do usuário"
      />

      <VStack flex={1}>
        <Text color="gray.100" fontSize="md">
          Olá,
        </Text>

        <Heading color="gray.100" fontSize="md" fontFamily="heading">
          {user.name}
        </Heading>
      </VStack>

      <TouchableOpacity onPress={signOut}>
        <Icon as={MaterialIcons} name="logout" color="gray.200" size={7} />
      </TouchableOpacity>
    </HStack>
  )
}
