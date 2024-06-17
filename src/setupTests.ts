import { afterEach, beforeAll, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { beforeEach } from 'node:test'

export const adminToken =
  'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbnVzZXJAc2Nob29sc3luYy5tYWlsLmNvbSIsImlhdCI6MTcxODY1NjA2NywiZXhwIjoxNzE4NjU5NjY3LCJ1c2VySWQiOjEsInJvbGUiOiJBRE1JTiJ9.3bOT-RWp2gLwJHEZrurqs86GifIbJW4oWaRY_qS-qok'

const sessionStorageMock = (function () {
  let store: { [key: string]: string } = {}

  return {
    getItem(key: string) {
      return store[key] || null
    },
    setItem(key: string, value: string) {
      store[key] = value.toString()
    },
    removeItem(key: string) {
      delete store[key]
    },
    clear() {
      store = {}
    },
  }
})()

Object.defineProperty(window, 'sessionStorage', {
  value: sessionStorageMock,
})

beforeAll(() => {})

beforeEach(() => {
  sessionStorage.clear()
})

// runs a clean after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})
