// src/hooks/NotificationContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react'
import { NotifProps } from 'models/interfaces/Notification'

// Definir la interfaz para el contexto
interface NotificationContextProps {
  notifications: NotifProps[]
  updateNotifications: (newNotifications: NotifProps[]) => void
}

// Crear el contexto con un valor inicial vacío
const NotificationContext = createContext<NotificationContextProps | undefined>(undefined)

// Hook para usar el contexto
export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotification debe usarse dentro de NotificationProvider')
  }
  return context
}

// Proveedor del contexto
interface NotificationProviderProps {
  children: ReactNode // Especificar que children puede ser cualquier nodo React
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotifProps[]>([])

  // Función para actualizar las notificaciones
  const updateNotifications = (newNotifications: NotifProps[]) => {
    setNotifications(newNotifications)
  }

  return (
    <NotificationContext.Provider value={{ notifications, updateNotifications }}>
      {children}
    </NotificationContext.Provider>
  )
}
