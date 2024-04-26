import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { userEvent } from '@testing-library/user-event'
import { act, render, screen, waitFor } from '@testing-library/react'
import { RouterProvider, createMemoryRouter } from 'react-router-dom'
import axios from 'axios'
import { Router } from '@remix-run/router'
import { selectAppRoutes } from '../../test/Util'
import { routerConfig } from '../../routes'
import { authService } from '../../services/authService'
import { REACT_APP_REST_SERVER_URL } from '../../services/config'
import { LoginArgs } from '../../model/interfaces/types'
import { loginError } from '../../model/data/mocks/axios.loginerror'

describe('Login Tests', () => {
  let router: Router
  beforeEach(async () => {
    await act(async () => {
      router = createMemoryRouter(selectAppRoutes(routerConfig, ['/', 'login']), {
        initialEntries: ['/login'],
        initialIndex: 0,
      })
      render(<RouterProvider router={router} />)
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('Should render', async () => {
    const loginForm = await screen.findByTestId('login-form')
    expect(loginForm).toBeTruthy()
  })

  it('The username input starts empty', async () => {
    const username = (await screen.findByTestId('login-username')) as HTMLInputElement
    expect(username.value).toBe('')
  })

  it('The password input starts empty', async () => {
    const password = (await screen.findByTestId('login-password')) as HTMLInputElement
    expect(password.value).toBe('')
  })

  it('The login button starts disable', async () => {
    const loginButton = (await screen.findByTestId('login-submit')) as HTMLButtonElement
    expect(loginButton).toHaveProperty('disabled', true)
  })

  it('The login button becomes enabled when all inputs are filled', async () => {
    const usernameInput = (await screen.findByTestId('login-username')) as HTMLInputElement
    const passwordInput = (await screen.findByTestId('login-password')) as HTMLInputElement
    const loginButton = (await screen.findByTestId('login-submit')) as HTMLButtonElement
    await userEvent.type(usernameInput, 'test')
    await userEvent.type(passwordInput, 'test')

    expect(usernameInput.value).toBe('test')
    expect(passwordInput.value).toBe('test')

    expect(loginButton).toHaveProperty('disabled', false)
  })

  it('Upon successful login, the id is successfully saved in the sessionStorage.', async () => {
    vi.spyOn(axios, 'post').mockImplementationOnce(() => {
      return Promise.resolve({ data: { userId: 1 } })
    })

    const credentials: LoginArgs = { username: 'test', password: 'test' }
    const userId = await authService.login(credentials)
    expect(axios.post).toHaveBeenCalledWith(`${REACT_APP_REST_SERVER_URL}/api/user/login`, credentials)
    expect(sessionStorage.getItem('LOGED_ID')).toBe(userId.toString())
  })

  it('redirige a la ruta "/parent" después de un inicio de sesión exitoso', async () => {
    vi.spyOn(axios, 'post').mockImplementationOnce(() => {
      return Promise.resolve({ data: { userId: 1 } })
    })

    expect(router.state.location.pathname).toEqual('/login')

    const usernameInput = (await screen.findByTestId('login-username')) as HTMLInputElement
    const passwordInput = (await screen.findByTestId('login-password')) as HTMLInputElement
    const loginButton = (await screen.findByTestId('login-submit')) as HTMLButtonElement

    await userEvent.type(usernameInput, 'test')
    await userEvent.type(passwordInput, 'test')
    await userEvent.click(loginButton)

    await waitFor(() => {
      expect(router.state.location.pathname).toEqual('/parent')
    })
  })

  it('retorna error de credenciales si falla el inicio de sesión', async () => {
    vi.spyOn(axios, 'post').mockImplementationOnce(() => {
      return Promise.reject(loginError)
    })

    const usernameInput = (await screen.findByTestId('login-username')) as HTMLInputElement
    const passwordInput = (await screen.findByTestId('login-password')) as HTMLInputElement
    const loginButton = (await screen.findByTestId('login-submit')) as HTMLButtonElement

    await userEvent.type(usernameInput, 'test')
    await userEvent.type(passwordInput, 'test')
    await userEvent.click(loginButton)

    await waitFor(async () => {
      const errorMsg = (await screen.findByTestId('login-error')) as HTMLSpanElement
      expect(router.state.location.pathname).toEqual('/login')
      expect(errorMsg.textContent).contains('credenciales' && 'incorrectas')
    })
  })
})
