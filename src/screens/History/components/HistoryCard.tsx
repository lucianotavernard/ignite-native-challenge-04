import { Heading, HStack, Text, VStack } from 'native-base'

type HistoryCardProps = {
  data: ExerciseHistory
}

export function HistoryCard({ data }: HistoryCardProps) {
  return (
    <HStack
      width="full"
      rounded="md"
      paddingX={5}
      paddingY={4}
      marginBottom={3}
      alignItems="center"
      justifyContent="space-between"
      background="gray.600"
    >
      <VStack marginRight={5}>
        <Heading
          color="white"
          fontSize="md"
          fontFamily="heading"
          textTransform="capitalize"
        >
          {data.group}
        </Heading>

        <Text color="gray.100" fontSize="lg" numberOfLines={1}>
          {data.name}
        </Text>
      </VStack>

      <Text color="gray.300" fontSize="md">
        {data.hour}
      </Text>
    </HStack>
  )
}
