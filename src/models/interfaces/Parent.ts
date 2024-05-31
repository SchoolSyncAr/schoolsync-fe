
export interface ParentProps {
  id: number
  firstName: string
  lastName: string
  isFatherOf?: number[]
  notifications?: number[]
  notificationGroups?: string[]
}