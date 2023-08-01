import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

import { Center, Heading, Image, ScrollView, Text, VStack } from 'native-base'

import LogoSvg from '@/assets/logo.svg'
import bgImg from '@/assets/background.png'

import { Input } from '@/components/Form/Input'
import { Button } from '@/components/Touchables/Button'

export function SignUp() {
  const [isLoading] = useState(false)

  const navigation = useNavigation()

  function handleSignUp() {}

  function handleGoBack() {
    navigation.goBack()
  }

  return (
    <ScrollView
      bgColor="gray.700"
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} paddingX={10} paddingBottom={16}>
        <Image
          source={bgImg}
          defaultSource={bgImg}
          resizeMode="contain"
          position="absolute"
          alt="Gym"
        />

        <Center marginY={32}>
          <LogoSvg />

          <Text color="gray.100" fontSize="sm">
            Treine sua mente e o seu corpo.
          </Text>
        </Center>

        <Center style={{ gap: 16 }}>
          <Heading mb={6} color="gray.100" fontSize="xl" fontFamily="heading">
            Crie sua conta
          </Heading>

          <Input placeholder="Nome" />

          <Input
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Input placeholder="Senha" secureTextEntry />
          <Input
            placeholder="Confirmar a Senha"
            returnKeyType="send"
            secureTextEntry
          />

          <Button mt={4} onPress={handleSignUp} isLoading={isLoading}>
            Criar e acessar
          </Button>
        </Center>

        <Center marginTop="auto">
          <Button variant="secondary" onPress={handleGoBack}>
            Voltar para o login
          </Button>
        </Center>
      </VStack>
    </ScrollView>
  )
}
