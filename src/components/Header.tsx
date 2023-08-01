import { ReactNode } from 'react'
import { Center, Heading } from 'native-base'

type HeaderProps = {
  children: ReactNode
}

export function Header({ children }: HeaderProps) {
  return (
    <Center paddingTop={16} paddingBottom={6} background="gray.600">
      <Heading color="gray.100" fontSize="xl" fontFamily="heading">
        {children}
      </Heading>
    </Center>
  )
}
