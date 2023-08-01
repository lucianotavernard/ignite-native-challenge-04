import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

import { Center, Heading, Image, ScrollView, Text, VStack } from 'native-base'

import LogoSvg from '@/assets/logo.svg'
import bgImg from '@/assets/background.png'

import { Input } from '@/components/Form/Input'
import { Button } from '@/components/Touchables/Button'

export function SignIn() {
  const [isLoading] = useState(false)

  const navigation = useNavigation()

  function handleSignIn() {}

  function handleNewAccount() {
    navigation.navigate('signUp')
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

        <Center marginTop={32} marginBottom={40}>
          <LogoSvg />

          <Text color="gray.100" fontSize="sm">
            Treine sua mente e o seu corpo.
          </Text>
        </Center>

        <Center style={{ gap: 16 }}>
          <Heading mb={6} color="gray.100" fontSize="xl" fontFamily="heading">
            Acesse a conta
          </Heading>

          <Input
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Input placeholder="Senha" secureTextEntry />

          <Button mt={4} onPress={handleSignIn} isLoading={isLoading}>
            Acessar
          </Button>
        </Center>

        <Center marginTop="auto">
          <Text mb={3} color="gray.100" fontSize="sm" fontFamily="body">
            Ainda não tem acesso?
          </Text>

          <Button variant="secondary" onPress={handleNewAccount}>
            Criar Conta
          </Button>
        </Center>
      </VStack>
    </ScrollView>
  )
}
