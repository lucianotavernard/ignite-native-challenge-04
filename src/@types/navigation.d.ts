export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      app: {
        screen: 'ads' | 'home' | 'signout'
      }

      signIn: undefined
      signUp: undefined

      history: undefined

      exercise: {
        exerciseId: string
      }
    }
  }
}
