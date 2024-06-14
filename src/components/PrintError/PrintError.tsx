import React from 'react'
import './PrintError.scss'

interface PrintErrorProps {
  error: string
}

const PrintError: React.FC<PrintErrorProps> = ({ error }) => {
  if (!error) return null
  return <p className="error-message">{error}</p>
}

export default PrintError
