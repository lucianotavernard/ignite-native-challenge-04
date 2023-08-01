import { useEffect, useState } from 'react'
import { Alert, TouchableOpacity } from 'react-native'

import { useNavigation, useRoute } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'

import { api } from '@/services/api'

import BodySvg from '@/assets/body.svg'
import SeriesSvg from '@/assets/series.svg'
import RepetitionsSvg from '@/assets/repetitions.svg'

import { Box, Heading, HStack, Icon, Image, Text, VStack } from 'native-base'
import { Loading } from '@/components/Loading'
import { Button } from '@/components/Touchables/Button'

type RouteParamsProps = {
  exerciseId: string
}

export function Exercise() {
  const [isLoading, setIsLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  const [exercise, setExercise] = useState<Exercise>({} as Exercise)

  const route = useRoute()
  const navigation = useNavigation()

  const { exerciseId } = route.params as RouteParamsProps

  function handleGoBack() {
    navigation.goBack()
  }

  async function handleExerciseHistoryRegister() {
    try {
      setSubmitting(true)

      await api.post('history', { exerciseId })

      Alert.alert('Parabéns!', 'Exercício registrado no seu histórico.')

      navigation.navigate('history')
    } catch (error) {
      Alert.alert('Oops!', 'Desculpe, mas não foi possível registrar exercício')
    } finally {
      setSubmitting(false)
    }
  }

  async function loadExercise() {
    try {
      const response = await api.get(`exercises/${exerciseId}`)

      setExercise(response.data)
    } catch (error) {
      Alert.alert(
        'Oops!',
        'Desculpe, mas não foi possível os detalhes do exercício'
      )
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadExercise()
  }, [exerciseId])

  return (
    <VStack flex={1}>
      <VStack paddingX={8} paddingTop={12} background="gray.600">
        <TouchableOpacity onPress={handleGoBack}>
          <Icon as={Feather} name="arrow-left" color="green.500" size={6} />
        </TouchableOpacity>

        <HStack
          alignItems="center"
          justifyContent="space-between"
          marginBottom={8}
          marginTop={4}
        >
          <Heading
            color="gray.100"
            fontSize="lg"
            flexShrink={1}
            fontFamily="heading"
          >
            {exercise.name}
          </Heading>

          <HStack alignItems="center">
            <BodySvg />

            <Text marginLeft={1} color="gray.200" textTransform="capitalize">
              {exercise.group}
            </Text>
          </HStack>
        </HStack>
      </VStack>

      {isLoading ? (
        <Loading />
      ) : (
        <VStack padding={8}>
          <Box overflow="hidden" marginBottom={3} rounded="lg">
            <Image
              source={{
                uri: `${api.defaults.baseURL}/exercise/demo/${exercise?.demo}`
              }}
              width="full"
              height={80}
              rounded="lg"
              resizeMode="cover"
              alt="Nome do exercício"
            />
          </Box>

          <Box
            rounded="md"
            paddingX={4}
            paddingBottom={4}
            background="gray.600"
          >
            <HStack
              alignItems="center"
              justifyContent="space-around"
              marginBottom={6}
              marginTop={5}
            >
              <HStack>
                <SeriesSvg />

                <Text color="gray.200" marginLeft={2}>
                  {exercise.series} séries
                </Text>
              </HStack>

              <HStack>
                <RepetitionsSvg />

                <Text color="gray.200" marginLeft={2}>
                  {exercise.repetitions} repetições
                </Text>
              </HStack>
            </HStack>

            <Button
              isLoading={submitting}
              onPress={handleExerciseHistoryRegister}
            >
              Marcar como realizado
            </Button>
          </Box>
        </VStack>
      )}
    </VStack>
  )
}
