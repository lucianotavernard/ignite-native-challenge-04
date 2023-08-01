import { useCallback, useEffect, useState } from 'react'
import { Alert } from 'react-native'

import { useFocusEffect, useNavigation } from '@react-navigation/native'

import { FlatList, HStack, Heading, Text, VStack } from 'native-base'

import { api } from '@/services/api'

import { Loading } from '@/components/Loading'

import { Group } from './components/Group'
import { ExerciseCard } from './components/ExerciseCard'

export function Home() {
  const [isLoading, setIsLoading] = useState(true)

  const [groups, setGroups] = useState<string[]>([])
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [groupSelected, setGroupSelected] = useState('antebraço')

  const navigation = useNavigation()

  function handleOpenExerciseDetails(exerciseId: string) {
    navigation.navigate('exercise', { exerciseId })
  }

  async function loadGroups() {
    try {
      const response = await api.get('groups')

      setGroups(response.data)
    } catch (error) {
      Alert.alert(
        'Oops..',
        'Desculpe, mas não foi possível carregar os grupos musculares'
      )
    }
  }

  async function loadExercisesByGroup(selectedGroup: string) {
    try {
      setIsLoading(true)

      const response = await api.get(`exercises/bygroup/${selectedGroup}`)

      setExercises(response.data)
    } catch (error) {
      Alert.alert(
        'Oops..',
        'Desculpe, mas não foi possível carregar os exercícios'
      )
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadGroups()
  }, [])

  useFocusEffect(
    useCallback(() => {
      loadExercisesByGroup(groupSelected)
    }, [groupSelected])
  )

  return (
    <VStack flex={1} paddingX={10} paddingBottom={16}>
      <Text>Home</Text>

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={
              groupSelected.toLocaleUpperCase() === item.toLocaleUpperCase()
            }
            onPress={() => setGroupSelected(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{ px: 8 }}
        maxHeight={10}
        marginY={10}
      />

      {isLoading ? (
        <Loading />
      ) : (
        <VStack px={8}>
          <HStack justifyContent="space-between" mb={5}>
            <Heading color="gray.200" fontSize="md" fontFamily="heading">
              Exercícios
            </Heading>

            <Text color="gray.200" fontSize="sm">
              {exercises.length}
            </Text>
          </HStack>

          <FlatList
            data={exercises}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ExerciseCard
                onPress={() => handleOpenExerciseDetails(item.id)}
                data={item}
              />
            )}
            showsVerticalScrollIndicator={false}
            _contentContainerStyle={{
              paddingBottom: 20
            }}
          />
        </VStack>
      )}
    </VStack>
  )
}
