
export interface ParentProps {
  id: number
  firstName: string
  lastName: string
  isFatherOf?: number[]
  notifications?: number[]
  notificationGroups?: string[]
}

export interface StudentProps {
  id: number
  firstName: string
  lastName: string
  absences?: number
  notifications?: number[]
}