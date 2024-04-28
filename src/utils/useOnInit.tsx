import { useEffect } from 'react'

export const useOnInit = (initialCallBack: () => void) => {
  useEffect(() => {
    initialCallBack()
  }, [])
}
