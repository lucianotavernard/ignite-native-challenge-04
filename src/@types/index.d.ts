type User = {
  id: string
  name: string
  email: string
  avatar?: string
  deletedAt?: string
}

type UserWithPassword = User & {
  password?: string
  newPassword?: string
}

type Exercise = {
  id: string
  name: string
  demo: string
  group: string
  thumb: string
  series: number
  repetitions: string
  updatedAt: string
}

type ExerciseHistory = {
  id: string
  hour: string
  name: string
  group: string
  createdAt: string
}

type HistoryByDay = {
  title: string
  data: ExerciseHistory[]
}
