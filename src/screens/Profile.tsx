/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useState } from 'react'
import { Alert, TouchableOpacity } from 'react-native'

import {
  Center,
  Heading,
  ScrollView,
  Skeleton,
  Text,
  VStack
} from 'native-base'

import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'

import defaulUserPhotoImg from '@/assets/userPhotoDefault.png'

import { api } from 'src/services/api'
import { AuthContext } from '@/contexts/AuthContext'

import { Header } from '@/components/Header'
import { Avatar } from '@/components/Avatar'

import { Input } from '@/components/Form/Input'
import { Button } from '@/components/Touchables/Button'

type File = FileSystem.FileInfo & {
  size: number
}

type FormDataProps = any

export function Profile() {
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const { user, updatedUser } = useContext(AuthContext)

  const [avatar, setAvatar] = useState(() =>
    user.avatar
      ? `${api.defaults.baseURL}/avatar/${user.avatar}`
      : defaulUserPhotoImg
  )

  async function handleProfileUpdate(data: FormDataProps) {
    try {
      setSubmitting(true)

      await updatedUser(data)

      Alert.alert('Sucesso', 'Perfil atualizado com sucesso')
    } catch (error) {
      Alert.alert(
        'Oops..',
        'Ocorreu algum problema na autenticação, verifique suas credenciais e tente novamente.'
      )
    } finally {
      setSubmitting(false)
    }
  }

  async function handleUserPhotoSelected() {
    setLoading(true)

    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true
      })

      if (photoSelected.canceled) {
        return
      }

      const photoSelectedUri = photoSelected.assets[0].uri

      if (photoSelectedUri) {
        const photoInfo = await FileSystem.getInfoAsync(photoSelectedUri)
        const detail = photoInfo as File

        if (detail.size && detail.size / 1024 / 1024 > 5) {
          return Alert.alert(
            'Oops..',
            'Essa imagem é muito grande. Escolha uma de até 5MB.'
          )
        }

        setAvatar(photoSelectedUri)

        const fileExtension = photoSelectedUri.split('.').pop()

        const photoFile = {
          uri: photoSelectedUri,
          name: `${new Date().getTime()}.${fileExtension}`.toLowerCase(),
          type: `${photoSelected.assets[0].type}/${fileExtension}`
        }

        const userPhotoUploadForm = new FormData()

        userPhotoUploadForm.append('file', photoFile as any)

        await api.patch('/users/avatar', userPhotoUploadForm, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })

        Alert.alert('Sucesso', 'Foto atualizada com sucesso.')
      }
    } catch (error) {
      Alert.alert(
        'Oops..',
        'Descupe mas ocorreu um erro\ntentando atualizar sua imagem.'
      )

      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <VStack flex={1}>
      <Header>Perfil</Header>

      <ScrollView
        bgColor="gray.700"
        contentContainerStyle={{ paddingBottom: 36 }}
      >
        <Center>
          {loading ? (
            <Skeleton
              width={32}
              height={32}
              rounded="full"
              endColor="gray.400"
              startColor="gray.500"
            />
          ) : (
            <Avatar source={avatar} alt="Foto do usuário" size={32} />
          )}

          <TouchableOpacity onPress={handleUserPhotoSelected}>
            <Text
              marginTop={2}
              marginBottom={8}
              fontWeight="bold"
              fontSize="md"
              color="green.500"
            >
              Alterar Foto
            </Text>
          </TouchableOpacity>

          <Input background="gray.600" placeholder="Nome" />

          <Input
            background="gray.600"
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Heading
            alignSelf="flex-start"
            marginTop={12}
            marginBottom={2}
            fontFamily="heading"
            fontSize="md"
            color="gray.200"
          >
            Alterar senha
          </Heading>

          <Input placeholder="Senha antiga" secureTextEntry />

          <Input placeholder="SNova senha" secureTextEntry />

          <Input placeholder="Confirmar a nova senha" secureTextEntry />

          <Button mt={4} onPress={handleProfileUpdate} isLoading={submitting}>
            Atualizar
          </Button>
        </Center>
      </ScrollView>
    </VStack>
  )
}
