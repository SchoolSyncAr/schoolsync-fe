import { RouterProvider, createMemoryRouter } from 'react-router-dom'
import { act, render, screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { routes } from 'root/src/routes'
import { selectAppRoutes } from 'root/src/test/Util'
import { describe, it, beforeEach, expect, afterEach, vi } from 'vitest'
import { Router } from '@remix-run/router'
import { authService } from 'root/src/services/AuthService'
import { adminToken } from 'root/src/setupTests'
import { NotificationProvider } from '../hooks/NotificationContext'
import { loginError } from 'root/src/models/data/mocks/axios.loginerror'

describe('Login Tests', () => {
  let router: Router
  beforeEach(async () => {
    await act(async () => {
      router = createMemoryRouter(selectAppRoutes(routes, ['/', 'login']), {
        initialEntries: ['/login'],
        initialIndex: 0,
      })
      render(
        <NotificationProvider>
          <RouterProvider router={router} />
        </NotificationProvider>,
      )
    })
  })

  afterEach(() => {
    router = createMemoryRouter(selectAppRoutes(routes, ['/', 'login']), {
      initialEntries: ['/login'],
      initialIndex: 0,
    })
  })

  it('Should render', async () => {
    const loginForm = await screen.findByTestId('login-form')
    expect(loginForm).toBeTruthy()
  })

  it('The username and password inputs starts empty', () => {
    const username = screen.getByTestId('login-username') as HTMLInputElement
    const password = screen.getByTestId('login-password') as HTMLInputElement
    expect(username.value).toBe('')
    expect(password.value).toBe('')
  })

  it('Display an error message if the fields are empty when attempting to log in', async () => {
    const loginButton = (await screen.findByTestId('login-submit')) as HTMLButtonElement
    await userEvent.click(loginButton)

    const emptyUsernameErrorMsg = (await screen.findByTestId('login-username-error')) as HTMLSpanElement
    const emptyPasswordErrorMsg = (await screen.findByTestId('login-password-error')) as HTMLSpanElement

    expect(emptyUsernameErrorMsg.textContent).contains('usuario')
    expect(emptyPasswordErrorMsg.textContent).contains('password')
    expect(router.state.location.pathname).toEqual('/login')
  })

  it('Display an error message if the username is not a valid email address', async () => {
    const loginButton = (await screen.findByTestId('login-submit')) as HTMLButtonElement
    const usernameInput = (await screen.findByTestId('login-username')) as HTMLInputElement

    await userEvent.type(usernameInput, 'test')
    await userEvent.click(loginButton)

    const emptyUsernameErrorMsg = (await screen.findByTestId('login-username-error')) as HTMLSpanElement

    expect(emptyUsernameErrorMsg.textContent).contains('email')
    expect(router.state.location.pathname).toEqual('/login')
  })

  it('Upon successful login, the id, token, role and expiration are successfully saved in the sessionStorage.', async () => {
    vi.spyOn(authService, 'login').mockImplementationOnce(async () => {
      authService.setStorage(adminToken)
      return adminToken
    })

    const loginButton = (await screen.findByTestId('login-submit')) as HTMLButtonElement
    const usernameInput = (await screen.findByTestId('login-username')) as HTMLInputElement
    const passwordInput = (await screen.findByTestId('login-password')) as HTMLInputElement

    await userEvent.type(usernameInput, 'admin_user@test.com')
    await userEvent.type(passwordInput, 'test')
    await userEvent.click(loginButton)

    expect(authService.getUserId()).toBe('1')
    expect(authService.getUserToken()).toBe(adminToken)
    expect(authService.getUserRole()).toBe('ADMIN')
    expect(authService.getTokenExpiration().toDateString()).toBe('Mon Jun 17 2024')
  })

  it('Upon successful login, navigates to admin dashboard', async () => {
    vi.spyOn(authService, 'login').mockImplementationOnce(async () => {
      authService.setStorage(adminToken)
      return adminToken
    })

    const loginButton = (await screen.findByTestId('login-submit')) as HTMLButtonElement
    const usernameInput = (await screen.findByTestId('login-username')) as HTMLInputElement
    const passwordInput = (await screen.findByTestId('login-password')) as HTMLInputElement

    expect(router.state.location.pathname).toEqual('/login')

    await userEvent.type(usernameInput, 'admin_user@test.com')
    await userEvent.type(passwordInput, 'test')
    await userEvent.click(loginButton)

    await waitFor(() => {
      expect(router.state.location.pathname).toEqual('/admin_dashboard')
    })
  })

  it('retorna error de credenciales si falla el inicio de sesión', async () => {
    vi.spyOn(authService, 'login').mockImplementationOnce(() => {
      return Promise.reject(loginError)
    })

    const usernameInput = (await screen.findByTestId('login-username')) as HTMLInputElement
    const passwordInput = (await screen.findByTestId('login-password')) as HTMLInputElement
    const loginButton = (await screen.findByTestId('login-submit')) as HTMLButtonElement

    await userEvent.type(usernameInput, 'test@example.com')
    await userEvent.type(passwordInput, 'test')
    await userEvent.click(loginButton)

    await waitFor(async () => {
      const errorMsg = (await screen.findByTestId('login-error')) as HTMLSpanElement
      expect(router.state.location.pathname).toEqual('/login')
      expect(errorMsg.textContent).contains('credenciales' && 'incorrectas')
    })
  })
})
