import React, { createContext, useState, useContext, ReactNode } from 'react'

interface NotificationContextProps {
  notifications: number
  init: boolean
  updateNotifications: (newNotifications: number) => void
}

const NotificationContext = createContext<NotificationContextProps | undefined>(undefined)

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotification debe usarse dentro de NotificationProvider')
  }
  return context
}

interface NotificationProviderProps {
  children: ReactNode
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState(0)
  const [init, setInit] = useState(true)

  const updateNotifications = (newNotifications: number) => {
    setNotifications(newNotifications)
    setInit(false)
  }

  return (
    <NotificationContext.Provider value={{ notifications, init, updateNotifications }}>
      {children}
    </NotificationContext.Provider>
  )
}
