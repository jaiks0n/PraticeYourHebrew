import { useCallback, useState } from 'react'
import { DEVSIDE_ACCESS_CODE, DEVSIDE_STORAGE_KEY } from '../config/devside'

function readUnlocked(): boolean {
  try {
    return localStorage.getItem(DEVSIDE_STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

export function useDevsideAccess() {
  const [isUnlocked, setIsUnlocked] = useState(readUnlocked)

  const unlock = useCallback((code: string): boolean => {
    if (code.trim() !== DEVSIDE_ACCESS_CODE) return false
    try {
      localStorage.setItem(DEVSIDE_STORAGE_KEY, '1')
    } catch {
      // ignore storage errors
    }
    setIsUnlocked(true)
    return true
  }, [])

  const lock = useCallback(() => {
    try {
      localStorage.removeItem(DEVSIDE_STORAGE_KEY)
    } catch {
      // ignore storage errors
    }
    setIsUnlocked(false)
  }, [])

  return { isUnlocked, unlock, lock }
}
