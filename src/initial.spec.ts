import { it, expect } from 'vitest'

it('Enviroment must be loaded.', () => {
  const env = import.meta.env['VITE_ENVIROMENT']
  expect(env).toBe('TESTING')
})

it('Default rest url must be loaded.', () => {
  const env = import.meta.env['VITE_REST_SERVER_URL']
  expect(env).toBe('http://localhost:8081')
})
