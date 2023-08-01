import { Text, Pressable, IPressableProps } from 'native-base'

type GroupProps = IPressableProps & {
  name: string
  isActive: boolean
}

export function Group({ name, isActive, ...rest }: GroupProps) {
  return (
    <Pressable
      width={24}
      height={10}
      rounded="md"
      marginRight={3}
      overflow="hidden"
      alignItems="center"
      justifyContent="center"
      background="gray.600"
      isPressed={isActive}
      _pressed={{
        borderColor: 'green.500',
        borderWidth: 1
      }}
      {...rest}
    >
      <Text
        color={isActive ? 'green.500' : 'gray.200'}
        textTransform="uppercase"
        fontWeight="bold"
        fontSize="xs"
      >
        {name}
      </Text>
    </Pressable>
  )
}
