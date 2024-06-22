import { Parent } from "../Parent"
import { Student } from "../Student"

export interface UserProps {
  id: number
  firstName: string
  lastName: string
  email?: string
  phoneNumber?: string
  notifications?: number[]
}

export interface ParentProps extends UserProps {
  children?: Student[]
  notificationGroups?: string[]
}

export interface StudentProps extends UserProps  {
  parents?: Parent[]
  absences?: number
}

export function isParent(user: ParentProps | StudentProps): user is ParentProps {
  return (user as ParentProps).children !== undefined
}