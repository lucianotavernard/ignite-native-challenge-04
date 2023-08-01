import { ReactNode } from 'react'
import { Button as ButtonNativeBase, IButtonProps, Text } from 'native-base'

type ButtonProps = IButtonProps & {
  children: ReactNode
  variant?: 'default' | 'secondary'
}

export function Button({
  children,
  variant = 'default',
  ...rest
}: ButtonProps) {
  return (
    <ButtonNativeBase
      width="full"
      height={14}
      rounded="sm"
      borderColor="green.500"
      borderWidth={variant === 'secondary' ? 1 : 0}
      backgroundColor={variant === 'secondary' ? 'transparent' : 'green.700'}
      _pressed={{ bg: variant === 'secondary' ? 'gray.500' : 'green.500' }}
      {...rest}
    >
      <Text
        color={variant === 'secondary' ? 'green.500' : 'white'}
        fontFamily="heading"
        fontSize="sm"
      >
        {children}
      </Text>
    </ButtonNativeBase>
  )
}
