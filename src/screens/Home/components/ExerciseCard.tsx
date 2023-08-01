import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { Heading, HStack, Image, Text, VStack, Icon } from 'native-base'

import { Entypo } from '@expo/vector-icons'

type Props = TouchableOpacityProps & {
  data: Exercise
}

export function ExerciseCard({ data, ...rest }: Props) {
  return (
    <TouchableOpacity {...rest}>
      <HStack
        alignItems="center"
        padding={2}
        rounded="md"
        paddingRight={4}
        marginBottom={3}
        background="gray.500"
      >
        <Image
          source={{ uri: `/exercise/thumb/${data.thumb}` }}
          alt="Imagem do exercício"
          rounded="md"
          width={16}
          height={16}
          marginRight={4}
          resizeMode="center"
        />

        <VStack flex={1}>
          <Heading fontSize="lg" color="white" fontFamily="heading">
            {data.name}
          </Heading>

          <Text fontSize="sm" color="gray.200" mt={1} numberOfLines={2}>
            {data.series} séries x {data.repetitions} repetições
          </Text>
        </VStack>

        <Icon as={Entypo} name="chevron-thin-right" color="gray.300" />
      </HStack>
    </TouchableOpacity>
  )
}
