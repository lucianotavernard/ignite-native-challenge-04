import { useCallback, useState } from 'react'
import { Alert } from 'react-native'

import { useFocusEffect } from '@react-navigation/native'

import { Heading, SectionList, Text, VStack } from 'native-base'

import { api } from '@/services/api'

import { Header } from '@/components/Header'
import { Loading } from '@/components/Loading'

import { HistoryCard } from './components/HistoryCard'

export function History() {
  const [isLoading, setIsLoading] = useState(true)
  const [exercises, setExercises] = useState<HistoryByDay[]>([])

  async function loadHistory() {
    try {
      setIsLoading(true)

      const response = await api.get('history')

      setExercises(response.data)
    } catch (error) {
      Alert.alert(
        'Oops..',
        'Desculpe, mas não foi possível carregar os histórico de exercícios'
      )
    } finally {
      setIsLoading(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadHistory()
    }, [])
  )

  return (
    <VStack flex={1}>
      <Header>Histórico</Header>

      {isLoading ? (
        <Loading />
      ) : (
        <SectionList
          sections={exercises}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <HistoryCard data={item} />}
          renderSectionHeader={({ section }) => (
            <Heading
              marginTop={10}
              marginBottom={3}
              fontFamily="heading"
              fontSize="md"
              color="gray.200"
            >
              {section.title}
            </Heading>
          )}
          paddingX={8}
          contentContainerStyle={
            exercises.length === 0 && { flex: 1, justifyContent: 'center' }
          }
          ListEmptyComponent={() => (
            <Text color="gray.100" textAlign="center">
              Não há exercícios registrados ainda. {'\n'}
              Vamos fazer exercícios hoje?
            </Text>
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
    </VStack>
  )
}
