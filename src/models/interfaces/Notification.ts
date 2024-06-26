export interface NotifProps {
  id: number
  title?: string
  content?: string
  weight?: string
  sender?: number
  scope?: string
  recipientGroups?: string[]
  receivers?: number[]
  date?: string
  read?: boolean
  pinned?: boolean
}
